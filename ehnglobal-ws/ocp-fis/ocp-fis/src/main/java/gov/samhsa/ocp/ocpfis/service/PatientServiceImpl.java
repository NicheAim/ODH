package gov.samhsa.ocp.ocpfis.service;

import static ca.uhn.fhir.rest.api.Constants.PARAM_LASTUPDATED;
import static java.util.stream.Collectors.toList;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.Instant;
import java.time.ZoneId;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collection;
import java.util.Collections;
import java.util.Comparator;
import java.util.Date;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;
import java.util.stream.Stream;

import gov.samhsa.ocp.ocpfis.util.pagination.PaginationRepository;
import org.apache.commons.lang.RandomStringUtils;
import org.hl7.fhir.exceptions.FHIRException;
import org.hl7.fhir.r4.model.Bundle;
import org.hl7.fhir.r4.model.Bundle.BundleEntryComponent;
import org.hl7.fhir.r4.model.CareTeam;
import org.hl7.fhir.r4.model.CodeableConcept;
import org.hl7.fhir.r4.model.Coding;
import org.hl7.fhir.r4.model.Consent;
import org.hl7.fhir.r4.model.Coverage;
import org.hl7.fhir.r4.model.Enumerations;
import org.hl7.fhir.r4.model.EpisodeOfCare;
import org.hl7.fhir.r4.model.Extension;
import org.hl7.fhir.r4.model.Flag;
import org.hl7.fhir.r4.model.IdType;
import org.hl7.fhir.r4.model.Identifier;
import org.hl7.fhir.r4.model.Meta;
import org.hl7.fhir.r4.model.Observation;
import org.hl7.fhir.r4.model.Organization;
import org.hl7.fhir.r4.model.Patient;
import org.hl7.fhir.r4.model.Period;
import org.hl7.fhir.r4.model.Person;
import org.hl7.fhir.r4.model.Practitioner;
import org.hl7.fhir.r4.model.PractitionerRole;
import org.hl7.fhir.r4.model.Reference;
import org.hl7.fhir.r4.model.ResourceType;
import org.hl7.fhir.r4.model.Task;
import org.hl7.fhir.r4.model.codesystems.V3ParticipationType;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import com.google.gson.Gson;

import ca.uhn.fhir.context.FhirContext;
import ca.uhn.fhir.parser.IParser;
import ca.uhn.fhir.rest.api.MethodOutcome;
import ca.uhn.fhir.rest.client.api.IGenericClient;
import ca.uhn.fhir.rest.gclient.IQuery;
import ca.uhn.fhir.rest.gclient.ReferenceClientParam;
import ca.uhn.fhir.rest.gclient.TokenClientParam;
import ca.uhn.fhir.validation.FhirValidator;
import gov.samhsa.ocp.ocpfis.config.FisProperties;
import gov.samhsa.ocp.ocpfis.constants.ActivityDefinitionConstants;
import gov.samhsa.ocp.ocpfis.constants.CareTeamConstants;
import gov.samhsa.ocp.ocpfis.domain.CodeSystemEnum;
import gov.samhsa.ocp.ocpfis.domain.ProvenanceActivityEnum;
import gov.samhsa.ocp.ocpfis.domain.SearchKeyEnum;
import gov.samhsa.ocp.ocpfis.domain.StructureDefinitionEnum;
import gov.samhsa.ocp.ocpfis.infrastructure.MintClient;
import gov.samhsa.ocp.ocpfis.service.dto.CareTeamDto;
import gov.samhsa.ocp.ocpfis.service.dto.CoverageDto;
import gov.samhsa.ocp.ocpfis.service.dto.EpisodeOfCareDto;
import gov.samhsa.ocp.ocpfis.service.dto.FlagDto;
import gov.samhsa.ocp.ocpfis.service.dto.IdentifierDto;
import gov.samhsa.ocp.ocpfis.service.dto.ObservationDto;
import gov.samhsa.ocp.ocpfis.service.dto.PageDto;
import gov.samhsa.ocp.ocpfis.service.dto.ParticipantDto;
import gov.samhsa.ocp.ocpfis.service.dto.PatientDto;
import gov.samhsa.ocp.ocpfis.service.dto.PeriodDto;
import gov.samhsa.ocp.ocpfis.service.dto.ReferenceDto;
import gov.samhsa.ocp.ocpfis.service.dto.ValueSetDto;
import gov.samhsa.ocp.ocpfis.service.exception.BadRequestException;
import gov.samhsa.ocp.ocpfis.service.exception.DuplicateResourceFoundException;
import gov.samhsa.ocp.ocpfis.service.exception.FHIRClientException;
import gov.samhsa.ocp.ocpfis.service.exception.MINTClientException;
import gov.samhsa.ocp.ocpfis.service.exception.PatientNotFoundException;
import gov.samhsa.ocp.ocpfis.service.exception.ResourceNotFoundException;
import gov.samhsa.ocp.ocpfis.service.mapping.CoverageToCoverageDtoMap;
import gov.samhsa.ocp.ocpfis.service.mapping.EpisodeOfCareToEpisodeOfCareDtoMapper;
import gov.samhsa.ocp.ocpfis.service.mapping.ObservationToObservationDtoMap;
import gov.samhsa.ocp.ocpfis.service.mapping.dtotofhirmodel.CareTeamDtoToCareTeamConverter;
import gov.samhsa.ocp.ocpfis.service.validation.FhirInternalValidator;
import gov.samhsa.ocp.ocpfis.util.DateUtil;
import gov.samhsa.ocp.ocpfis.util.FhirDtoUtil;
import gov.samhsa.ocp.ocpfis.util.FhirOperationUtil;
import gov.samhsa.ocp.ocpfis.util.FhirProfileUtil;
import gov.samhsa.ocp.ocpfis.util.FhirResourceUtil;
import gov.samhsa.ocp.ocpfis.util.ProvenanceUtil;
import gov.samhsa.ocp.ocpfis.util.RichStringClientParam;
import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
public class PatientServiceImpl implements PatientService {

    private final IGenericClient fhirClient;
    private final IParser iParser;
    private final ModelMapper modelMapper;
    private final FhirValidator fhirValidator;
    private final FisProperties fisProperties;
    private final LookUpService lookUpService;
    private final CoverageServiceImpl coverageService;
    private final ProvenanceUtil provenanceUtil;
    private final MintClient mintClient;
    private final FhirInternalValidator fhirInternalValidator;
    private final RelatedPersonServiceImpl relatedPersonService;

    public PatientServiceImpl(IGenericClient fhirClient, IParser iParser, ModelMapper modelMapper,
            FhirValidator fhirValidator, FisProperties fisProperties, LookUpService lookUpService,
            ProvenanceUtil provenanceUtil, CoverageServiceImpl coverageService, MintClient mintClient,
            FhirInternalValidator fhirInternalValidator, RelatedPersonServiceImpl relatedPersonService) {
        this.fhirClient = fhirClient;
        this.iParser = iParser;
        this.modelMapper = modelMapper;
        this.fhirValidator = fhirValidator;
        this.fisProperties = fisProperties;
        this.lookUpService = lookUpService;
        this.coverageService = coverageService;
        this.provenanceUtil = provenanceUtil;
        this.mintClient = mintClient;
        this.fhirInternalValidator = fhirInternalValidator;
        this.relatedPersonService = relatedPersonService;
    }

    @Override
    public List<PatientDto> getPatients() {
        // log.debug("Patients Query to FHIR Server: START");
        Bundle response = fhirClient.search()
                .forResource(Patient.class)
                .returnBundle(Bundle.class)
                .sort().descending(PARAM_LASTUPDATED)
                .revInclude(Observation.INCLUDE_SUBJECT)
                .revInclude(Task.INCLUDE_PATIENT)
                .encodedJson()
                .execute();
        // log.debug("Patients Query to FHIR Server: END");
        return convertBundleToPatientDtos(response, Boolean.FALSE);
    }

    private Optional<PatientDto> getPatientByMrn(String mrn) {
        int numberOfPatientsPerPage = PaginationRepository.getValidPageSize(fisProperties, Optional.of(10),
                ResourceType.Patient.name());
        IQuery PatientSearchQuery = fhirClient.search().forResource(Patient.class).sort().descending(PARAM_LASTUPDATED);
        PatientSearchQuery.where(new TokenClientParam("identifier").exactly().code(mrn));
        Bundle firstPagePatientSearchBundle = (Bundle) PatientSearchQuery
                .revInclude(Flag.INCLUDE_PATIENT)
                .revInclude(EpisodeOfCare.INCLUDE_PATIENT)
                .revInclude(Coverage.INCLUDE_BENEFICIARY)
                .returnBundle(Bundle.class)
                .encodedJson()
                .execute();
        List<PatientDto> patientDtos = convertAllBundleToSinglePatientDtoList(firstPagePatientSearchBundle,
        fisProperties.getFhir().getNumber_bundle_per_page_patients_max(), Optional.empty(), null);
        return patientDtos.stream().findFirst();
    }

