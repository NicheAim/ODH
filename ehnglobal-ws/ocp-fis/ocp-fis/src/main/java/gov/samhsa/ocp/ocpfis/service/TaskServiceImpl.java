package gov.samhsa.ocp.ocpfis.service;

import ca.uhn.fhir.rest.api.MethodOutcome;
import ca.uhn.fhir.rest.client.api.IGenericClient;
import ca.uhn.fhir.rest.gclient.IQuery;
import ca.uhn.fhir.rest.gclient.ReferenceClientParam;
import ca.uhn.fhir.rest.gclient.TokenClientParam;
import ca.uhn.fhir.validation.FhirValidator;
import gov.samhsa.ocp.ocpfis.config.FisProperties;
import gov.samhsa.ocp.ocpfis.domain.DateRangeEnum;
import gov.samhsa.ocp.ocpfis.domain.ProvenanceActivityEnum;
import gov.samhsa.ocp.ocpfis.domain.TaskDueEnum;
import gov.samhsa.ocp.ocpfis.service.dto.*;
import gov.samhsa.ocp.ocpfis.service.exception.InvalidStatusException;
import gov.samhsa.ocp.ocpfis.service.mapping.TaskToTaskDtoMap;
import gov.samhsa.ocp.ocpfis.service.mapping.dtotofhirmodel.TaskDtoToTaskMap;
import gov.samhsa.ocp.ocpfis.util.*;
import gov.samhsa.ocp.ocpfis.util.pagination.PaginationRepository;
import lombok.extern.slf4j.Slf4j;
import org.hl7.fhir.exceptions.FHIRException;
import org.hl7.fhir.r4.model.Bundle;
import org.hl7.fhir.r4.model.Reference;
import org.hl7.fhir.r4.model.ResourceType;
import org.hl7.fhir.r4.model.Task;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.*;
import java.util.stream.Collectors;

import static ca.uhn.fhir.rest.api.Constants.PARAM_LASTUPDATED;
import static java.util.stream.Collectors.groupingBy;
import static java.util.stream.Collectors.toList;

@Service
@Slf4j
public class TaskServiceImpl implements TaskService {

    private final IGenericClient fhirClient;
    private final FhirValidator fhirValidator;
    private final LookUpService lookUpService;
    private final FisProperties fisProperties;
    private final ActivityDefinitionService activityDefinitionService;
    private final PatientService patientService;
    private final Map<Task.TaskStatus, List<Task.TaskStatus>> taskStatuses;
    private final List<String> finalStatuses;
    private final List<ValueSetDto> taskPerformerTypes;
    private final ProvenanceUtil provenanceUtil;

    private final PaginationRepository paginationProxy;
    private final PaginationRepository paginationHapi;

    private final PaginationRepository paginationGcp;
    @Autowired
    public TaskServiceImpl(IGenericClient fhirClient,
                           FhirValidator fhirValidator, LookUpService lookUpService,
                           FisProperties fisProperties,
                           ActivityDefinitionService activityDefinitionService,
                           PatientService patientService,
                           ProvenanceUtil provenanceUtil, @Qualifier("PaginationProxyImpl") PaginationRepository paginationProxy, @Qualifier("PaginationHapiFhirImpl") PaginationRepository paginationHapi, @Qualifier("PaginationGcpImpl") PaginationRepository paginationGcp) {
        this.fhirClient = fhirClient;
        this.fhirValidator = fhirValidator;
        this.lookUpService = lookUpService;
        this.fisProperties = fisProperties;
        this.activityDefinitionService = activityDefinitionService;
        this.patientService = patientService;
        this.paginationProxy = paginationProxy;
        this.paginationHapi = paginationHapi;
        this.paginationGcp = paginationGcp;
        this.taskStatuses = populateTaskStatuses();
        this.finalStatuses = Arrays.asList(Task.TaskStatus.COMPLETED.toCode(), Task.TaskStatus.FAILED.toCode(),
                Task.TaskStatus.CANCELLED.toCode());
        this.taskPerformerTypes = lookUpService.getTaskPerformerType();
        this.provenanceUtil = provenanceUtil;
    }

