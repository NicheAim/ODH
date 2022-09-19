package gov.samhsa.ocp.ocpfis.service;

import ca.uhn.fhir.rest.api.MethodOutcome;
import ca.uhn.fhir.rest.client.api.IGenericClient;
import ca.uhn.fhir.rest.gclient.IQuery;
import ca.uhn.fhir.rest.gclient.ReferenceClientParam;
import ca.uhn.fhir.validation.FhirValidator;
import gov.samhsa.ocp.ocpfis.config.FisProperties;
import gov.samhsa.ocp.ocpfis.service.dto.*;
import gov.samhsa.ocp.ocpfis.util.FhirOperationUtil;
import gov.samhsa.ocp.ocpfis.util.FhirProfileUtil;
import gov.samhsa.ocp.ocpfis.util.FhirResourceUtil;
import gov.samhsa.ocp.ocpfis.util.pagination.PaginationRepository;
import gov.samhsa.ocp.ocpfis.util.ProvenanceUtil;
import lombok.extern.slf4j.Slf4j;
import org.hl7.fhir.r4.model.*;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.ZoneId;
import java.util.*;

import static java.util.stream.Collectors.toList;

@Service
@Slf4j
public class CarePlanServiceImpl implements CarePlanService {
    private final ModelMapper modelMapper;
    private final IGenericClient fhirClient;
    private final FisProperties fisProperties;
    private final FhirValidator fhirValidator;
    private final LookUpService lookUpService;
    private final ProvenanceUtil provenanceUtil;

    private final PaginationRepository paginationProxy;
    private final PaginationRepository paginationHapi;

    private final PaginationRepository paginationGcp;

    @Autowired
    public CarePlanServiceImpl(ModelMapper modelMapper, IGenericClient fhirClient, FisProperties fisProperties, FhirValidator fhirValidator, LookUpService lookUpService, ProvenanceUtil provenanceUtil, @Qualifier("PaginationProxyImpl") PaginationRepository paginationProxy, @Qualifier("PaginationHapiFhirImpl") PaginationRepository paginationHapi, @Qualifier("PaginationGcpImpl") PaginationRepository paginationGcp) {
        this.modelMapper = modelMapper;
        this.fhirClient = fhirClient;
        this.fisProperties = fisProperties;
        this.fhirValidator = fhirValidator;
        this.lookUpService = lookUpService;
        this.provenanceUtil = provenanceUtil;
        this.paginationProxy = paginationProxy;
        this.paginationHapi = paginationHapi;
        this.paginationGcp = paginationGcp;
    }

    @Override
    public PageDto<CarePlanDto> getAllCarePlans(Optional<Boolean> showInactive, Optional<Integer> page, Optional<Integer> size) {
        int numberofCarePlansPage = PaginationRepository.getValidPageSize(fisProperties, size, ResourceType.CarePlan.name());
        IQuery careplanIQuery = fhirClient.search().forResource(CarePlan.class);
        careplanIQuery = FhirOperationUtil.setLastUpdatedTimeSortOrder(careplanIQuery, true);
        Bundle firstPageCarePlanSearchBundle;
        Bundle otherPageCarePlanSearchBundle;
        boolean firstPage = true;

        firstPageCarePlanSearchBundle = PaginationRepository.getSearchBundleFirstPage(careplanIQuery, numberofCarePlansPage, Optional.empty());

        if (firstPageCarePlanSearchBundle == null || firstPageCarePlanSearchBundle.getEntry().size() < 1) {
            log.info("No CarePlan References were found for the given criteria");
            return new PageDto<>(new ArrayList<>(), numberofCarePlansPage, 0, 0, 0, 0);
        }

        otherPageCarePlanSearchBundle = firstPageCarePlanSearchBundle.copy();

        if (page.isPresent() && page.get() > 1 && otherPageCarePlanSearchBundle.getLink(Bundle.LINK_NEXT) != null) {
            firstPage = false;
            if (fisProperties.getFhir().getData_store_tech().equals("gcp")) {
                otherPageCarePlanSearchBundle = paginationGcp.getSearchBundleAfterFirstPage(fhirClient, fisProperties, firstPageCarePlanSearchBundle, page.get(), numberofCarePlansPage);

            } else if (fisProperties.getFhir().getData_store_tech().equals("hapi")) {
                otherPageCarePlanSearchBundle = paginationHapi.getSearchBundleAfterFirstPage(fhirClient, fisProperties, firstPageCarePlanSearchBundle, page.get(), numberofCarePlansPage);

            } else {
                otherPageCarePlanSearchBundle = paginationProxy.getSearchBundleAfterFirstPage(fhirClient, fisProperties, firstPageCarePlanSearchBundle, page.get(), numberofCarePlansPage);

            }
        }

        List<Bundle.BundleEntryComponent> retrievecareplans = otherPageCarePlanSearchBundle.getEntry();

//        List<CarePlanDto> carePlanDtoList = retrievecareplans.stream().map(retrievecareplan -> {
//            CarePlanDto carePlanDto = modelMapper.map(retrievecareplan.getResource(), CarePlanDto.class);
//            carePlanDto.setLogicalId(retrievecareplan.getResource().getIdElement().getIdPart());
//            return carePlanDto;
//        }).collect(toList());

        List<CarePlanDto> carePlanDtoList = convertListtoCarePlanDto(retrievecareplans);

        double totalPages = Math.ceil((double) otherPageCarePlanSearchBundle.getTotal() / numberofCarePlansPage);
        int currentPage = firstPage ? 1 : page.get();


        return new PageDto<>(carePlanDtoList, numberofCarePlansPage, totalPages, currentPage, carePlanDtoList.size(), otherPageCarePlanSearchBundle.getTotal());
    }