    @Override
    public PageDto<PatientDto> getPatientsByValue(Optional<String> searchKey, Optional<String> value,
            Optional<String> filterKey, Optional<String> organization, Optional<String> practitioner,
            Optional<Boolean> showInactive, Optional<Integer> page, Optional<Integer> size, Optional<Boolean> showAll) {
        int numberOfPatientsPerPage = PaginationRepository.getValidPageSize(fisProperties, size, ResourceType.Patient.name());

        IQuery PatientSearchQuery = fhirClient.search().forResource(Patient.class).sort().descending(PARAM_LASTUPDATED);
        // IQuery PatientSearchQuery = fhirClient.search().forResource(Patient.class)
        // .revInclude(Observation.INCLUDE_SUBJECT).sort().descending(PARAM_LASTUPDATED);

        if (showInactive.isPresent()) {
            if (!showInactive.get()) {
                // show only active patients
                PatientSearchQuery.where(new TokenClientParam("active").exactly().code(Boolean.TRUE.toString()));
            }
        }

        if (filterKey.isPresent() && SearchKeyEnum.PatientFilterKey.contains(filterKey.get())
                && SearchKeyEnum.PatientFilterKey.ASSOCIATECARETEAMPATIENT.name().equalsIgnoreCase(filterKey.get())) {
            log.info("Searching Patients in Organization and Practitioner: "+ organization.get() + "," + practitioner.get());
            List<String> associated = patientsAssociatedWithPractitioner(practitioner.get(), organization.get());
            if (!associated.isEmpty()) {
                PatientSearchQuery.where(new TokenClientParam("_id").exactly().codes(associated));
            } else {
                log.info("No Patients were found for given organization.");
                return new PageDto<>(new ArrayList<>(), numberOfPatientsPerPage, 0, 0, 0, 0);
            }
        } else if (organization.isPresent()) {
            log.info("Searching Patients in Organization: "+ organization.get());
//            List<String> patientsInOrg = patientsInOrganization(organization.get());
//            if (!patientsInOrg.isEmpty()) {
                PatientSearchQuery.where(new ReferenceClientParam("organization").hasId(organization.get()));
//                PatientSearchQuery
//                        .where(new TokenClientParam("_id").exactly().codes(patientsInOrg));
//            } else {
//                log.info("No Patients were found for given organization.");
//                return new PageDto<>(new ArrayList<>(), numberOfPatientsPerPage, 0, 0, 0, 0);
//            }
        }

        searchKey.ifPresent(key -> {
            log.info("searchKey is present");
            if (key.equalsIgnoreCase(SearchKeyEnum.CommonSearchKey.NAME.name())) {
                value.ifPresent(
                        s -> {
                            log.info("name:");
                            log.info(s);
                            PatientSearchQuery.where(new RichStringClientParam("name").contains().value(s.trim()));
                        });
            } else if (key.equalsIgnoreCase(SearchKeyEnum.CommonSearchKey.IDENTIFIER.name())) {
                value.ifPresent(
                        s -> {

                            log.info("identifier:");
                            log.info(s.trim());
                            if(s != null && !s.trim().trim().isEmpty()){
                                PatientSearchQuery.where(new TokenClientParam("identifier").exactly().code(s.trim()));
                            }
                        });
            } else if (key.equalsIgnoreCase(SearchKeyEnum.CommonSearchKey.FULLNAME.name())) {
                log.info("fullname exact match");
                value.ifPresent(s -> PatientSearchQuery
                        .where(new RichStringClientParam("name").matchesExactly().value(s.trim())));
            } else {
                throw new BadRequestException("Invalid Type Values");
            }
        });

        Bundle firstPagePatientSearchBundle;
        boolean firstPage = true;
        log.info("Patients Search Query to FHIR Server: START");
        firstPagePatientSearchBundle = (Bundle) PatientSearchQuery
                .count(fisProperties.getFhir().getNumber_bundle_per_page_patients_max())
                .revInclude(Flag.INCLUDE_PATIENT)
                .revInclude(EpisodeOfCare.INCLUDE_PATIENT)
                .revInclude(Coverage.INCLUDE_BENEFICIARY)
                .revInclude(Observation.INCLUDE_SUBJECT)
                .revInclude(Task.INCLUDE_PATIENT)
                .returnBundle(Bundle.class)
                .encodedJson()
                .execute();
//        String query = PatientSearchQuery.toString();
        log.info("Patients Search Query to FHIR Server: END ");
//        log.info(query);

        List<PatientDto> patientDtos = convertAllBundleToSinglePatientDtoList(firstPagePatientSearchBundle,
        fisProperties.getFhir().getNumber_bundle_per_page_patients_max(), filterKey, practitioner);

        if (filterKey.isPresent() && SearchKeyEnum.PatientFilterKey.contains(filterKey.get())
                && SearchKeyEnum.PatientFilterKey.UNASSIGNPATIENT.name().equalsIgnoreCase(filterKey.get())) {
            patientDtos = patientDtos.stream()
                    .filter(pdto -> practitionerAssignedToPatient(careTeamBundle(pdto)))
                    .collect(toList());
        }

        if (filterKey.isPresent() && SearchKeyEnum.PatientFilterKey.contains(filterKey.get())
                && SearchKeyEnum.PatientFilterKey.NOTMEETINGSIL.name().equalsIgnoreCase(filterKey.get())) {
            log.debug("querying patients not meeting SIL");
        } else {
            patientDtos = patientDtos.stream()
                    .filter(pdto -> {
                        if (pdto.getSil() != null && pdto.getSil().isPresent()) {
                            if (pdto.getSil().get().getValueCodeableConcept() != null) {
                                if (pdto.getSil().get().getValueCodeableConcept().getCoding().size() > 0) {
                                    gov.samhsa.ocp.ocpfis.service.dto.valueset.Coding coding = pdto.getSil().get()
                                            .getValueCodeableConcept().getCoding().get(0);
                                    if (!coding.getCode().isEmpty()) {
                                        int silValue = Integer.parseInt(coding.getCode());
                                        return silValue >= 2;
                                    }
                                }
                            }
                        }
                        return false;
                    }).collect(toList());
        }

        if (showAll.isPresent() && showAll.get()) {
            return (PageDto<PatientDto>) PaginationRepository.applyPaginationForCustomArrayList(patientDtos,
                    patientDtos.size(), Optional.of(1), false);
        }

        return (PageDto<PatientDto>) PaginationRepository.applyPaginationForCustomArrayList(patientDtos,
                numberOfPatientsPerPage, page, false);
    }

    @Override
    public PageDto<PatientDto> getPatientsByPractitioner(Optional<String> practitioner, Optional<String> searchKey,
            Optional<String> searchValue, Optional<Boolean> showInactive, Optional<Integer> pageNumber,
            Optional<Integer> pageSize) {
        int numberOfPatientsPerPage = PaginationRepository.getValidPageSize(fisProperties, pageSize,
                ResourceType.Patient.name());
        List<PatientDto> patients = this.getPatientsByPractitioner(practitioner, searchKey, searchValue);

        return (PageDto<PatientDto>) PaginationRepository.applyPaginationForCustomArrayList(patients, numberOfPatientsPerPage,
                pageNumber, false);
    }

    @Override
    public List<PatientDto> getPatientsByPractitioner(Optional<String> practitioner, Optional<String> searchKey,
            Optional<String> searchValue) {
        List<PatientDto> patients = new ArrayList<>();

        IQuery practitionerQuery = fhirClient.search().forResource(CareTeam.class);

        practitioner.ifPresent(practitionerId -> practitionerQuery
                .where(new ReferenceClientParam("participant").hasId(practitionerId)));

        Bundle bundle = (Bundle) practitionerQuery
                .include(CareTeam.INCLUDE_PATIENT)
                .sort().ascending(CareTeam.RES_ID)
                .returnBundle(Bundle.class)
                .execute();

        if (bundle != null) {
            List<Bundle.BundleEntryComponent> components = FhirOperationUtil.getAllBundleComponentsAsList(bundle,
                    Optional.empty(), fhirClient, fisProperties);
            if (components != null && !components.isEmpty()) {
                patients = components.stream()
                        .filter(it -> it.getResource().getResourceType().equals(ResourceType.Patient))
                        .map(it -> (Patient) it.getResource())
                        .filter(it -> filterBySearchKey(it, searchKey, searchValue))
                        .map(patient -> mapPatientToPatientDto(patient, bundle.getEntry(), true))
                        .distinct()
                        .collect(toList());
            }
        }
        return patients;
    }

    private boolean filterBySearchKey(Patient patient, Optional<String> searchKey, Optional<String> searchValue) {
        // returning everything if searchKey is not present, change to false later.
        if (searchKey.isPresent() && searchValue.isPresent()) {
            if (searchKey.get().equalsIgnoreCase(SearchKeyEnum.CommonSearchKey.NAME.name())) {
                return FhirResourceUtil.checkPatientName(patient, searchValue.get());
            } else if (searchKey.get().equalsIgnoreCase(SearchKeyEnum.CommonSearchKey.IDENTIFIER.name())) {
                return FhirResourceUtil.checkPatientId(patient, searchValue.get());
            }
        }
        return true;
    }

    private Bundle careTeamBundle(PatientDto patientDto) {
        return fhirClient.search().forResource(CareTeam.class)
                .where(new ReferenceClientParam("subject").hasId(patientDto.getId())).returnBundle(Bundle.class)
                .execute();
    }

    private Boolean practitionerAssignedToPatient(Bundle careTeamBundle) {
        List<CareTeam> resource = careTeamBundle.getEntry().stream().map(ct -> {
            return (CareTeam) ct.getResource();
        }).collect(toList());

        return resource.stream()
                .flatMap(ct -> ct.getParticipant().stream()
                        .map(par -> {
                            if (par.getRole() != null && par.getRole().size() > 0) {
                                return par.getRole().get(0).getCoding().stream().findFirst().get().getCode();
                            } else {
                                return "";
                            }
                        }))
                .filter(r -> lookUpService.getParticipantRoles().stream().map(role -> role.getCode().trim())
                        .collect(toList()).contains(r.trim()))
                .collect(toList())
                .isEmpty();
    }


    /**
     * Method to set Observations and Tasks from Patients
     * avoiding multiple queries
     * @param patientDto PatientDto
     * @param searchbundle Bundle.getEntry()
     * @param patient Patient Resource
     */
    private void setPatientObservationsandTasks(PatientDto patientDto, List<Bundle.BundleEntryComponent> searchbundle, Patient patient) {
        // Filter Bundle to Find Tasks
        List<BundleEntryComponent> tasklist = searchbundle.stream().parallel()
                .filter(bundleEntryComponent -> bundleEntryComponent.getResource().getResourceType().equals(ResourceType.Task)).collect(toList());
        // Filter Bundle to find Observations
        List<BundleEntryComponent> observationlist = searchbundle.stream().parallel()
                .filter(bundleEntryComponent -> bundleEntryComponent.getResource().getResourceType().equals(ResourceType.Observation)).collect(toList());

        // Parse Tasks
        if (tasklist.size() > 0) {
            List<String> types = tasklist.stream().parallel().map(task -> {
                Task task_patient = (Task) task.getResource();
                String referenceIndex = task_patient.getFor().getReference();
                try {
                    if ( task_patient.getFor().getReference().substring(referenceIndex.indexOf("/") + 1).equals(patientDto.getId())) {
                        return task_patient.getFocus().getDisplay() + " - Due: "
                        + DateUtil.convertDateToString(task_patient.getExecutionPeriod().getEnd());
                    } 
                    return "";
                    
                } catch (FHIRException e) {
                    return "";
                }
            }).distinct().collect(toList());
            if (types.isEmpty()) {
                patientDto.setActivityTypes(Optional.empty());
            } else {
                // Remove TO-DO task
                types.removeIf(t -> t.startsWith(ActivityDefinitionConstants.TO_DO));
                patientDto.setActivityTypes(Optional.of(types));
            }
        }

        // Parse Observation and get SIL
        if (observationlist.size() > 0) {
            List<ObservationDto> observationDtos = getObservationsForEachPatient(observationlist, patient.getIdElement().getIdPart());

            List<ObservationDto> silList = observationDtos.stream().parallel().filter(observation -> {
                List<gov.samhsa.ocp.ocpfis.service.dto.valueset.Coding> codings = observation.getCode().getCoding();
                if (codings.size() > 0) {
                    for (gov.samhsa.ocp.ocpfis.service.dto.valueset.Coding coding : codings) {
                        if (coding.getCode().equalsIgnoreCase("sil")) {
                            return true;
                        }
                    }
                }
                return false;
            }).collect(Collectors.toList());

            if (silList.size() > 0) {
                ObservationDto latestSil = Collections.max(silList,
                        Comparator.comparing(s -> {
                            // Validate if has Issued
                            Date issued_date;
                            String issued;
                            // Avoiding Null Pointer Exception in s.getIssued()
                            try{
                                issued = s.getIssued().get();
                                try {
                                    issued_date = DateUtil.convertStringToSimpleDateTime(issued);
                                } catch (ParseException e) {
//                                    e.printStackTrace();
                                    issued_date =  new Date(Long.MIN_VALUE);
                                }
                            } catch (NullPointerException ex) {
                                issued_date =  new Date(Long.MIN_VALUE);
                            }
                            return issued_date;
                        }));
                patientDto.setSil(Optional.of(latestSil));
            }
        }
    }

