package gov.samhsa.ocp.ocpfis.service;

import ca.uhn.fhir.rest.api.MethodOutcome;
import ca.uhn.fhir.rest.client.api.IGenericClient;
import ca.uhn.fhir.rest.gclient.IQuery;
import ca.uhn.fhir.rest.gclient.ReferenceClientParam;
import ca.uhn.fhir.rest.gclient.TokenClientParam;
import ca.uhn.fhir.rest.server.exceptions.BaseServerResponseException;
import ca.uhn.fhir.validation.FhirValidator;
import gov.samhsa.ocp.ocpfis.config.FisProperties;
import gov.samhsa.ocp.ocpfis.service.dto.*;
import gov.samhsa.ocp.ocpfis.service.dto.valueset.Coding;
import gov.samhsa.ocp.ocpfis.service.dto.valueset.Target;
import gov.samhsa.ocp.ocpfis.util.FhirOperationUtil;
import gov.samhsa.ocp.ocpfis.util.pagination.PaginationRepository;
import gov.samhsa.ocp.ocpfis.util.ProvenanceUtil;
import lombok.extern.slf4j.Slf4j;
import org.hl7.fhir.r4.model.*;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.time.ZoneId;
import java.util.*;

import static java.util.stream.Collectors.toList;

@Service
@Slf4j
public class GoalServiceImpl implements GoalService {

    private final ModelMapper modelMapper;
    private final IGenericClient fhirClient;
    private final FisProperties fisProperties;
    private final FhirValidator fhirValidator;
    private final LookUpService lookUpService;
    private final ProvenanceUtil provenanceUtil;
    private final PractitionerService practitionerService;

    private final PaginationRepository paginationProxy;
    private final PaginationRepository paginationHapi;

    private final PaginationRepository paginationGcp;

    public GoalServiceImpl(ModelMapper modelMapper, IGenericClient fhirClient, FisProperties fisProperties, FhirValidator fhirValidator, LookUpService lookUpService, ProvenanceUtil provenanceUtil, PractitionerService practitionerService, @Qualifier("PaginationProxyImpl") PaginationRepository paginationProxy, @Qualifier("PaginationHapiFhirImpl") PaginationRepository paginationHapi, @Qualifier("PaginationGcpImpl") PaginationRepository paginationGcp) {
        this.modelMapper = modelMapper;
        this.fhirClient = fhirClient;
        this.fisProperties = fisProperties;
        this.fhirValidator = fhirValidator;
        this.lookUpService = lookUpService;
        this.provenanceUtil = provenanceUtil;
        this.practitionerService = practitionerService;
        this.paginationProxy = paginationProxy;
        this.paginationHapi = paginationHapi;
        this.paginationGcp = paginationGcp;
    }

    @Override
    public PageDto<GoalDto> getGoalbyPatientId(String patientId, Optional<String> searchKey, Optional<String> searchValue, Optional<Boolean> showInactive, Optional<Integer> pageNumber, Optional<Integer> pageSize, Optional<Boolean> showAll) {
        int numberPerPage = PaginationRepository.getValidPageSize(fisProperties, pageSize, ResourceType.Goal.name());
        IQuery goalIQuery = fhirClient.search().forResource(Goal.class).where(new ReferenceClientParam("patient").hasId("Patient/" + patientId));
        goalIQuery = FhirOperationUtil.setLastUpdatedTimeSortOrder(goalIQuery, true);
        Bundle firstPageBundle;
        Bundle otherPageBundle;
        boolean firstpage = true;

        firstPageBundle = (Bundle) goalIQuery.count(numberPerPage).returnBundle(Bundle.class).execute();

        if (firstPageBundle == null || firstPageBundle.isEmpty()) {
            log.info("No Goal was found for this given criteria");
            return new PageDto<>(new ArrayList<>(), numberPerPage, 0, 0, 0, 0);
        }

        otherPageBundle = firstPageBundle.copy();

        if (pageNumber.isPresent() && pageNumber.get() > 1 && otherPageBundle.getLink(Bundle.LINK_NEXT) != null) {
            firstpage = false;
            if (fisProperties.getFhir().getData_store_tech().equals("gcp")) {
                otherPageBundle = paginationGcp.getSearchBundleAfterFirstPage(fhirClient, fisProperties, firstPageBundle, pageNumber.get(), numberPerPage);

            } else if (fisProperties.getFhir().getData_store_tech().equals("hapi")) {
                otherPageBundle = paginationHapi.getSearchBundleAfterFirstPage(fhirClient, fisProperties, firstPageBundle, pageNumber.get(), numberPerPage);

            } else {
                otherPageBundle = paginationProxy.getSearchBundleAfterFirstPage(fhirClient, fisProperties, firstPageBundle, pageNumber.get(), numberPerPage);

            }
        }

        List<Bundle.BundleEntryComponent> retrievegoals = otherPageBundle.getEntry();

        List<GoalDto> goalDtoList = convertToGoaldto(retrievegoals);

        double totalPages = Math.ceil((double) otherPageBundle.getTotal() / numberPerPage);
        int currentPage = firstpage ? 1 : pageNumber.get();

        return new PageDto<>(goalDtoList, numberPerPage, totalPages, currentPage, goalDtoList.size(), otherPageBundle.getTotal());
    }

