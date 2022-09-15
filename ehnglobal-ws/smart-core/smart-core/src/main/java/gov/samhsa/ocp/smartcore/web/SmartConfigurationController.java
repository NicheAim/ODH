package gov.samhsa.ocp.smartcore.web;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import gov.samhsa.ocp.smartcore.infrastructure.dto.SmartConfigurationDto;
import gov.samhsa.ocp.smartcore.service.SmartConfigurationService;
import lombok.extern.slf4j.Slf4j;

@RestController
@Slf4j
public class SmartConfigurationController {

    @Autowired
    private SmartConfigurationService smartConfigurationService;

    @GetMapping("/smart-configuration")
    public SmartConfigurationDto getSmartConfiguration() {
        return smartConfigurationService.getConfiguration();
    }
}