    @Override
    public PageDto<TaskDto> getTasks(Optional<List<String>> statusList, String searchKey, String searchValue,
                                     Optional<Integer> pageNumber, Optional<Integer> pageSize) {
        int numberOfTasksPerPage = PaginationRepository.getValidPageSize(fisProperties, pageSize, ResourceType.Task.name());
        IQuery iQuery = fhirClient.search().forResource(Task.class);

        // Check for Patient
        if (searchKey.equalsIgnoreCase("patientId"))
            iQuery.where(new ReferenceClientParam("patient").hasId("Patient/" + searchValue));

        // Check for Organization
        if (searchKey.equalsIgnoreCase("organizationId"))
            iQuery.where(new ReferenceClientParam("organization").hasId("Organization/" + searchValue));

        // Check for Task
        if (searchKey.equalsIgnoreCase("taskId"))
            iQuery.where(new TokenClientParam("_id").exactly().code(searchValue));

        //Check for Status
        if (statusList.isPresent() && !statusList.get().isEmpty()) {
            iQuery.where(new TokenClientParam("status").exactly().codes(statusList.get()));
        }

        // Set Sort order
        iQuery = FhirOperationUtil.setLastUpdatedTimeSortOrder(iQuery, true);

        iQuery = FhirOperationUtil.setNoCacheControlDirective(iQuery);

        Bundle firstPageTaskBundle;
        Bundle otherPageTaskBundle;
        boolean firstPage = true;

        firstPageTaskBundle = (Bundle) iQuery
                .count(numberOfTasksPerPage)
                .returnBundle(Bundle.class)
                .execute();

        if (firstPageTaskBundle == null || firstPageTaskBundle.getEntry().isEmpty()) {
            return new PageDto<>(new ArrayList<>(), numberOfTasksPerPage, 0, 0, 0, 0);
        }

        otherPageTaskBundle = firstPageTaskBundle;

        if (pageNumber.isPresent() && pageNumber.get() > 1 && otherPageTaskBundle.getLink(Bundle.LINK_NEXT) != null) {
            firstPage = false;
            if (fisProperties.getFhir().getData_store_tech().equals("gcp")) {
                otherPageTaskBundle = paginationGcp.getSearchBundleAfterFirstPage(fhirClient, fisProperties,
                        firstPageTaskBundle, pageNumber.get(), numberOfTasksPerPage);
            } else if (fisProperties.getFhir().getData_store_tech().equals("hapi")) {
                otherPageTaskBundle = paginationHapi.getSearchBundleAfterFirstPage(fhirClient, fisProperties,
                        firstPageTaskBundle, pageNumber.get(), numberOfTasksPerPage);
            } else {
                otherPageTaskBundle = paginationProxy.getSearchBundleAfterFirstPage(fhirClient, fisProperties,
                        firstPageTaskBundle, pageNumber.get(), numberOfTasksPerPage);
            }

        }

        List<Bundle.BundleEntryComponent> retrievedTasks = otherPageTaskBundle.getEntry();

        List<TaskDto> taskDtos = retrievedTasks.stream()
                .filter(retrivedBundle -> retrivedBundle.getResource().getResourceType().equals(ResourceType.Task))
                .map(retrievedTask -> {
                    Task task = (Task) retrievedTask.getResource();
                    TaskDto taskDto = TaskToTaskDtoMap.map(task, taskPerformerTypes);
                    setRollupNumbers(taskDto);
                    return taskDto;
                }).collect(toList());

        double totalPages = Math.ceil((double) otherPageTaskBundle.getTotal() / numberOfTasksPerPage);
        int currentPage = firstPage ? 1 : pageNumber.get();

        return new PageDto<>(taskDtos, numberOfTasksPerPage, totalPages, currentPage, taskDtos.size(),
                otherPageTaskBundle.getTotal());
    }

    @Override
    public List<TaskDto> getMainAndSubTasks(Optional<String> practitioner,
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
                                            Optional<String> order) {

        log.info("Main Task and subtask");
        // Generate the Query Based on Input Variables
        IQuery ownerIQuery = getTasksIQuery(practitioner, organization, patient, partOf, "owner");
        IQuery requesterIQuery = getTasksIQuery(practitioner, organization, patient, partOf, "requester");

        // Fetch Tasks and Map to TaskDtos if available
        List<TaskDto> taskList = getTaskDtos(ownerIQuery);

        List<TaskDto> taskListForRequester = getTaskDtos(requesterIQuery);
        taskList.addAll(taskListForRequester);

        // Add sub task
        taskList.addAll(getSubTasks(taskList));

        // Add main task
        if (!getMainTaskIds(taskList).isEmpty()) {
            taskList.addAll(getTaskDtos(fhirClient.search().forResource(Task.class)
                    .where(new TokenClientParam("_id").exactly().codes(getMainTaskIds(taskList)))));
        }

        List<TaskDto> taskDtos = taskList.stream().distinct().collect(toList());

        log.info("Taskdtos size: " + taskDtos.size());

        //Apply Filters Based on Input Variables
        taskDtos = getTaskDtosBasedOnFilters(definition, partOf, isUpcomingTasks, taskDtos, filterDate, statusList, activityDefinition);

        // Sorting Column
        if (sortBy != null && sortBy.isPresent()) {
            if (sortBy.get().equalsIgnoreCase("executionPeriodEnd")) {
                taskDtos = taskList.stream().sorted(Comparator.comparing(t -> t.getExecutionPeriod().getEnd()))
                        .collect(toList());
            }
        }
        // Sorting Order
        if (order != null && order.isPresent()) {
            if (order.get().equalsIgnoreCase("ASC")) {
                Collections.reverse(taskDtos);
            }
        }

        if (patient.isPresent() && !isTodoList.isPresent() && !activityDefinition.isPresent()) {
            TaskDto toDoTaskDto = getToDoTaskDto(practitioner, patient, organization, definition);
            if (isIntermediateStatuses(toDoTaskDto)) {
                if (!taskDtos.stream()
                        .map(taskDto -> taskDto.getLogicalId())
                        .collect(toList())
                        .contains(toDoTaskDto.getLogicalId())) {
                    taskDtos.add(toDoTaskDto);
                }
            }
        }

        log.info("Returning a list of tasks of size : " + taskDtos.size());
        return taskDtos;
    }

    @Override
    public void createTask(TaskDto taskDto, Optional<String> loggedInUser) throws FHIRException {
        List<String> idList = new ArrayList<>();
        retrieveActivityDefinitionDuration(taskDto);
        Task task = TaskDtoToTaskMap.map(taskDto);

        // authoredOn
        log.info("Setting Authored On");
        task.setAuthoredOn(java.sql.Date.valueOf(LocalDate.now()));

        // Set Profile Meta Data
        log.info("Setting Profile metada");
        FhirProfileUtil.setTaskProfileMetaData(fhirClient, task);

        // Validate
        log.info("Validating Task Resource");
        FhirOperationUtil.validateFhirResource(fhirValidator, task, Optional.empty(), ResourceType.Task.name(),
                "Create Task");

        // Create
        log.info("Creating Task Resource");
        MethodOutcome taskMethodOutcome = FhirOperationUtil.createFhirResource(fhirClient, task,
                ResourceType.Task.name());
        idList.add(ResourceType.Task.name() + "/" + FhirOperationUtil.getFhirId(taskMethodOutcome));

        if (fisProperties.isProvenanceEnabled()) {
            provenanceUtil.createProvenance(idList, ProvenanceActivityEnum.CREATE, loggedInUser);
        }

    }