    @Override
    public PageDto<CarePlanDto> getCarePlanbyPatient(String patientId, Optional<String> searchKey, Optional<String> searchValue, Optional<Boolean> showInactive, Optional<Integer> pageNumber, Optional<Integer> pageSize, Optional<Boolean> showAll) {
        int numberPerPage = PaginationRepository.getValidPageSize(fisProperties, pageSize, ResourceType.CarePlan.name());
        IQuery careplanQuery = fhirClient.search().forResource(CarePlan.class).where(new ReferenceClientParam("patient").hasId("Patient/" + patientId));
        careplanQuery = FhirOperationUtil.setLastUpdatedTimeSortOrder(careplanQuery, true);

        Bundle firstPageBundle;
        Bundle otherPageBundle;
        boolean firstPage = true;

        firstPageBundle = (Bundle) careplanQuery.count(numberPerPage).returnBundle(Bundle.class).execute();

        if (firstPageBundle == null || firstPageBundle.isEmpty()) {
            log.info("No CarePlan was found for this given criteria");
            return new PageDto<>(new ArrayList<>(), numberPerPage, 0, 0, 0, 0);
        }

        otherPageBundle = firstPageBundle.copy();

        if (pageNumber.isPresent() && pageNumber.get() > 1 && otherPageBundle.getLink(Bundle.LINK_NEXT) != null) {
            firstPage = false;
            if (fisProperties.getFhir().getData_store_tech().equals("gcp")) {
                otherPageBundle = paginationGcp.getSearchBundleAfterFirstPage(fhirClient, fisProperties, firstPageBundle, pageNumber.get(), numberPerPage);

            } else if (fisProperties.getFhir().getData_store_tech().equals("hapi")) {
                otherPageBundle = paginationHapi.getSearchBundleAfterFirstPage(fhirClient, fisProperties, firstPageBundle, pageNumber.get(), numberPerPage);

            } else {
                otherPageBundle = paginationProxy.getSearchBundleAfterFirstPage(fhirClient, fisProperties, firstPageBundle, pageNumber.get(), numberPerPage);

            }
        }

        List<Bundle.BundleEntryComponent> retrievecareplans = otherPageBundle.getEntry();

//        List<CarePlanDto> carePlanDtoList = retrievecareplans.stream().map(retrievecareplan -> {
//            CarePlanDto carePlanDto = modelMapper.map(retrievecareplan.getResource(), CarePlanDto.class);
//            carePlanDto.setLogicalId(retrievecareplan.getResource().getIdElement().getIdPart());
//            return carePlanDto;
//        }).collect(toList());

        List<CarePlanDto> carePlanDtoList = convertListtoCarePlanDto(retrievecareplans);

        double totalPages = Math.ceil((double) otherPageBundle.getTotal() / numberPerPage);
        int currentPage = firstPage ? 1 : pageNumber.get();


        return new PageDto<>(carePlanDtoList, numberPerPage, totalPages, currentPage, carePlanDtoList.size(), otherPageBundle.getTotal());
    }

    @Override
    public void createCarePlan(CarePlanDto carePlanDto) {
        List<String> idList = new ArrayList<>();
        CarePlan carePlanreference = mapDtoToCarePlan(carePlanDto);

        //Validate
        FhirOperationUtil.validateFhirResource(fhirValidator, carePlanreference, Optional.empty(), ResourceType.CarePlan.name(), "Create CarePlan");

        //Create
        MethodOutcome serverResponse = FhirOperationUtil.createFhirResource(fhirClient, carePlanreference, ResourceType.CarePlan.name());
        idList.add(ResourceType.CarePlan.name() + "/" + FhirOperationUtil.getFhirId(serverResponse));

        ActivityDefinition activityDefinition = FhirResourceUtil.createToDoActivityDefinition(serverResponse.getId().getIdPart(), fisProperties, lookUpService, fhirClient);
        FhirProfileUtil.setActivityDefinitionProfileMetaData(fhirClient, activityDefinition);

        FhirOperationUtil.validateFhirResource(fhirValidator, activityDefinition, Optional.empty(), ResourceType.ActivityDefinition.name(), "Create ActivityDefinition (when creating an CarePlan)");

        MethodOutcome activityDefinitionOutCome = FhirOperationUtil.createFhirResource(fhirClient, activityDefinition, ResourceType.AuditEvent.name());
        idList.add(ResourceType.ActivityDefinition.name() + "/" + FhirOperationUtil.getFhirId(activityDefinitionOutCome));
    }


