package gov.samhsa.ocp.ocpuiapi.web;

import com.nimbusds.jose.JOSEException;
import com.nimbusds.oauth2.sdk.*;
import com.nimbusds.oauth2.sdk.auth.ClientSecretBasic;
import com.nimbusds.oauth2.sdk.http.HTTPResponse;
import com.nimbusds.oauth2.sdk.id.State;
import com.nimbusds.openid.connect.sdk.*;
import com.nimbusds.openid.connect.sdk.op.OIDCProviderMetadata;
import com.nimbusds.openid.connect.sdk.rp.OIDCClientInformation;
import gov.samhsa.ocp.ocpuiapi.infrastructure.dto.CredentialDto;
import gov.samhsa.ocp.ocpuiapi.service.LoginService;
import gov.samhsa.ocp.ocpuiapi.service.dto.KeycloakRefreshDto;
import lombok.extern.slf4j.Slf4j;
import net.minidev.json.JSONObject;
import net.minidev.json.parser.JSONParser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.view.RedirectView;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.validation.Valid;
import java.io.*;
import java.net.HttpURLConnection;
import java.net.URI;
import java.net.URISyntaxException;
import java.net.URL;
import java.nio.charset.StandardCharsets;
import java.security.NoSuchAlgorithmException;
import java.security.spec.InvalidKeySpecException;
import java.util.Scanner;


@RestController
@Slf4j
public class LoginController {

    @Value("${ocp.ocp-ui-api.oauth2.authorization-configuration}")
    private String auth_configuration;
    @Value("${ocp.ocp-ui-api.oauth2.autohirization-client-id}")
    private String client_id;
    @Value("${ocp.ocp-ui-api.oauth2.authorization-client-secret}")
    private String client_secret;
    @Value("${ocp.ocp-ui-api.oauth2.authorization-redirect-url}")
    private String redirect_uri;
    @Value("${ocp.ocp-ui-api.oauth2.authorization-redirect-ui}")
    private String redirect_ui;
    @Value("${ocp.ocp-ui-api.oauth2.authorization-server-endpoint}")
    private String auth_server;

    private HttpURLConnection connection;

    @Autowired
    private LoginService loginService;

    @PostMapping("login")
    public Object login(@Valid @RequestBody CredentialDto credentialDto) {
        return loginService.login(credentialDto);
    }

    @GetMapping(
            value = "/receiver"
    )
    public void receiver(HttpServletRequest request, HttpServletResponse response) throws com.nimbusds.oauth2.sdk.ParseException, URISyntaxException, IOException, java.text.ParseException, JOSEException, ParseException, net.minidev.json.parser.ParseException, NoSuchAlgorithmException, InvalidKeySpecException {

        String url_request = request.getRequestURL().toString() + "?" + request.getQueryString();

        String code = request.getQueryString().split("&")[2].split("-")[1];

        System.out.println(url_request);

        AuthenticationResponse authenticationResponse = null;
        try {
            authenticationResponse = AuthenticationResponseParser.parse(new URI(url_request));
        }catch (URISyntaxException e){
            System.out.println(e.getMessage());
        }

        AuthenticationSuccessResponse successResponse = (AuthenticationSuccessResponse) authenticationResponse;
        assert successResponse != null;
        System.out.println(authenticationResponse.getRedirectionURI().toString());
        AuthorizationCode authCode = successResponse.getAuthorizationCode();


        //Bloque de prueba
        URL providerconfig = new URL(auth_configuration);
        InputStream stream = providerconfig.openStream();
        String providerInfo = null;
        try (Scanner scanner = new Scanner(stream)) {
            providerInfo = scanner.useDelimiter("\\A").hasNext() ? scanner.next() : "";
        }
        OIDCProviderMetadata providerMetadata = OIDCProviderMetadata.parse(providerInfo);

        JSONObject jsonObject = new JSONObject();
        jsonObject.put("client_id",client_id);
        jsonObject.put("client_secret",client_secret);

        OIDCClientInformation clientInformation = OIDCClientInformation.parse(jsonObject);
        URI redirectUri = new URI(redirect_uri);
        TokenRequest tokenReq = new TokenRequest(
                providerMetadata.getTokenEndpointURI(),
                new ClientSecretBasic(clientInformation.getID(),
                        clientInformation.getSecret()),
                new AuthorizationCodeGrant(authCode, redirectUri));

        HTTPResponse tokenHTTPResp = null;
        try {
            tokenHTTPResp = tokenReq.toHTTPRequest().send();
        } catch (SerializeException | IOException e) {
            // TODO proper error handling
            System.out.println(e.getMessage());
        }

        TokenResponse tokenResponse = null;
        assert tokenHTTPResp != null;
        tokenResponse = OIDCTokenResponseParser.parse(tokenHTTPResp);
        OIDCAccessTokenResponse accessTokenResponse = (OIDCAccessTokenResponse) tokenResponse;
        String token = accessTokenResponse.getAccessToken().toString();
        String refreshtoken = accessTokenResponse.getRefreshToken().toString();

        System.out.println("Refresh Token");
        System.out.println(refreshtoken);

        final int mid = token.length() / 2; //get the middle of the String
        String[] parts = {token.substring(0, mid),token.substring(mid)};

        final int mid_refresh = refreshtoken.length() / 2;
        String[] refresh_parts = {refreshtoken.substring(0, mid_refresh), refreshtoken.substring(mid_refresh)};

        response.addHeader("Access-Control-Allow-Origin", "*");
        response.addHeader("Access-Control-Allow-Credentials", "true");
        response.addHeader("Set-Cookie","code="+authCode.toString()+"; Path=/ocp-ui/login;");
        response.addHeader("Set-Cookie","auth_code="+parts[0]+"; Path=/ocp-ui/login;");
        response.addHeader("Set-Cookie","auth_token="+parts[1]+"; Path=/ocp-ui/login;");
        response.addHeader("Set-Cookie", "refresh_leader="+refresh_parts[0]+"; Path=/ocp-ui/login;");
        response.addHeader("Set-Cookie", "refresh_body="+refresh_parts[1]+"; Path=/ocp-ui/login;");
        //response.addHeader("credentials","include");
        response.sendRedirect(redirect_ui);
    }