    private PatientDto mapPatientToPatientDto(Patient patient, List<Bundle.BundleEntryComponent> response, boolean frompractitioner) {
        PatientDto patientDto = modelMapper.map(patient, PatientDto.class);
        patientDto.setId(patient.getIdElement().getIdPart());
        patientDto.setMrn(patientDto.getIdentifier().stream()
                .filter(iden -> iden.getSystem().equalsIgnoreCase(fisProperties.getPatient().getMrn().getCodeSystem()))
                .findFirst().map(IdentifierDto::getValue));
        patientDto.setIdentifier(patientDto.getIdentifier().stream()
                .filter(iden -> !iden.getSystem().equalsIgnoreCase(fisProperties.getPatient().getMrn().getCodeSystem()))
                .collect(toList()));

        if (patient.hasMeta()) {
            if (patient.getMeta().hasTag()) {
                Optional<Coding> createdOnCode = patient.getMeta().getTag().stream()
                        .filter(c -> c.getCode().equalsIgnoreCase("added-to-odh-on")).findFirst();
                createdOnCode.ifPresent(coding -> patientDto.setCreatedOnCode(Optional.of(coding.getDisplay())));
            }
        }

        // Check if request comes from a Practitioner query or Patient Query
        if(!frompractitioner) {
            setPatientObservationsandTasks(patientDto, response, patient);
        } else {
            Bundle patientSearchQuery = (Bundle) fhirClient.search().forResource(Patient.class)
                    .where(new TokenClientParam("_id").exactly().code(patient.getIdElement().getIdPart()))
                    .revInclude(Observation.INCLUDE_SUBJECT)
                    .revInclude(Task.INCLUDE_PATIENT)
                    .returnBundle(Bundle.class).encodedJson().execute();
            setPatientObservationsandTasks(patientDto, patientSearchQuery.getEntry(), patient);
        }

        // Set Gender Code
        if (patient.getGender() != null) {
            patientDto.setGenderCode(patient.getGender().toCode());
        }

        // Set Lang
        setLanguageInDto(patient, patientDto);

        mapExtensionFields(patient, patientDto);

//        setPatientSIL((Bundle) response,patient,patientDto);

        // Getting flags into the patient dto
        List<FlagDto> flagDtos = getFlagsForEachPatient(response, patient.getIdElement().getIdPart());
        patientDto.setFlags(Optional.ofNullable(flagDtos));

        List<CoverageDto> coverageDtos = getConveragesForEachPatient(response, patient.getIdElement().getIdPart());
        patientDto.setCoverages(Optional.ofNullable(coverageDtos));

        List<EpisodeOfCareDto> episodeOfCareDtos = getEocsForEachPatient(response, patient.getIdElement().getIdPart());
        patientDto.setEpisodeOfCares(episodeOfCareDtos);

        // set Organization
        ReferenceDto organization = new ReferenceDto();
        organization.setDisplay(patient.getManagingOrganization().getDisplay());
        organization.setReference(patient.getManagingOrganization().getReference());
        patientDto.setOrganizations(Optional.of(Collections.singletonList(organization)));
        return patientDto;
    }

    @Override
    public void createPatient(PatientDto patientDto, Optional<String> loggedInUser) {
        // captures ids of all fhir resources created
        List<String> idList = new ArrayList<>();
        // if already in other organization: false, need update Person resource
        // if new patient: true, need create Person resource
        boolean isNewPatient = patientDto.getMrn().isPresent() ? false : true;
        String mrn = patientDto.getMrn().isPresent() ? patientDto.getMrn().get() : generateRandomMrn();

        if (!checkDuplicatePatientOfSameOrganization(patientDto)) {
            if (checkDuplicateInFhir(patientDto)) {
                patientDto.getIdentifier()
                        .add(setUniqueIdentifierForPatient(patientsWithMatchedDuplicateCheckParameters(patientDto)
                                .stream()
                                .map(pat -> (Patient) pat.getResource()).findAny().get().getIdentifier().stream()
                                .filter(iden -> iden.getSystem()
                                        .equalsIgnoreCase(fisProperties.getPatient().getMrn().getCodeSystem()))
                                .map(Identifier::getValue).findAny().orElse(mrn)));
            } else {
                patientDto.getIdentifier().add(setUniqueIdentifierForPatient(mrn));
            }
            patientDto.setMrn(Optional.of(mrn));

            ReferenceDto orgReferenceDto = orgReference(patientDto.getOrganizationId());
            patientDto.setOrganizations(Optional.of(Arrays.asList(orgReferenceDto)));

            final Patient patient = modelMapper.map(patientDto, Patient.class);
            patient.setManagingOrganization(FhirDtoUtil.mapReferenceDtoToReference(orgReferenceDto));
            patient.setGender(FhirResourceUtil.getPatientGender(patientDto.getGenderCode()));
            patient.setBirthDate(java.sql.Date.valueOf(patientDto.getBirthDate()));

            Coding coding = new Coding();
            coding.setDisplay(Instant.now().toString());
            coding.setCode("created-on-code");

            List<Coding> codingList = new ArrayList<>();
            codingList.add(coding);

            Meta meta = new Meta();
            meta.setTag(codingList);
            patient.setMeta(meta);

            setLanguage(patient, patientDto);
            setExtensionFields(patient, patientDto);

            // Set Profile Meta Data
            // FhirProfileUtil.setPatientProfileMetaData(fhirClient, patient);
            // Validate
            // TODO: FIX FHIR4 validation results
            if (fisProperties.isValidationEnabled()) {
                FhirOperationUtil.validateFhirResource(fhirValidator, patient, Optional.empty(),
                        ResourceType.Patient.name(), "Create Patient");
            }

            // Create patient in Mint first then FHIR
            if (fisProperties.isMintEnabled()) {
                try {
                    Gson gson = new Gson();
                    String json = gson.toJson(patientDto);
                    mintClient.createPatient(patientDto);
                } catch (Exception e) {
                    log.error("MINT server error");
                    throw new MINTClientException("Mint client is not able to create patient:" + e.getMessage());
                }
            }

            // Create fhir Patient
            MethodOutcome patientMethodOutcome = FhirOperationUtil.createFhirResource(fhirClient, patient,
                    ResourceType.Patient.name());
            idList.add(ResourceType.Patient.name() + "/" + FhirOperationUtil.getFhirId(patientMethodOutcome));

            // Assign fhir Patient resource id.
            Reference patientId = new Reference();
            String patientLogicalId = patientMethodOutcome.getId().getIdPart();
            patientId.setReference("Patient/" + patientLogicalId);
            patientId.setDisplay(
                    patient.getName().get(0).getGiven().get(0) + " " + patient.getName().get(0).getFamily());

            Person.PersonLinkComponent personLinkComponent = new Person.PersonLinkComponent();
            personLinkComponent.setTarget(patientId);
            if (isNewPatient) {
                // Create Person
                final Person person = modelMapper.map(patient, Person.class);
                person.setLink(Arrays.asList(personLinkComponent));

                // FhirProfileUtil.setPersonProfileMetaData(fhirClient, person);
                FhirOperationUtil.createFhirResource(fhirClient, person, ResourceType.Person.name());
            } else {
                // Existing in other organization, Update Person
                updatePerson(mrn, personLinkComponent);
            }

            // Create flag for the patient
            patientDto.getFlags().ifPresent(flags -> flags.forEach(flagDto -> {
                Flag flag = convertFlagDtoToFlag(patientId, flagDto);
                // Set Profile Meta Data
                // FhirProfileUtil.setFlagProfileMetaData(fhirClient, flag);
                // Validate
                FhirOperationUtil.validateFhirResource(fhirValidator, flag, Optional.empty(), ResourceType.Flag.name(),
                        "Create Flag(When creating Patient)");
                // Create
                MethodOutcome flagMethodOutcome = FhirOperationUtil.createFhirResource(fhirClient, flag,
                        ResourceType.Flag.name());
                idList.add(ResourceType.Flag.name() + "/" + FhirOperationUtil.getFhirId(flagMethodOutcome));
            }));

            // Create To-Do task
            Task task = FhirResourceUtil.createToDoTask(patientMethodOutcome.getId().getIdPart(),
                    patientDto.getPractitionerId().orElse(fisProperties.getDefaultPractitioner()),
                    patientDto.getOrganizationId().orElse(fisProperties.getDefaultOrganization()), fhirClient,
                    fisProperties);
            task.setFocus(FhirDtoUtil.mapReferenceDtoToReference(FhirResourceUtil.getRelatedActivityDefinition(
                    patientDto.getOrganizationId().orElse(fisProperties.getDefaultOrganization()),
                    ActivityDefinitionConstants.TO_DO, fhirClient, fisProperties)));
            // Set Profile Meta Data
            // FhirProfileUtil.setTaskProfileMetaData(fhirClient, task);
            // Validate
            // TODO: Verid
            // FhirOperationUtil.validateFhirResource(fhirValidator_internal, task,
            // Optional.empty(), ResourceType.Task.name(), "Create Task(When creating
            // Patient)");
            // Create
            MethodOutcome taskMethodOutcome = FhirOperationUtil.createFhirResource(fhirClient, task,
                    ResourceType.Task.name());
            idList.add(ResourceType.Task.name() + "/" + FhirOperationUtil.getFhirId(taskMethodOutcome));

            // Create EpisodeOfCare and default careTeam
            if (patientDto.getEpisodeOfCares() != null && !patientDto.getEpisodeOfCares().isEmpty()) {
                patientDto.getEpisodeOfCares().forEach(eoc -> {
                    ReferenceDto patientReference = new ReferenceDto();
                    patientReference
                            .setReference(ResourceType.Patient + "/" + patientMethodOutcome.getId().getIdPart());
                    patientDto.getName().stream().findAny().ifPresent(
                            name -> patientReference.setDisplay(name.getFirstName() + " " + name.getLastName()));
                    eoc.setPatient(patientReference);
                    eoc.setManagingOrganization(orgReference(patientDto.getOrganizationId()));
                    if (eoc.getCareManager() == null) {
                        eoc.setCareManager(pracReference(patientDto.getPractitionerId()));
                    }
                    EpisodeOfCare episodeOfCare = convertEpisodeOfCareDtoToEpisodeOfCare(eoc);
                    // Set Profile Meta Data
                    // FhirProfileUtil.setEpisodeOfCareProfileMetaData(fhirClient, episodeOfCare);
                    // Validate
                    FhirOperationUtil.validateFhirResource(fhirValidator, episodeOfCare, Optional.empty(),
                            ResourceType.EpisodeOfCare.name(), "Create EpisodeOfCare(When creating Patient)");
                    // Create
                    MethodOutcome episodeOfCareMethodOutcome = FhirOperationUtil.createFhirResource(fhirClient,
                            episodeOfCare, ResourceType.EpisodeOfCare.name());

                    idList.add(ResourceType.EpisodeOfCare.name() + "/"
                            + FhirOperationUtil.getFhirId(episodeOfCareMethodOutcome));
                });

                // Create default CareTeam from EOC
                try {
                    CareTeamDto defaultCareTeamDto = getDefaultCareTeamDto(patientLogicalId, patientDto);
                    final CareTeam careTeam = CareTeamDtoToCareTeamConverter.map(defaultCareTeamDto);

                    // Set Profile Meta Data
                    // FhirProfileUtil.setCareTeamProfileMetaData(fhirClient, careTeam);

                    // Validate
                    FhirOperationUtil.validateFhirResource(fhirValidator, careTeam, Optional.empty(),
                            ResourceType.CareTeam.name(), "Create CareTeam(Default)");

                    // Create
                    MethodOutcome methodOutcome = FhirOperationUtil.createFhirResource(fhirClient, careTeam,
                            ResourceType.CareTeam.name());
                    idList.add(ResourceType.CareTeam.name() + "/" + FhirOperationUtil.getFhirId(methodOutcome));
                } catch (FHIRException | ParseException e) {
                    throw new FHIRClientException(
                            "FHIR Client returned with an error while creating default care team:" + e.getMessage());
                }
            }

            // Create the emergency contacts
            if (patientDto.getEmergencyContacts() != null) {
                patientDto.getEmergencyContacts().ifPresent(emergencyContacts -> {
                    log.info("Emergency contacts in patient payload");
                    emergencyContacts.forEach(relatedPersonDto -> {
                        relatedPersonDto.setPatient(patientLogicalId);
                        if (relatedPersonDto.getRelatedPersonId() != null) {
                            // log.info("Updating emergency contact");
                            // relatedPersonService.updateRelatedPerson(relatedPersonDto.getRelatedPersonId(),
                            // relatedPersonDto, loggedInUser);
                        } else {
                            log.info("Creating emergency contact");
                            relatedPersonService.createRelatedPerson(relatedPersonDto, loggedInUser);
                        }
                    });
                });
            }

            if (fisProperties.isProvenanceEnabled()) {
                provenanceUtil.createProvenance(idList, ProvenanceActivityEnum.CREATE, loggedInUser);
            }

        } else {
            log.info("Patient already exists with the given identifier system and value");
            throw new DuplicateResourceFoundException(
                    "Patient already exists with the given identifier system and value");
        }
    }