    private List<CarePlanDto> convertListtoCarePlanDto(List<Bundle.BundleEntryComponent> retrievecareplans) {
        return retrievecareplans.stream().map(this::mapbundletoCarePlan).collect(toList());
    }

    private CarePlanDto mapbundletoCarePlan(Bundle.BundleEntryComponent careplanbundle) {
        CarePlanDto carePlanDto = new CarePlanDto();
        CarePlan carePlan = (CarePlan) careplanbundle.getResource();

        // ID
        carePlanDto.setLogicalId(carePlan.getIdElement().getIdPart());

        // ResourceURL
        carePlanDto.setResourceURL(carePlan.getIdElement().getBaseUrl());


        // Canonical;
        List<String> canonicals = carePlan.getInstantiatesCanonical().stream().map(PrimitiveType::getValueAsString).collect(toList());

        carePlanDto.setInstantiatesCanonical(canonicals);

        // Status
        carePlanDto.setStatus(carePlan.getStatusElement().getCode());

        // Intent
        carePlanDto.setIntent(carePlan.getIntentElement().getCode());

        // Category
        List<CodeDto> categoriescodes = carePlan.getCategory().stream().map(categoriycode -> {
            CodeDto codeDto = new CodeDto();
            List<gov.samhsa.ocp.ocpfis.service.dto.valueset.Coding> codings = categoriycode.getCoding().stream().map(coding -> {
                gov.samhsa.ocp.ocpfis.service.dto.valueset.Coding codingcat = new gov.samhsa.ocp.ocpfis.service.dto.valueset.Coding();
                codingcat.setCode(coding.getCode());
                codingcat.setSystem(coding.getSystem());
                return codingcat;
            }).collect(toList());
            codeDto.setCoding(codings);
            return codeDto;
        }).collect(toList());

        carePlanDto.setCategory(categoriescodes);

        // Title
        carePlanDto.setTitle(carePlan.getTitle());

        // Description
        carePlanDto.setDescription(carePlan.getDescription());

        // Subject
        SubjectReferenceDto subjectReferenceDto = new SubjectReferenceDto();
        subjectReferenceDto.setReference(carePlan.getSubject().getReference());
        carePlanDto.setSubject(subjectReferenceDto);

        // Period
        PeriodDto periodDto = new PeriodDto();
        if (!carePlan.getPeriod().isEmpty()) {
            periodDto.setEnd(carePlan.getPeriod().getEnd().toInstant().atZone(ZoneId.systemDefault()).toLocalDate());
            periodDto.setStart(carePlan.getPeriod().getStart().toInstant().atZone(ZoneId.systemDefault()).toLocalDate());
            carePlanDto.setPeriod(periodDto);
        }

        // Created
        carePlanDto.setCreated(carePlan.getCreated().toInstant().atZone(ZoneId.systemDefault()).toLocalDate());

        // Author
        AuthorDto authorDto = new AuthorDto();
        authorDto.setReference(carePlan.getAuthor().getReference());
        carePlanDto.setAuthor(authorDto);

        // Contributor
        List<SubjectReferenceDto> contributorList = carePlan.getContributor().stream().map(contributor -> {
            SubjectReferenceDto contributorReference = new SubjectReferenceDto();
            contributorReference.setReference(contributor.getReference());
            return contributorReference;
        }).collect(toList());

        carePlanDto.setContributor(contributorList);

        //CareTeam
        List<SubjectReferenceDto> careTeamList = carePlan.getCareTeam().stream().map(careteam -> {
            SubjectReferenceDto careteamReference = new SubjectReferenceDto();
            careteamReference.setReference(careteam.getReference());
            return careteamReference;
        }).collect(toList());

        carePlanDto.setCareTeam(careTeamList);

        // Activity
        List<ActivityCarePlanDto> activities = carePlan.getActivity().stream().map(activity -> {
            ActivityReferenceDto activityReferenceDto = new ActivityReferenceDto();
            ActivityCarePlanDto activityCarePlanDto = new ActivityCarePlanDto();
            SubjectReferenceDto goalreference = new SubjectReferenceDto();
            List<SubjectReferenceDto> goalreferences = new ArrayList<>();
            if (!activity.getOutcomeReference().isEmpty() && activity.getOutcomeReference().size() > 0) {
                activityReferenceDto.setReference(activity.getOutcomeReference().get(0).getReference());
                activityCarePlanDto.setReference(activityReferenceDto);
            }
//
//            List<SubjectReferenceDto> goalreferences = activity.getDetail().getGoal().stream().map(goal -> {
//                SubjectReferenceDto goalreference = new SubjectReferenceDto();
//                goalreference.setReference(goal.getReference());
//                return goalreference;
//            }).collect(toList());

            // Goal Reference
            goalreference.setReference(activity.getDetail().getGoal().get(0).getReference());
            goalreferences.add(goalreference);
            DetailActivityDto detailActivityDto = new DetailActivityDto();
            detailActivityDto.setGoal(goalreferences);
            activityCarePlanDto.setDetail(detailActivityDto);

            return activityCarePlanDto;

        }).collect(toList());

        carePlanDto.setActivity(activities);

        return carePlanDto;
    }


