package gov.samhsa.ocp.ocpfis.web;

import gov.samhsa.ocp.ocpfis.domain.DateRangeEnum;
import gov.samhsa.ocp.ocpfis.service.TaskService;
import gov.samhsa.ocp.ocpfis.service.dto.PageDto;
import gov.samhsa.ocp.ocpfis.service.dto.ReferenceDto;
import gov.samhsa.ocp.ocpfis.service.dto.TaskDto;
import lombok.extern.slf4j.Slf4j;
import org.hl7.fhir.exceptions.FHIRException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;
import java.util.List;
import java.util.Optional;

@RestController
@Slf4j
public class TaskController {

    @Autowired
    private TaskService taskService;

    @GetMapping("/tasks/search")
    public PageDto<TaskDto> getTasks(@RequestParam Optional<List<String>> statusList,
                                     @RequestParam(value = "searchType") String searchKey,
                                     @RequestParam(value = "searchValue") String searchValue,
                                     @RequestParam(value = "pageNumber") Optional<Integer> pageNumber,
                                     @RequestParam(value = "pageSize") Optional<Integer> pageSize) {
        return taskService.getTasks(statusList, searchKey, searchValue, pageNumber, pageSize);
    }

    @PostMapping("/tasks")
    @ResponseStatus(HttpStatus.CREATED)
    public void createTask(@Valid @RequestBody TaskDto taskDto, @RequestParam(value = "loggedInUser") Optional<String> loggedInUser) {
        try {
            taskService.createTask(taskDto, loggedInUser);
        } catch (FHIRException e) {
            log.error("A FHIRException occured when creating a task" + e);
        }
    }

    @PutMapping("/tasks/{taskId}")
    @ResponseStatus(HttpStatus.OK)
    public void updateTask(@PathVariable String taskId, @Valid @RequestBody TaskDto taskDto, @RequestParam(value = "loggedInUser") Optional<String> loggedInUser) {
        try {
            taskService.updateTask(taskId, taskDto, loggedInUser);
        } catch (FHIRException e) {
            log.error("A FHIRException occurred when updating a task " + e);
        }
    }

    @PutMapping("/tasks/{taskId}/deactivate")
    @ResponseStatus(HttpStatus.OK)
    public void deactivateTask(@PathVariable String taskId) {
        taskService.deactivateTask(taskId);
    }

    @GetMapping("/tasks/{taskId}")
    public TaskDto getTaskById(@PathVariable String taskId) {
        return taskService.getTaskById(taskId);
    }

    @GetMapping("/tasks/multipletasks")
    public PageDto<TaskDto> getTasksByIds(@RequestParam String taskIds, @RequestParam Optional<List<String>> statusList,
                                          @RequestParam(value = "pageNumber") Optional<Integer> pageNumber,
                                          @RequestParam(value = "pageSize") Optional<Integer> pageSize){
        return taskService.getTasksByIds(taskIds, statusList, pageNumber, pageSize);
    }

    @GetMapping("/tasks/task-references")
    public List<ReferenceDto> getRelatedTasks(@RequestParam String patient, @RequestParam Optional<String> definition, @RequestParam Optional<String> practitioner, @RequestParam Optional<String> organization) {
        return taskService.getRelatedTasks(patient, definition, practitioner, organization);
    }

    @GetMapping("/tasks/upcoming-task-search")
    public PageDto<TaskDto> getUpcomingTasksByPractitionerAndRole(@RequestParam(value = "practitioner") String practitioner,
                                                                  @RequestParam(value = "searchKey") Optional<String> searchKey,
                                                                  @RequestParam(value = "searchValue") Optional<String> searchValue,
                                                                  @RequestParam(value = "pageNumber") Optional<Integer> pageNumber,
                                                                  @RequestParam(value = "pageSize") Optional<Integer> pageSize) {
        return taskService.getUpcomingTasksByPractitioner(practitioner, searchKey, searchValue, pageNumber, pageSize);

    }

    @GetMapping("/tasks")
    public List<TaskDto> getTasks(@RequestParam(value = "practitioner") Optional<String> practitioner,
                                  @RequestParam(value = "patient") Optional<String> patient,
                                  @RequestParam(value = "organization") Optional<String> organization,
                                  @RequestParam(value = "definition") Optional<String> definition,
                                  @RequestParam(value = "partOf") Optional<String> partOf,
                                  @RequestParam(value = "isUpcomingTasks") Optional<Boolean> isUpcomingTasks,
                                  @RequestParam(value = "isTodoList") Optional<Boolean> isTodoList,
                                  @RequestParam(value = "filterDate") Optional<DateRangeEnum> filterDate,
                                  @RequestParam(value = "statusList")Optional<List<String>> statusList,
                                  @RequestParam(value = "activityDefinition") Optional<String> activityDefinition,
                                  @RequestParam(value = "sortBy")Optional<String> sortBy,
                                  @RequestParam(value = "order")Optional<String> order) {
        log.info("Retrieving tasks for the given criteria");
        return taskService.getMainAndSubTasks(practitioner, patient, organization, definition, partOf, isUpcomingTasks, isTodoList, filterDate, statusList, activityDefinition, sortBy, order);
    }



}