    @Override
    public void updatePatient(PatientDto patientDto, Optional<String> loggedInUser) {
        // captures ids of all fhir resources created
        List<String> idList = new ArrayList<>();
        log.info("Updating Patient");

        if (!isDuplicateWhileUpdate(patientDto)) {
            // Add mpi to the identifiers
            List<IdentifierDto> identifierDtos = patientDto.getIdentifier();
            Patient patientToGetMpi = fhirClient.read().resource(Patient.class).withId(patientDto.getId()).execute();
            Optional<String> mrn = patientToGetMpi.getIdentifier().stream()
                    .filter(p -> p.getSystem().equalsIgnoreCase(fisProperties.getPatient().getMrn().getCodeSystem()))
                    .findFirst().map(Identifier::getValue);

            mrn.ifPresent(m -> identifierDtos.add(setUniqueIdentifierForPatient(m)));

            patientDto.setIdentifier(identifierDtos);
            final Patient patient = modelMapper.map(patientDto, Patient.class);
            patient.setManagingOrganization(
                    FhirDtoUtil.mapReferenceDtoToReference(orgReference(patientDto.getOrganizationId())));
            patient.setId(new IdType(patientDto.getId()));
            patient.setGender(FhirResourceUtil.getPatientGender(patientDto.getGenderCode()));
            patient.setBirthDate(java.sql.Date.valueOf(patientDto.getBirthDate()));

            setLanguage(patient, patientDto);
            setExtensionFields(patient, patientDto);

            // Set Profile Meta Data
            FhirProfileUtil.setPatientProfileMetaData(fhirClient, patient);

            FhirContext fhirContextinternal = FhirContext.forR4();
            fhirContextinternal.getRestfulClientFactory()
                    .setSocketTimeout(Integer.parseInt(fisProperties.getFhir().getClientSocketTimeoutInMs()));
            FhirValidator fhirValidatorinternal = fhirContextinternal.newValidator();
            // Validate
            FhirOperationUtil.validateFhirResource(fhirValidatorinternal, patient, Optional.of(patientDto.getId()),
                    ResourceType.Patient.name(), "Update Patient");
            // Update
            // System.err.println(fhirClient.getFhirContext().newJsonParser().setPrettyPrint(true).encodeResourceToString(patient));
            // log.info("Headers Response: {}",
            // testreponse.getResponseHeaders().toString());
            //
            MethodOutcome methodOutcome = FhirOperationUtil.updateFhirResource(fhirClient, patient,
                    ResourceType.Patient.name());
            // System.err.println(fhirClient.getFhirContext().newJsonParser().setPrettyPrint(true).encodeResourceToString(methodOutcome.getResource()));

            idList.add(ResourceType.Patient.name() + "/" + FhirOperationUtil.getFhirId(methodOutcome));

            Reference patientId = new Reference();
            patientId.setReference("Patient/" + methodOutcome.getId().getIdPart());

            patientDto.getFlags().ifPresent(flags -> flags.forEach(flagDto -> {
                if (!duplicateCheckForFlag(flagDto, patientDto.getId())) {
                    Flag flag = convertFlagDtoToFlag(patientId, flagDto);
                    // Set Profile Meta Data
                    FhirProfileUtil.setFlagProfileMetaData(fhirClient, flag);

                    if (flagDto.getLogicalId() != null) {
                        flag.setId(flagDto.getLogicalId());
                        // Validate
                        FhirOperationUtil.validateFhirResource(fhirValidator, flag, Optional.empty(),
                                ResourceType.Flag.name(), "Update Flag(When updating Patient)");
                        // Update
                        MethodOutcome flagMethodOutcome = FhirOperationUtil.updateFhirResource(fhirClient, flag,
                                ResourceType.Flag.name());
                        idList.add(ResourceType.Flag.name() + "/" + FhirOperationUtil.getFhirId(flagMethodOutcome));
                    } else {
                        // Validate
                        FhirOperationUtil.validateFhirResource(fhirValidator, flag, Optional.empty(),
                                ResourceType.Flag.name(), "Create Flag(When updating Patient)");
                        // Create
                        MethodOutcome flagMethodOutcome = FhirOperationUtil.createFhirResource(fhirClient, flag,
                                ResourceType.Flag.name());
                        idList.add(ResourceType.Flag.name() + "/" + FhirOperationUtil.getFhirId(flagMethodOutcome));
                    }
                } else {
                    throw new DuplicateResourceFoundException("Same flag is already present for this patient.");
                }
            }));

            // if flags are not present
            if (!patientDto.getFlags().isPresent()) {
                // TODO:: update the existing flags with enteredinerror status or remove them

            }

            // Update the episode of care
            if (patientDto.getEpisodeOfCares() != null && !patientDto.getEpisodeOfCares().isEmpty()) {
                patientDto.getEpisodeOfCares().forEach(eoc -> {
                    ReferenceDto patientReference = new ReferenceDto();
                    patientReference.setReference(ResourceType.Patient + "/" + patientDto.getId());
                    patientDto.getName().stream().findAny().ifPresent(
                            name -> patientReference.setDisplay(name.getFirstName() + " " + name.getLastName()));
                    eoc.setPatient(patientReference);
                    eoc.setManagingOrganization(orgReference(patientDto.getOrganizationId()));
                    if (eoc.getCareManager() == null) {
                        eoc.setCareManager(pracReference(patientDto.getPractitionerId()));
                    }
                    EpisodeOfCare episodeOfCare = convertEpisodeOfCareDtoToEpisodeOfCare(eoc);
                    // Set Profile Meta Data
                    FhirProfileUtil.setEpisodeOfCareProfileMetaData(fhirClient, episodeOfCare);
                    if (eoc.getId() != null) {
                        episodeOfCare.setId(eoc.getId());
                        // Validate
                        FhirOperationUtil.validateFhirResource(fhirValidator, episodeOfCare, Optional.of(eoc.getId()),
                                ResourceType.EpisodeOfCare.name(), "Update EpisodeOfCare(When updating Patient)");
                        // Update
                        MethodOutcome episodeOfCareMethodOutcome = FhirOperationUtil.updateFhirResource(fhirClient,
                                episodeOfCare, ResourceType.EpisodeOfCare.name());
                        idList.add(ResourceType.EpisodeOfCare.name() + "/"
                                + FhirOperationUtil.getFhirId(episodeOfCareMethodOutcome));
                    } else {
                        // Validate
                        FhirOperationUtil.validateFhirResource(fhirValidator, episodeOfCare, Optional.empty(),
                                ResourceType.EpisodeOfCare.name(), "Create EpisodeOfCare(When updating Patient)");
                        // Create
                        MethodOutcome episodeOfCareMethodOutcome = FhirOperationUtil.createFhirResource(fhirClient,
                                episodeOfCare, ResourceType.EpisodeOfCare.name());
                        idList.add(ResourceType.EpisodeOfCare.name() + "/"
                                + FhirOperationUtil.getFhirId(episodeOfCareMethodOutcome));
                    }
                });
            }

            // Update the coverage
            patientDto.getCoverages().ifPresent(coverages -> coverages.forEach(coverageDto -> {
                if (coverageDto.getLogicalId() != null) {
                    coverageService.updateCoverage(coverageDto.getLogicalId(), coverageDto, Optional.empty());
                } else {
                    coverageService.createCoverage(coverageDto, Optional.empty());
                }
            }));

            // Update the emergency contacts
            if (patientDto.getEmergencyContacts() != null) {
                patientDto.getEmergencyContacts().ifPresent(emergencyContacts -> {
                    log.info("Emergency contacts in patient payload");
                    emergencyContacts.forEach(relatedPersonDto -> {
                        relatedPersonDto.setPatient(patientDto.getId());
                        if (relatedPersonDto.getRelatedPersonId() != null) {
                            log.info("Updating emergency contact");
                            relatedPersonService.updateRelatedPerson(relatedPersonDto.getRelatedPersonId(),
                                    relatedPersonDto, loggedInUser);
                        } else {
                            log.info("Creating emergency contact");
                            relatedPersonService.createRelatedPerson(relatedPersonDto, loggedInUser);
                        }
                    });
                });
            }

            if (fisProperties.isProvenanceEnabled()) {
                provenanceUtil.createProvenance(idList, ProvenanceActivityEnum.UPDATE, loggedInUser);
            }

        } else {
            throw new DuplicateResourceFoundException(
                    "Patient already exists with the given identifier system and value.");
        }
    }

    @Override
    public PatientDto getPatientById(String patientId) {
        Bundle patientBundle = fhirClient.search().forResource(Patient.class)
                .where(new TokenClientParam("_id").exactly().code(patientId))
                .revInclude(Flag.INCLUDE_PATIENT)
                .revInclude(EpisodeOfCare.INCLUDE_PATIENT)
                .revInclude(Coverage.INCLUDE_BENEFICIARY)
                .revInclude(Observation.INCLUDE_SUBJECT)
                .returnBundle(Bundle.class)
                .execute();

        if (patientBundle == null || patientBundle.getEntry().size() < 1) {
            throw new ResourceNotFoundException("No patient was found for the given patientID : " + patientId);
        }

        Bundle.BundleEntryComponent patientBundleEntry = patientBundle.getEntry().get(0);
        Patient patient = (Patient) patientBundleEntry.getResource();
        PatientDto patientDto = modelMapper.map(patient, PatientDto.class);
        patientDto.setId(patient.getIdElement().getIdPart());
        patientDto.setBirthDate(patient.getBirthDate().toInstant().atZone(ZoneId.systemDefault()).toLocalDate());
        patientDto.setGenderCode(patient.getGender().toCode());
        patientDto.setMrn(patientDto.getIdentifier().stream()
                .filter(iden -> iden.getSystem().equalsIgnoreCase(fisProperties.getPatient().getMrn().getCodeSystem()))
                .findFirst().map(IdentifierDto::getValue));
        log.info("mrn-code-system: " + fisProperties.getPatient().getMrn().getCodeSystem());
        patientDto.setIdentifier(patientDto.getIdentifier().stream()
                .filter(iden -> !iden.getSystem().equalsIgnoreCase(fisProperties.getPatient().getMrn().getCodeSystem()))
                .collect(toList()));
        if (patient.hasManagingOrganization()) {
            patientDto.setOrganizationId(
                    Optional.ofNullable(patient.getManagingOrganization().getReference().split("/")[1]));

            // set Organization
            ReferenceDto organization = new ReferenceDto();
            organization.setDisplay(patient.getManagingOrganization().getDisplay());
            organization.setReference(patient.getManagingOrganization().getReference());
            patientDto.setOrganization(Optional.of(organization));
            patientDto.setOrganizations(Optional.of(Arrays.asList(organization)));
        }
        // Get Flags for the patient
        List<FlagDto> flagDtos = getFlagsForEachPatient(patientBundle.getEntry(),
                patientBundleEntry.getResource().getIdElement().getIdPart());
        patientDto.setFlags(Optional.ofNullable(flagDtos));

        List<EpisodeOfCareDto> eocDtos = getEocsForEachPatient(patientBundle.getEntry(),
                patientBundleEntry.getResource().getIdElement().getIdPart());
        patientDto.setEpisodeOfCares(eocDtos);

        List<CoverageDto> coverageDtos = getConveragesForEachPatient(patientBundle.getEntry(),
                patientBundleEntry.getResource().getIdElement().getIdPart());
        patientDto.setCoverages(Optional.ofNullable(coverageDtos));

        setPatientSIL(patientBundle, patient, patientDto);

        setLanguageInDto(patient, patientDto);

        mapExtensionFields(patient, patientDto);

        if (patient.hasMeta()) {
            if (patient.getMeta().hasTag()) {
                Optional<Coding> createdOnCode = patient.getMeta().getTag().stream()
                        .filter(c -> c.getCode().equalsIgnoreCase("added-to-odh-on")).findFirst();
                createdOnCode.ifPresent(coding -> patientDto.setCreatedOnCode(Optional.of(coding.getDisplay())));
            }
        }

        return patientDto;
    }