    @Override
    public void updateTask(String taskId, TaskDto taskDto, Optional<String> loggedInUser) throws FHIRException {
        List<String> idList = new ArrayList<>();

        // TODO Adjust status workflow before validating it
        /*
         * if (!isValidTaskStatus(taskDto)) {
         * throw new InvalidStatusException("Invalid task status has been submitted.");
         * }
         */
        log.info("Validating Sub Task");
        if (!isValidSubTasks(taskDto)) {
            throw new InvalidStatusException("One or more sub-tasks are not in the final state.");
        }

        Task task = TaskDtoToTaskMap.map(taskDto);
        task.setId(taskId);

        Bundle taskBundle = fhirClient.search().forResource(Task.class)
                .where(new TokenClientParam("_id").exactly().code(taskId))
                .returnBundle(Bundle.class)
                .execute();

        Task existingTask = (Task) taskBundle.getEntry().stream().findFirst().get().getResource();

        // authoredOn
        log.info("Setting last modified date if not existing");
        Date now = new Date();
        if (existingTask.getLastModified() == null) {
            log.info("Last modified date not found setting new date");
            log.info(now.toString());
            task.setLastModified(now);
        }
        log.info("Setting authored on based on existing task");

        if (existingTask != null && existingTask.getAuthoredOn() != null) {
            log.info(existingTask.getAuthoredOn().toString());
        } else {
            log.info("No authoredOn attribute found");
        }

        task.setAuthoredOn(existingTask.getAuthoredOn());

        // Set Profile Meta Data
        log.info("Setting Profile Metadata");
        FhirProfileUtil.setTaskProfileMetaData(fhirClient, task);

        // Validate
        log.info("Validating Task Resource");
        FhirOperationUtil.validateFhirResource(fhirValidator, task, Optional.of(taskId), ResourceType.Task.name(),
                "Update Task");

        // Update the resource
        log.info("Creating new Task Resource");
        MethodOutcome taskMethodOutcome = FhirOperationUtil.updateFhirResource(fhirClient, task, "Update Task");
        idList.add(ResourceType.Task.name() + "/" + FhirOperationUtil.getFhirId(taskMethodOutcome));

        if (fisProperties.isProvenanceEnabled()) {
            provenanceUtil.createProvenance(idList, ProvenanceActivityEnum.UPDATE, loggedInUser);
        }

    }

    @Override
    public PageDto<TaskDto> getUpcomingTasksByPractitioner(String practitioner, Optional<String> searchKey,
                                                           Optional<String> searchValue, Optional<Integer> pageNumber, Optional<Integer> pageSize) {
        int numberOfTasksPerPage = PaginationRepository.getValidPageSize(fisProperties, pageSize, ResourceType.Task.name());
        List<TaskDto> upcomingTasks = getUpcomingTasksByPractitioner(practitioner, searchKey, searchValue);
        log.info("Getting Upcoming Task by Practitioner");
        return (PageDto<TaskDto>) PaginationRepository.applyPaginationForCustomArrayList(upcomingTasks, numberOfTasksPerPage,
                pageNumber, false);
    }

    @Override
    public void deactivateTask(String taskId) {
        Task task = fhirClient.read().resource(Task.class).withId(taskId.trim()).execute();
        task.setStatus(Task.TaskStatus.CANCELLED);
        // Set Profile Meta Data
        FhirProfileUtil.setTaskProfileMetaData(fhirClient, task);

        // Validate
        FhirOperationUtil.validateFhirResource(fhirValidator, task, Optional.of(taskId), ResourceType.Task.name(),
                "Deactivate Task");

        // Update the resource
        FhirOperationUtil.updateFhirResource(fhirClient, task, "Deactivate Task");
    }

    @Override
    public TaskDto getTaskById(String taskId) {

        IQuery taskQuery = fhirClient.search().forResource(Task.class)
                .where(new TokenClientParam("_id").exactly().code(taskId))
                .include(Task.INCLUDE_ENCOUNTER);

        taskQuery = FhirOperationUtil.setNoCacheControlDirective(taskQuery);

        Bundle taskBundle = (Bundle) taskQuery.returnBundle(Bundle.class)
                .execute();

        TaskDto taskDto = new TaskDto();

        taskBundle.getEntry().stream()
                .filter(taskResource -> taskResource.getResource().getResourceType().equals(ResourceType.Task))
                .findFirst().ifPresent(taskPresent -> {
                    Task task = (Task) taskPresent.getResource();
                    // Setting definition
                    taskDto.setLogicalId(task.getIdElement().getIdPart());
                    try {
                        taskDto.setDefinition(FhirDtoUtil.convertReferenceToReferenceDto(task.getFocus()));
                    } catch (FHIRException e) {
                        e.printStackTrace();
                    }

                    if (task.hasPartOf()) {
                        taskDto.setPartOf(FhirDtoUtil
                                .convertReferenceToReferenceDto(task.getPartOf().stream().findFirst().get()));
                    }

                    // Setting Status, Intent, Priority
                    taskDto.setStatus(FhirDtoUtil.convertCodeToValueSetDto(task.getStatus().toCode(),
                            lookUpService.getTaskStatus()));
                    taskDto.setIntent(FhirDtoUtil.convertDisplayCodeToValueSetDto(task.getIntent().toCode(),
                            lookUpService.getRequestIntent()));
                    if (task.hasPriority() && task.getPriority() != null && task.getPriority().toCode() != null
                            && !lookUpService.getRequestPriority().isEmpty()) {
                        taskDto.setPriority(FhirDtoUtil.convertDisplayCodeToValueSetDto(task.getPriority().toCode(),
                                lookUpService.getRequestPriority()));
                    }

                    if (task.hasDescription()) {
                        taskDto.setDescription(task.getDescription());
                    }

                    taskDto.setBeneficiary(FhirDtoUtil.convertReferenceToReferenceDto(task.getFor()));

                    taskDto.setAgent(FhirDtoUtil.convertReferenceToReferenceDto(task.getRequester()));

                    if (task.hasBasedOn()) {
                        taskDto.setOrganization(FhirDtoUtil.convertReferenceToReferenceDto(task.getBasedOn().get(0)));
                    }

                    // Set Performer Type
                    if (task.hasPerformerType()) {
                        task.getPerformerType().stream().findFirst().ifPresent(
                                performerType -> performerType.getCoding().stream().findFirst().ifPresent(coding -> {
                                    taskDto.setPerformerType(
                                            FhirDtoUtil.convertCodeToValueSetDto(coding.getCode(), taskPerformerTypes));
                                }));
                    }

                    taskDto.setOwner(FhirDtoUtil.convertReferenceToReferenceDto(task.getOwner()));

                    // Set Note
                    task.getNote().stream().findFirst().ifPresent(note -> taskDto.setNote(note.getText()));

                    if (task.hasLastModified()) {
                        taskDto.setLastModified(DateUtil.convertDateToLocalDate(task.getLastModified()));
                    }

                    if (task.hasAuthoredOn()) {
                        taskDto.setAuthoredOn(DateUtil.convertDateToLocalDate(task.getAuthoredOn()));
                    }

                    // if (task.getExecutionPeriod() != null &&
                    // !task.getExecutionPeriod().isEmpty()) {
                    // PeriodDto periodDto = new PeriodDto();
                    // periodDto.setStart((task.getExecutionPeriod().hasStart()) ?
                    // DateUtil.convertDateToLocalDate(task.getExecutionPeriod().getStart()) :
                    // null);
                    // periodDto.setEnd((task.getExecutionPeriod().hasEnd()) ?
                    // DateUtil.convertDateToLocalDate(task.getExecutionPeriod().getEnd()) : null);
                    // taskDto.setExecutionPeriod(periodDto);
                    // }
                    log.info("Obteniendo execution period");
                    PeriodDto periodDto = new PeriodDto();
                    periodDto.setStart((task.getRestriction().getPeriod().hasStart())
                            ? DateUtil.convertDateToLocalDate(task.getRestriction().getPeriod().getStart())
                            : null);
                    periodDto.setEnd((task.getRestriction().getPeriod().hasEnd())
                            ? DateUtil.convertDateToLocalDate(task.getRestriction().getPeriod().getEnd())
                            : null);
                    taskDto.setExecutionPeriod(periodDto);
                    taskDto.setContext(FhirDtoUtil.convertReferenceToReferenceDto(task.getEncounter()));

                    this.setRollupNumbers(taskDto);
                });

        return taskDto;

    }

