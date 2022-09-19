package gov.samhsa.ocp.ocpuiapi.service;

import gov.samhsa.ocp.ocpuiapi.config.SmartConfigProperties;
import gov.samhsa.ocp.ocpuiapi.infrastructure.SmartCoreClient;
import gov.samhsa.ocp.ocpuiapi.infrastructure.dto.AppShortCutDto;
import gov.samhsa.ocp.ocpuiapi.infrastructure.dto.LaunchRequestDto;
import gov.samhsa.ocp.ocpuiapi.infrastructure.dto.LaunchResponseDto;
import gov.samhsa.ocp.ocpuiapi.service.dto.JwtTokenKey;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.Assert;

import java.util.Objects;

@Service
public class SmartServiceImpl implements SmartService {
    @Autowired
    private JwtTokenExtractor jwtTokenExtractor;
    @Autowired
    private SmartCoreClient smartCoreClient;

    @Autowired
    private SmartConfigProperties smartConfigProperties;

    @Override
    public LaunchResponseDto create(LaunchRequestDto launchRequest) {
        Assert.notNull(launchRequest, "launchRequest cannot be null");
        final String userIdFromToken = jwtTokenExtractor.getValueByKey(JwtTokenKey.USER_ID).toString();
        Assert.hasText(userIdFromToken, "no user in JWT token");
        final String userIdFromRequest = launchRequest.getUser();
        Assert.isTrue(Objects.isNull(userIdFromRequest) || userIdFromToken.equals(userIdFromRequest), "user in JWT token does not match with the launch request");
        launchRequest.setUser(userIdFromToken);
        return smartCoreClient.create(launchRequest);
    }

    @Override
    public LaunchResponseDto mergeAndSave(String launchId,
                                          LaunchRequestDto launchRequest) {
        Assert.hasText(launchId, "launch ID must have text");
        Assert.notNull(launchRequest, "launchRequest cannot be null");
        final String userId = jwtTokenExtractor.getValueByKey(JwtTokenKey.USER_ID).toString();
        Assert.hasText(userId, "user_id must have text");
        launchRequest.setUser(userId);
        return smartCoreClient.mergeAndSave(launchId, launchRequest);
    }

    @Override
    public AppShortCutDto getAppShortcuts() {
        AppShortCutDto appShortCutDto = AppShortCutDto.builder().clientIds(smartConfigProperties.clientIds).patientClientIds(smartConfigProperties.patientClientIds).build();
        return appShortCutDto;
    }
}
