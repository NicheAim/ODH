package gov.samhsa.ocp.smartcore.service;

import java.util.Optional;

import gov.samhsa.ocp.smartcore.domain.GrantType;
import gov.samhsa.ocp.smartcore.infrastructure.dto.TokenResponseDto;

public interface TokenService {
    TokenResponseDto getToken(
            Optional<String> basicAuth,
            GrantType grantType,
            Optional<String> refreshToken,
            Optional<String> code,
            Optional<String> clientId,
            Optional<String> redirectUri,
            Optional<String> codeVerifier);
}
