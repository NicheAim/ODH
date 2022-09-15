package gov.samhsa.ocp.smartcore.service;

import java.io.BufferedReader;
import java.io.DataOutputStream;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.nio.charset.StandardCharsets;
import java.security.InvalidKeyException;
import java.security.NoSuchAlgorithmException;
import java.util.ArrayList;
import java.util.Base64;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.configurationprocessor.json.JSONArray;
import org.springframework.boot.configurationprocessor.json.JSONException;
import org.springframework.boot.configurationprocessor.json.JSONObject;
import org.springframework.boot.json.JsonParser;
import org.springframework.boot.json.JsonParserFactory;
import org.springframework.security.jwt.JwtHelper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import gov.samhsa.ocp.smartcore.config.SmartCoreProperties;
import gov.samhsa.ocp.smartcore.domain.GrantType;
import gov.samhsa.ocp.smartcore.domain.Launch;
import gov.samhsa.ocp.smartcore.domain.LaunchRepository;
import gov.samhsa.ocp.smartcore.infrastructure.OAuth2ClientRestClient;
import gov.samhsa.ocp.smartcore.infrastructure.OAuth2UserRestClient;
import gov.samhsa.ocp.smartcore.infrastructure.dto.ClientMetaDto;
import gov.samhsa.ocp.smartcore.infrastructure.dto.TokenResponseDto;
import gov.samhsa.ocp.smartcore.service.dto.Attributes;
import gov.samhsa.ocp.smartcore.service.dto.LaunchResponseDto;
import gov.samhsa.ocp.smartcore.service.dto.UserDto;
import gov.samhsa.ocp.smartcore.service.dto.keycloakclient.RetrieveClientDto;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
public class TokenServiceImpl implements TokenService {

    @Autowired
    OAuth2UserRestClient oAuth2UserRestClient;

    @Autowired
    private ModelMapper modelMapper;

    @Autowired
    private LaunchRepository launchRepository;

    @Autowired
    private SmartCoreProperties smartCoreProperties;

    @Autowired
    private OAuth2ClientRestClient clientRestClient;

    @Value("${smart-core.oauth2-token}")
    private String url_token;

    private HttpURLConnection connection;

    private String getClientScopes(String clientid) {
        List<RetrieveClientDto> dataclient = clientRestClient.getIDClient(clientid);
        if (dataclient.size() > 0) {
            String keycloak_id = dataclient.get(0).getId();
            log.info("Getting scopes from client: " + keycloak_id);
            ClientMetaDto clientMetaDto = clientRestClient.getClientMeta(keycloak_id);
            String[] scopes = clientMetaDto.getDefaultClientScopes();
            // String array to string : Compatibility
            String scopes_str = "";
            if (scopes.length > 0) {
                StringBuilder sb = new StringBuilder();
                for (String s : scopes) {
                    sb.append(s).append(",");
                }
                scopes_str = sb.deleteCharAt(sb.length() - 1).toString();
            }
            return scopes_str;
        }
        return "";
    }

    private StringBuilder getAuthorizationCode(String code, String redirectUri, String clientId,
            Optional<String> codeVerifier) {
        StringBuilder builder = new StringBuilder();
        builder.append("grant_type=").append(GrantType.authorization_code).append("&");
        ;
        builder.append("code=").append(code).append("&");
        builder.append("redirect_uri=").append(redirectUri).append("&");
        builder.append("client_id=").append(clientId);

        if (codeVerifier.isPresent()) {
            builder.append("&").append("code_verifier=").append(codeVerifier);
        }

        return builder;
    }

    private StringBuilder getRefreshToken(String refreshToken, String clientId) {
        StringBuilder builder = new StringBuilder();
        builder.append("grant_type=").append(GrantType.refresh_token).append("&");
        ;
        builder.append("refresh_token=").append(refreshToken).append("&");
        builder.append("client_id=").append(clientId);
        return builder;
    }