    private void setPatientSIL(Bundle patientBundle, Patient patient, PatientDto patientDto) {
        List<ObservationDto> observationDtos = getObservationsForEachPatient(patientBundle.getEntry(),
                patient.getIdElement().getIdPart());
        if (observationDtos.size() > 0){
            try {
                List<ObservationDto> silList = observationDtos.stream().filter(observation -> {
                    if (observation.getCode() != null) {
                        if (observation.getCode().getCoding() != null) {
                            List<gov.samhsa.ocp.ocpfis.service.dto.valueset.Coding> codings = observation.getCode().getCoding();
                            if (codings.size() > 0) {
                                for (gov.samhsa.ocp.ocpfis.service.dto.valueset.Coding coding : codings) {
                                    if (coding.getCode().equalsIgnoreCase("sil")) {
                                        return true;
                                    }
                                }
                            }
                        }
                    }

                    return false;
                }).collect(Collectors.toList());

                if (silList != null && silList.size() > 0) {
                    ObservationDto latestSil = Collections.max(silList,
                            Comparator.comparing(s -> {
                                try {
                                    if ( s.getIssued() != null ) {
                                        String issued = s.getIssued().get();
                                        return DateUtil.convertStringToSimpleDateTime(issued);
                                    }

                                    return new Date(Long.MIN_VALUE);
                                    
                                } catch (ParseException e) {
                                    e.printStackTrace();
                                    return new Date(Long.MIN_VALUE);
                                }
                            }));

                    patientDto.setSil(Optional.of(latestSil));
                }
            }
            catch(Exception e){
                log.error("Error when looking for SIL: ");
                e.printStackTrace();
            }
        }
    }

    @Override
    public PatientDto getPatientDemographicsInfoOnly(String patientId) {
        Bundle patientBundle = fhirClient.search().forResource(Patient.class)
                .where(new TokenClientParam("_id").exactly().code(patientId))
                .returnBundle(Bundle.class)
                .execute();

        if (patientBundle == null || patientBundle.getEntry().size() < 1) {
            throw new ResourceNotFoundException("No patient was found for the given patientID : " + patientId);
        }

        Bundle.BundleEntryComponent patientBundleEntry = patientBundle.getEntry().get(0);
        Patient patient = (Patient) patientBundleEntry.getResource();
        PatientDto patientDto = modelMapper.map(patient, PatientDto.class);
        patientDto.setId(patient.getIdElement().getIdPart());
        patientDto.setBirthDate(patient.getBirthDate().toInstant().atZone(ZoneId.systemDefault()).toLocalDate());
        patientDto.setGenderCode(patient.getGender().toCode());
        patientDto.setMrn(patientDto.getIdentifier().stream()
                .filter(iden -> iden.getSystem().equalsIgnoreCase(fisProperties.getPatient().getMrn().getCodeSystem()))
                .findFirst().map(IdentifierDto::getValue));
        patientDto.setIdentifier(patientDto.getIdentifier().stream()
                .filter(iden -> !iden.getSystem().equalsIgnoreCase(fisProperties.getPatient().getMrn().getCodeSystem()))
                .collect(toList()));
        if (patient.hasManagingOrganization()) {
            patientDto.setOrganizationId(
                    Optional.ofNullable(patient.getManagingOrganization().getReference().split("/")[1]));

            // set Organization
            ReferenceDto organization = new ReferenceDto();
            organization.setDisplay(patient.getManagingOrganization().getDisplay());
            organization.setReference(patient.getManagingOrganization().getReference());
            patientDto.setOrganizations(Optional.of(Arrays.asList(organization)));
        }

        return patientDto;
    }

    private List<PatientDto> convertBundleToPatientDtos(Bundle response, boolean isSearch) {
        List<PatientDto> patientDtos = new ArrayList<>();
        if (null == response || response.isEmpty() || response.getEntry().size() < 1) {
            log.info("No patients in FHIR Server");
            // Search throw patient not found exception and list will show empty list
            if (isSearch)
                throw new PatientNotFoundException();
        } else {
            patientDtos = response.getEntry().stream()
                    .filter(bundleEntryComponent -> bundleEntryComponent.getResource().getResourceType()
                            .equals(ResourceType.Patient)) // patient entries
                    .map(bundleEntryComponent -> (Patient) bundleEntryComponent.getResource()) // patient resources
                    .peek(patient -> log.debug(iParser.encodeResourceToString(patient)))
                    .map(patient -> mapPatientToPatientDto(patient, response.getEntry(), false))
                    .collect(toList());
        }
        log.info("Total Patients retrieved from Server #" + patientDtos.size());
        return patientDtos;
    }

    private List<FlagDto> getFlagsForEachPatient(List<Bundle.BundleEntryComponent> patientAndAllReferenceBundle,
            String patientId) {
        return patientAndAllReferenceBundle.stream()
                .filter(patientWithAllReference -> patientWithAllReference.getResource().getResourceType()
                        .equals(ResourceType.Flag))
                .map(flagBundle -> (Flag) flagBundle.getResource())
                .filter(flag -> flag.getSubject().getReference().equalsIgnoreCase("Patient/" + patientId))
                // filter out inactive and entered in error status values
                .filter(flag -> flag.getStatus().toCode().equals(Enumerations.PublicationStatus.ACTIVE.toCode()))
                .map(flag -> {
                    FlagDto flagDto = modelMapper.map(flag, FlagDto.class);
                    if (flag.getPeriod() != null && !flag.getPeriod().isEmpty()) {
                        PeriodDto periodDto = new PeriodDto();
                        flagDto.setPeriod(periodDto);
                        flagDto.getPeriod()
                                .setStart((flag.getPeriod().hasStart())
                                        ? DateUtil.convertDateToLocalDate(flag.getPeriod().getStart())
                                        : null);
                        flagDto.getPeriod()
                                .setEnd((flag.getPeriod().hasEnd())
                                        ? DateUtil.convertDateToLocalDate(flag.getPeriod().getEnd())
                                        : null);
                    }

                    ValueSetDto statusOfFlag = FhirDtoUtil.convertCodeToValueSetDto(flag.getStatus().toCode(),
                            lookUpService.getFlagStatus());
                    flagDto.setStatus(statusOfFlag.getCode());
                    flagDto.setStatusDisplay(statusOfFlag.getDisplay());
                    flag.getCategory().get(0).getCoding().stream().findAny().ifPresent(coding -> {
                        flagDto.setCategory(coding.getCode());
                        flagDto.setCategoryDisplay(coding.getDisplay());
                    });

                    flagDto.setCode(flag.getCode().getText());
                    flagDto.setSubject(flag.getSubject().getReference());
                    flagDto.setLogicalId(flag.getIdElement().getIdPart());
                    return flagDto;
                }).collect(toList());
    }

    private List<EpisodeOfCareDto> getEocsForEachPatient(List<Bundle.BundleEntryComponent> patientAndAllReferenceBundle,
            String patientId) {
        return patientAndAllReferenceBundle.stream()
                .filter(patientWithAllReference -> patientWithAllReference.getResource().getResourceType()
                        .equals(ResourceType.EpisodeOfCare))
                .map(eocBundle -> (EpisodeOfCare) eocBundle.getResource())
                .filter(eoc -> eoc.getPatient().getReference().equalsIgnoreCase("Patient/" + patientId))
                .map(eoc -> EpisodeOfCareToEpisodeOfCareDtoMapper.map(eoc, lookUpService)).collect(toList());
    }

    private List<CoverageDto> getConveragesForEachPatient(
            List<Bundle.BundleEntryComponent> patientAndAllReferenceBundle, String patientId) {

        List<BundleEntryComponent> entries = patientAndAllReferenceBundle.stream()
                .filter(patientWithAllReference -> patientWithAllReference.getResource().getResourceType()
                        .equals(ResourceType.Coverage))
                .collect(toList());

        if (!entries.isEmpty()) {
            log.debug("has entries");
            List<Coverage> withCoverage = entries.stream().map(coverageBundle -> {
                return (Coverage) coverageBundle.getResource();
            }).collect(toList());

            if (!withCoverage.isEmpty()) {
                log.debug("withCoverage");
                List<Coverage> coveragesForPatient = withCoverage.stream()
                        .filter(coverage -> coverage.getBeneficiary().getReference()
                                .equalsIgnoreCase("Patient/" + patientId))
                        .collect(toList());

                if (!coveragesForPatient.isEmpty()) {
                    log.debug("coveragesForPatient");
                    List<CoverageDto> coverageDtos = coveragesForPatient.stream().map(CoverageToCoverageDtoMap::map)
                            .collect(toList());
                    return coverageDtos;
                }
            }
        }
        return new ArrayList();
    }

    private List<ObservationDto> getObservationsForEachPatient(
            List<Bundle.BundleEntryComponent> patientAndAllReferenceBundle, String patientId) {

        List<BundleEntryComponent> entries = patientAndAllReferenceBundle.stream()
                .filter(patientWithAllReference -> patientWithAllReference.getResource().getResourceType()
                        .equals(ResourceType.Observation))
                .collect(toList());

        if (!entries.isEmpty()) {
            log.debug("has entries");
            List<Observation> withObservation = entries.stream().map(observationBundle -> {
                return (Observation) observationBundle.getResource();
            }).collect(toList());

            if (!withObservation.isEmpty()) {
                log.debug("withObservation");
                List<Observation> observationsForPatient = withObservation.stream()
                        .filter(observation -> observation.getSubject().getReference()
                                .equalsIgnoreCase("Patient/" + patientId))
                        .collect(toList());

                if (!observationsForPatient.isEmpty()) {
                    log.debug("observationsForPatient");
                    // List<ObservationDto> observationDtos =
                    // observationsForPatient.stream().map(CoverageToCoverageDtoMap::map)
                    List<ObservationDto> observationDtos = observationsForPatient.stream()
                            .map(ObservationToObservationDtoMap::map)
                            .collect(toList());
                    return observationDtos;
                }
            }
        }
        return new ArrayList();

    }