    @Override
    public PageDto<GoalDto> getAllGoals(Optional<Boolean> showInactive, Optional<Integer> page, Optional<Integer> size) {
        int numberPerPage = PaginationRepository.getValidPageSize(fisProperties, size, ResourceType.Goal.name());
        IQuery goalIQuery = fhirClient.search().forResource(Goal.class);
        goalIQuery = FhirOperationUtil.setLastUpdatedTimeSortOrder(goalIQuery, true);
        Bundle firstPageBundle;
        Bundle otherPageBundle;
        boolean firstpage = true;

        firstPageBundle = PaginationRepository.getSearchBundleFirstPage(goalIQuery, numberPerPage, Optional.empty());

        if (firstPageBundle == null || firstPageBundle.getEntry().size() < 1) {
            log.info("No Goal was found for this given criteria");
            return new PageDto<>(new ArrayList<>(), numberPerPage, 0, 0, 0, 0);
        }

        otherPageBundle = firstPageBundle.copy();

        if (page.isPresent() && page.get() > 1 && otherPageBundle.getLink(Bundle.LINK_NEXT) != null) {
            firstpage = false;
            if (fisProperties.getFhir().getData_store_tech().equals("gcp")) {
                otherPageBundle = paginationGcp.getSearchBundleAfterFirstPage(fhirClient, fisProperties, firstPageBundle, page.get(), numberPerPage);

            } else if (fisProperties.getFhir().getData_store_tech().equals("hapi")) {
                otherPageBundle = paginationHapi.getSearchBundleAfterFirstPage(fhirClient, fisProperties, firstPageBundle, page.get(), numberPerPage);

            } else {
                otherPageBundle = paginationProxy.getSearchBundleAfterFirstPage(fhirClient, fisProperties, firstPageBundle, page.get(), numberPerPage);

            }
        }

        List<Bundle.BundleEntryComponent> retrievegoals = otherPageBundle.getEntry();

        List<GoalDto> goalDtoList = convertToGoaldto(retrievegoals);

        double totalPages = Math.ceil((double) otherPageBundle.getTotal() / numberPerPage);
        int currentPage = firstpage ? 1 : page.get();

        return new PageDto<>(goalDtoList, numberPerPage, totalPages, currentPage, goalDtoList.size(), otherPageBundle.getTotal());
    }

    @Override
    public GoalDto getGoal(String id) {
        final Goal retrievedGoal = fhirClient.read().resource(Goal.class).withId(id).execute();
        if (retrievedGoal == null || retrievedGoal.isEmpty()) {
            log.info("No organizations were found in the FHIR server.");
        }
        final GoalDto goalDto = maponegoal(retrievedGoal);
        goalDto.setLogicalId(retrievedGoal.getIdElement().getIdPart());
        return goalDto;
    }