    @Override
    public PageDto<TaskDto> getTasksByIds(String ids, Optional<List<String>> statusList, Optional<Integer> pageNumber,
                                          Optional<Integer> pageSize) {
        int numberOfTasksPerPage = PaginationRepository.getValidPageSize(fisProperties, pageSize, ResourceType.Task.name());
        String[] taskids = ids.split(",");
        IQuery iQuery = fhirClient.search().forResource(Task.class)
                .where(new TokenClientParam("_id").exactly().codes(taskids));
        // Set Sort order
        iQuery = FhirOperationUtil.setLastUpdatedTimeSortOrder(iQuery, true);

        iQuery = FhirOperationUtil.setNoCacheControlDirective(iQuery);

        Bundle firstPageTaskBundle;
        Bundle otherPageTaskBundle;
        boolean firstPage = true;

        firstPageTaskBundle = (Bundle) iQuery
                .count(numberOfTasksPerPage)
                .returnBundle(Bundle.class)
                .execute();

        if (firstPageTaskBundle == null || firstPageTaskBundle.getEntry().isEmpty()) {
            return new PageDto<>(new ArrayList<>(), numberOfTasksPerPage, 0, 0, 0, 0);
        }

        otherPageTaskBundle = firstPageTaskBundle;

        if (pageNumber.isPresent() && pageNumber.get() > 1 && otherPageTaskBundle.getLink(Bundle.LINK_NEXT) != null) {
            firstPage = false;
            if (fisProperties.getFhir().getData_store_tech().equals("gcp")) {
                otherPageTaskBundle = paginationGcp.getSearchBundleAfterFirstPage(fhirClient, fisProperties,
                        firstPageTaskBundle, pageNumber.get(), numberOfTasksPerPage);
            } else if (fisProperties.getFhir().getData_store_tech().equals("hapi")) {
                otherPageTaskBundle = paginationHapi.getSearchBundleAfterFirstPage(fhirClient, fisProperties,
                        firstPageTaskBundle, pageNumber.get(), numberOfTasksPerPage);
            } else {
                otherPageTaskBundle = paginationProxy.getSearchBundleAfterFirstPage(fhirClient, fisProperties,
                        firstPageTaskBundle, pageNumber.get(), numberOfTasksPerPage);
            }

        }

        List<Bundle.BundleEntryComponent> retrievedTasks = otherPageTaskBundle.getEntry();

        List<TaskDto> taskDtos = retrievedTasks.stream()
                .filter(retrivedBundle -> retrivedBundle.getResource().getResourceType().equals(ResourceType.Task))
                .map(retrievedTask -> {
                    Task task = (Task) retrievedTask.getResource();
                    TaskDto taskDto = TaskToTaskDtoMap.map(task, taskPerformerTypes);
                    setRollupNumbers(taskDto);
                    return taskDto;
                }).collect(toList());

        double totalPages = Math.ceil((double) otherPageTaskBundle.getTotal() / numberOfTasksPerPage);
        int currentPage = firstPage ? 1 : pageNumber.get();

        return new PageDto<>(taskDtos, numberOfTasksPerPage, totalPages, currentPage, taskDtos.size(),
                otherPageTaskBundle.getTotal());
    }