    private void setExtensionFields(Patient patient, PatientDto patientDto) {
        List<Extension> extensionList = new ArrayList<>();

        // race
        if (FhirOperationUtil.isStringNotNullAndNotEmpty(patientDto.getRace())) {
            Coding raceCoding = FhirResourceUtil.getCoding(patientDto.getRace(), "", "urn:oid:2.16.840.1.113883.6.238");
            Extension raceExtension = FhirResourceUtil.createExtension(StructureDefinitionEnum.US_CORE_RACE.getUrl(),
                    new CodeableConcept().addCoding(raceCoding));
            extensionList.add(raceExtension);
        }

        // ethnicity
        if (FhirOperationUtil.isStringNotNullAndNotEmpty(patientDto.getEthnicity())) {
            Coding ethnicityCoding = FhirResourceUtil.getCoding(patientDto.getEthnicity(), "",
                    "urn:oid:2.16.840.1.113883.6.238");
            Extension ethnicityExtension = FhirResourceUtil.createExtension(
                    StructureDefinitionEnum.US_CORE_ETHNICITY.getUrl(),
                    new CodeableConcept().addCoding(ethnicityCoding));
            extensionList.add(ethnicityExtension);
        }

        // us-core-birthsex
        if (FhirOperationUtil.isStringNotNullAndNotEmpty(patientDto.getBirthSex())) {
            Coding birthSexCoding = FhirResourceUtil.getCoding(patientDto.getBirthSex(), "",
                    CodeSystemEnum.ADMINISTRATIVE_GENDER.getUrl());
            Extension birthSexExtension = FhirResourceUtil.createExtension(
                    StructureDefinitionEnum.US_CORE_BIRTHSEX.getUrl(), new CodeableConcept().addCoding(birthSexCoding));
            extensionList.add(birthSexExtension);
        }

        patient.setExtension(extensionList);
    }

    private void setLanguage(Patient patient, PatientDto patientDto) {
        // This language is not the same as setting Communication.language.
        patient.setLanguageElement(null);
        // Set Language
        if (FhirOperationUtil.isStringNotNullAndNotEmpty(patientDto.getLanguage())) {
            Patient.PatientCommunicationComponent communicationLang = new Patient.PatientCommunicationComponent();
            CodeableConcept langCodeableConcept = new CodeableConcept()
                    .addCoding(FhirResourceUtil.getCoding(patientDto.getLanguage(), null, "urn:ietf:bcp:47"));
            communicationLang.setLanguage(langCodeableConcept);
            patient.getCommunication().add(communicationLang);
            // patient.setCommunication(Collections.singletonList(communicationLang));
        }
    }

    private void setLanguageInDto(Patient patient, PatientDto patientDto) {
        if (patient.getCommunication() != null && !patient.getCommunication().isEmpty()) {
            String langCode = patient.getCommunication().get(0).getLanguage().getCoding().get(0).getCode();
            String lanDisplay = patient.getCommunication().get(0).getLanguage().getCoding().get(0).getDisplay();
            patientDto.setLanguage(langCode);
            patientDto.setLanguageDisplayString("lanDisplay");
        }
    }

    /**
     * @TODO - enthnicity etc are multiples -PatientDto needs to be modified
     * 
     * @param patient
     * @param patientDto
     */
    private void mapExtensionFields(Patient patient, PatientDto patientDto) {
        List<Extension> extensionList = patient.getExtension();
        String core_race = StructureDefinitionEnum.US_CORE_RACE.getUrl();
        String core_ethnicity = StructureDefinitionEnum.US_CORE_ETHNICITY.getUrl();
        String birthsex = StructureDefinitionEnum.US_CORE_BIRTHSEX.getUrl();
        for (Extension extension : extensionList) {
            if (extension.getValue() instanceof CodeableConcept) {
                CodeableConcept cc = (CodeableConcept) extension.getValue();
                if (!cc.getCoding().isEmpty()) {
                    if (extension.getUrl().equals(core_race))
                        patientDto.setRace(cc.getCoding().get(0).getCode());
                    if (extension.getUrl().equals(core_ethnicity))
                        patientDto.setEthnicity(cc.getCoding().get(0).getCode());
                    if (extension.getUrl().equals(birthsex))
                        patientDto.setBirthSex(cc.getCoding().get(0).getCode());
                    // switch (extension.getUrl()) {
                    // case "http://hl7.org/fhir/us/core/StructureDefinition/us-core-race":
                    // patientDto.setRace(cc.getCoding().get(0).getCode());
                    // break;
                    // case "http://hl7.org/fhir/us/core/StructureDefinition/us-core-ethnicity":
                    // patientDto.setEthnicity(cc.getCoding().get(0).getCode());
                    // break;
                    // case "http://hl7.org/fhir/us/core/StructureDefinition/us-core-birthsex":
                    // patientDto.setBirthSex(cc.getCoding().get(0).getCode());
                    // break;
                    // default:
                    // break;
                    // }
                }
            }
        }
    }

    private EpisodeOfCare convertEpisodeOfCareDtoToEpisodeOfCare(EpisodeOfCareDto episodeOfCareDto) {
        EpisodeOfCare episodeOfCare = new EpisodeOfCare();
        try {
            episodeOfCare.setStatus(EpisodeOfCare.EpisodeOfCareStatus.fromCode(episodeOfCareDto.getStatus()));
        } catch (FHIRException e) {
            throw new BadRequestException("No such fhir status or type exist.");
        }
        episodeOfCare.setType(Collections.singletonList(FhirDtoUtil.convertValuesetDtoToCodeableConcept(
                FhirDtoUtil.convertCodeToValueSetDto(episodeOfCareDto.getType(), lookUpService.getEocType()))));
        episodeOfCare.setPatient(FhirDtoUtil.mapReferenceDtoToReference(episodeOfCareDto.getPatient()));
        episodeOfCare.setManagingOrganization(
                FhirDtoUtil.mapReferenceDtoToReference(episodeOfCareDto.getManagingOrganization()));
        Period period = new Period();
        try {
            period.setStart(DateUtil.convertStringToDate(episodeOfCareDto.getStartDate()));
            period.setEnd(DateUtil.convertStringToDate(episodeOfCareDto.getEndDate()));
        } catch (ParseException e) {
            throw new BadRequestException("The start and end date of episode of care has wrong syntax.");
        }
        episodeOfCare.setPeriod(period);
        episodeOfCare.setCareManager(FhirDtoUtil.mapReferenceDtoToReference(episodeOfCareDto.getCareManager()));
        return episodeOfCare;
    }

    private Flag convertFlagDtoToFlag(Reference patientId, FlagDto flagDto) {
        Flag flag = new Flag();
        // Set Subject
        flag.setSubject(patientId);
        // Set code
        flag.getCode().setText(flagDto.getCode());

        // Set Status
        try {
            flag.setStatus(Flag.FlagStatus.fromCode(flagDto.getStatus()));
        } catch (FHIRException e) {
            throw new BadRequestException("No such fhir status exist.");
        }

        // Set Category
        CodeableConcept codeableConcept = new CodeableConcept();
        codeableConcept.addCoding(modelMapper.map(
                FhirDtoUtil.convertCodeToValueSetDto(flagDto.getCategory(), lookUpService.getFlagCategory()),
                Coding.class));
        flag.setCategory(Arrays.asList(codeableConcept));

        // Set Period
        Period period = new Period();
        period.setStart(java.sql.Date.valueOf(flagDto.getPeriod().getStart()));
        period.setEnd(
                (flagDto.getPeriod().getEnd() != null) ? java.sql.Date.valueOf(flagDto.getPeriod().getEnd()) : null);
        flag.setPeriod(period);

        // Set Author
        if (flagDto.getAuthor() != null
                && FhirOperationUtil.isStringNotNullAndNotEmpty(flagDto.getAuthor().getReference())) {
            Reference reference = modelMapper.map(flagDto.getAuthor(), Reference.class);
            flag.setAuthor(reference);
        }
        return flag;
    }

    private boolean duplicateCheckForFlag(FlagDto flagDto, String patientId) {
        Bundle flagBundleForPatient = getFlagsByPatient(patientId);
        return flagHasSameCodeAndCategory(flagBundleForPatient, flagDto);
    }

    private Bundle getFlagsByPatient(String patientId) {
        IQuery flagBundleForPatientQuery = fhirClient.search().forResource(Flag.class)
                .where(new ReferenceClientParam("subject").hasId(patientId));
        Bundle flagBundleToCoundTotalNumberOfFlag = (Bundle) flagBundleForPatientQuery.returnBundle(Bundle.class)
                .execute();
        int totalFlagForPatient = flagBundleToCoundTotalNumberOfFlag.getTotal();
        return (Bundle) flagBundleForPatientQuery
                .count(totalFlagForPatient)
                .returnBundle(Bundle.class)
                .execute();
    }

    private boolean flagHasSameCodeAndCategory(Bundle bundle, FlagDto flagDto) {
        List<Flag> duplicateCheckList = new ArrayList<>();
        if (!bundle.isEmpty()) {
            duplicateCheckList = bundle.getEntry().stream()
                    .map(flagResource -> (Flag) flagResource.getResource())
                    .filter(flag -> flag.getCode().getText().equalsIgnoreCase(flagDto.getCode()))
                    .filter(flag -> flag.getCategory().get(0).getCoding().get(0).getCode()
                            .equalsIgnoreCase(flagDto.getCategory()))
                    .collect(toList());
        }
        // Checking while updating flag
        if (flagDto.getLogicalId() != null) {
            if (duplicateCheckList.isEmpty()) {
                return false;
            } else {
                List<Flag> flags = duplicateCheckList.stream()
                        .filter(flag -> flagDto.getLogicalId().equalsIgnoreCase(flag.getIdElement().getIdPart()))
                        .collect(toList());
                return flags.isEmpty();
            }
        } else {
            // Checking while creating new flag
            return !duplicateCheckList.isEmpty();
        }
    }

    private List<String> patientsInOrganization(String org) {
        Bundle bundleFromPatient = fhirClient.search().forResource(Patient.class)
                .where(new ReferenceClientParam("organization").hasId(org))
                .returnBundle(Bundle.class)
                .sort().descending(PARAM_LASTUPDATED)
                .execute();

        List<String> getPatientIdFromPatient = FhirOperationUtil
                .getAllBundleComponentsAsList(bundleFromPatient, Optional.empty(), fhirClient, fisProperties)
                .stream().map(pat -> {
                    Patient patient = (Patient) pat.getResource();
                    return patient.getIdElement().getIdPart();
                }).distinct().collect(toList());

        // TODO:Remove the bundle after next data purge.
        Bundle bundle = fhirClient.search().forResource(EpisodeOfCare.class)
                .where(new ReferenceClientParam("organization").hasId(org))
                .returnBundle(Bundle.class)
                .sort().descending(PARAM_LASTUPDATED)
                .execute();
        List<String> getPatientFromEoc = FhirOperationUtil
                .getAllBundleComponentsAsList(bundle, Optional.empty(), fhirClient, fisProperties).stream().map(eoc -> {
                    EpisodeOfCare episodeOfCare = (EpisodeOfCare) eoc.getResource();
                    return (episodeOfCare.hasPatient()) ? (episodeOfCare.getPatient().getReference().split("/")[1])
                            : null;
                }).distinct().collect(toList());

        log.debug("patientsInOrganization");

        return Stream.of(getPatientIdFromPatient, getPatientFromEoc).flatMap(Collection::stream).distinct()
                .collect(toList());
    }