    @Override
    public TokenResponseDto getToken(
            Optional<String> basicAuth,
            GrantType grantType,
            Optional<String> refreshToken,
            Optional<String> code,
            Optional<String> clientId,
            Optional<String> redirectUri,
            Optional<String> codeVerifier) {

        TokenResponseDto tokenResponseDto = new TokenResponseDto();
        StringBuilder contentbody = new StringBuilder();
        JsonParser parser = JsonParserFactory.getJsonParser();
        StringBuilder builder = null;

        if (!grantType.equals(GrantType.authorization_code) && !grantType.equals(GrantType.refresh_token)) {
            throw new RuntimeException("grantType not supported");
        }

        if (grantType.equals(GrantType.authorization_code)) {

            if (!code.isPresent() || !redirectUri.isPresent() || !clientId.isPresent())
                throw new RuntimeException(
                        "make sure code, redirect_uri and client_id are present when using authorization_code as grant_type");

            builder = getAuthorizationCode(code.get(), redirectUri.get(), clientId.get(), codeVerifier);
        } else if (grantType.equals(GrantType.refresh_token)) {
            if (!refreshToken.isPresent() || !clientId.isPresent())
                throw new RuntimeException(
                        "make sure refresh_token and clientId are present when using authorization_code as grant_type");

            builder = getRefreshToken(refreshToken.get(), clientId.get());
        }

        byte[] postData = builder.toString().getBytes(StandardCharsets.UTF_8);

        // Getting client scopes
        String scopes = getClientScopes(clientId.get());

        try {
            URL url = new URL(url_token);
            connection = (HttpURLConnection) url.openConnection();
            connection.setDoOutput(true);
            connection.setRequestMethod("POST");
            connection.setRequestProperty("Content-Type", "application/x-www-form-urlencoded");
            DataOutputStream dataOutputStream = new DataOutputStream(connection.getOutputStream());
            dataOutputStream.write(postData);
            BufferedReader bufferedReader = new BufferedReader(new InputStreamReader(connection.getInputStream()));
            String line;
            while ((line = bufferedReader.readLine()) != null) {
                contentbody.append(line);
                contentbody.append(System.lineSeparator());
            }
            System.out.println("....RESPONSE FROM KEYCLOAK....");
            System.out.println(contentbody.toString());
            Map<String, ?> token_response = parser.parseMap(contentbody.toString());
            System.out.println("token_response: " + token_response);
            String access_token_keycloak = token_response.get("access_token").toString();
            String refresh_token_keycloak = token_response.get("refresh_token").toString();
            Object tokenResponseIdToken = token_response.get("id_token");
            System.out.println("tokenResponseIdToken: " + tokenResponseIdToken);
            String id_token = token_response.get("id_token").toString();

            Map<String, ?> tokendata = parser.parseMap(JwtHelper.decode(access_token_keycloak).getClaims());
            String exp = tokendata.get("exp").toString();
            String user_name = tokendata.get("name").toString();
            String email = tokendata.containsKey("email") ? tokendata.get("email").toString() : "";
            tokenResponseDto.setExpiresIn(Integer.parseInt(exp));

            String subid = tokendata.get("sub").toString();
            String session_state = tokendata.get("session_state").toString();
            String iat = tokendata.get("iat").toString();
            UserDto userDto = oAuth2UserRestClient.getUser(subid);
            Attributes attributes = userDto.getAttributes();
            Map<String, ?> map = parser.parseMap(attributes.getExt_attr().get(0));
            String practitioner_id = map.get("id").toString();

            getData(subid, tokenResponseDto);
            JSONObject in_context = new JSONObject();
            JSONObject context = new JSONObject();

            JSONObject header_body = new JSONObject();
            // JSONObject header = new JSONObject();
            // JSONObject jwt_body = new JSONObject();

            try {
                JSONArray audience = new JSONArray();
                audience.put(0, smartCoreProperties.getJwt_sub());
                audience.put(1, smartCoreProperties.getFhir());

                header_body.put("alg", "HS256");
                header_body.put("typ", "JWT");
                // header.put("header", header_body);

                in_context.put("patientId", tokenResponseDto.getPatient());
                in_context.put("userId", practitioner_id);
                context.put("context", in_context);
                context.put("client_id", clientId.get());
                // TODO: Get scopes from client
                context.put("scope", scopes);
                // context.put("scope", "patient/Patient.read patient/Consent.* launch
                // launch/patient openid profile user/Organization.read user/Practitioner.read
                // user/PractitionerRole.read user/StructureDefinition.read
                // user/Provenance.write patient/CareTeam.read user/ValueSet.read $expand");
                context.put("redirect_uri", redirectUri);
                context.put("exp", tokenResponseDto.getExpiresIn());
                context.put("state", session_state);
                context.put("userResource", "Practitioner");
                context.put("userId", practitioner_id);
                context.put("patientId", tokenResponseDto.getPatient());
                context.put("userOrganizationId", tokenResponseDto.getOrganization());
                context.put("user_id", practitioner_id);
                context.put("user_name", user_name);
                context.put("email", email);
                context.put("iss", smartCoreProperties.getJwt_iss());
                context.put("aud", audience);
                context.put("sub", smartCoreProperties.getJwt_sub());
                context.put("iat", Long.parseLong(iat));

                // jwt_body.put("payload", context);

                String encodedHeader = encode(header_body.toString().getBytes(StandardCharsets.UTF_8));
                String encodedBody = encode(context.toString().getBytes(StandardCharsets.UTF_8));
                String signature = hmacSha256(encodedHeader + "." + encodedBody, smartCoreProperties.getJwt_secret());
                String jwt_encoded = encodedHeader + "." + encodedBody + "." + signature;

                tokenResponseDto.setAccessToken(jwt_encoded);
                tokenResponseDto.setExp(tokenResponseDto.getExpiresIn());
                tokenResponseDto.setIdToken(id_token);
                tokenResponseDto.setRefreshToken(refresh_token_keycloak);
                // id_token, user_id, user_name, email

                // stringBuilder.append(redirectUri).append("?code=").append(encodedBasic);
                // stringBuilder.append("&state=").append(session_state);
                System.out.println("JWT");
                System.out.println(jwt_encoded);
            } catch (JSONException e) {
                throw new RuntimeException(e);
            }

            System.out.println("ACCESS TOKEN: " + token_response.get("access_token"));
            // tokenResponseDto.setAccessToken(token_response.get("access_token").toString());
        } catch (IOException e) {
            System.out.println(e.getMessage());
        } finally {
            connection.disconnect();
        }

        System.out.println(builder.toString());
        // final TokenResponseDto tokenResponseDto = basicAuth
        // .map(auth -> oAuth2TokenRestClient.getToken("authorization_code", code,
        // redirectUri, clientId.get(), builder.toString()))
        // .orElseGet(() -> clientId
        // .map(client -> {
        // final String encodedBasic = Base64Utils.encodeToString((client + ":" +
        // smartCoreProperties.getPublicClientSecret()).getBytes(StandardCharsets.UTF_8));
        // return oAuth2TokenRestClient.getToken(BASIC_AUTH_PREFIX + encodedBasic,
        // "authorization_code", code, redirectUri, builder.toString());
        // return oAuth2TokenRestClient.getToken("authorization_code", code,
        // redirectUri, clientId.get(), builder.toString());
        // })
        // .orElseThrow(UnauthorizedException::new));
        return tokenResponseDto;
    }