    public List<ReferenceDto> getRelatedTasks(String patient, Optional<String> definition,
                                              Optional<String> practitioner, Optional<String> organization) {
        log.info("Related Tasks");
        List<ReferenceDto> tasks = getBundleForRelatedTask(patient, organization).stream().parallel()
                .filter(task -> {
                    Task mainTask = (Task) task.getResource();
                    return !mainTask.hasPartOf();
                })
                .map(Bundle.BundleEntryComponent::getResource)
                .map(resource -> FhirDtoUtil.mapTaskToReferenceDto((Task) resource))
                .collect(toList());

        // TODO: Identify an scenario where this is needed
        // if (definition.isPresent()) {
        // List<ReferenceDto> taskReferenceList = tasks.stream()
        // .filter(referenceDto ->
        // referenceDto.getDisplay().equalsIgnoreCase(definition.get()))
        // .collect(toList());
        //
        // //If TO_DO definition type and TO_DO task is not present.
        // if (definition.get().equalsIgnoreCase(ActivityDefinitionConstants.TO_DO) &&
        // taskReferenceList.isEmpty() && practitioner.isPresent() &&
        // organization.isPresent()) {
        // //Creating To-Do Task
        // Task task = FhirResourceUtil.createToDoTask(patient, practitioner.get(),
        // organization.get(), fhirClient, fisProperties);
        //
        // IQuery activityDefinitionQuery =
        // fhirClient.search().forResource(ActivityDefinition.class)
        // .where(new StringClientParam("publisher").matches().value("Organization/" +
        // organization.get()))
        // .where(new
        // StringClientParam("description").matches().value(ActivityDefinitionConstants.TO_DO));
        //
        // Bundle activityDefinitionBundle = (Bundle)
        // FhirOperationUtil.setNoCacheControlDirective(activityDefinitionQuery)
        // .returnBundle(Bundle.class)
        // .execute();
        //
        // //Create Activity Definition is not present.
        // if (activityDefinitionBundle.getEntry().isEmpty()) {
        // ActivityDefinition activityDefinition =
        // FhirResourceUtil.createToDoActivityDefinition(organization.get(),
        // fisProperties, lookUpService, fhirClient);
        // MethodOutcome adOutcome =
        // fhirClient.create().resource(activityDefinition).execute();
        // ReferenceDto adReference = new ReferenceDto();
        // adReference.setReference("ActivityDefinition/" +
        // adOutcome.getId().getIdPart());
        // adReference.setDisplay(ActivityDefinitionConstants.TO_DO);
        // task.setFocus(FhirDtoUtil.mapReferenceDtoToReference(adReference));
        // } else {
        // task.setFocus(FhirDtoUtil.mapReferenceDtoToReference(FhirResourceUtil.getRelatedActivityDefinition(organization.get(),
        // definition.get(), fhirClient, fisProperties)));
        // }
        // MethodOutcome methodOutcome = fhirClient.create().resource(task).execute();
        // ReferenceDto referenceDto = new ReferenceDto();
        // referenceDto.setReference("Task/" + methodOutcome.getId().getIdPart());
        // referenceDto.setDisplay(ActivityDefinitionConstants.TO_DO);
        // return Collections.singletonList(referenceDto);
        //
        // }
        //
        // return taskReferenceList;
        // }

        return tasks;
    }

    private boolean isValidTaskStatus(TaskDto newTaskDto) throws FHIRException {
        TaskDto exitingTask = getTaskById(newTaskDto.getLogicalId());

        // //if existing status is final and new status is not final, it is not allowed
        // if (finalStatuses.contains(exitingTask.getStatus().getCode()) &&
        // !finalStatuses.contains(newTaskDto.getStatus().getCode())) {
        // return false;
        // }

        // //if existing status is final and new status is also final, it is allowed
        // if (finalStatuses.contains(exitingTask.getStatus().getCode()) &&
        // finalStatuses.contains(newTaskDto.getStatus().getCode())) {
        // return true;
        // }

        List<Task.TaskStatus> allowedStatuses = taskStatuses
                .get(Task.TaskStatus.fromCode(exitingTask.getStatus().getCode()));

        return (allowedStatuses != null)
                && allowedStatuses.stream().anyMatch(t -> t.toCode().equals(newTaskDto.getStatus().getCode()));
    }

    private List<TaskDto> getUpcomingTasksByPractitioner(String practitioner, Optional<String> searchKey,
                                                         Optional<String> searchValue) {
        List<PatientDto> patients = patientService.getPatientsByPractitioner(Optional.ofNullable(practitioner),
                Optional.empty(), Optional.empty());

        List<TaskDto> allTasks = patients.stream()
                .flatMap(it -> getTasksByPatient(it.getId()).stream())
                .distinct()
                .collect(toList());

        Map<String, List<TaskDto>> tasksGroupedByPatient = allTasks.stream()
                .collect(groupingBy(x -> x.getBeneficiary().getReference()));

        List<TaskDto> finalList = new ArrayList<>();

        for (Map.Entry<String, List<TaskDto>> entry : tasksGroupedByPatient.entrySet()) {
            List<TaskDto> filtered = entry.getValue();
            Collections.sort(filtered);

            if (!filtered.isEmpty()) {
                TaskDto upcomingTask = filtered.get(0);
                finalList.add(upcomingTask);

                filtered.stream().skip(1).filter(task -> endDateAvailable(upcomingTask)
                                && upcomingTask.getExecutionPeriod().getEnd().equals(task.getExecutionPeriod().getEnd()))
                        .forEach(finalList::add);
            }
        }

        Collections.sort(finalList);
        return finalList;
    }

    private boolean endDateAvailable(TaskDto dto) {
        return dto.getExecutionPeriod() != null && dto.getExecutionPeriod().getEnd() != null;
    }

    private void retrieveActivityDefinitionDuration(TaskDto taskDto) {
        LocalDate startDate = taskDto.getExecutionPeriod().getStart();
        LocalDate endDate = taskDto.getExecutionPeriod().getEnd();

        if (startDate == null) {
            startDate = LocalDate.now();
        }

        // if start date is available but endDate (due date) is not sent by UI
        if (endDate == null) {

            Reference reference = FhirDtoUtil.mapReferenceDtoToReference(taskDto.getDefinition());
            String activityDefinitionId = FhirDtoUtil.getIdFromReferenceDto(taskDto.getDefinition(),
                    ResourceType.ActivityDefinition);

            ActivityDefinitionDto activityDefinition = activityDefinitionService
                    .getActivityDefinitionById(activityDefinitionId);

            float duration = activityDefinition.getTiming().getDurationMax();
            taskDto.getExecutionPeriod().setEnd(startDate.plusDays((long) duration));
        }
    }