    private List<String> patientsAssociatedWithPractitioner(String prac, String org) {
        // List of organizations to which practitioner is associated with
        List<String> organizationsPractitionerIsAssociatedWith = organizationsOfPractitioner(prac);

        // List of patient with the practitioner's organization in the care team.
        List<String> patientsRelatedWithOrganizationOfPractitionerOnCareTeam = getPatientsByParticipantsInCareTeam(
                organizationsPractitionerIsAssociatedWith);

        // List of patient with the practitioner in the care team.
        List<String> patientsRealtedWithPractitionerOnCareTeam = getPatientsByParticipantsInCareTeam(
                Arrays.asList(prac));

        List<String> distinctPatients = Stream
                .of(patientsRelatedWithOrganizationOfPractitionerOnCareTeam, patientsRealtedWithPractitionerOnCareTeam)
                .flatMap(Collection::stream).distinct().collect(toList());

        // List<String> patientsInOrg = distinctPatients.stream().filter(s ->
        // !patientsInOrganization(org).contains(s)).collect(toList());

        return distinctPatients;
    }

    private List<PatientDto> convertAllBundleToSinglePatientDtoList(Bundle firstPagePatientSearchBundle,
            int numberOBundlePerPage, Optional<String> filterKey, Optional<String> practitioner) {
        List<Bundle.BundleEntryComponent> bundleEntryComponentList = FhirOperationUtil.getAllBundleComponentsAsList(
                firstPagePatientSearchBundle, Optional.of(numberOBundlePerPage), fhirClient, fisProperties);
        log.info("bundleEntryComponentList length: " + bundleEntryComponentList.size());

        List<Bundle.BundleEntryComponent> patientsList = bundleEntryComponentList.stream()
                .filter(bundleEntryComponent -> bundleEntryComponent.getResource().getResourceType()
                        .equals(ResourceType.Patient))
                .collect(toList());

        List<Patient> patientsResourceList = patientsList.stream()
                .map(bundleEntryComponent -> (Patient) bundleEntryComponent.getResource()).collect(toList());

        log.info("patientsResourceList length: " + patientsResourceList.size());

        log.info("patientsList length: " + patientsList.size());

        List<PatientDto> patientsDtoList = patientsResourceList.stream().parallel().map(patient -> {
            PatientDto patientDto = mapPatientToPatientDto(patient, bundleEntryComponentList, false);
            // if (filterKey.isPresent() &&
            // SearchKeyEnum.PatientFilterKey.contains(filterKey.get()) &&
            // SearchKeyEnum.PatientFilterKey.ASSOCIATECARETEAMPATIENT.name().equalsIgnoreCase(filterKey.get()))
            // {
            // if (associatedPractitionerIsPresentInConsent(patientDto.getId(),
            // practitioner)) {
            // patientDto.setCanViewPatientDetail(Optional.of(true));
            // } else {
            // patientDto.setCanViewPatientDetail(Optional.of(false));
            // }
            // } else {
            // patientDto.setCanViewPatientDetail(Optional.of(true));
            // }
            patientDto.setCanViewPatientDetail(Optional.of(true));
            return patientDto;
        })
                .collect(toList());
        log.info("patientsDtoList length" + patientsDtoList.size());

        return patientsDtoList;
    }

    private boolean isDuplicateWhileUpdate(PatientDto patientDto) {
        final Patient patient = fhirClient.read().resource(Patient.class).withId(patientDto.getId()).execute();
        List<Bundle.BundleEntryComponent> bundleEntryComponents = patientsWithMatchedDuplicateCheckParameters(
                patientDto);
        if (bundleEntryComponents.isEmpty()) {
            return false;
        } else {
            return bundleEntryComponents.stream().noneMatch(resource -> {
                Patient pRes = (Patient) resource.getResource();
                return pRes.getIdElement().getIdPart().equalsIgnoreCase(patient.getIdElement().getIdPart());
            });
        }
    }

    private ReferenceDto orgReference(Optional<String> organizationId) {
        ReferenceDto referenceDto = new ReferenceDto();
        referenceDto.setId(organizationId.get());
        referenceDto.setDisplay(
                fhirClient.read().resource(Organization.class).withId(organizationId.get()).execute().getName());
        referenceDto.setReference("Organization/" + organizationId.get());
        return referenceDto;
    }

    private ReferenceDto pracReference(Optional<String> practitionerId) {
        ReferenceDto referenceDto = new ReferenceDto();
        fhirClient.read().resource(Practitioner.class).withId(practitionerId.get()).execute().getName().stream()
                .findAny()
                .ifPresent(name -> referenceDto
                        .setDisplay(name.getGiven().stream().findFirst().get().toString() + " " + name.getFamily()));
        referenceDto.setReference("Practitioner/" + practitionerId.get());
        return referenceDto;
    }

    private boolean checkDuplicateInFhir(PatientDto patientDto) {
        return !patientsWithMatchedDuplicateCheckParameters(patientDto).isEmpty();
    }

    private boolean checkDuplicatePatientOfSameOrganization(PatientDto patientDto) {
        List<Bundle.BundleEntryComponent> patientWithDuplicateParameters = patientsWithMatchedDuplicateCheckParameters(
                patientDto);
        if (!patientWithDuplicateParameters.isEmpty()) {
            return !patientsWithMatchedDuplicateCheckParameters(patientDto).stream().filter(pat -> {
                Patient patient = (Patient) pat.getResource();
                return (patient.hasManagingOrganization())
                        && patient.getManagingOrganization().getReference().split("/")[1]
                                .equalsIgnoreCase(patientDto.getOrganizationId().get());
            }).collect(toList()).isEmpty();
        }
        return false;
    }

    private IdentifierDto setUniqueIdentifierForPatient(String value) {
        return IdentifierDto.builder().system(fisProperties.getPatient().getMrn().getCodeSystem())
                .systemDisplay(fisProperties.getPatient().getMrn().getDisplayName())
                .value(value).display(value).build();
    }

    private List<Bundle.BundleEntryComponent> patientsWithMatchedDuplicateCheckParameters(PatientDto patientDto) {
        String system = patientDto.getIdentifier().get(0).getSystem();
        String value = patientDto.getIdentifier().get(0).getValue();
        log.info("Searching patients with identifier system : " + system + " and value : " + value);
        Bundle patientBundle = (Bundle) FhirOperationUtil
                .setNoCacheControlDirective(fhirClient.search().forResource(Patient.class)).returnBundle(Bundle.class)
                .execute();
        return FhirOperationUtil
                .getAllBundleComponentsAsList(patientBundle, Optional.empty(), fhirClient, fisProperties).stream()
                .filter(patient -> {
                    Patient p = (Patient) patient.getResource();
                    return p.getIdentifier().stream().anyMatch(identifier -> checkIdentifier(system, value, identifier))
                            &&
                            checkFirstName(p, patientDto)
                            && checkBirthdate(p, patientDto) && checkGender(p, patientDto);
                }).collect(toList());
    }

    private boolean checkIdentifier(String system, String value, Identifier identifier) {
        log.info(identifier.getSystem());

        boolean systemfind = false;
        if (identifier.hasSystem()) {
            systemfind = identifier.getSystem().equalsIgnoreCase(system);
            log.info("System found: " + systemfind);
        }

        boolean valueidentifier = false;
        if (identifier.hasValue()) {
            String getvalue = identifier.getValue();
            valueidentifier = getvalue.replaceAll(" ", "").replaceAll("-", "").trim()
                    .equalsIgnoreCase(value.replaceAll(" ", "").replaceAll("-", "").trim());
            log.info("Value found: " + valueidentifier);
        }

        return systemfind && valueidentifier;
    }

    private boolean checkFirstName(Patient p, PatientDto patientDto) {
        return p.getName().stream().findAny().get().getGiven().stream().findAny().get().toString()
                .equalsIgnoreCase(patientDto.getName().stream().findAny().get().getFirstName());
    }

    private boolean checkBirthdate(Patient p, PatientDto patientDto) {
        return modelMapper.map(p, PatientDto.class).getBirthDate().toString()
                .equalsIgnoreCase(patientDto.getBirthDate().toString());
    }

    private boolean checkGender(Patient p, PatientDto patientDto) {
        return p.getGender().toCode().equalsIgnoreCase(patientDto.getGenderCode());
    }

    private String generateRandomMrn() {
        StringBuilder localIdIdBuilder = new StringBuilder();
        if (null != fisProperties.getPatient().getMrn().getPrefix()) {
            localIdIdBuilder.append(fisProperties.getPatient().getMrn().getPrefix());
            localIdIdBuilder.append("-");
        }
        localIdIdBuilder.append(RandomStringUtils
                .randomAlphanumeric((fisProperties.getPatient().getMrn().getLength())));
        return localIdIdBuilder.toString().toUpperCase();
    }

    private List<String> getPatientsByParticipantsInCareTeam(List<String> participants) {
        List<String> patients = new ArrayList<>();

        Bundle bundle = fhirClient.search().forResource(CareTeam.class)
                .where(new ReferenceClientParam("participant").hasAnyOfIds(participants))
                .returnBundle(Bundle.class)
                .execute();

        if (bundle != null) {
            patients = bundle.getEntry().stream().parallel()
                    .map(it -> (CareTeam) it.getResource())
                    .map(it -> it.getSubject().getReference().split("/")[1])
                    .collect(toList());

        }

        return patients;
    }

    private List<String> organizationsOfPractitioner(String practitioner) {
        List<String> org = new ArrayList<>();

        Bundle bundle = fhirClient.search().forResource(PractitionerRole.class)
                .where(new ReferenceClientParam("practitioner").hasId(practitioner))
                .returnBundle(Bundle.class)
                .execute();

        if (bundle != null) {
            org = bundle.getEntry().stream()
                    .map(it -> (PractitionerRole) it.getResource())
                    .map(pr -> pr.getOrganization().getReference().split("/")[1])
                    .collect(toList());
        }

        return org;
    }

    private Boolean associatedPractitionerIsPresentInConsent(String patientId, Optional<String> practitionerId) {
        return practitionersPartOfConsentForThePatientAsPractitioner(patientId).contains(practitionerId.get())
                || !organizationsOfPractitioner(practitionerId.get()).stream()
                        .filter(org -> organizationsPartOfConsentForThePatient(patientId).contains(org))
                        .collect(toList()).isEmpty()
                || !careTeamThePractitionerIsPartOf(practitionerId.get()).stream()
                        .filter(ct -> careTeamPartOfConsentForThePatient(patientId).contains(ct)).collect(toList())
                        .isEmpty();
    }

    private List<String> practitionersPartOfConsentForThePatientAsPractitioner(String patientId) {
        return FhirOperationUtil
                .getAllBundleComponentsAsList(consentForPatientBundle(patientId, true), Optional.empty(), fhirClient,
                        fisProperties)
                .stream()
                .filter(e -> {
                    final Date now = new Date();
                    final Period period = ((Consent) e.getResource()).getProvision().getPeriod();
                    return period.getStart().before(now) && period.getEnd().after(now);
                })
                .flatMap(e -> {
                    Consent consent = (Consent) e.getResource();
                    return consent.getProvision().getActor().stream()
                            .filter(a -> a.getRole().getCoding().stream().findAny().get().getCode()
                                    .equalsIgnoreCase(V3ParticipationType.IRCP.toCode()))
                            .filter(a -> a.getReference().getReference().split("/")[0]
                                    .equalsIgnoreCase(ResourceType.Practitioner.toString()))
                            .map(pr -> pr.getReference().getReference().split("/")[1]);
                })
                .distinct()
                .collect(toList());
    }