    @Override
    public void createGoal(GoalDto goalDto, Optional<String> planid, Optional<String> practitionerid, String requester, Optional<String> userorgid) {
        List<String> idlist = new ArrayList<>();
        Goal goalreference = convertToGoal(goalDto);

        // Validate
        FhirOperationUtil.validateFhirResource(fhirValidator, goalreference, Optional.empty(), ResourceType.Goal.name(), "Create Goal");

        // Create
        MethodOutcome serverResponse = FhirOperationUtil.createFhirResource(fhirClient, goalreference, ResourceType.Goal.name());

        log.info("Goal Created: " + FhirOperationUtil.getFhirId(serverResponse));

        // If plan id is present create Tasks and update Careplan with Goals and Tasks
        // Ids
        if (planid.isPresent() && !planid.get().isEmpty() && goalDto.getSubject() != null && !goalDto.getSubject().getReference().isEmpty() && !FhirOperationUtil.getFhirId(serverResponse).isEmpty()) {
            inserTasksbyActions(planid.get(), goalDto.getSubject().getReference(), FhirOperationUtil.getFhirId(serverResponse), practitionerid.orElse(""), goalDto, requester, userorgid);
        } else {
            updateCarePlanwithGoals(goalDto.getSubject().getReference(), FhirOperationUtil.getFhirId(serverResponse));
        }

        // Activity Definition
        // ActivityDefinition activityDefinition =
        // FhirResourceUtil.createToDoActivityDefinition(serverResponse.getId().getIdPart(),
        // fisProperties, lookUpService, fhirClient);
        // FhirProfileUtil.setActivityDefinitionProfileMetaData(fhirClient,
        // activityDefinition);
        //
        // FhirOperationUtil.validateFhirResource(fhirValidator, activityDefinition,
        // Optional.empty(), ResourceType.ActivityDefinition.name(), "Create Goal (when
        // creating an CarePlan)");
        //
        // MethodOutcome activityDefinitionOutCome =
        // FhirOperationUtil.createFhirResource(fhirClient, activityDefinition,
        // ResourceType.AuditEvent.name());
        // idlist.add(ResourceType.ActivityDefinition.name() + "/" +
        // FhirOperationUtil.getFhirId(activityDefinitionOutCome));
    }

    @Override
    public void updateGoal(GoalDto goalDto, Optional<String> planid, Optional<String> practitionerid, Optional<String> userorgid) {
        List<String> idlist = new ArrayList<>();
        Goal goalreference = convertToGoal(goalDto);
        // Validate
        FhirOperationUtil.validateFhirResource(fhirValidator, goalreference, Optional.empty(), ResourceType.Goal.name(), "Update Goal");

        // Update
        MethodOutcome serverResponse = FhirOperationUtil.updateFhirResource(fhirClient, goalreference, ResourceType.Goal.name());

        log.info("Goal Updated: " + FhirOperationUtil.getFhirId(serverResponse));

        // If plan id is present create Tasks and update Careplan with Goals and Tasks
        // Ids
        if (planid.isPresent() && !planid.get().isEmpty()) {
            inserTasksbyActions(planid.get(), goalDto.getSubject().getReference(), FhirOperationUtil.getFhirId(serverResponse), practitionerid.isPresent() ? practitionerid.get() : null, goalDto, "", userorgid);
        } else {
            updateCarePlanwithGoals(goalDto.getSubject().getReference(), FhirOperationUtil.getFhirId(serverResponse));
        }

    }

    private List<GoalDto> convertToGoaldto(List<Bundle.BundleEntryComponent> retrievegoals) {
        return retrievegoals.stream().map(this::mappergoal).collect(toList());
    }

    private GoalDto maponegoal(Goal goal) {
        GoalDto goalDto = new GoalDto();

        // ID
        goalDto.setLogicalId(goal.getIdElement().getIdPart());
        goalDto.setId(goal.getIdElement().getIdPart());

        // ResourceURL
        goalDto.setResourceURL(goal.getIdElement().getBaseUrl());

        // LifeCycleStatus
        goalDto.setLifecycleStatus(goal.getLifecycleStatusElement().getValueAsString());

        // achievement status
        GoalCodeDto achievement = new GoalCodeDto();

        goalDto.setLifecycleStatus(goal.getLifecycleStatusElement().getCode());

        List<Coding> codingsachievements = goal.getAchievementStatus().getCoding().stream().map(codes -> {
            Coding coding = new Coding();
            coding.setCode(codes.getCode());
            coding.setSystem(codes.getSystem());
            coding.setDisplay(goal.getAchievementStatus().getText());
            return coding;
        }).collect(toList());

        achievement.setCoding(codingsachievements);
        achievement.setText(goal.getAchievementStatus().getText());

        goalDto.setAchievementStatus(achievement);

        // Category
        List<Coding> codingscategories = goal.getCategory().get(0).getCoding().stream().map(categories -> {
            Coding coding = new Coding();
            coding.setCode(categories.getCode());
            coding.setSystem(categories.getSystem());
            coding.setDisplay(categories.getCode().substring(0, 1).toUpperCase() + categories.getCode().substring(1).toLowerCase());
            return coding;
        }).collect(toList());

        GoalCodeDto goalcategories = new GoalCodeDto();
        goalcategories.setCoding(codingscategories);
        goalcategories.setText(goal.getCategory().get(0).getText());

        List<GoalCodeDto> goalCodeDtos = new ArrayList<>();
        goalCodeDtos.add(goalcategories);
        goalDto.setCategory(goalCodeDtos);

        // Description
        List<Coding> codingdescription = goal.getDescription().getCoding().stream().map(descriptions -> {
            Coding coding = new Coding();
            coding.setCode(descriptions.getCode());
            coding.setSystem(descriptions.getSystem());
            coding.setDisplay(goal.getDescription().getText());
            return coding;
        }).collect(toList());

        GoalCodeDto descriptioncode = new GoalCodeDto();
        descriptioncode.setCoding(codingdescription);
        descriptioncode.setText(goal.getDescription().getText());

        // Subject
        SubjectReferenceDto subjectereference = new SubjectReferenceDto();
        subjectereference.setReference(goal.getSubject().getReference());

        goalDto.setSubject(subjectereference);
        goalDto.setDescription(descriptioncode);

        // Target
        List<Target> targetList = goal.getTarget().stream().map(targets -> {
            Target target = new Target();
            target.setDueDate(targets.getDueDateType().getValue());
            target.setDetailString(targets.getDetailStringType().getValue());
            return target;
        }).collect(toList());

        goalDto.setTarget(targetList);

        goalDto.setStatusReason(goal.getStatusReason());

        goalDto.setStatusDate(goal.getStatusDate());
        goalDto.setStartDate(goal.getStartDateType().getValue());

        return goalDto;
    }

