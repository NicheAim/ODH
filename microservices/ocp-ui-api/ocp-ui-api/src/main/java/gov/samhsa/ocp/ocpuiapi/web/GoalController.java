package gov.samhsa.ocp.ocpuiapi.web;

import feign.FeignException;
import gov.samhsa.ocp.ocpuiapi.infrastructure.FisClient;
import gov.samhsa.ocp.ocpuiapi.service.UserContextService;
import gov.samhsa.ocp.ocpuiapi.service.dto.GoalDto;
import gov.samhsa.ocp.ocpuiapi.service.dto.PageDto;
import gov.samhsa.ocp.ocpuiapi.util.ExceptionUtil;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@Slf4j
@RequestMapping("ocp-fis/goals")
public class GoalController {
    private final FisClient fisClient;

    @Autowired
    public GoalController(FisClient fisClient){this.fisClient = fisClient;}

    @Autowired
    UserContextService userContextService;

    @GetMapping
    public PageDto<GoalDto> getAllGoals(){
        return fisClient.getAllGoals(false, 1, 100);
    }

    @GetMapping("/search")
    public PageDto<GoalDto> getGoalbyPatientId(
            @RequestParam(value = "patientId") String patientId,
            @RequestParam(value = "searchKey", required = false) String searchKey,
            @RequestParam(value = "searchValue", required = false) String searchValue,
            @RequestParam(value = "showInActive", required = false) Boolean showInActive,
            @RequestParam(value = "pageNumber", required = false) Integer pageNumber,
            @RequestParam(value = "pageSize", required = false) Integer pageSize,
            @RequestParam(value="showAll",required=false) Boolean showAll){
        return fisClient.getGoalbyPatientId(patientId, searchKey, searchValue, showInActive, pageNumber, pageSize,showAll);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public void createGoal(@Valid @RequestBody GoalDto goalDto, @RequestParam(value = "planid", required = false) String planid, @RequestParam(value = "practitionerid", required = false) String practitionerid){
        log.info("About to create a Goal");
        //TODO: Get Organization Id for loggedinuser
        String organization_user = "Organization/"+userContextService.getUserOrganizationId();
        try {
            fisClient.createGoal(goalDto, planid, practitionerid,  userContextService.getUserFhirId(), organization_user);
            log.info("Successfully created the Goal");
        }catch (FeignException e){
            ExceptionUtil.handleFeignException(e, "that the Goal was not created");
        }
    }

    @PutMapping
    @ResponseStatus(HttpStatus.OK)
    public void updateGoal(@Valid @RequestBody GoalDto goalDto, @RequestParam(value = "planid", required = false) String planid, @RequestParam(value = "practitionerid", required = false) String practitionerid){
        log.info("About to update a Goal");
        try {
            String organization_user = "Organization/"+userContextService.getUserOrganizationId();
            fisClient.updateGoal(goalDto, planid, practitionerid, organization_user);
            log.info("Successfully updated the Goal");
        }catch (FeignException e){
            ExceptionUtil.handleFeignException(e, "that the Goal was not updated");
        }
    }

    @GetMapping("/{goalId}")
    public GoalDto searchOrganizations(@PathVariable String goalId) {
        log.info("Searching goals from FHIR server");
        try {
            GoalDto goal = fisClient.getGoal(goalId);
            log.info("Got response from FHIR server for get goal");
            return goal;
        }
        catch (FeignException fe) {
            ExceptionUtil.handleFeignException(fe, "that no goals were found found in the configured FHIR server for the given goal ID");
            return null;
        }
    }
}
