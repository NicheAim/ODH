package gov.samhsa.ocp.ocpfis.service;

import gov.samhsa.ocp.ocpfis.domain.DateRangeEnum;
import gov.samhsa.ocp.ocpfis.service.dto.PageDto;
import gov.samhsa.ocp.ocpfis.service.dto.ReferenceDto;
import gov.samhsa.ocp.ocpfis.service.dto.TaskDto;
import org.hl7.fhir.exceptions.FHIRException;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;
import java.util.Optional;

public interface TaskService {

    PageDto<TaskDto> getTasks(Optional<List<String>> statusList, String searchKey, String searchValue, Optional<Integer> pageNumber, Optional<Integer> pageSize);

    List<TaskDto> getMainAndSubTasks(Optional<String> practitioner,
                                     Optional<String> patient,
                                     Optional<String> organization,
                                     Optional<String> definition,
                                     Optional<String> partOf,
                                     Optional<Boolean> isUpcomingTasks,
                                     Optional<Boolean> isTodoList,
                                     Optional<DateRangeEnum> filterDate,
                                     Optional<List<String>> statusList,
                                     Optional<String> activityDefinition,
                                     Optional<String> sortBy,
                                    Optional<String> order);

    void createTask(TaskDto taskDto, Optional<String> loggedInUser) throws FHIRException;

    void updateTask(String taskId, TaskDto taskDto, Optional<String> loggedInUser) throws FHIRException;

    void deactivateTask(String taskId);

    TaskDto getTaskById(String taskId);

    PageDto<TaskDto> getTasksByIds(String ids,Optional<List<String>> statusList, Optional<Integer> pageNumber, Optional<Integer> pageSize);

    List<ReferenceDto> getRelatedTasks(String patient,Optional<String> definition, Optional<String> practitioner, Optional<String> organization);

    PageDto<TaskDto> getUpcomingTasksByPractitioner(@RequestParam(value = "practitioner") String practitioner,
                                                           @RequestParam(value = "searchKey") Optional<String> searchKey,
                                                           @RequestParam(value = "searchValue") Optional<String> searchValue,
                                                           @RequestParam(value = "pageNumber") Optional<Integer> pageNumber,
                                                           @RequestParam(value = "pageSize") Optional<Integer> pageSize);
}