    private GoalDto mappergoal(Bundle.BundleEntryComponent goals) {
        GoalDto goalDto = new GoalDto();
        Goal goal = (Goal) goals.getResource();

        // ID
        goalDto.setLogicalId(goal.getIdElement().getIdPart());
        goalDto.setId(goal.getIdElement().getIdPart());

        // ResourceURL
        goalDto.setResourceURL(goal.getIdElement().getBaseUrl());

        // LifeCycleStatus
        goalDto.setLifecycleStatus(goal.getLifecycleStatusElement().getValueAsString());

        // achievement status
        GoalCodeDto achievement = new GoalCodeDto();

        goalDto.setLifecycleStatus(goal.getLifecycleStatusElement().getCode());

        List<Coding> codingsachievements = goal.getAchievementStatus().getCoding().stream().map(codes -> {
            Coding coding = new Coding();
            coding.setCode(codes.getCode());
            coding.setSystem(codes.getSystem());
            return coding;
        }).collect(toList());

        achievement.setCoding(codingsachievements);
        achievement.setText(goal.getAchievementStatus().getText());

        goalDto.setAchievementStatus(achievement);

        // Category
        List<Coding> codingscategories = goal.getCategory().get(0).getCoding().stream().map(categories -> {
            Coding coding = new Coding();
            coding.setCode(categories.getCode());
            coding.setSystem(categories.getSystem());
            return coding;
        }).collect(toList());

        GoalCodeDto goalcategories = new GoalCodeDto();
        goalcategories.setCoding(codingscategories);
        goalcategories.setText(goal.getCategory().get(0).getText());

        List<GoalCodeDto> goalCodeDtos = new ArrayList<>();
        goalCodeDtos.add(goalcategories);
        goalDto.setCategory(goalCodeDtos);

        // Description
        List<Coding> codingdescription = goal.getDescription().getCoding().stream().map(descriptions -> {
            Coding coding = new Coding();
            coding.setCode(descriptions.getCode());
            coding.setSystem(descriptions.getSystem());
            return coding;
        }).collect(toList());

        GoalCodeDto descriptioncode = new GoalCodeDto();
        descriptioncode.setCoding(codingdescription);
        descriptioncode.setText(goal.getDescription().getText());

        // Subject
        SubjectReferenceDto subjectereference = new SubjectReferenceDto();
        subjectereference.setReference(goal.getSubject().getReference());

        goalDto.setSubject(subjectereference);
        goalDto.setDescription(descriptioncode);

        // Target
        List<Target> targetList = goal.getTarget().stream().map(targets -> {
            Target target = new Target();
            target.setDueDate(targets.getDueDateType().getValue());
            target.setDetailString(targets.getDetailStringType().getValue());
            return target;
        }).collect(toList());

        goalDto.setTarget(targetList);

        goalDto.setStatusReason(goal.getStatusReason());

        goalDto.setStatusDate(goal.getStatusDate());

        return goalDto;
    }