    @Transactional(readOnly = true)
    public void getData(String subid, TokenResponseDto responseDtotoken) {
        final Iterable<Launch> launch = launchRepository.findAll();
        List<String> launchids = new ArrayList<>();
        List<LaunchResponseDto> responseDtoList = new ArrayList<>();
        launch.forEach(v -> {
            if (v != null) {
                LaunchResponseDto launchResponseDto = modelMapper.map(v, LaunchResponseDto.class);
                // launchids.add(launchResponseDto.getLaunch());
                responseDtoList.add(launchResponseDto);
                System.out.println("LAUNCH IDS: " + launchResponseDto.getUser());
                System.out.println("LAUNCH Patient: " + launchResponseDto.getUser());
            }
        });

        // launchids.forEach(id -> {
        // System.out.println("INNER LOOP LAUNCH IDS: "+id);
        // final Optional<Launch> launch_iter = launchRepository.findById(subid);
        // if(launch_iter.isPresent()) {
        // final LaunchResponseDto launchResponse = modelMapper.map(launch_iter,
        // LaunchResponseDto.class);
        // System.out.println("INNER LOOP: "+launchResponse.getUser());
        // responseDtoList.add(launchResponse);
        // } else {
        // System.out.println("CANNOT FIND BY LAUNCH AND SUB ID");
        // }
        // });

        if (responseDtoList.size() > 0) {
            Optional<LaunchResponseDto> responseDto = responseDtoList.stream()
                    .filter(v -> v.getUser() != null && v.getUser().equals(subid))
                    .findAny();
            System.out.println(responseDto.get().getPatient());

            responseDtotoken.setPatient(responseDto.get().getPatient());
            responseDtotoken.setOrganization(responseDto.get().getOrganization());

            System.out.println("LAUNCH ID ITER: " + responseDto.get().getLaunch());
            System.out.println("USER ID ITER: " + responseDto.get().getUser());
            System.out.println("ORGANIZATION ID ITER: " + responseDto.get().getOrganization());
            System.out.println("PATIENT ID ITER: " + responseDto.get().getPatient());
        } else {
            System.out.println("NOTHING FOUND");
        }

    }

    private String hmacSha256(String data, String secret) {
        try {
            byte[] hash = secret.getBytes(StandardCharsets.UTF_8);
            Mac sha256Hmac = Mac.getInstance("HmacSHA256");
            SecretKeySpec secretKeySpec = new SecretKeySpec(hash, "HmacSHA256");
            sha256Hmac.init(secretKeySpec);
            byte[] signedBytes = sha256Hmac.doFinal(data.getBytes(StandardCharsets.UTF_8));
            return encode(signedBytes);
        } catch (NoSuchAlgorithmException | InvalidKeyException e) {
            throw new RuntimeException(e);
        }
    }

    private static String encode(byte[] bytes) {
        return Base64.getUrlEncoder().withoutPadding().encodeToString(bytes);
    }

}
