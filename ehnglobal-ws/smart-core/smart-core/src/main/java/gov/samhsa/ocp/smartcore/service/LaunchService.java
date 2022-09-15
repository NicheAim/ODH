package gov.samhsa.ocp.smartcore.service;

import gov.samhsa.ocp.smartcore.service.dto.LaunchRequestDto;
import gov.samhsa.ocp.smartcore.service.dto.LaunchResponseDto;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

public interface LaunchService {
    @Transactional
    LaunchResponseDto create(LaunchRequestDto launchRequest);

    @Transactional
    LaunchResponseDto mergeAndSave(String launchId, LaunchRequestDto launchRequest);

    @Transactional
    LaunchResponseDto overrideAndSave(String launchId, LaunchRequestDto launchRequest);

    @Transactional(readOnly = true)
    LaunchResponseDto get(String launchId, Optional<String> user);

    @Transactional
    void delete(String launchId, Optional<String> user);
}