    private List<TaskDto> getTasksByPatient(String patient) {
        List<TaskDto> tasks = new ArrayList<>();

        List<Bundle.BundleEntryComponent> bundleEntry = getBundleForPatient(patient);

        if (bundleEntry != null && !bundleEntry.isEmpty()) {

            tasks = bundleEntry.stream()
                    .map(it -> (Task) it.getResource())
                    .map(it -> TaskToTaskDtoMap.map(it, taskPerformerTypes))
                    .collect(toList());
        }

        return tasks;
    }

    private List<Bundle.BundleEntryComponent> getBundleForPatient(String patient) {
        Bundle bundle = fhirClient.search().forResource(Task.class)
                .where(new ReferenceClientParam("patient").hasId(ResourceType.Patient + "/" + patient))
                .returnBundle(Bundle.class).execute();
        return FhirOperationUtil.getAllBundleComponentsAsList(bundle, Optional.empty(), fhirClient, fisProperties);
    }

    private List<Bundle.BundleEntryComponent> getBundleForRelatedTask(String patient, Optional<String> organization) {
        IQuery taskQuery = fhirClient.search().forResource(Task.class)
                .where(new ReferenceClientParam("patient").hasId(patient));
        organization.ifPresent(org -> taskQuery.where(new ReferenceClientParam("based-on").hasId(org)));

        IQuery taskQueryNoCache = FhirOperationUtil.setNoCacheControlDirective(taskQuery);

        Bundle bundle = (Bundle) taskQueryNoCache
                .returnBundle(Bundle.class)
                .execute();
        return FhirOperationUtil.getAllBundleComponentsAsList(bundle, Optional.empty(), fhirClient, fisProperties);
    }

    /**
     * dropped this from task create because it was not allowing mulitple
     * tasks -
     *
     * @param taskDto
     * @return
     * @deprecated
     */
    private boolean isDuplicate(TaskDto taskDto) {
        IQuery taskForPatientQuery = fhirClient.search().forResource(Task.class)
                .where(new ReferenceClientParam("patient").hasId(taskDto.getBeneficiary().getReference()));

        Bundle taskForPatientBundle = (Bundle) FhirOperationUtil.setNoCacheControlDirective(taskForPatientQuery)
                .returnBundle(Bundle.class)
                .execute();

        List<Bundle.BundleEntryComponent> duplicateCheckList = new ArrayList<>();
        if (!taskForPatientBundle.isEmpty()) {
            duplicateCheckList = taskForPatientBundle.getEntry().stream().filter(taskResource -> {
                boolean defCheck = Boolean.FALSE;
                boolean statusCheck = Boolean.FALSE;
                boolean isMainTask = Boolean.TRUE;
                if (taskDto.getPartOf() != null) {
                    isMainTask = Boolean.FALSE;
                } else {
                    Task task = (Task) taskResource.getResource();
                    try {
                        if (task.getFocus() != null) {
                            defCheck = task.getFocus().getReference()
                                    .equalsIgnoreCase(taskDto.getDefinition().getReference());
                            statusCheck = (task.getStatus().getDisplay()
                                    .equalsIgnoreCase(Task.TaskStatus.CANCELLED.toCode()) ||
                                    task.getStatus().getDisplay().equalsIgnoreCase(Task.TaskStatus.COMPLETED.toCode())
                                    ||
                                    task.getStatus().getDisplay().equalsIgnoreCase(Task.TaskStatus.FAILED.toCode()));

                        }
                    } catch (Exception e) {
                        defCheck = Boolean.FALSE;
                    }
                }
                return isMainTask ? defCheck && !statusCheck : Boolean.FALSE;
            }).collect(Collectors.toList());
        }
        return !duplicateCheckList.isEmpty();
    }

    private String createDisplayForEpisodeOfCare(TaskDto dto) {
        String status = dto.getDefinition() != null ? dto.getDefinition().getDisplay() : "NA";
        String date = dto.getExecutionPeriod() != null
                ? DateUtil.convertLocalDateToString(dto.getExecutionPeriod().getStart())
                : "NA";
        String agent = dto.getAgent() != null ? dto.getAgent().getDisplay() : "NA";

        return new StringJoiner("-").add(status).add(date).add(agent).toString();
    }

