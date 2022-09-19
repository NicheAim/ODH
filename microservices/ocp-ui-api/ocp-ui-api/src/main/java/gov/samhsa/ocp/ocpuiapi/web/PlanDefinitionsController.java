package gov.samhsa.ocp.ocpuiapi.web;

import gov.samhsa.ocp.ocpuiapi.infrastructure.FisClient;
import gov.samhsa.ocp.ocpuiapi.service.dto.PageDto;
import gov.samhsa.ocp.ocpuiapi.service.dto.PlanDefinitionDto;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@Slf4j
@RequestMapping("ocp-fis/plandefinitions")
public class PlanDefinitionsController {
    private final FisClient fisClient;

    @Autowired
    public PlanDefinitionsController(FisClient fisClient){this.fisClient = fisClient;}

    @GetMapping
    public PageDto<PlanDefinitionDto> getPlandefinitions() {
        return fisClient.getAllPlans();
    }

}