    private CarePlan mapDtoToCarePlan(CarePlanDto carePlanDto) {
        CarePlan carePlan = new CarePlan();

        // Canonical
        if (carePlanDto.getInstantiatesCanonical().size() > 0 && carePlanDto.getInstantiatesCanonical() != null) {

            CanonicalType canonicalType = new CanonicalType();
            canonicalType.fhirType();
            canonicalType.setValue(fisProperties.getFhir().getServerUrl() + "/" + carePlanDto.getInstantiatesCanonical().get(0));

            List<CanonicalType> canonicalTypes = new ArrayList<>();
            canonicalTypes.add(canonicalType);

            carePlan.setInstantiatesCanonical(canonicalTypes);
        }

        // Status
        carePlan.setStatus(CarePlan.CarePlanStatus.valueOf(carePlanDto.getStatus().toUpperCase(Locale.ROOT)));

        // Intent
        carePlan.setIntent(CarePlan.CarePlanIntent.valueOf(carePlanDto.getIntent().toUpperCase(Locale.ROOT)));

        // Category
        if (carePlanDto.getCategory().size() > 0 && carePlanDto.getCategory() != null) {
            List<CodeableConcept> codeableConcepts = carePlanDto.getCategory().stream().map(category -> {
                CodeableConcept codeableConcept = new CodeableConcept();
                List<Coding> codings = category.getCoding().stream().map(coding -> {
                    Coding codingcategory = new Coding();
                    codingcategory.setCode(coding.getCode());
                    codingcategory.setSystem(coding.getSystem());
                    return codingcategory;
                }).collect(toList());
                codeableConcept.setCoding(codings);
                return codeableConcept;
            }).collect(toList());

            carePlan.setCategory(codeableConcepts);
        }

        // Title
        carePlan.setTitle(carePlanDto.getTitle());

        // Description
        carePlan.setDescription(carePlanDto.getDescription());

        // Subject
        Reference subjectReference = new Reference();
        subjectReference.setReference(carePlanDto.getSubject().getReference());
        carePlan.setSubject(subjectReference);

        // Period
        Period period = new Period();

        try {
            Date end = new SimpleDateFormat("yyyy-MM-dd").parse(carePlanDto.getPeriod().getEnd().toString());
            Date start = new SimpleDateFormat("yyyy-MM-dd").parse(carePlanDto.getPeriod().getStart().toString());

            period.setEnd(end);
            period.setStart(start);

            carePlan.setPeriod(period);
        } catch (ParseException e) {
            System.out.println(e.getMessage());
        }


        // Created
        try {
            Date created = new SimpleDateFormat("yyyy-MM-dd").parse(carePlanDto.getCreated().toString());
            carePlan.setCreated(created);
        } catch (ParseException e) {
            System.out.println(e.getMessage());
        }


        // Author
        Reference authorReference = new Reference();
        authorReference.setReference(carePlanDto.getAuthor().getReference());
        carePlan.setAuthor(authorReference);

        // Contributor
        if (carePlanDto.getContributor().size() > 0 && carePlanDto.getContributor() != null) {
            List<Reference> contributors = carePlanDto.getContributor().stream().map(contributor -> {
                Reference reference = new Reference();
                reference.setReference(contributor.getReference());
                return reference;
            }).collect(toList());

            carePlan.setContributor(contributors);
        }

        // CareTeam
        if (carePlanDto.getCareTeam().size() > 0 && carePlanDto.getCareTeam() != null) {
            List<Reference> careteams = carePlanDto.getCareTeam().stream().map(careteam -> {
                Reference reference = new Reference();
                reference.setReference(careteam.getReference());
                return reference;
            }).collect(toList());

            carePlan.setCareTeam(careteams);
        }

        return carePlan;
    }


}