    private List<TaskDto> getTaskDtosBasedOnFilters(Optional<String> definition, Optional<String> parentTaskId,
                                                    Optional<Boolean> isUpcomingTasks, List<TaskDto> taskDtos, Optional<DateRangeEnum> filterDate,
                                                    Optional<List<String>> statusList, Optional<String> activityDefinition) {

        // Filter the general sub-tasks for the given parent task
        if (parentTaskId.isPresent()) {
            taskDtos = taskDtos.stream()
                    .filter(t -> t.getPartOf() != null && t.getDefinition() != null)
                    .filter(t -> filterByStatus(statusList, t))
                    .collect(toList());
        } else {

            // Filter the general sub-tasks or to-do sub tasks with the certain activity
            // definition
            if (definition.isPresent()) {
                taskDtos = taskDtos.stream()
                        .filter(t -> t.getPartOf() != null && t.getDefinition() != null)
                        .filter(t -> filterByStatus(statusList, t))
                        .filter(taskDto -> taskDto.getPartOf().getDisplay().equalsIgnoreCase(definition.get()))
                        .collect(toList());
            }

            // Filter the ParentTasks, exclude TodoParent task
            if (!definition.isPresent()) {
                taskDtos = taskDtos.stream()
                        .filter(t -> t.getDefinition() != null)
                        .filter(t -> filterByStatus(statusList, t))
                        .filter(taskDto -> taskDto.getPartOf() == null)
                        .collect(toList());
            }

            // Combine the upcoming main tasks for each patient
            if (isUpcomingTasks.orElse(Boolean.FALSE)) {
                taskDtos = taskDtos.stream()
                        .filter(t -> t.getTaskDue() != null
                                && (t.getTaskDue().name().equalsIgnoreCase(TaskDueEnum.DUE_TODAY.name())
                                || t.getTaskDue().name().equalsIgnoreCase(TaskDueEnum.UPCOMING.name())))
                        .collect(toList());
            }
        }

        if (activityDefinition.isPresent()) {
            String activityDefinitionFull = "ActivityDefinition/" + activityDefinition.get();
            for (int counter = 0; counter < taskDtos.size(); counter++) {
                System.out.println(taskDtos.get(counter).getDefinition().getReference());
            }
            taskDtos = taskDtos.stream()
                    .filter(t -> t.getDefinition().getReference().equalsIgnoreCase(activityDefinitionFull))
                    // .filter(t -> t.getPartOf() != null && t.getDefinition() != null)
                    // .filter(t -> filterByStatus(statusList, t))
                    // .filter(taskDto ->
                    // taskDto.getPartOf().getDisplay().equalsIgnoreCase(definition.get()))
                    .collect(toList());
        }

        if (filterDate.isPresent()) {
            switch (filterDate.get()) {
                case ONE_DAY:
                    taskDtos = taskDtos.stream()
                            .filter(t -> t.getDateDiff() >= 0 && t.getDateDiff() <= filterDate.get().getDay())
                            .collect(toList());
                    break;
                case ONE_WEEK:
                    taskDtos = taskDtos.stream()
                            .filter(t -> t.getDateDiff() >= 0 && t.getDateDiff() <= filterDate.get().getDay())
                            .collect(toList());
                    break;
                case ONE_MONTH:
                    taskDtos = taskDtos.stream()
                            .filter(t -> t.getDateDiff() >= 0 && t.getDateDiff() <= filterDate.get().getDay())
                            .collect(toList());
                    break;
                default:
            }
        }

        taskDtos.sort(Comparator.comparing(TaskDto::getDateDiff));

        return taskDtos;
    }

    private boolean filterByStatus(Optional<List<String>> statusList, TaskDto t) {
        if (statusList.isPresent() && !statusList.get().isEmpty()) {
            return isGivenStatuses(t, statusList.get());
        } else {
            return isIntermediateStatuses(t);
        }
    }

    private boolean isGivenStatuses(TaskDto t, List<String> statusList) {
        return statusList.stream()
                .anyMatch(status -> isIntermediateStatuses(t) || t.getStatus().getCode().equalsIgnoreCase(status));
    }

    private boolean isIntermediateStatuses(TaskDto t) {
        boolean result = t.getStatus() != null
                && !t.getStatus().getCode().equalsIgnoreCase(Task.TaskStatus.CANCELLED.toCode())
                && !t.getStatus().getCode().equalsIgnoreCase(Task.TaskStatus.COMPLETED.toCode())
                && !t.getStatus().getCode().equalsIgnoreCase(Task.TaskStatus.FAILED.toCode());
        return result;
    }

    private IQuery getTasksIQuery(Optional<String> practitionerId, Optional<String> organization,
                                  Optional<String> patientId, Optional<String> parentTaskId, String practitionerType) {
        IQuery iQuery = fhirClient.search().forResource(Task.class).sort().descending(PARAM_LASTUPDATED);

        // Get Sub tasks by parent task id
        if (parentTaskId.isPresent()) {
            iQuery.where(new ReferenceClientParam("part-of").hasId(parentTaskId.get()));
        } else {
            // query the task and sub-task owned by specific practitioner
            practitionerId.ifPresent(pr -> iQuery.where(new ReferenceClientParam(practitionerType).hasId(pr)));

            // query the task and sub-task for the specific patient
            patientId.ifPresent(p -> iQuery.where(new ReferenceClientParam("patient").hasId(p)));

            // Query the task based on organization
            organization.ifPresent(org -> iQuery.where(new ReferenceClientParam("based-on").hasId(org)));
        }

        IQuery iQueryNoCache = FhirOperationUtil.setNoCacheControlDirective(iQuery);

        return iQueryNoCache;
    }

    private List<String> getMainTaskIds(List<TaskDto> taskDtos) {
        return taskDtos.stream().filter(taskDto -> (taskDto.getPartOf() != null))
                .filter(taskDto -> taskDto.getPartOf().getReference() != null)
                .map(taskDto -> taskDto.getPartOf().getReference().split("/")[1])
                .distinct()
                .collect(toList());
    }

    private List<TaskDto> getSubTasks(List<TaskDto> taskDtos) {
        List<TaskDto> taskDtoList = new ArrayList<>();
        if (!getTaskReferences(taskDtos).isEmpty()) {
            IQuery iQuery = fhirClient.search().forResource(Task.class)
                    .where(new ReferenceClientParam("part-of").hasAnyOfIds(getTaskReferences(taskDtos)));
            taskDtoList = getTaskDtos(iQuery);
        }
        return taskDtoList;
    }

    private List<String> getTaskReferences(List<TaskDto> taskDtos) {
        return taskDtos.stream().map(TaskDto::getLogicalId).collect(toList());
    }

    private List<TaskDto> getTaskDtos(IQuery iQuery) {
        Bundle firstPageTaskBundle = (Bundle) iQuery
                .returnBundle(Bundle.class)
                .execute();

        if (firstPageTaskBundle == null || firstPageTaskBundle.getEntry().size() < 1) {
            log.info("No Tasks were found in the FHIR server.");
            return new ArrayList<>();
        }

        List<Bundle.BundleEntryComponent> retrievedTasks = FhirOperationUtil
                .getAllBundleComponentsAsList(firstPageTaskBundle, Optional.empty(), fhirClient, fisProperties);

        return retrievedTasks.stream().parallel()
                .filter(retrievedBundle -> retrievedBundle.getResource().getResourceType().equals(ResourceType.Task))
                .map(retrievedTask -> {
                    Task task = (Task) retrievedTask.getResource();
                    TaskDto taskDto = TaskToTaskDtoMap.map(task, taskPerformerTypes);
                    setRollupNumbers(taskDto);
                    return taskDto;
                }).collect(toList());
    }

