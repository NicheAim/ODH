package gov.samhsa.ocp.smartcore.web;

import static gov.samhsa.ocp.smartcore.config.Constants.AUD;
import static gov.samhsa.ocp.smartcore.config.Constants.AUTHORIZATION_PATH;
import static gov.samhsa.ocp.smartcore.config.Constants.CLIENT_ID;
import static gov.samhsa.ocp.smartcore.config.Constants.CODE_CHALLENGE;
import static gov.samhsa.ocp.smartcore.config.Constants.CODE_CHALLENGE_METHOD;
import static gov.samhsa.ocp.smartcore.config.Constants.LAUNCH;
import static gov.samhsa.ocp.smartcore.config.Constants.REDIRECT_PREFIX;
import static gov.samhsa.ocp.smartcore.config.Constants.REDIRECT_URI;
import static gov.samhsa.ocp.smartcore.config.Constants.RESPONSE_TYPE;
import static gov.samhsa.ocp.smartcore.config.Constants.SCOPE;
import static gov.samhsa.ocp.smartcore.config.Constants.STATE;

import java.net.URI;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

import gov.samhsa.ocp.smartcore.domain.ResponseType;
import gov.samhsa.ocp.smartcore.service.AuthorizationService;
import lombok.extern.slf4j.Slf4j;

@Controller
@Slf4j
public class AuthorizationController {

    @Autowired
    private AuthorizationService authorizationService;

    @GetMapping(AUTHORIZATION_PATH)
    public String getAuthorization(
            @RequestParam(CLIENT_ID) String clientId,
            @RequestParam(RESPONSE_TYPE) ResponseType responseType,
            @RequestParam(SCOPE) String scope,
            @RequestParam(REDIRECT_URI) String redirectUri,
            @RequestParam(STATE) String state,
            @RequestParam(AUD) String aud,
            @RequestParam(LAUNCH) String launch,
            @RequestParam(CODE_CHALLENGE) Optional<String> codeChallengeMethod,
            @RequestParam(CODE_CHALLENGE_METHOD) Optional<String> codeChallenge) {
        final URI authRedirectUri = authorizationService.getRedirectUri(clientId,
                responseType,
                scope,
                redirectUri,
                state,
                aud,
                launch,
                codeChallengeMethod,
                codeChallenge);
        System.out.println("AUTHORIZE URL: " + authRedirectUri.toString());
        return REDIRECT_PREFIX + authRedirectUri.toString();
    }
}
