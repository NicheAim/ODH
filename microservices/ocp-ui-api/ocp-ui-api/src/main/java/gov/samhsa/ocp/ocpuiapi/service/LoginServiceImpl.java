package gov.samhsa.ocp.ocpuiapi.service;

import feign.FeignException;
import gov.samhsa.ocp.ocpuiapi.config.ConfigProperties;
import gov.samhsa.ocp.ocpuiapi.infrastructure.UaaFormEncodedClient;
import gov.samhsa.ocp.ocpuiapi.infrastructure.UaaRestClient;
import gov.samhsa.ocp.ocpuiapi.infrastructure.dto.AutologinResponseDto;
import gov.samhsa.ocp.ocpuiapi.infrastructure.dto.CredentialDto;
import gov.samhsa.ocp.ocpuiapi.service.dto.LoginResponseDto;
import gov.samhsa.ocp.ocpuiapi.util.ExceptionUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.Base64Utils;

import java.nio.charset.StandardCharsets;
import java.util.HashMap;
import java.util.Map;

@Service
public class LoginServiceImpl implements LoginService {
    private static final String GRAND_TYPE = "password";
    private static final String RESPONSE_TYPE = "token";

    private final UaaFormEncodedClient uaaFormEncodedClient;
    private final UaaRestClient uaaRestClient;
    private final ConfigProperties configProperties;

    @Autowired
    public LoginServiceImpl(UaaFormEncodedClient uaaFormEncodedClient, UaaRestClient uaaRestClient, ConfigProperties configProperties) {
        this.uaaFormEncodedClient = uaaFormEncodedClient;
        this.uaaRestClient = uaaRestClient;
        this.configProperties = configProperties;
    }

    @Override
    public Object login(CredentialDto credentialDto) {
        LoginResponseDto loginResponse = null;
        try {
            Map<String, String> formParams = buildPasswordGrantFormParams(credentialDto);
            final Object authData = uaaFormEncodedClient.getTokenUsingPasswordGrant(formParams);
            final ConfigProperties.OAuth2Client ocpUiOAuth2Client = configProperties.getOauth2().getOauth2Client();
            final AutologinResponseDto autologin = uaaRestClient.getAutologin(credentialDto, "Basic " + Base64Utils.encodeToString(ocpUiOAuth2Client.getClientId().concat(":").concat(ocpUiOAuth2Client.getClientSecret()).getBytes(StandardCharsets.UTF_8)));
            loginResponse = new LoginResponseDto(authData, autologin);
        } catch (FeignException fe) {
            ExceptionUtil.handleFeignExceptionFailToLogin(fe, "User authentication failure by using username: " .concat(credentialDto.getUsername()));
        }
        return loginResponse;
    }

    private Map<String, String> buildPasswordGrantFormParams(CredentialDto credentialDto) {
        final ConfigProperties.OAuth2Client ocpUiOAuth2Client = configProperties.getOauth2().getOauth2Client();

        Map<String, String> formParams = new HashMap<>();
        formParams.put("client_id", ocpUiOAuth2Client.getClientId());
        formParams.put("client_secret", ocpUiOAuth2Client.getClientSecret());
        formParams.put("grant_type", GRAND_TYPE);
        formParams.put("response_type", RESPONSE_TYPE);
        formParams.put("username", credentialDto.getUsername());
        formParams.put("password", credentialDto.getPassword());
        return formParams;
    }
}