    public Goal convertToGoal(GoalDto goalDto) {
        Goal goal = new Goal();

        // Id
        if (goalDto.getId() != null) {
            goal.setId(goalDto.getId());
        }
        // LifeCycleStatus
        goal.setLifecycleStatus(Goal.GoalLifecycleStatus.valueOf(goalDto.getLifecycleStatus().toUpperCase(Locale.ROOT)));

        // Achievement Status
        List<org.hl7.fhir.r4.model.Coding> codingsachievements = goalDto.getAchievementStatus().getCoding().stream().map(coding -> {
            org.hl7.fhir.r4.model.Coding coding1 = new org.hl7.fhir.r4.model.Coding();
            coding1.setCode(coding.getCode());
            coding1.setSystem(coding.getSystem());
            return coding1;
        }).collect(toList());

        CodeableConcept codeableConceptachievement = new CodeableConcept();
        codeableConceptachievement.setCoding(codingsachievements);
        codeableConceptachievement.setText(goalDto.getAchievementStatus().getText());
        goal.setAchievementStatus(codeableConceptachievement);

        // Category
        List<CodeableConcept> categorycodeableConcepts = goalDto.getCategory().stream().map(conceptcategory -> {
            CodeableConcept codeableConcept = new CodeableConcept();

            List<org.hl7.fhir.r4.model.Coding> codings = conceptcategory.getCoding().stream().map(coding -> {
                org.hl7.fhir.r4.model.Coding coding1 = new org.hl7.fhir.r4.model.Coding();
                coding1.setCode(coding.getCode());
                coding1.setSystem(coding.getSystem());
                return coding1;
            }).collect(toList());

            codeableConcept.setCoding(codings);
            codeableConcept.setText(conceptcategory.getText());

            return codeableConcept;
        }).collect(toList());

        goal.setCategory(categorycodeableConcepts);

        // Description
        List<org.hl7.fhir.r4.model.Coding> codingsdescription = goalDto.getDescription().getCoding().stream().map(codedescription -> {
            org.hl7.fhir.r4.model.Coding coding = new org.hl7.fhir.r4.model.Coding();
            coding.setSystem(codedescription.getSystem());
            coding.setCode(codedescription.getCode());

            return coding;
        }).collect(toList());

        CodeableConcept codeableConceptdescription = new CodeableConcept();
        codeableConceptdescription.setCoding(codingsdescription);
        codeableConceptdescription.setText(goalDto.getDescription().getText());

        goal.setDescription(codeableConceptdescription);

        // Subject
        Reference referencesubject = new Reference();
        referencesubject.setReference(goalDto.getSubject().getReference());
        goal.setSubject(referencesubject);

        // Target
        List<Goal.GoalTargetComponent> targetComponents = goalDto.getTarget().stream().map(target -> {
            Goal.GoalTargetComponent goalTargetComponent = new Goal.GoalTargetComponent();
            goalTargetComponent.setDue(new DateType(target.getDueDate()));
            // goalTargetComponent.setDetail(new StringType(target.getDetailString()));
            return goalTargetComponent;
        }).collect(toList());

        goal.setTarget(targetComponents);
        DateType dateType = new DateType();
        dateType.setValue(goalDto.getStartDate());
        goal.setStart(dateType);

        // Statusdate
        goal.setStatusDate(goalDto.getStatusDate());

        // Status Reason
        goal.setStatusReason(goalDto.getStatusReason());

        return goal;
    }

    public void inserTasksbyActions(String planid, String patientid, String goalid, String practitioner, GoalDto goalDto, String requester, Optional<String> userorgid) {
        log.info("Inserting Tasks Plan Id: " + planid);

        PlanDefinition planDefinition = fhirClient.read().resource(PlanDefinition.class).withId(planid).execute();

        Bundle careplanBundle = fhirClient.search().forResource(CarePlan.class).where(new ReferenceClientParam("patient").hasId(patientid)).returnBundle(Bundle.class).execute();

        if (careplanBundle.getEntry().size() > 0 && !careplanBundle.getEntry().isEmpty()) {
            log.info("CarePlan Found");
            CarePlan existingcareplan = (CarePlan) careplanBundle.getEntry().stream().findFirst().get().getResource();
            log.info("CaraPlan ID " + existingcareplan.getId());
            log.info("CaraPlan status name " + existingcareplan.getStatus().name());
            log.info("CaraPlan status display " + existingcareplan.getStatus().getDisplay());
            insertDatatoCarePlan(planDefinition, existingcareplan, patientid, goalid, requester, practitioner, userorgid.orElse(""));
        } else {
            log.info("CarePlan for Patient not found: Action ( Create new CarePlan )");
            String careplanid = createCarePlan(goalDto, practitioner);
            CarePlan carePlan = fhirClient.read().resource(CarePlan.class).withId(careplanid).execute();
            insertDatatoCarePlan(planDefinition, carePlan, patientid, goalid, requester, practitioner, userorgid.orElse(""));
        }
    }

