package gov.samhsa.ocp.ocpuiapi.web;

import feign.FeignException;
import gov.samhsa.ocp.ocpuiapi.infrastructure.FisClient;
import gov.samhsa.ocp.ocpuiapi.service.UserContextService;
import gov.samhsa.ocp.ocpuiapi.service.dto.ActivityDefinitionDto;
import gov.samhsa.ocp.ocpuiapi.service.dto.ActivityReferenceDto;
import gov.samhsa.ocp.ocpuiapi.service.dto.ReferenceDto;
import gov.samhsa.ocp.ocpuiapi.util.ExceptionUtil;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("ocp-fis")
@Slf4j
public class ActivityDefinitionController {
    private final FisClient fisClient;

    private final String ACTIVITY_DEFINITION_NOT_FOUND = "that no Activity Definitions were found the for the given organizationId and/or other criteria";

    @Autowired
    public ActivityDefinitionController(FisClient fisClient) {
        this.fisClient = fisClient;
    }

    @Autowired
    UserContextService userContextService;

    @GetMapping("/organizations/{organizationId}/activity-definitions")
    public Object getAllActivityDefinitionsByOrganization(@PathVariable String organizationId,
                                                          @RequestParam(value = "searchKey", required = false) String searchKey,
                                                          @RequestParam(value = "searchValue", required = false) String searchValue,
                                                          @RequestParam(value = "pageNumber", required = false) Integer pageNumber,
                                                          @RequestParam(value = "pageSize", required = false) Integer pageSize) {
        log.info("Fetching activity definitions from FHIR Server for the given OrganizationId: " + organizationId);
        try {
            Object fisClientResponse = fisClient.getAllActivityDefinitionsByOrganization(organizationId, searchKey, searchValue, pageNumber, pageSize);
            log.info("Got response from FHIR Server...");
            return fisClientResponse;
        }
        catch (FeignException fe) {
            ExceptionUtil.handleFeignException(fe, ACTIVITY_DEFINITION_NOT_FOUND);
            return null;
        }
    }


    @PostMapping("/organizations/{organizationId}/activity-definitions")
    @ResponseStatus(HttpStatus.CREATED)
    public void createActivityDefinition(@PathVariable String organizationId,
                                         @Valid @RequestBody ActivityDefinitionDto activityDefinitionDto) {
        log.info("About to create a activity definition");
        try {
            fisClient.createActivityDefinition(organizationId, activityDefinitionDto, userContextService.getUserFhirId());
            log.info("Successfully created a activity definition");
        }
        catch (FeignException fe) {
            ExceptionUtil.handleFeignException(fe, "that the activity definition was not created");
        }
    }

    @GetMapping("/activity-definitions")
    public List<ActivityReferenceDto> getActivityDefinitionsByPractitioner(@RequestParam(value = "practitioner") String practitioner) {
        try {
            return fisClient.getActivityDefinitionsByPractitioner(practitioner);
        }
        catch (FeignException fe) {
            ExceptionUtil.handleFeignException(fe, ACTIVITY_DEFINITION_NOT_FOUND);
            return null;
        }
    }

    @GetMapping("/activity-definitions/{activityDefinitionId}")
    public ActivityDefinitionDto getActivityDefinitionById(@PathVariable String activityDefinitionId) {
        try {
            return fisClient.getActivityDefinitionById(activityDefinitionId);
        }
        catch (FeignException fe) {
            ExceptionUtil.handleFeignException(fe, ACTIVITY_DEFINITION_NOT_FOUND);
            return null;
        }
    }

    @PutMapping("/organizations/{organizationId}/activity-definitions/{activityDefinitionId}")
    public void updateActivityDefinition(@PathVariable String organizationId, @PathVariable String activityDefinitionId, @RequestBody ActivityDefinitionDto activityDefinitionDto) {
        try {
            fisClient.updateActivityDefinition(organizationId, activityDefinitionId, activityDefinitionDto, userContextService.getUserFhirId());
        }
        catch (FeignException fe) {
            ExceptionUtil.handleFeignException(fe, "that the activity definition was not updated");
        }
    }
}
