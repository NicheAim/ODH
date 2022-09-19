package gov.samhsa.ocp.smartcore.service;

import java.net.URI;
import java.util.Optional;

import gov.samhsa.ocp.smartcore.domain.ResponseType;

public interface AuthorizationService {
    URI getRedirectUri(String clientId,
            ResponseType responseType,
            String scope,
            String redirectUri,
            String state,
            String aud,
            String launch,
            Optional<String> codeChallengeMethod,
            Optional<String> codeChallenge);
}