    private TaskDto getToDoTaskDto(Optional<String> practitioner, Optional<String> patient,
                                   Optional<String> organization, Optional<String> definition) {
        log.info("Task todos");
        List<ReferenceDto> referenceDtos = getRelatedTasks(patient.get(), definition, practitioner, organization);

        // always present
        ReferenceDto referenceDto = referenceDtos.stream().findFirst().get();

        String taskId = FhirDtoUtil.getIdFromReferenceDto(referenceDto, ResourceType.Task);

        return getTaskById(taskId);
    }

    private Map<Task.TaskStatus, List<Task.TaskStatus>> populateTaskStatuses() {
        Map<Task.TaskStatus, List<Task.TaskStatus>> map = new HashMap<Task.TaskStatus, List<Task.TaskStatus>>();

        map.put(Task.TaskStatus.DRAFT, Arrays.asList(Task.TaskStatus.DRAFT, Task.TaskStatus.READY,
                Task.TaskStatus.REQUESTED, Task.TaskStatus.CANCELLED));
        map.put(Task.TaskStatus.READY,
                Arrays.asList(Task.TaskStatus.READY, Task.TaskStatus.INPROGRESS, Task.TaskStatus.CANCELLED));
        map.put(Task.TaskStatus.REQUESTED, Arrays.asList(Task.TaskStatus.REQUESTED, Task.TaskStatus.RECEIVED,
                Task.TaskStatus.ACCEPTED, Task.TaskStatus.REJECTED, Task.TaskStatus.CANCELLED));
        map.put(Task.TaskStatus.RECEIVED, Arrays.asList(Task.TaskStatus.RECEIVED, Task.TaskStatus.ACCEPTED,
                Task.TaskStatus.REJECTED, Task.TaskStatus.CANCELLED));
        map.put(Task.TaskStatus.ACCEPTED,
                Arrays.asList(Task.TaskStatus.ACCEPTED, Task.TaskStatus.INPROGRESS, Task.TaskStatus.CANCELLED));
        map.put(Task.TaskStatus.REJECTED, Arrays.asList(Task.TaskStatus.REJECTED, Task.TaskStatus.CANCELLED));
        map.put(Task.TaskStatus.INPROGRESS, Arrays.asList(Task.TaskStatus.INPROGRESS, Task.TaskStatus.ONHOLD,
                Task.TaskStatus.COMPLETED, Task.TaskStatus.FAILED));
        map.put(Task.TaskStatus.ONHOLD, Arrays.asList(Task.TaskStatus.ONHOLD, Task.TaskStatus.INPROGRESS));
        map.put(Task.TaskStatus.ENTEREDINERROR, Collections.singletonList(Task.TaskStatus.CANCELLED));
        return map;
    }

    private boolean isValidSubTasks(TaskDto taskDto) {
        boolean valid = false;

        List<TaskDto> subtasks = this.getMainAndSubTasks(Optional.empty(), Optional.empty(), Optional.empty(),
                Optional.empty(), Optional.of(taskDto.getLogicalId()), Optional.empty(), Optional.empty(),
                Optional.empty(), Optional.empty(), Optional.empty(), Optional.empty(), Optional.empty());

        if (subtasks != null && subtasks.isEmpty()) {
            return true;
        }

        // if the new status is not in the final status
        if (!finalStatuses.contains(taskDto.getStatus().getCode())) {
            // check the statuses of the sub tasks
            valid = !subTasksInFinalStatus(subtasks);
        } else {
            valid = subTasksInFinalStatus(subtasks);
        }

        return valid;
    }

    private boolean subTasksInFinalStatus(List<TaskDto> subtasks) {
        return subtasks.stream().map(it -> it.getStatus().getCode()).anyMatch(status -> finalStatuses.contains(status));
    }

    private int getRemainingSubtasks(List<TaskDto> subtasks) {
        int counter = 0;
        for (TaskDto taskDto : subtasks) {
            if (!finalStatuses.contains(taskDto.getStatus().getCode())) {
                counter++;
            }
        }
        return counter;
    }

    private void setRollupNumbers(TaskDto parentTaskDto) {
		/*
        List<TaskDto> subtasks = getSubTasks(parentTaskDto);

        if (subtasks == null || subtasks.isEmpty()) {
            parentTaskDto.setTotalSubtasks(0);
            parentTaskDto.setRemainingSubtasks(0);
        }

        parentTaskDto.setTotalSubtasks(subtasks.size());
        parentTaskDto.setRemainingSubtasks(getRemainingSubtasks(subtasks));*/
    }

    private List<TaskDto> getSubTasks(TaskDto parentTaskDto) {
        List<TaskDto> subTasksList = new ArrayList<>();

        IQuery iQuery = fhirClient.search().forResource(Task.class)
                .where(new ReferenceClientParam("part-of").hasAnyOfIds(Collections.singletonList(parentTaskDto.getLogicalId())));
        Bundle bundle = (Bundle) iQuery.count(50).returnBundle(Bundle.class).execute();

        if (bundle != null) {
            List<Bundle.BundleEntryComponent> components = FhirOperationUtil.getAllBundleComponentsAsList(bundle,
                    Optional.empty(), fhirClient, fisProperties);

            subTasksList = components.stream().parallel()
                    .map(it -> (Task) it.getResource())
                    .map(it -> TaskToTaskDtoMap.map(it, taskPerformerTypes))
                    .collect(toList());
        }

        return subTasksList;
    }

}
