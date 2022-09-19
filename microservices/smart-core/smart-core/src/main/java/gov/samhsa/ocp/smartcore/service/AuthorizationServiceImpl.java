package gov.samhsa.ocp.smartcore.service;

import static gov.samhsa.ocp.smartcore.service.URIUtils.addParams;
import static java.util.stream.Collectors.joining;
import static java.util.stream.Collectors.toList;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import gov.samhsa.ocp.smartcore.config.Constants;
import gov.samhsa.ocp.smartcore.config.SmartCoreProperties;
import gov.samhsa.ocp.smartcore.domain.Context;
import gov.samhsa.ocp.smartcore.domain.Launch;
import gov.samhsa.ocp.smartcore.domain.LaunchRepository;
import gov.samhsa.ocp.smartcore.domain.ResponseType;
import gov.samhsa.ocp.smartcore.service.exception.InvalidOrExpiredLaunchIdException;
import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
public class AuthorizationServiceImpl implements AuthorizationService {

    public static final String SPACE = " ";
    public static final String COMMA = ",";

    @Autowired
    private LaunchRepository launchRepository;
    @Autowired
    private SmartCoreProperties smartCoreProperties;

    @Override
    public URI getRedirectUri(
            String clientId,
            ResponseType responseType,
            String scope,
            String redirectUri,
            String state,
            String aud,
            String launch,
            Optional<String> codeChallengeMethod,
            Optional<String> codeChallenge) {
        System.out.println("CLIENTID: " + clientId);
        System.out.println("ResponseType: " + responseType);
        System.out.println("Scope: " + scope);
        System.out.println("RedirectUri: " + redirectUri);
        System.out.println("State: " + state);
        System.out.println("AUD: " + aud);
        System.out.println("LAUNCH: " + launch);
        System.out
                .println("codeChallengeMethod: " + (codeChallengeMethod.isPresent() ? codeChallengeMethod.get() : ""));
        System.out.println("codeChallenge: " + (codeChallenge.isPresent() ? codeChallenge.get() : ""));
        return getContextInitializerRedirectUri(clientId, responseType, scope, redirectUri, state, aud, launch,
                codeChallengeMethod, codeChallenge)
                .orElseGet(() -> getAuthorizationRedirectUri(clientId, responseType, scope, redirectUri, state, aud,
                        launch, codeChallengeMethod, codeChallenge));
    }

    private Optional<URI> getContextInitializerRedirectUri(String clientId, ResponseType responseType, String scope,
            String redirectUri, String state, String aud, String launch, Optional<String> codeChallengeMethod,
            Optional<String> codeChallenge) {
        try {
            final List<Context> uninitializedRequiredContexts = getUninitializedRequiredContexts(launch, scope);
            if (!uninitializedRequiredContexts.isEmpty()) {
                final Map<String, String> params = new HashMap<>();
                params.put(Constants.CLIENT_ID, clientId);
                params.put(Constants.RESPONSE_TYPE, responseType.name());
                params.put(Constants.SCOPE, scope);
                params.put(Constants.REDIRECT_URI, redirectUri);
                params.put(Constants.STATE, state);
                params.put(Constants.AUD, aud);
                params.put(Constants.LAUNCH, launch);

                if (codeChallengeMethod.isPresent()) {
                    params.put(Constants.CODE_CHALLENGE_METHOD, codeChallengeMethod.get());
                }

                if (codeChallenge.isPresent()) {
                    params.put(Constants.CODE_CHALLENGE, codeChallenge.get());
                }

                params.put(Constants.REQUIRED_CONTEXT,
                        uninitializedRequiredContexts.stream().map(Context::name).collect(joining(COMMA)));

                System.out.println("PARAMS: " + params.toString());
                System.out.println("REQUIRED CONTEXT: "
                        + uninitializedRequiredContexts.stream().map(Context::name).collect(joining(COMMA)));
                System.out.println("CONTEXT INITIAL: " + smartCoreProperties.getContextInitializer());

                final URI baseRedirectUri = new URI(smartCoreProperties.getContextInitializer());
                final URI redirectUriWithParams = addParams(baseRedirectUri, params);

                System.out.println("URI CONTEXT: " + redirectUriWithParams.toString());

                return Optional.of(redirectUriWithParams);
            }
        } catch (URISyntaxException e) {
            log.error(e.getMessage(), e);
            throw new RuntimeException(e.getMessage(), e);
        }
        return Optional.empty();
    }

    private URI getAuthorizationRedirectUri(String clientId, ResponseType responseType, String scope,
            String redirectUri, String state, String aud, String launch, Optional<String> codeChallengeMethod,
            Optional<String> codeChallenge) {
        try {
            final Map<String, String> params = new HashMap<>();
            params.put(Constants.CLIENT_ID, clientId);
            params.put(Constants.RESPONSE_TYPE, responseType.name());
            params.put(Constants.SCOPE, scope);
            params.put(Constants.REDIRECT_URI, redirectUri);
            params.put(Constants.STATE, state);
            params.put(Constants.AUD, aud);
            params.put(Constants.LAUNCH, launch);

            if (codeChallengeMethod.isPresent()) {
                params.put(Constants.CODE_CHALLENGE_METHOD, codeChallengeMethod.get());
            }

            if (codeChallenge.isPresent()) {
                params.put(Constants.CODE_CHALLENGE, codeChallenge.get());
            }

            final URI baseRedirectUri = new URI(smartCoreProperties.getOauth2Authorize());
            final URI redirectUriWithParams = addParams(baseRedirectUri, params);
            System.out.println("REDIRECT URI: " + redirectUriWithParams.toString());
            return redirectUriWithParams;
        } catch (URISyntaxException e) {
            log.error(e.getMessage(), e);
            throw new RuntimeException(e.getMessage(), e);
        }
    }

    private List<Context> getUninitializedRequiredContexts(String launch, String scope) {
        final List<String> scopes = Arrays.stream(scope.split(SPACE)).filter(StringUtils::hasText).collect(toList());
        final Launch launchContext = launchRepository.findById(launch)
                .orElseThrow(InvalidOrExpiredLaunchIdException::new);

        System.out.println("GETTING REQUIRED CONTEXT: " + scopes.get(0));

        final List<Context> uninitializedRequiredContexts = scopes.stream()
                .filter(s -> s.startsWith(Context.LAUNCH_SCOPE_PREFIX))
                .map(Context::fromLaunchScope)
                .filter(launchContextRequest -> !StringUtils
                        .hasText(launchContext.getValueByContext(launchContextRequest)))
                .distinct()
                .collect(toList());
        if (!uninitializedRequiredContexts.contains(Context.user) && !StringUtils.hasText(launchContext.getUser())) {
            uninitializedRequiredContexts.add(Context.user);
        }
        return uninitializedRequiredContexts;
    }
}