    @PostMapping("refreshlogin")
    public KeycloakRefreshDto getaccesstokenfromrefreshtoken(@RequestBody KeycloakRefreshDto keycloakRefreshDto){
        KeycloakRefreshDto keycloakRefreshDto_response = new KeycloakRefreshDto();
        String url = auth_server + "/protocol/openid-connect/token";

        StringBuilder stringBuilder = new StringBuilder();
        stringBuilder.append("client_id=");
        stringBuilder.append(client_id);
        stringBuilder.append("&");
        stringBuilder.append("grant_type=");
        stringBuilder.append("refresh_token");
        stringBuilder.append("&");
        stringBuilder.append("refresh_token=");
        stringBuilder.append(keycloakRefreshDto.getRefresh_token());
        stringBuilder.append("&");
        stringBuilder.append("client_secret=");
        stringBuilder.append(client_secret);

        String parameters = stringBuilder.toString();

        log.info(parameters);
        log.info(url);


        byte[] postdata = parameters.getBytes(StandardCharsets.UTF_8);

        try {
            URL url_keycloak = new URL(url);
            connection = (HttpURLConnection) url_keycloak.openConnection();
            connection.setDoOutput(true);
            connection.setRequestMethod("POST");
            connection.setRequestProperty("Content-Type","application/x-www-form-urlencoded");
            DataOutputStream dataOutputStream = new DataOutputStream(connection.getOutputStream());
            dataOutputStream.write(postdata);
            StringBuilder content = new StringBuilder();
            BufferedReader bufferedReader = new BufferedReader(new InputStreamReader(connection.getInputStream()));
            String line;
            while ((line = bufferedReader.readLine()) != null) {
                content.append(line);
                content.append(System.lineSeparator());
            }
            log.info("Content from Keycloak: "+content.toString());
            JSONParser jsonParser = new JSONParser();
            JSONObject jsonObject = (JSONObject) jsonParser.parse(content.toString());

            keycloakRefreshDto_response.setRefresh_token(jsonObject.get("refresh_token").toString());
            keycloakRefreshDto_response.setAccess_token(jsonObject.get("access_token").toString());
            keycloakRefreshDto_response.setExpires_in(jsonObject.get("expires_in").toString());
            keycloakRefreshDto_response.setRefresh_expires_in(jsonObject.get("refresh_expires_in").toString());

        } catch (IOException | net.minidev.json.parser.ParseException e) {
            e.printStackTrace();
        } finally {
            connection.disconnect();
        }

        return keycloakRefreshDto_response;
    }

    @GetMapping("/testlogin")
    public RedirectView testlogin() throws URISyntaxException, IOException, SerializeException, com.nimbusds.oauth2.sdk.ParseException {
        //URI issuer = new URI("http://localhost:8089/auth");
        URL providerconfig = new URL(auth_configuration);
        InputStream stream = providerconfig.openStream();
        String providerInfo = null;
        try (Scanner scanner = new Scanner(stream)) {
            providerInfo = scanner.useDelimiter("\\A").hasNext() ? scanner.next() : "";
        }
        OIDCProviderMetadata providerMetadata = OIDCProviderMetadata.parse(providerInfo);


        URI redirectUri = new URI(redirect_uri);
        State state = new State();
        Nonce nonce = new Nonce();
        Scope scope = Scope.parse("openid");
        JSONObject jsonObject = new JSONObject();
        jsonObject.put("client_id",client_id);
        jsonObject.put("client_secret",client_secret);

        OIDCClientInformation clientInformation = OIDCClientInformation.parse(jsonObject);


        AuthenticationRequest authenticationRequest = new AuthenticationRequest(
                providerMetadata.getAuthorizationEndpointURI(),
                new ResponseType(ResponseType.Value.CODE),
                scope, clientInformation.getID(), redirectUri, state, nonce
        );

        URI authReqURI = authenticationRequest.toURI();
        System.out.println("Redirect URI");
        System.out.println(authReqURI.toString());
//        System.out.println(authReqURI);

        RedirectView redirectView = new RedirectView();
        redirectView.setUrl(authReqURI.toString());

        return redirectView;

    }
}
