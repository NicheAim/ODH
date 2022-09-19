package gov.samhsa.ocp.smartcore.web;

import static gov.samhsa.ocp.smartcore.config.Constants.AUTHORIZATION_HEADER;
import static gov.samhsa.ocp.smartcore.config.Constants.CLIENT_ID;
import static gov.samhsa.ocp.smartcore.config.Constants.CODE;
import static gov.samhsa.ocp.smartcore.config.Constants.CODE_VERIFIER;
import static gov.samhsa.ocp.smartcore.config.Constants.GRANT_TYPE;
import static gov.samhsa.ocp.smartcore.config.Constants.REDIRECT_URI;
import static gov.samhsa.ocp.smartcore.config.Constants.REFRESH_TOKEN;
import static gov.samhsa.ocp.smartcore.config.Constants.TOKEN_PATH;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import gov.samhsa.ocp.smartcore.domain.GrantType;
import gov.samhsa.ocp.smartcore.infrastructure.dto.TokenResponseDto;
import gov.samhsa.ocp.smartcore.service.TokenService;

@RestController
public class TokenRestController {

    @Autowired
    private TokenService tokenService;

    @PostMapping(TOKEN_PATH)
    public TokenResponseDto getToken(@RequestHeader(AUTHORIZATION_HEADER) Optional<String> basicAuth,
            @RequestParam(GRANT_TYPE) GrantType grantType,
            @RequestParam(REFRESH_TOKEN) Optional<String> refreshToken,
            @RequestParam(CODE) Optional<String> code,
            @RequestParam(CLIENT_ID) Optional<String> clientId,
            @RequestParam(REDIRECT_URI) Optional<String> redirectUri,
            @RequestParam(CODE_VERIFIER) Optional<String> codeVerifier

    ) {

        return tokenService.getToken(
                basicAuth,
                grantType,
                refreshToken,
                code,
                clientId,
                redirectUri,
                codeVerifier);
    }
}
