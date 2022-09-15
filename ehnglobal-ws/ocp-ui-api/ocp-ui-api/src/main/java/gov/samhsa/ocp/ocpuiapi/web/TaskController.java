package gov.samhsa.ocp.ocpuiapi.web;

import feign.FeignException;
import gov.samhsa.ocp.ocpuiapi.infrastructure.FisClient;
import gov.samhsa.ocp.ocpuiapi.service.DateRangeEnum;
import gov.samhsa.ocp.ocpuiapi.service.UserContextService;
import gov.samhsa.ocp.ocpuiapi.service.dto.PageDto;
import gov.samhsa.ocp.ocpuiapi.service.dto.ReferenceDto;
import gov.samhsa.ocp.ocpuiapi.service.dto.TaskDto;
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
public class TaskController {
    final FisClient fisClient;

    @Autowired
    public TaskController(FisClient fisClient) {
        this.fisClient = fisClient;
    }

    @Autowired
    UserContextService userContextService;

    @PostMapping("/tasks")
    @ResponseStatus(HttpStatus.CREATED)
    public void createTask(@Valid @RequestBody TaskDto taskDto) {
        log.info("About to create a task");
        try {
            fisClient.createTask(taskDto, userContextService.getUserFhirId());
            log.info("Successfully created a task.");
        } catch (FeignException fe) {
            ExceptionUtil.handleFeignException(fe, "that the activity definition was not created");
        }
    }

    @GetMapping("/tasks/search")
    public Object searchTasks(@RequestParam(value = "statusList", required = false) List<String> statusList,
                              @RequestParam(value = "searchType", required = false) String searchType,
                              @RequestParam(value = "searchValue", required = false) String searchValue,
                              @RequestParam(value = "pageNumber", required = false) Integer pageNumber,
                              @RequestParam(value = "pageSize", required = false) Integer pageSize) {
        log.info("Searching Tasks from FHIR server");
        try {
            Object tasks = fisClient.searchTasks(statusList, searchType, searchValue, pageNumber, pageSize);
            log.info("Got Response from FHIR server for Tasks Search");
            return tasks;
        } catch (FeignException fe) {
            ExceptionUtil.handleFeignException(fe, "that no Tasks were found in configured FHIR server for the given searchType and searchValue");
            return null;
        }
    }

    @PutMapping("/tasks/{taskId}")
    @ResponseStatus(HttpStatus.OK)
    public void updateTask(@PathVariable String taskId, @Valid @RequestBody TaskDto taskDto) {
        try {
            fisClient.updateTask(taskId, taskDto, userContextService.getUserFhirId());
            log.debug("Successfully updated a task");
        } catch (FeignException fe) {
            ExceptionUtil.handleFeignException(fe, "that the Task could not be updated in the FHIR server");
        }
    }

    @PutMapping("/tasks/{taskId}/deactivate")
    @ResponseStatus(HttpStatus.OK)
    public void deactivateTask(@PathVariable String taskId) {
        try {
            fisClient.deactivateTask(taskId);
            log.debug("Successfully cancelled the task.");
        } catch (FeignException fe) {
            ExceptionUtil.handleFeignException(fe, "that the Task could not be deactivated in the FHIR server");
        }
    }

    @GetMapping("/tasks/{taskId}")
    public Object getTaskById(@PathVariable String taskId) {
        try {
            return fisClient.getTaskById(taskId);
        } catch (FeignException fe) {
            ExceptionUtil.handleFeignException(fe, "that the Task could not be found");
            return null;
        }
    }

    @GetMapping("/tasks/task-references")
    public List<ReferenceDto> getRelatedTasks(@RequestParam String patient,
                                              @RequestParam(value = "definition", required = false) String definition,
                                              @RequestParam(value = "practitioner", required = false) String practitioner,
                                              @RequestParam(value = "organization", required = false) String organization) {
        try {
            return fisClient.getRelatedTasks(patient, definition, practitioner, organization);
        } catch (FeignException fe) {
            ExceptionUtil.handleFeignException(fe, "that the Task could not be found for the given patientId");
            return null;
        }
    }

    @GetMapping("/tasks")
    public List<TaskDto> getMainAndSubTasks(@RequestParam(value = "practitioner", required = false) String practitioner,
                                            @RequestParam(value = "patient", required = false) String patient,
                                            @RequestParam(value="organization", required = false) String organization,
                                            @RequestParam(value = "definition", required = false) String definition,
                                            @RequestParam(value = "partOf", required = false) String partOf,
                                            @RequestParam(value = "isUpcomingTasks", required = false) Boolean isUpcomingTasks,
                                            @RequestParam(value = "isTodoList", required = false) Boolean isTodoList,
                                            @RequestParam(value = "filterDate", required = false) DateRangeEnum filterDate,
                                            @RequestParam(value = "statusList", required = false) List<String> statusList,
                                            @RequestParam(value = "activityDefinition", required = false) String activityDefinition,
                                            @RequestParam(value = "sortBy", required = false) String sortBy,
                                            @RequestParam(value = "order", required = false) String order
                                            ) {
        log.info("Searching Main and Sub taks from FHIR server");
        try {
            List<TaskDto> tasks = fisClient.getMainAndSubTasks(practitioner, patient, organization, definition, partOf, isUpcomingTasks, isTodoList, filterDate, statusList, activityDefinition, sortBy, order);
            log.info("Got Response from FHIR server for SubTasks Search");
            return tasks;
        } catch (FeignException fe) {
            ExceptionUtil.handleFeignException(fe, "that the No SubTasks were found in configured FHIR server for the given practitioner/patient");
            return null;
        }
    }

    @GetMapping("/tasks/upcoming-task-search")
    public Object getUpcomingTasksByPractitionerAndRole(@RequestParam(value = "practitioner") String practitioner,
                                                        @RequestParam(value = "searchKey", required = false) String searchKey,
                                                        @RequestParam(value = "searchValue", required = false) String searchValue,
                                                        @RequestParam(value = "pageNumber", required = false) String pageNumber,
                                                        @RequestParam(value = "pageSize", required = false) String pageSize) {
        log.info("Searching Upcoming tasks");
        try {
            return fisClient.getUpcomingTasksByPractitionerAndRole(practitioner, searchKey, searchValue, pageNumber, pageSize);
        } catch (FeignException fe) {
            ExceptionUtil.handleFeignException(fe, "that no Upcoming task was found.");
            return null;
        }
    }

    @GetMapping("/tasks/multipletasks")
    public PageDto<TaskDto> getTasksByIds(
            @RequestParam(value = "taskIds") String taskIds,
            @RequestParam(value = "statusList", required = false) List<String> statusList,
            @RequestParam(value = "pageNumber", required = false) Integer pageNumber,
            @RequestParam(value = "pageSize", required = false) Integer pageSize
    ){
        return fisClient.getTasksByIds(taskIds, statusList, pageNumber, pageSize);
    }

}