    private List<String> organizationsPartOfConsentForThePatient(String patientId) {
        return FhirOperationUtil
                .getAllBundleComponentsAsList(consentForPatientBundle(patientId, true), Optional.empty(), fhirClient,
                        fisProperties)
                .stream()
                .filter(e -> {
                    final Date now = new Date();
                    final Period period = ((Consent) e.getResource()).getProvision().getPeriod();
                    return period.getStart().before(now) && period.getEnd().after(now);
                })
                .flatMap(e -> {
                    Consent consent = (Consent) e.getResource();
                    return consent.getProvision().getActor().stream()
                            .filter(a -> a.getRole().getCoding().stream().findAny().get().getCode()
                                    .equalsIgnoreCase(V3ParticipationType.IRCP.toCode()))
                            .filter(a -> a.getReference().getReference().split("/")[0]
                                    .equalsIgnoreCase(ResourceType.Organization.toString()))
                            .map(pr -> pr.getReference().getReference().split("/")[1]);
                })
                .distinct()
                .collect(toList());
    }

    private List<String> careTeamPartOfConsentForThePatient(String patientId) {
        return FhirOperationUtil
                .getAllBundleComponentsAsList(consentForPatientBundle(patientId, true), Optional.empty(), fhirClient,
                        fisProperties)
                .stream()
                .filter(e -> {
                    final Date now = new Date();
                    final Period period = ((Consent) e.getResource()).getProvision().getPeriod();
                    return period.getStart().before(now) && period.getEnd().after(now);
                })
                .flatMap(e -> {
                    Consent consent = (Consent) e.getResource();
                    return consent.getProvision().getActor().stream()
                            .filter(a -> a.getRole().getCoding().stream().findAny().get().getCode()
                                    .equalsIgnoreCase(V3ParticipationType.IRCP.toCode()))
                            .filter(a -> a.getReference().getReference().split("/")[0]
                                    .equalsIgnoreCase(ResourceType.CareTeam.toString()))
                            .map(pr -> pr.getReference().getReference().split("/")[1]);
                })
                .distinct()
                .collect(toList());

    }

    private List<String> careTeamThePractitionerIsPartOf(String practitionerId) {
        Bundle careTeamBundleForPractitionerId = (Bundle) FhirOperationUtil
                .setNoCacheControlDirective(fhirClient.search().forResource(CareTeam.class)
                        .where(new ReferenceClientParam("participant").hasId(practitionerId)))
                .returnBundle(Bundle.class).execute();
        Bundle careTeamBundleForPractitionerFromOrganizationId = (Bundle) FhirOperationUtil
                .setNoCacheControlDirective(fhirClient.search().forResource(CareTeam.class)
                        .where(new ReferenceClientParam("participant")
                                .hasAnyOfIds(organizationsOfPractitioner(practitionerId))))
                .returnBundle(Bundle.class).execute();
        List<String> careTeamFromPractitionerId = FhirOperationUtil
                .getAllBundleComponentsAsList(careTeamBundleForPractitionerId, Optional.empty(), fhirClient,
                        fisProperties)
                .stream().map(c -> {
                    CareTeam ct = (CareTeam) c.getResource();
                    return ct.getIdElement().getIdPart();
                }).distinct().collect(toList());
        List<String> careTeamForPractitionerForOrganizationId = FhirOperationUtil
                .getAllBundleComponentsAsList(careTeamBundleForPractitionerFromOrganizationId, Optional.empty(),
                        fhirClient, fisProperties)
                .stream().map(c -> {
                    CareTeam ct = (CareTeam) c.getResource();
                    return ct.getIdElement().getIdPart();
                }).distinct().collect(toList());
        return Stream.of(careTeamFromPractitionerId, careTeamForPractitionerForOrganizationId)
                .flatMap(Collection::stream).distinct().collect(toList());
    }

    private Bundle consentForPatientBundle(String patientId, boolean onlyActive) {
        IQuery query = FhirOperationUtil.setNoCacheControlDirective(fhirClient.search().forResource(Consent.class)
                .where(new ReferenceClientParam("patient").hasId(patientId)));
        if (onlyActive) {
            query = query.where(new TokenClientParam("status").exactly().code("active"));
        }
        return (Bundle) query
                .returnBundle(Bundle.class)
                .execute();
    }

    private List<String> getAllCareTeamForPatient(String patientId) {
        Bundle bundle = (Bundle) FhirOperationUtil
                .setNoCacheControlDirective(fhirClient.search().forResource(CareTeam.class)
                        .where(new ReferenceClientParam("patient").hasId(patientId)))
                .returnBundle(Bundle.class)
                .execute();
        return FhirOperationUtil.getAllBundleComponentsAsList(bundle, Optional.empty(), fhirClient, fisProperties)
                .stream().map(c -> {
                    CareTeam ct = (CareTeam) c.getResource();
                    return ct.getIdElement().getIdPart();
                }).collect(toList());
    }

    private CareTeamDto getDefaultCareTeamDto(String patientId, PatientDto patientDto) {

        String careTeamName = patientDto.getName().get(0).getFirstName() + '_'
                + patientDto.getName().get(0).getLastName() + '_' + DateUtil.getCurrentTimeStamp();
        String earliestDate = getEarliestDate(patientDto);

        CareTeamDto careTeamDto = new CareTeamDto();
        careTeamDto.setName(careTeamName);
        careTeamDto.setStatusCode(CareTeamConstants.STATUS_ACTIVE);
        careTeamDto.setSubjectId(patientId);
        careTeamDto.setStartDate(earliestDate); // No end Date
        careTeamDto.setManagingOrganization(patientDto.getOrganizationId().get());
        careTeamDto.setCategoryCode(CareTeamConstants.DEFAULT_CATEGORY_CODE);
        careTeamDto.setCategoryDisplay(CareTeamConstants.DEFAULT_CATEGORY_DISPLAY);
        careTeamDto.setCategorySystem(CodeSystemEnum.CARETEAM_CATEGORY.getUrl());

        // There must be atleast one participant in the default careteam. In this case,
        // atleast one Practitioner (not Org/relatedPerson etc)
        Set<String> practitionerIds = new HashSet<>();
        List<ParticipantDto> participants = new ArrayList<>();
        for (EpisodeOfCareDto eoc : patientDto.getEpisodeOfCares()) {
            if (!practitionerIds.contains(eoc.getCareManager().getReference())) {
                practitionerIds.add(eoc.getCareManager().getReference());
                ParticipantDto p = new ParticipantDto();
                p.setMemberType("practitioner");
                p.setMemberId(eoc.getCareManager().getReference().trim().split("/")[1]);
                p.setStartDate(patientDto.getEpisodeOfCares().get(0).getStartDate()); // No End date
                participants.add(p);
            }
        }
        // Fallback
        if (practitionerIds.isEmpty()) {
            if (patientDto.getPractitionerId().isPresent()) {
                ParticipantDto p = new ParticipantDto();
                p.setMemberType("practitioner");
                p.setMemberId(patientDto.getPractitionerId().get());
                p.setStartDate(patientDto.getEpisodeOfCares().get(0).getStartDate());
                participants.add(p);
            } else {
                log.error(
                        "WARNING! Patient does not have a managing Practitioner and hence cannot create a default care team!");
            }
        }
        careTeamDto.setParticipants(participants);
        return careTeamDto;
    }

    private String getEarliestDate(PatientDto patientDto) {
        Date earliestDate = null;

        for (EpisodeOfCareDto eoc : patientDto.getEpisodeOfCares()) {
            try {
                Date tempDate = DateUtil.convertStringToDate(eoc.getStartDate());
                if (earliestDate == null) {
                    earliestDate = tempDate;
                }
                if (tempDate.before(earliestDate)) {
                    earliestDate = tempDate;
                }
            } catch (ParseException e) {
                log.error("Error parsing date from Episode of Care when creating default Care Team");
            }
        }
        SimpleDateFormat sdf = new SimpleDateFormat("MM/dd/YYYY");
        if (earliestDate == null) {
            earliestDate = new Date();
        }
        return sdf.format(earliestDate);
    }

    public PatientDto findPatient(String birthDate, String firstName, String lastName, String orgId) {
//        PatientDto patientDto;
//        log.info("Searching for Patient in HIE");
//        try {
//            String orgName = getOrgnizationNamebyId(orgId);
//            patientDto = mintClient.findPatient(orgName, firstName, lastName, birthDate);
//        } catch (FeignException e) {
//            if (e.status() == 404)
//                throw new NoDataFoundException("No patient found");
//            else
//                throw new MINTClientException("Mint client is not available now:" + e.getMessage());
//        } catch (Exception e) {
//            log.info(e.getMessage());
//            throw new MINTClientException("Mint client is not available now:" + e.getMessage());
//        }
//
//        if (patientDto.getMrn().isPresent()
//                && patientDto.getMrn().get().contains(fisProperties.getPatient().getMrn().getPrefix())) {
//            Person person = getPersonByMrn(patientDto.getMrn().get());
//            Optional<String> patientId = person.getLink().stream().map(it -> it.getTarget().getReference().substring(8))
//                    .filter(it -> getPatientById(it).getOrganizations().get().get(0).getReference().substring(13)
//                            .equals(orgId))
//                    .findAny();
//            if (patientId.isPresent())
//                return getPatientById(patientId.get());
//            else
//                return getPatientById(person.getLink().get(0).getTarget().getReference().substring(7));
//        } else {
//            patientDto.setMrn(null);
//        }
//        return patientDto;
        throw new PatientNotFoundException("No Patient Found");
    }

    private void updatePerson(String mrn, Person.PersonLinkComponent personLinkComponent) {
        IQuery PersonSearchQuery = fhirClient.search().forResource(Person.class).sort().descending(PARAM_LASTUPDATED);
        PersonSearchQuery.where(new TokenClientParam("identifier").exactly().code(mrn));
        Bundle personBundle = (Bundle) PersonSearchQuery
                .returnBundle(Bundle.class)
                .encodedJson()
                .execute();
        Person person = (Person) personBundle.getEntry().get(0).getResource();
        person.getLink().add(personLinkComponent);
        FhirOperationUtil.updateFhirResource(fhirClient, person, ResourceType.Person.name());
    }

    private Person getPersonByMrn(String mrn) {

        IQuery personSearchQuery = fhirClient.search().forResource(Person.class).sort().descending(PARAM_LASTUPDATED);
        personSearchQuery.where(new TokenClientParam("identifier").exactly().code(mrn));
        Bundle personSearchBundle = (Bundle) personSearchQuery
                .returnBundle(Bundle.class)
                .encodedJson()
                .execute();
        if (!personSearchBundle.getEntry().isEmpty())
            return (Person) personSearchBundle.getEntry().get(0).getResource();
        else
            return null;
    }

    private String getOrgnizationNamebyId(String orgId) {
        String orgName = "";
        Organization retrievedOrganization = fhirClient.read().resource(Organization.class).withId(orgId).execute();
        if (retrievedOrganization != null && retrievedOrganization.getName() != null)
            orgName = retrievedOrganization.getName();
        return orgName;
    }
}