    public void insertDatatoCarePlan(PlanDefinition planDefinition, CarePlan existingcareplan, String patientid, String goalid, String requester, String practitioner, String userorgid) {

        if (planDefinition == null || planDefinition.isEmpty()) {
            log.info("No PlanDefinition Found");
        }

        // Set Acitivity Definition
        // REMOVED: .where(new TokenClientParam("name").exactly().code("goal-task"))
//        Bundle search_activity_goal = fhirClient.search().forResource(ActivityDefinition.class)
//                .where(new ReferenceClientParam("publisher").hasId(userorgid))
//                .returnBundle(Bundle.class)
//                .execute();

        Bundle search_activity_goal = fhirClient.search().forResource(ActivityDefinition.class).where(new ReferenceClientParam("publisher").hasId(userorgid)).where(new TokenClientParam("name").exactly().code("goal-task")).returnBundle(Bundle.class).execute();

        Reference activityreference = new Reference();

        boolean activity_created = false;

        if (!userorgid.isEmpty()) {
            log.info("Bundle Definition Size: " + search_activity_goal.getEntry().size());
            if (search_activity_goal.isEmpty() || search_activity_goal.getEntry().size() == 0) {
                log.info("search_activity_goal is empty");
                // TODO: Create Activity Definition
                List<RelatedArtifact> artifacts = new ArrayList<>();
                RelatedArtifact relatedArtifact = new RelatedArtifact();
                relatedArtifact.setDisplay("Artificat Task Goal");
                relatedArtifact.setType(RelatedArtifact.RelatedArtifactType.CITATION);

                CodeableConcept codeablerole = new CodeableConcept();
                codeablerole.addCoding().setCode("doctor").setDisplay("Doctor").setSystem("http://terminology.hl7.org/CodeSystem/practitioner-role");

                List<ActivityDefinition.ActivityDefinitionParticipantComponent> participantComponents = new ArrayList<>();
                ActivityDefinition.ActivityDefinitionParticipantComponent activityDefinitionParticipantComponent = new ActivityDefinition.ActivityDefinitionParticipantComponent();
                activityDefinitionParticipantComponent.setRole(codeablerole);
                activityDefinitionParticipantComponent.setType(ActivityDefinition.ActivityParticipantType.PRACTITIONER);
                participantComponents.add(activityDefinitionParticipantComponent);

                Date end = new Date();
                Calendar calendar = Calendar.getInstance();
                calendar.setTime(end);
                calendar.add(Calendar.DATE, 30);

                Period period = new Period();
                period.setStart(new Date());
                period.setStart(calendar.getTime());

                List<org.hl7.fhir.r4.model.Coding> codings = new ArrayList<>();
                org.hl7.fhir.r4.model.Coding coding = new org.hl7.fhir.r4.model.Coding();
                coding.setSystem("http://terminology.hl7.org/CodeSystem/definition-topic");
                coding.setDisplay("Assesment");
                coding.setCode("assessment");
                codings.add(coding);

                List<CodeableConcept> concept_topics = new ArrayList<>();
                CodeableConcept concept_topic = new CodeableConcept();
                concept_topic.setCoding(codings);
                concept_topics.add(concept_topic);

                Timing.TimingRepeatComponent timingRepeatComponent = new Timing.TimingRepeatComponent();
                timingRepeatComponent.setDuration(5);
                timingRepeatComponent.setDurationMax(5);
                timingRepeatComponent.setDurationUnit(Timing.UnitsOfTime.D);
                timingRepeatComponent.setFrequency(2);

                Timing timing = new Timing();
                timing.setRepeat(timingRepeatComponent);

                ActivityDefinition newdefinition = new ActivityDefinition();
                newdefinition.setName("goal-task");
                newdefinition.setTitle("Goal-Task");
                newdefinition.setDescription("Task created based on Goal");
                newdefinition.setVersion("1.0.0");
                newdefinition.setStatus(Enumerations.PublicationStatus.ACTIVE);
                newdefinition.setDate(new Date());
                newdefinition.setKind(ActivityDefinition.ActivityDefinitionKind.APPOINTMENT);
                newdefinition.setPublisher(userorgid);
                newdefinition.setRelatedArtifact(artifacts);
                newdefinition.setParticipant(participantComponents);
                newdefinition.setEffectivePeriod(period);
                newdefinition.setTopic(concept_topics);
                newdefinition.setTiming(timing);

                try {
                    MethodOutcome outcome = fhirClient.create().resource(newdefinition).execute();
                    log.info("Activity Definition Created: " + outcome.getId().getIdPart());
                    activityreference.setReference(ResourceType.ActivityDefinition.name() + "/" + outcome.getId().getIdPart());
                    activityreference.setDisplay("Goal-Task");
                    activity_created = true;
                } catch (BaseServerResponseException e) {
                    log.error("Error creating ActivityDefinition: " + e.getMessage());
                }

            } else {
                log.info("search_activity_goal is NOT empty");
                log.info("search_activity_goal size: " + search_activity_goal.getEntry().size());
                ActivityDefinition activityDefinition = (ActivityDefinition) search_activity_goal.getEntry().get(0).getResource();
                String activityid = activityDefinition.getIdElement().getIdPart();
                activityreference.setReference(ResourceType.ActivityDefinition.name() + "/" + activityid);
                log.info("Activity Reference: " + activityreference.getReference());
                activityreference.setDisplay(activityDefinition.getTitle());
                log.info("Activity Display: " + activityreference.getDisplay());
                activity_created = true;
            }
        }

        Date currentdate = new Date();

        List<CarePlan.CarePlanActivityComponent> carePlanActivityComponents = existingcareplan.getActivity();

        if (planDefinition != null) {
            for (PlanDefinition.PlanDefinitionActionComponent action : planDefinition.getAction()) {
                Task task = new Task();
                Calendar calendar = Calendar.getInstance();
                Period period = new Period();
                Task.TaskRestrictionComponent restrictions = new Task.TaskRestrictionComponent();
                Reference reference = new Reference();
                CarePlan.CarePlanActivityComponent carePlanActivityComponent = new CarePlan.CarePlanActivityComponent();
                CarePlan.CarePlanActivityDetailComponent carePlanActivityDetailComponent = new CarePlan.CarePlanActivityDetailComponent();
                List<Reference> goalreference = new ArrayList<>();
                Reference taskreference = new Reference();
                Reference referencegoal = new Reference();
                referencegoal.setReference("Goal/" + goalid);
                goalreference.add(referencegoal);

                calendar.setTime(currentdate);

                if (action.getTimingDuration().hasUnit() && action.getTimingDuration().hasValue()) {
                    switch (action.getTimingDuration().getUnit()) {
                        case "days":
                            calendar.add(Calendar.DATE, action.getTimingDuration().getValue().intValue());
                            break;
                        case "years":
                            calendar.add(Calendar.YEAR, action.getTimingDuration().getValue().intValue());
                            break;
                        case "months":
                            calendar.add(Calendar.MONTH, action.getTimingDuration().getValue().intValue());
                            break;
                    }
                    period.setEnd(calendar.getTime());
                }

                period.setStart(currentdate);

                restrictions.setPeriod(period);
                reference.setReference(patientid);

                task.setIntent(Task.TaskIntent.PROPOSAL);
                task.setStatus(Task.TaskStatus.DRAFT);
                task.setRestriction(restrictions);
                task.setDescription(action.getTitle());
                task.setFor(reference);
                task.setPriority(Task.TaskPriority.ASAP);

                Date date = new Date();
                ZoneId defaultZoneId = ZoneId.systemDefault();
                Instant instant = date.toInstant();
                instant.atZone(defaultZoneId);
                task.setAuthoredOn(Date.from(instant));

                if (!requester.isEmpty()) {
                    Reference requester_references = new Reference();
                    requester_references.setReference(requester);
                    task.setRequester(requester_references);
                }

                if (!practitioner.isEmpty()) {
                    log.info("Owner: " + practitioner);
                    Reference owner_reference = new Reference();
                    owner_reference.setReference("Practitioner/" + practitioner);
                    PractitionerDto practitionerDto = practitionerService.getPractitioner(practitioner);
                    if (practitionerDto.getPractitionerRoles() != null && !practitionerDto.getPractitionerRoles().isEmpty()) {
                        if (practitionerDto.getPractitionerRoles().get(0).getPractitioner() != null) {
                            if (practitionerDto.getPractitionerRoles().get(0).getPractitioner().getDisplay() != null) {
                                owner_reference.setDisplay(practitionerDto.getPractitionerRoles().get(0).getPractitioner().getDisplay());
                            }
                        }
                    }
                    task.setOwner(owner_reference);
                } else {
                    log.info("Without Owner");
                }

                if (activity_created) {
                    task.setFocus(activityreference);
                }

                MethodOutcome serverResponse = FhirOperationUtil.createFhirResource(fhirClient, task, ResourceType.Task.name());
                String taskid = serverResponse.getId().getIdPart();
                log.info("Task Created: " + ResourceType.Task.name() + "/" + taskid);
                taskreference.setReference("Task/" + taskid);

                log.info("Goal Reference " + "Goal/" + goalid);

                carePlanActivityDetailComponent.setStatus(CarePlan.CarePlanActivityStatus.SCHEDULED);
                carePlanActivityDetailComponent.setGoal(goalreference);
                List<Reference> taskreferenceslist = new ArrayList<>();
                taskreferenceslist.add(taskreference);
                carePlanActivityComponent.setOutcomeReference(taskreferenceslist).setDetail(carePlanActivityDetailComponent);
                carePlanActivityComponents.add(carePlanActivityComponent);
            }
            existingcareplan.setActivity(carePlanActivityComponents);
            MethodOutcome careplanupdateoutcome = FhirOperationUtil.updateFhirResource(fhirClient, existingcareplan, "Update CarePlan");
            log.info("CarePlan updated: " + careplanupdateoutcome.getId().getIdPart());
        }
    }

