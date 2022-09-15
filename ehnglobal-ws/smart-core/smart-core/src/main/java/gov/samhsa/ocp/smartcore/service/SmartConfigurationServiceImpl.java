package gov.samhsa.ocp.smartcore.service;

import static gov.samhsa.ocp.smartcore.config.Constants.AUTHORIZATION_PATH;
import static gov.samhsa.ocp.smartcore.config.Constants.TOKEN_PATH;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.Stream;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import gov.samhsa.ocp.smartcore.config.SmartCoreProperties;
import gov.samhsa.ocp.smartcore.domain.GrantType;
import gov.samhsa.ocp.smartcore.infrastructure.dto.SmartConfigurationDto;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
public class SmartConfigurationServiceImpl implements SmartConfigurationService {

    private SmartCoreProperties smartCoreProperties;

    private SmartConfigurationDto smartConfigurationDto;

    @Autowired
    public SmartConfigurationServiceImpl(SmartCoreProperties smartCoreProperties) {
        this.smartCoreProperties = smartCoreProperties;
        loadConfiguration();
    }

    private void loadConfiguration() {
        smartConfigurationDto = new SmartConfigurationDto();
        smartConfigurationDto.setIssuer(smartCoreProperties.getServerHost());
        smartConfigurationDto.setAuthorization_endpoint(smartCoreProperties.getServerHost() + AUTHORIZATION_PATH);

        List<String> grantTypesSupportedList = Stream.of(GrantType.values())
                .map(Enum::name)
                .collect(Collectors.toList());

        smartConfigurationDto.setGrant_types_supported(grantTypesSupportedList);

        smartConfigurationDto.setToken_endpoint(smartCoreProperties.getServerHost() + TOKEN_PATH);

        List<String> capabilitiesList = new ArrayList<String>();

        capabilitiesList.add("launch-standalone");
        capabilitiesList.add("client-public");
        capabilitiesList.add("sso-openid-connect");
        capabilitiesList.add("permission-v1");

        smartConfigurationDto.setCapabilities(capabilitiesList);

        List<String> codeChallengeMethodsSupported = new ArrayList<String>();

        smartConfigurationDto.setCode_challenge_methods_supported(codeChallengeMethodsSupported);
    }

    public SmartConfigurationDto getConfiguration() {
        return smartConfigurationDto;
    };
}
