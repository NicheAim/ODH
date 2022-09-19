package gov.samhsa.ocp.smartcore.service;

import gov.samhsa.ocp.smartcore.config.SmartCoreProperties;
import gov.samhsa.ocp.smartcore.infrastructure.OAuth2ClientRestClient;
import gov.samhsa.ocp.smartcore.infrastructure.dto.ClientMetaDto;
import gov.samhsa.ocp.smartcore.service.dto.LaunchRequestDto;
import gov.samhsa.ocp.smartcore.service.dto.LaunchResponseDto;
import gov.samhsa.ocp.smartcore.service.exception.UnauthorizedException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

import static gov.samhsa.ocp.smartcore.config.Constants.ISS;
import static gov.samhsa.ocp.smartcore.config.Constants.LAUNCH;
import static gov.samhsa.ocp.smartcore.service.URIUtils.addParams;

@Service
public class LauncherServiceImpl implements LauncherService {

    @Autowired
    private SmartCoreProperties smartCoreProperties;
    @Autowired
    private OAuth2ClientRestClient oAuth2ClientRestClient;
    @Autowired
    private LaunchService launchService;

    @Override
    public URI getLaunchRedirectUri(String clientId, Optional<String> launch) {
        try {
            // If passed use existing launch, else create a new one
            final LaunchResponseDto launchResponseDto = launch
                    .map(l -> launchService.get(l, Optional.empty()))
                    .orElseGet(() -> launchService.create(LaunchRequestDto
                            .builder()
                            .needPatientBanner(true)
                            .build()));
            final ClientMetaDto clientMeta = oAuth2ClientRestClient.getClientMeta(clientId);
            String url = clientMeta.getBaseUrl();
            System.out.println(url);
            final URI uri = new URI(url);
            final Map<String, String> params = new HashMap<>();
            params.put(LAUNCH, launchResponseDto.getLaunch());
            params.put(ISS, smartCoreProperties.getServerHost());
            final URI withParams = addParams(uri, params);
            return withParams;
        } catch (URISyntaxException e) {
            throw new UnauthorizedException();
        }
    }
}