    public String createCarePlan(GoalDto goalDto, String practitioner) {
        CarePlan carePlan = new CarePlan();
        carePlan.setStatus(CarePlan.CarePlanStatus.DRAFT);
        carePlan.setIntent(CarePlan.CarePlanIntent.PLAN);

        Reference subjectreference = new Reference();
        subjectreference.setReference(goalDto.getSubject().getReference());
        carePlan.setSubject(subjectreference);

        carePlan.setCreated(new Date());

        if (!practitioner.isEmpty()) {
            Reference practitoner_reference = new Reference();
            List<Reference> references = new ArrayList<>();
            references.add(practitoner_reference);
            carePlan.setContributor(references);
        }

        FhirOperationUtil.validateFhirResource(fhirValidator, carePlan, Optional.empty(), ResourceType.CarePlan.name(), "Create CarePlan");
        MethodOutcome methodOutcome = FhirOperationUtil.createFhirResource(fhirClient, carePlan, ResourceType.CarePlan.name());
        return FhirOperationUtil.getFhirId(methodOutcome);
    }

    public void updateCarePlanwithGoals(String patientid, String goalid) {

        log.info("Updating CarePlan with Patient: " + patientid + "and goal " + goalid);

        Bundle careplanBundle = fhirClient.search().forResource(CarePlan.class).where(new ReferenceClientParam("patient").hasId(patientid)).returnBundle(Bundle.class).execute();

        CarePlan existingcareplan = !careplanBundle.isEmpty() && !careplanBundle.getEntry().isEmpty() && careplanBundle.getEntry().stream().findFirst().isPresent() && !careplanBundle.getEntry().stream().findFirst().get().isEmpty() && !careplanBundle.getEntry().stream().findFirst().get().getResource().isEmpty() ? (CarePlan) careplanBundle.getEntry().stream().findFirst().get().getResource() : null;

        if (existingcareplan != null && !existingcareplan.isEmpty()) {
            log.info("Updating CarePlan with Goals: " + existingcareplan.getId());

            for (CarePlan.CarePlanActivityComponent activity : existingcareplan.getActivity()) {
                List<Reference> referenceList = new ArrayList<>();
                Reference reference = new Reference();
                reference.setReference("Goal/" + goalid);
                referenceList.add(reference);
                activity.getDetail().setGoal(referenceList);
            }

            MethodOutcome careplanupdateoutcome = FhirOperationUtil.updateFhirResource(fhirClient, existingcareplan, "Update CarePlan");
            log.info("CarePlan updated: " + careplanupdateoutcome.getId().getIdPart());
        } else {
            log.info("No CarePlan Found for patient: " + patientid);
        }

    }

}
