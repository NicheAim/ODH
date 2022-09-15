package gov.samhsa.c2s.c2ssofapi.service;

import ca.uhn.fhir.context.FhirContext;
import ca.uhn.fhir.rest.api.MethodOutcome;
import ca.uhn.fhir.rest.client.api.IGenericClient;
import ca.uhn.fhir.rest.gclient.IQuery;
import ca.uhn.fhir.rest.gclient.ReferenceClientParam;
import ca.uhn.fhir.rest.gclient.TokenClientParam;
import ca.uhn.fhir.validation.*;
import gov.samhsa.c2s.c2ssofapi.config.ConfigProperties;
import gov.samhsa.c2s.c2ssofapi.constants.ConsentConstants;
import gov.samhsa.c2s.c2ssofapi.service.constant.ProvenanceActivityEnum;
import gov.samhsa.c2s.c2ssofapi.service.dto.*;
import gov.samhsa.c2s.c2ssofapi.service.exception.ConsentPdfGenerationException;
import gov.samhsa.c2s.c2ssofapi.service.exception.DuplicateResourceFoundException;
import gov.samhsa.c2s.c2ssofapi.service.exception.NoDataFoundException;
import gov.samhsa.c2s.c2ssofapi.service.exception.PreconditionFailedException;
import gov.samhsa.c2s.c2ssofapi.service.exception.ResourceNotFoundException;
import gov.samhsa.c2s.c2ssofapi.service.pdf.ConsentPdfGenerator;
import gov.samhsa.c2s.c2ssofapi.service.pdf.ConsentRevocationPdfGenerator;
import gov.samhsa.c2s.c2ssofapi.service.util.FhirDtoUtil;
import gov.samhsa.c2s.c2ssofapi.service.util.FhirOperationUtil;
import gov.samhsa.c2s.c2ssofapi.service.util.FhirResourceUtil;
import gov.samhsa.c2s.c2ssofapi.service.util.PaginationUtil;
import lombok.extern.slf4j.Slf4j;
import org.hl7.fhir.instance.model.api.IBaseResource;
import org.hl7.fhir.r4.model.*;
import org.hl7.fhir.r4.model.codesystems.ConsentStateCodes;
import org.hl7.fhir.r4.model.codesystems.V3ActReason;
import org.hl7.fhir.exceptions.FHIRException;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

import static ca.uhn.fhir.rest.api.Constants.PARAM_LASTUPDATED;
import static java.util.stream.Collectors.toList;


@Service
@Slf4j
public class ConsentServiceImpl implements ConsentService {

    private final IGenericClient fhirClient;
    private final LookUpService lookUpService;
    private final ConfigProperties configProperties;
    private final ModelMapper modelMapper;
    private final ConsentPdfGenerator consentPdfGenerator;
    private final ConsentRevocationPdfGenerator consentRevocationPdfGenerator;

    private final PatientService patientService;
    private final ProvenanceUtil provenanceUtil;

    private final FhirValidator fhirValidator;


    @Autowired
    public ConsentServiceImpl(ModelMapper modelMapper,
                              IGenericClient fhirClient,
                              LookUpService lookUpService,
                              ConfigProperties configProperties,
                              ConsentPdfGenerator consentPdfGenerator,
                              ConsentRevocationPdfGenerator consentRevocationPdfGenerator,
                              PatientService patientService, FhirValidator fhirValidator,
                              ProvenanceUtil provenanceUtil) {
        this.modelMapper = modelMapper;
        this.fhirClient = fhirClient;
        this.lookUpService = lookUpService;
        this.configProperties = configProperties;
        this.consentPdfGenerator = consentPdfGenerator;
        this.consentRevocationPdfGenerator = consentRevocationPdfGenerator;
        this.patientService = patientService;
        this.fhirValidator = fhirValidator;
        this.provenanceUtil = provenanceUtil;
    }

    @Override
    public PageDto<DetailedConsentDto> getConsents(Optional<String> patient, Optional<String> practitioner, Optional<String> status, Optional<Boolean> generalDesignation, Optional<Integer> pageNumber, Optional<Integer> pageSize) {
        System.out.println("getConsents");
        int numberOfConsentsPerPage = PaginationUtil.getValidPageSize(configProperties, pageSize, ResourceType.Consent.name());

        // Generate the Query Based on Input Variables
        IQuery consentQueryWithCareTeam = getConsentIQuery(patient, practitioner, status, generalDesignation);

        IQuery finalConsentQueryWithCareTeam = consentQueryWithCareTeam;

        if (!status.isPresent()) {
            practitioner.ifPresent(pr -> {
                if (!getCareTeamIdsFromPractitioner(pr).isEmpty()) {
                    finalConsentQueryWithCareTeam.where(new ReferenceClientParam("actor").hasAnyOfIds(getCareTeamIdsFromPractitioner(pr)));
                }
            });
        }

        // Disable caching to get latest data
        consentQueryWithCareTeam = FhirOperationUtil.setNoCacheControlDirective(finalConsentQueryWithCareTeam);

        Bundle consentBundleWithCareTeam = (Bundle) consentQueryWithCareTeam.returnBundle(Bundle.class).execute();

        List<Bundle.BundleEntryComponent> consentBundleEntryWithCareTeam = FhirOperationUtil.getAllBundleComponentsAsList(consentBundleWithCareTeam, Optional.of(numberOfConsentsPerPage), fhirClient, configProperties);

        List<Bundle.BundleEntryComponent> bundleEntryComponentList = new ArrayList<>();
        if (!practitioner.isPresent()) {
            bundleEntryComponentList.addAll(consentBundleEntryWithCareTeam);
        }
        //Get consent according to the practitioner.
        practitioner.ifPresent(pr -> {
            Bundle bundle = (Bundle) getConsentIQuery(patient, Optional.empty(), status, generalDesignation).returnBundle(Bundle.class).execute();
            List<Bundle.BundleEntryComponent> consents = FhirOperationUtil.getAllBundleComponentsAsList(bundle, Optional.ofNullable(numberOfConsentsPerPage), fhirClient, configProperties)
                    .stream().filter(cs -> {
                                Consent consent = (Consent) cs.getResource();
                                return !consent.getProvision().getActor().stream()
                                        .filter(ac -> ac.getReference().getReference()
                                                .split("/")[1].equalsIgnoreCase(pr))
                                        .collect(toList()).isEmpty();
                            }
                    ).collect(toList());
            bundleEntryComponentList.addAll(consents);


            Bundle bundleForGeneralDesignation = (Bundle) getConsentIQuery(patient, Optional.ofNullable(pr), status, generalDesignation).returnBundle(Bundle.class).execute();
            bundleEntryComponentList.addAll(FhirOperationUtil.getAllBundleComponentsAsList(bundleForGeneralDesignation, Optional.ofNullable(numberOfConsentsPerPage), fhirClient, configProperties));
        });

        bundleEntryComponentList.stream().distinct().collect(toList());


        // Map to DTO
        List<DetailedConsentDto> consentDtosList = bundleEntryComponentList.stream().map(this::convertConsentBundleEntryToConsentDto).filter(
                consent -> !consent.getStatus().equalsIgnoreCase(ConsentStateCodes.ENTEREDINERROR.toString())
        ).collect(toList());

        return (PageDto<DetailedConsentDto>) PaginationUtil.applyPaginationForCustomArrayList(consentDtosList, numberOfConsentsPerPage, pageNumber, false);

    }

    @Override
    public DetailedConsentDto getConsentsById(String consentId) {
        log.info("Searching for consentId: " + consentId);
        IQuery consentQuery = fhirClient.search().forResource(Consent.class)
                .where(new TokenClientParam("_id").exactly().code(consentId.trim()));

        consentQuery = FhirOperationUtil.setNoCacheControlDirective(consentQuery);

        Bundle consentBundle = (Bundle) consentQuery.returnBundle(Bundle.class)
                .execute();

        if (consentBundle == null || consentBundle.getEntry().isEmpty()) {
            log.info("No consent was found for the given consentId:" + consentId);
            throw new ResourceNotFoundException("No consent was found for the given consent ID:" + consentId);
        }

        log.info("FHIR consent bundle retrieved from FHIR server successfully for consent ID:" + consentId);

        Bundle.BundleEntryComponent retrievedConsent = consentBundle.getEntry().get(0);
        return convertConsentBundleEntryToConsentDto(retrievedConsent);
    }

    @Override
    public GeneralConsentRelatedFieldDto getGeneralConsentRelatedFields(String patient) {
        GeneralConsentRelatedFieldDto generalConsentRelatedFieldDto = new GeneralConsentRelatedFieldDto();

        //Adding To careTeams
        Bundle careTeamBundle = fhirClient.search().forResource(CareTeam.class)
                .where(new ReferenceClientParam("subject").hasId(patient))
                .returnBundle(Bundle.class).execute();

        if (!careTeamBundle.getEntry().isEmpty()) {
            List<ReferenceDto> toActors = careTeamBundle.getEntry().stream().map(careTeamEntry -> {
                CareTeam careTeam = (CareTeam) careTeamEntry.getResource();
                return convertCareTeamToReferenceDto(careTeam);
            }).collect(toList());

            generalConsentRelatedFieldDto.setToActors(toActors);

            //Adding from careTeams
            Bundle organizationBundle = getPseudoOrganization();

            organizationBundle.getEntry().stream().findAny().ifPresent(entry -> {
                Organization organization = (Organization) entry.getResource();
                ReferenceDto referenceDto = new ReferenceDto();
                referenceDto.setReference("Organization/" + organization.getIdElement().getIdPart());
                referenceDto.setDisplay(ConsentConstants.PSEUDO_ORGANIZATION_NAME);
                generalConsentRelatedFieldDto.setFromActors(Collections.singletonList(referenceDto));
            });

            generalConsentRelatedFieldDto.setPurposeOfUse(FhirDtoUtil.convertCodeToValueSetDto(V3ActReason.TREAT.toCode(), lookUpService.getConsentPurposeOfUse()));
            generalConsentRelatedFieldDto.setMedicalInformation(lookUpService.getConsentSecurityLabel());

        } else {
            throw new ResourceNotFoundException("No care teams are present.");
        }
        return generalConsentRelatedFieldDto;
    }


    @Override
    public void createConsent(ConsentDto consentDto) {
        //Create Consent
        List<String> idList = new ArrayList<>();

        Bundle associatedCareTeam = fhirClient.search().forResource(CareTeam.class).where(new ReferenceClientParam("patient").hasId(consentDto.getPatient().getReference()))
                .returnBundle(Bundle.class).execute();
        if (consentDto.isGeneralDesignation()) {
            if (!associatedCareTeam.getEntry().isEmpty()) {
                if (!isDuplicate(consentDto, Optional.empty())) {
                    Consent consent = consentDtoToConsent(Optional.empty(), consentDto);
                    //Set Profile Meta Data
                    //FhirProfileUtil.setConsentProfileMetaData(fhirClient, consent);

                    //Validate
                    FhirContext fhirContext = FhirContext.forR4();

                    //FhirOperationUtil.validateFhirResource(fhirValidator, consent, Optional.empty(), ResourceType.Consent.name(), "Create Consent");
                    String data_consent  = fhirContext.newJsonParser().setPrettyPrint(true).encodeResourceToString(consent);
                    System.out.println(data_consent);
                    IBaseResource baseResource = fhirContext.newJsonParser().parseResource(data_consent);
                    Consent consent_string = (Consent) baseResource;
                    //Create
                    MethodOutcome methodOutcome = FhirOperationUtil.createFhirResource(fhirClient, consent_string, ResourceType.Consent.name());
//                    idList.add(ResourceType.Consent.name() + "/" + FhirOperationUtil.getFhirId(methodOutcome));
//
//                    if(configProperties.isProvenanceEnabled()) {
//                        provenanceUtil.createProvenance(idList, ProvenanceActivityEnum.CREATE, Optional.empty());
//                    }
                } else {
                    throw new DuplicateResourceFoundException("This patient already has a general designation consent.");
                }
            } else {
                throw new PreconditionFailedException("No care team members for this patient.");
            }
        } else {
            Consent consent = consentDtoToConsent(Optional.empty(), consentDto);
            //Set Profile Meta Data
            //FhirProfileUtil.setConsentProfileMetaData(fhirClient, consent);

            //Validate
            //FhirOperationUtil.validateFhirResource(fhirValidator, consent, Optional.empty(), ResourceType.Consent.name(), "Create Consent");

            //Create
            MethodOutcome methodOutcome = FhirOperationUtil.createFhirResource(fhirClient, consent, ResourceType.Consent.name());
            idList.add(ResourceType.Consent.name() + "/" + FhirOperationUtil.getFhirId(methodOutcome));

            if(configProperties.isProvenanceEnabled()) {
                provenanceUtil.createProvenance(idList, ProvenanceActivityEnum.CREATE, Optional.empty());
            }
        }
    }

    @Override
    public void updateConsent(String consentId, ConsentDto consentDto) {
        //Update Consent
        if (!isDuplicate(consentDto, Optional.of(consentId))) {
            List<String> idList = new ArrayList<>();

            Consent consent = consentDtoToConsent(Optional.of(consentId), consentDto);
            consent.setId(consentId);

            //Set Profile Meta Data
            //FhirProfileUtil.setConsentProfileMetaData(fhirClient, consent);

            //Validate
            //FhirOperationUtil.validateFhirResource(fhirValidator, consent, Optional.of(consentId), ResourceType.Consent.name(), "Update Consent");
            FhirContext fhirContext = FhirContext.forR4();
            String data_consent  = fhirContext.newJsonParser().setPrettyPrint(true).encodeResourceToString(consent);
            System.out.println(data_consent);
            //Update
            MethodOutcome methodOutcome = FhirOperationUtil.updateFhirResource(fhirClient, consent, "Update Consent");
            //idList.add(ResourceType.Consent.name() + "/" + FhirOperationUtil.getFhirId(methodOutcome));

//            if(configProperties.isProvenanceEnabled()) {
//                provenanceUtil.createProvenance(idList, ProvenanceActivityEnum.UPDATE, Optional.empty());
//            }

        } else {
            throw new DuplicateResourceFoundException("This patient already has a general designation consent.");
        }
    }

    @Override
    public PageDto<AbstractCareTeamDto> getActors(Optional<String> patientId, Optional<String> name, Optional<String> actorType, Optional<List<String>> actorsAlreadyAssigned, Optional<Integer> pageNumber, Optional<Integer> pageSize) {
        int numberOfActorsPerPage = PaginationUtil.getValidPageSize(configProperties, pageSize, ResourceType.Consent.name());

        //Getting List of practitioners
        List<AbstractCareTeamDto> abstractCareTeamDtoList = FhirResourceUtil.getPractitionerActors(patientId, name, Optional.empty(), Optional.empty(), fhirClient, configProperties);

        //Add organizations
        abstractCareTeamDtoList.addAll(FhirResourceUtil.getOrganizationActors(patientId, name, Optional.empty(), Optional.empty(), fhirClient, configProperties));

        //Add related Person
        abstractCareTeamDtoList.addAll(FhirResourceUtil.getRelatedPersonActors(patientId, name, Optional.empty(), Optional.empty(), fhirClient, configProperties));

        actorType.ifPresent(type -> abstractCareTeamDtoList.removeIf(actors -> !actors.getCareTeamType().toString().equalsIgnoreCase(type)));
        actorsAlreadyAssigned.ifPresent(actorsAlreadyPresent -> abstractCareTeamDtoList.removeIf(abstractCareTeamDto -> actorsAlreadyPresent.contains(abstractCareTeamDto.getId())));

        return (PageDto<AbstractCareTeamDto>) PaginationUtil.applyPaginationForCustomArrayList(abstractCareTeamDtoList, numberOfActorsPerPage, pageNumber, false);
    }


    private DetailedConsentDto convertConsentBundleEntryToConsentDto(Bundle.BundleEntryComponent fhirConsentDtoModel) {
        ConsentDto consentDto = modelMapper.map(fhirConsentDtoModel.getResource(), ConsentDto.class);

        Consent consent = (Consent) fhirConsentDtoModel.getResource();

        consentDto.setLogicalId(consent.getIdElement().getIdPart());

        List<ReferenceDto> references_actors = consent.getProvision().getActor().stream().map(actor -> {
            ReferenceDto referenceDto = new ReferenceDto();
            referenceDto.setReference(actor.getReference().getReference());
            referenceDto.setDisplay(actor.getReference().getDisplay());
            return referenceDto;
        }).collect(toList());

        consentDto.setActor(references_actors);

        List<ValueSetDto> valueSet_purpose = consent.getProvision().getPurpose().stream().map(purpose -> {
            ValueSetDto valueSetDto = new ValueSetDto();
            valueSetDto.setCode(purpose.getCode());
            valueSetDto.setDisplay(purpose.getDisplay());
            valueSetDto.setSystem(purpose.getSystem());
            return valueSetDto;
        }).collect(toList());

        PeriodDto periodDto = new PeriodDto();
        periodDto.setEnd(consent.getProvision().getDataPeriod().getEnd().toInstant().atZone(ZoneId.systemDefault()).toLocalDate());
        periodDto.setStart(consent.getProvision().getDataPeriod().getStart().toInstant().atZone(ZoneId.systemDefault()).toLocalDate());

        consentDto.setPeriod(periodDto);

        consentDto.setPurpose(valueSet_purpose);

        consentDto.getActor()
                .stream()
                .filter(member -> member.getDisplay().trim().equalsIgnoreCase(ConsentConstants.PSEUDO_ORGANIZATION_NAME.trim()))
                .map(member -> true)
                .forEach(consentDto::setGeneralDesignation);


        //setting medical info type
        if (consentDto.getMedicalInformation() != null) {
            int totalMedicalInfo = lookUpService.getConsentSecurityLabel() != null ?
                    lookUpService.getConsentSecurityLabel().size() : 0;
            if (consentDto.getMedicalInformation().size() < lookUpService.getConsentSecurityLabel().size()) {
                consentDto.setConsentMedicalInfoType(ConsentMedicalInfoType.SHARE_SPECIFIC);
            } else {
                consentDto.setConsentMedicalInfoType(ConsentMedicalInfoType.SHARE_ALL);
            }
        }

        DetailedConsentDto detailedConsentDto = convertConsentDtoToDetailedConsentDto(consentDto);

        try {
            if (consent.hasSourceAttachment() && !consentDto.getStatus().equalsIgnoreCase("draft")) {
                detailedConsentDto.setSourceAttachment(consent.getSourceAttachment().getData());
            } else if (consentDto.getStatus().equalsIgnoreCase("draft")) {
                String patientID = consentDto.getPatient().getReference().replace("Patient/", "");
                PatientDto patientDto = patientService.getPatientById(patientID, Optional.empty());
                log.info("Generating consent PDF");
                byte[] pdfBytes = consentPdfGenerator.generateConsentPdf(detailedConsentDto, patientDto, ConsentConstants.OPERATED_BY_PATIENT, Optional.empty());
                detailedConsentDto.setSourceAttachment(pdfBytes);
            }

        } catch (FHIRException | IOException e) {
            log.error("No Consent document found");
            throw new NoDataFoundException("No Consent document found");
        }

        return detailedConsentDto;
    }

    private IQuery getConsentIQuery(Optional<String> patient, Optional<String> practitioner, Optional<String> status, Optional<Boolean> generalDesignation) {
        IQuery iQuery = fhirClient.search().forResource(Consent.class).sort().descending(PARAM_LASTUPDATED);

        //Query the status.
        if (status.isPresent()) {
            iQuery.where(new TokenClientParam("status").exactly().code("active"));
        } else {
            //query with practitioner.
            practitioner.ifPresent(pr -> {
                if (!getCareTeamIdsFromPractitioner(pr).isEmpty()) {
                    iQuery.where(new ReferenceClientParam("actor").hasAnyOfIds(getCareTeamIdsFromPractitioner(pr)));
                }
            });

            //query with patient.
            patient.ifPresent(pt -> iQuery.where(new ReferenceClientParam("patient").hasId(pt)));

            //Query with general designation.
            generalDesignation.ifPresent(gd -> {
                if (gd) {
                    String pseudoOrgId = getPseudoOrganization().getEntry().stream().findFirst().map(pseudoOrgEntry -> {
                        Organization organization = (Organization) pseudoOrgEntry.getResource();
                        return organization.getIdElement().getIdPart();
                    }).get();
                    iQuery.where(new ReferenceClientParam("actor").hasId(pseudoOrgId));
                }
            });

        }
        return iQuery;
    }

    @Override
    public void attestConsent(String consentId) {

        Consent consent = fhirClient.read().resource(Consent.class).withId(consentId.trim()).execute();
        try {
            consent.setStatus(Consent.ConsentState.fromCode("active"));
        } catch (FHIRException e) {
            throw new RuntimeException(e);
        }

        DetailedConsentDto detailedConsentDto = getConsentsById(consentId);
        detailedConsentDto.setStatus("Active");

        String patientID = detailedConsentDto.getPatient().getReference().replace("Patient/", "");
        PatientDto patientDto = patientService.getPatientById(patientID, Optional.empty());


        try {
            log.info("Attest consent: Generating the attested PDF");
            byte[] pdfBytes = consentPdfGenerator.generateConsentPdf(detailedConsentDto, patientDto, ConsentConstants.OPERATED_BY_PATIENT, Optional.empty());
            consent.setSource(addAttachment(pdfBytes));

        } catch (IOException e) {
            throw new ConsentPdfGenerationException(e);
        }
        //consent.getSourceAttachment().getData();
        log.info("Updating consent: Saving the consent into the FHIR server.");

        //Set Profile Meta Data
        //FhirProfileUtil.setConsentProfileMetaData(fhirClient, consent);

        //Validate
        //FhirOperationUtil.validateFhirResource(fhirValidator, consent, Optional.of(consentId), ResourceType.Consent.name(), "Attest Consent");

        //Update
        FhirOperationUtil.updateFhirResource(fhirClient, consent, "Attest Consent");
    }

    @Override
    public void revokeConsent(String consentId) {

        Consent consent = fhirClient.read().resource(Consent.class).withId(consentId.trim()).execute();
        try {
            consent.setStatus(Consent.ConsentState.fromCode("inactive"));
        } catch (FHIRException e) {
            throw new RuntimeException(e);
        }

        DetailedConsentDto detailedConsentDto = getConsentsById(consentId);
        detailedConsentDto.setStatus("Inactive");

        String patientID = detailedConsentDto.getPatient().getReference().replace("Patient/", "");
        PatientDto patientDto = patientService.getPatientById(patientID, Optional.empty());

        try {
            log.info("Revoke consent: Generating the Revocation PDF");
            byte[] pdfBytes = consentRevocationPdfGenerator.generateConsentRevocationPdf(detailedConsentDto, patientDto, ConsentConstants.OPERATED_BY_PATIENT, Optional.empty());
            consent.setSource(addAttachment(pdfBytes));

        } catch (IOException e) {
            throw new ConsentPdfGenerationException(e);
        }
        //consent.getSourceAttachment().getData();
        log.info("Updating consent: Saving the consent into the FHIR server.");

        //Set Profile Meta Data
        //FhirProfileUtil.setConsentProfileMetaData(fhirClient, consent);

        //Validate
        //FhirOperationUtil.validateFhirResource(fhirValidator, consent, Optional.of(consentId), ResourceType.Consent.name(), "Revoke Consent");

        //Update
        FhirOperationUtil.updateFhirResource(fhirClient, consent, "Revoke Consent");
    }

    private Attachment addAttachment(byte[] pdfBytes) {
        Attachment attachment = new Attachment();
        attachment.setContentType(ConsentConstants.CONTENT_TYPE);
        attachment.setData(pdfBytes);
        return attachment;
    }


    @Override
    public PdfDto createConsentPdf(String consentId) {
        DetailedConsentDto detailedConsentDto = getConsentsById(consentId);
        String patientID = detailedConsentDto.getPatient().getReference().replace("Patient/", "");
        PatientDto patientDto = patientService.getPatientById(patientID, Optional.empty());

        try {
            log.info("Generating consent PDF");
            byte[] pdfBytes = consentPdfGenerator.generateConsentPdf(detailedConsentDto, patientDto, ConsentConstants.OPERATED_BY_PATIENT, Optional.empty());
            return new PdfDto(pdfBytes);

        } catch (IOException e) {
            throw new ConsentPdfGenerationException(e);
        }
    }


    private Consent consentDtoToConsent(Optional<String> consentId, ConsentDto consentDto) {
        Consent consent = new Consent();
        Consent.provisionComponent provisionComponent = new Consent.provisionComponent();

        if (consentDto.getPeriod() != null) {
            Period period = new Period();
            period.setStart((consentDto.getPeriod().getStart() != null) ? java.sql.Date.valueOf(consentDto.getPeriod().getStart()) : null);
            period.setEnd((consentDto.getPeriod().getEnd() != null) ? java.sql.Date.valueOf(consentDto.getPeriod().getEnd()) : null);
            provisionComponent.setDataPeriod(period);
            //consent.setPeriod(period);
        }

        consent.setPatient(FhirDtoUtil.mapReferenceDtoToReference(consentDto.getPatient()));

        // Set UUID
        CodeableConcept codeableConcept_policy = new CodeableConcept();
        codeableConcept_policy.setText(UUID.randomUUID().toString());
        consent.setPolicyRule(codeableConcept_policy);

        // Consenting Party
        // TODO: Not sure
        //consent.getConsentingParty().add(FhirDtoUtil.mapReferenceDtoToReference(consentDto.getPatient()));

        Coding coding_scope = new Coding();
        coding_scope.setCode("patient-privacy");
        coding_scope.setDisplay("Privacy Consent");
        coding_scope.setSystem("http://hl7.org/fhir/ValueSet/consent-scope");

        List<Coding> codings = new ArrayList<>();
        codings.add(coding_scope);

        CodeableConcept codeableConcept_scope = new CodeableConcept();
        codeableConcept_scope.setText("Privacy Consent");
        codeableConcept_scope.setCoding(codings);

        consent.setScope(codeableConcept_scope);

        Coding coding_category = new Coding();
        coding_category.setSystem("http://terminology.hl7.org/CodeSystem/consentcategorycodes");
        coding_category.setCode("emrgonly");
        coding_category.setDisplay("Emergency Only");

        List<Coding> codings_category = new ArrayList<>();
        codings_category.add(coding_category);

        CodeableConcept codeableConcept_category = new CodeableConcept();
        codeableConcept_category.setCoding(codings_category);
        codeableConcept_category.setText("Emergency Only");

        List<CodeableConcept> codeableConcepts_category = new ArrayList<>();
        codeableConcepts_category.add(codeableConcept_category);

        consent.setCategory(codeableConcepts_category);



        //Set Action
        CodeableConcept actionConcept = new CodeableConcept();
        actionConcept.addCoding(
                new Coding().setCode(ConsentConstants.CONSENT_ACTION_CODE)
                        .setSystem(ConsentConstants.CONSENT_ACTION_CODING_SYSTEM)
                        .setDisplay(ConsentConstants.CONSENT_ACTION_DISPLAY)
        );

        List<CodeableConcept> actions_codeable = new ArrayList<>();
        actions_codeable.add(actionConcept);

        provisionComponent.setAction(actions_codeable);

        //consent.getProvision().getAction().add(actionConcept);

        if (consentDto.getDateTime() != null) {
            consent.setDateTime(java.sql.Date.valueOf(consentDto.getDateTime()));
        } else {
            consent.setDateTime(java.sql.Date.valueOf(LocalDate.now()));
        }

        if (!consentDto.getPurpose().isEmpty() && consentDto.getPurpose() != null) {
            System.out.println("Setting purpose");
            List<Coding> purposes = consentDto.getPurpose().stream().map(purpose -> {
                Coding coding = new Coding();
                coding.setDisplay((purpose.getDisplay() != null && !purpose.getDisplay().isEmpty()) ? purpose.getDisplay() : null)
                        .setCode((purpose.getCode() != null && !purpose.getCode().isEmpty()) ? purpose.getCode() : null)
                        .setSystem((purpose.getSystem() != null && !purpose.getSystem().isEmpty()) ? purpose.getSystem() : ConsentConstants.CONSENT_PURPOSE_OF_USE_CODING_SYSTEM);
                return coding;
            }).collect(toList());
            provisionComponent.setPurpose(purposes);
            //consent.getProvision().setPurpose(purposes);
        }

        if (consentDto.getStatus() != null) {
            try {
                consent.setStatus(Consent.ConsentState.fromCode(consentDto.getStatus()));
            } catch (FHIRException e) {
                throw new ResourceNotFoundException("Invalid consent status found.");
            }
        }

        //Setting identifier
        List<Identifier> identifiers = new ArrayList<>();
        if (!consentId.isPresent()) {
            Identifier identifier = new Identifier();
            identifier.setValue(UUID.randomUUID().toString());
            identifier.setSystem(configProperties.getConsent().getIdentifierSystem());
            identifiers.add(identifier);
            consent.setIdentifier(identifiers);
        } else if (consentDto.getIdentifier() != null) {
            Identifier identifier = new Identifier();
            identifier.setValue(consentDto.getIdentifier().getValue());
            identifier.setSystem(consentDto.getIdentifier().getSystem());
            identifiers.add(identifier);
            consent.setIdentifier(identifiers);
        }

//        List<Consent.ConsentActorComponent> actors = new ArrayList<>();
//

        //Get pseudo organization
        Bundle organizationBundle = getPseudoOrganization();

        List<Consent.provisionActorComponent> actorComponents = new ArrayList<>();

        organizationBundle.getEntry().stream().findAny().ifPresent(entry -> {
            Organization organization = (Organization) entry.getResource();
            ReferenceDto referenceDto = new ReferenceDto();
            referenceDto.setReference("Organization/" + organization.getIdElement().getIdPart());
            referenceDto.setDisplay(organization.getName());
            consent.setOrganization(Collections.singletonList(FhirDtoUtil.mapReferenceDtoToReference(referenceDto)));

            if (consentDto.isGeneralDesignation()) {
                Consent.provisionActorComponent fromActor = new Consent.provisionActorComponent();
                //Consent.ConsentActorComponent fromActor = new Consent.ConsentActorComponent();
                //TODO: FIX this method
                //CodeableConcept codeableConcept_org_role = FhirDtoUtil.convertValuesetDtoToCodeableConcept(FhirDtoUtil.convertCodeToValueSetDto(ConsentConstants.CONSENT_CUSTODIAN_CODE, lookUpService.getConsentSecurityRole()));
                CodeableConcept codeableConcept_role = new CodeableConcept();
                List<Coding> codings_role = new ArrayList<>();
                Coding coding_role = new Coding();
                coding_role.setDisplay("custodian");
                coding_role.setCode("CST");
                coding_role.setSystem("/ValueSet/security-role-type");
                codeableConcept_role.setText("custodian");
                codings_role.add(coding_role);
                codeableConcept_role.setCoding(codings_role);
                fromActor.setReference(FhirDtoUtil.mapReferenceDtoToReference(referenceDto))
                         .setRole(codeableConcept_role);
                actorComponents.add(fromActor);
                System.out.println("Adding Organization");
            }
        });

        System.out.println("Actors: "+actorComponents.size());

        if (consentDto.isGeneralDesignation()) {
            //Adding To careTeams
            Bundle careTeamBundle = fhirClient.search().forResource(CareTeam.class)
                    .where(new ReferenceClientParam("subject").hasId(consentDto.getPatient().getReference()))
                    .returnBundle(Bundle.class).execute();
            //provisionComponent.getActor()::add
            careTeamBundle.getEntry().stream().map(careTeamEntry -> (CareTeam) careTeamEntry.getResource())
                    .map(careTeam -> convertCareTeamToActor(careTeam, FhirDtoUtil.convertCodeToValueSetDto(ConsentConstants.CONSENT_INFORMANT_RECIPIENT_CODE, lookUpService
                    .getConsentSecurityRole())))
                    .forEach(actor -> {
                        CodeableConcept codeableConcept_role = new CodeableConcept();
                        List<Coding> codings_role = new ArrayList<>();
                        Coding coding_role = new Coding();
                        coding_role.setDisplay("assigned entity");
                        coding_role.setCode("ASSIGNED");
                        codeableConcept_role.setText("assigned entity");
                        codings_role.add(coding_role);
                        codeableConcept_role.setCoding(codings_role);
                        actor.setRole(codeableConcept_role);
                        actorComponents.add(actor);
                    });
            //consent.setActor(actors);
        } else {
            List<Consent.provisionActorComponent> fromActors = consentDto.getFromActor().stream().map(fromActor -> {
                Consent.provisionActorComponent from = new Consent.provisionActorComponent();
                CodeableConcept codeableConcept_role = new CodeableConcept();
                List<Coding> codings_role = new ArrayList<>();
                Coding coding_role = new Coding();
                coding_role.setDisplay("assigned entity");
                coding_role.setCode("ASSIGNED");
                codeableConcept_role.setText("assigned entity");
                codings_role.add(coding_role);
                codeableConcept_role.setCoding(codings_role);
                from.setRole(codeableConcept_role);
                from.setReference(FhirDtoUtil.mapReferenceDtoToReference(fromActor));
//                from.setReference(FhirDtoUtil.mapReferenceDtoToReference(fromActor))
//                        .setRole(FhirDtoUtil.convertValuesetDtoToCodeableConcept(FhirDtoUtil.convertCodeToValueSetDto(ConsentConstants.CONSENT_CUSTODIAN_CODE, lookUpService.getConsentSecurityRole())));
                return from;
            }).collect(toList());

            List<Consent.provisionActorComponent> toActors = consentDto.getToActor().stream().map(toActor -> {
                Consent.provisionActorComponent to = new Consent.provisionActorComponent();
                CodeableConcept codeableConcept_role = new CodeableConcept();
                List<Coding> codings_role = new ArrayList<>();
                Coding coding_role = new Coding();
                coding_role.setDisplay("assigned entity");
                coding_role.setCode("ASSIGNED");
                codeableConcept_role.setText("assigned entity");
                codings_role.add(coding_role);
                codeableConcept_role.setCoding(codings_role);
                to.setRole(codeableConcept_role);
                to.setReference(FhirDtoUtil.mapReferenceDtoToReference(toActor));
//                to.setReference(FhirDtoUtil.mapReferenceDtoToReference(toActor))
//                        .setRole(FhirDtoUtil.convertValuesetDtoToCodeableConcept(FhirDtoUtil.convertCodeToValueSetDto(ConsentConstants.CONSENT_INFORMANT_RECIPIENT_CODE, lookUpService.getConsentSecurityRole())));
                return to;
            }).collect(toList());

            //Adding toActors to the fromActors.
            System.out.println("Adding toActors to the fromActors");
            actorComponents.addAll(toActors);
            actorComponents.addAll(fromActors);
            //consent.getProvision().setActor(actorComponents);
//            consent.setActor(fromActors);
        }
        //consent.setProvision(provisionComponent);
        provisionComponent.setActor(actorComponents);
        // set Medical Information
        setMedicalInformation(consentDto, consent, provisionComponent);

        return consent;
    }

    private void setMedicalInformation(ConsentDto consentDto, Consent consent, Consent.provisionComponent provisionComponent) {
        // Adding Medical Information
//        Consent.provisionComponent exceptComponent = new Consent.provisionComponent();

        // List of included Sensitive policy codes
        provisionComponent.setType(Consent.ConsentProvisionType.PERMIT);
        if (consentDto.isGeneralDesignation()) {
            // share all
            provisionComponent.setSecurityLabel(getIncludeCodingList(lookUpService.getConsentSecurityLabel()));
        } else {
            // share the one user selects
            // TODO: Not getting medical information from front-end consentDto.getMedicalInformation()
            provisionComponent.setSecurityLabel(getIncludeCodingList(lookUpService.getConsentSecurityLabel()));
        }
        consent.setProvision(provisionComponent);
    }

    private List<Coding> getIncludeCodingList(List<ValueSetDto> medicalInfoList) {
        // Set Exempt portion
        // Get "share" categories from consent
        return medicalInfoList
                .stream()
                .map(valueSetDto -> new Coding(valueSetDto.getSystem(), valueSetDto.getCode(), valueSetDto.getDisplay()))
                .collect(toList());
    }


    private Consent.provisionActorComponent convertCareTeamToActor(CareTeam careTeam, ValueSetDto securityRoleValueSet) {
        Consent.provisionActorComponent actor = new Consent.provisionActorComponent();
        ReferenceDto referenceDto = new ReferenceDto();
        referenceDto.setReference("CareTeam/" + careTeam.getIdElement().getIdPart());
        referenceDto.setDisplay(careTeam.getName());
        actor.setReference(FhirDtoUtil.mapReferenceDtoToReference(referenceDto));
        actor.setRole(FhirDtoUtil.convertValuesetDtoToCodeableConcept(securityRoleValueSet));
        return actor;
    }

    private ReferenceDto convertCareTeamToReferenceDto(CareTeam careTeam) {
        ReferenceDto referenceDto = new ReferenceDto();
        referenceDto.setReference(careTeam.getIdElement().getIdPart());
        referenceDto.setDisplay(careTeam.getName());
        return referenceDto;
    }

    private boolean isDuplicate(ConsentDto consentDto, Optional<String> consentId) {
        //Duplicate Check For General Designation
        if (consentDto.isGeneralDesignation()) {
            Bundle consentBundle = fhirClient.search().forResource(Consent.class).where(new ReferenceClientParam("patient").hasId(consentDto.getPatient().getReference()))
                    .returnBundle(Bundle.class).execute();
            boolean checkFromBundle = consentBundle.getEntry().stream().anyMatch(consentBundleEntry -> {
                Consent consent = (Consent) consentBundleEntry.getResource();
                List<String> fromActor = getReferenceOfCareTeam(consent, ConsentConstants.CONSENT_CUSTODIAN_CODE);

                Optional<String> pseudoOrgRef = getPseudoOrganization().getEntry().stream().findFirst().map(pseudoOrg -> {
                    Organization organization = (Organization) pseudoOrg.getResource();
                    return organization.getIdElement().getIdPart();
                });
                if ((fromActor.size() == 1)) {
                    if (fromActor.stream().findFirst().get().equalsIgnoreCase("Organization/" + pseudoOrgRef)) {
                        return consentId.map(s -> !(s.equalsIgnoreCase(consent.getIdElement().getIdPart()))).orElse(true);
                    } else {
                        return false;
                    }
                } else {
                    return false;
                }
            });

            return checkFromBundle;
        }
        return false;
    }

    private List<String> getReferenceOfCareTeam(Consent consent, String code) {
        return consent.getProvision().getActor().stream().filter(actor -> actor.getRole().getCoding().stream()
                .anyMatch(role -> role.getCode().equalsIgnoreCase(code)))
                .map(actor -> actor.getReference().getReference())
                .collect(toList());
    }

    private Bundle getPseudoOrganization() {
        Bundle pseudoOrg = fhirClient.search().forResource(Organization.class)
                .where(new TokenClientParam("identifier").exactly().code(ConsentConstants.PSEUDO_ORGANIZATION_TAX_ID))
                .returnBundle(Bundle.class)
                .execute();
        if (pseudoOrg == null || pseudoOrg.isEmpty()) {
            //Create Pseudo Org
            Organization org = new Organization();
            org.setActive(true);
            org.setName(ConsentConstants.PSEUDO_ORGANIZATION_TAX_ID);
            Identifier id = new Identifier().setSystem("urn:oid:2.16.840.1.113883.4.4").setValue("530196960");
            org.setIdentifier(Collections.singletonList(id));
            ContactPoint phoneContactPoint = new ContactPoint().setRank(1).setSystem(ContactPoint.ContactPointSystem.valueOf("PHONE")).setValue("(240)2762827");
            ContactPoint emailContactPoint = new ContactPoint().setRank(2).setSystem(ContactPoint.ContactPointSystem.valueOf("EMAIL")).setValue("Kenneth.Salyards@SAMHSA.hhs.gov");
            org.setTelecom(Arrays.asList(phoneContactPoint, emailContactPoint));
            Address add = new Address().setLine(Collections.singletonList(new StringType("5600 Fishers Lane"))).setCity("Rockville").setState("MD").setPostalCode("20857").setCountry("USA");
            org.setAddress(Collections.singletonList(add));

            //Set Profile Meta Data
            //FhirProfileUtil.setOrganizationProfileMetaData(fhirClient, org);

            //Validate
            FhirOperationUtil.validateFhirResource(fhirValidator, org, Optional.empty(), ResourceType.Organization.name(), "Create Pseudo Organization");

            //Create
            MethodOutcome serverResponse = FhirOperationUtil.createFhirResource(fhirClient, org, ResourceType.Organization.name());

            // Add TO DO Activity Definition
            ActivityDefinition activityDefinition = FhirResourceUtil.createToDoActivityDefinition(serverResponse.getId().getIdPart());

            //Set Profile Meta Data
            //FhirProfileUtil.setActivityDefinitionProfileMetaData(fhirClient, activityDefinition);

            //Validate
            FhirOperationUtil.validateFhirResource(fhirValidator, activityDefinition, Optional.empty(), ResourceType.ActivityDefinition.name(), "Create ActivityDefinition (when creating Pseudo Organization)");

            //Create TO DO Activity Definition
            FhirOperationUtil.createFhirResource(fhirClient, activityDefinition, ResourceType.ActivityDefinition.name());
            return fhirClient.search().forResource(Organization.class)
                    .where(new TokenClientParam("identifier").exactly().code(ConsentConstants.PSEUDO_ORGANIZATION_TAX_ID))
                    .returnBundle(Bundle.class)
                    .execute();
        }
        return pseudoOrg;
    }

    private List<String> getCareTeamIdsFromPractitioner(String practitioner) {
        IQuery careTeamQuery = fhirClient.search().forResource(CareTeam.class)
                .where(new ReferenceClientParam("participant").hasId(practitioner));

        Bundle careTeamBundle = (Bundle) careTeamQuery.returnBundle(Bundle.class).execute();

        return careTeamBundle.getEntry().stream().map(careTeamBundleEntry -> {
            CareTeam careTeam = (CareTeam) careTeamBundleEntry.getResource();
            return careTeam.getIdElement().getIdPart();
        }).collect(toList());

    }

    private DetailedConsentDto convertConsentDtoToDetailedConsentDto(ConsentDto consentDto) {

        List<AbstractCareTeamDto> fromOrganizationActors = consentDto.getActor().stream().filter(ac -> ac.getReference().contains("Organization"))
                .map(actor -> FhirResourceUtil.getOrganizationActors(Optional.empty(), Optional.empty(), Optional.of(actor.getReference().replace("Organization/", "")), Optional.empty(), fhirClient, configProperties)
                        .stream().findAny().get()
                ).collect(toList());

        List<AbstractCareTeamDto> fromPractitionerActors = consentDto.getActor().stream().filter(ac -> ac.getReference().contains("Practitioner"))
                .map(actor -> FhirResourceUtil.getPractitionerActors(Optional.empty(), Optional.empty(), Optional.of(actor.getReference().replace("Practitioner/", "")), Optional.empty(), fhirClient, configProperties)
                        .stream().findAny().get()
                ).collect(toList());

        List<AbstractCareTeamDto> fromRelatedPersons = consentDto.getActor().stream().filter(ac -> ac.getReference().contains("RelatedPerson"))
                .map(actor -> FhirResourceUtil.getRelatedPersonActors(Optional.empty(), Optional.empty(), Optional.of(actor.getReference().replace("RelatedPerson/", "")), Optional.empty(), fhirClient, configProperties)
                        .stream().findAny().get()
                ).collect(toList());


        List<AbstractCareTeamDto> toOrganizationActors = consentDto.getActor().stream().filter(ac -> ac.getReference().contains("Organization"))
                .map(actor -> FhirResourceUtil.getOrganizationActors(Optional.empty(), Optional.empty(), Optional.of(actor.getReference().replace("Organization/", "")), Optional.empty(), fhirClient, configProperties)
                        .stream().findAny().get()
                ).collect(toList());

        List<AbstractCareTeamDto> toPractitionerActors = consentDto.getActor().stream().filter(ac -> ac.getReference().contains("Practitioner"))
                .map(actor -> FhirResourceUtil.getPractitionerActors(Optional.empty(), Optional.empty(), Optional.of(actor.getReference().replace("Practitioner/", "")), Optional.empty(), fhirClient, configProperties)
                        .stream().findAny().get()
                ).collect(toList());

        List<AbstractCareTeamDto> toRelatedPersons = consentDto.getActor().stream().filter(ac -> ac.getReference().contains("RelatedPerson"))
                .map(actor -> FhirResourceUtil.getRelatedPersonActors(Optional.empty(), Optional.empty(), Optional.of(actor.getReference().replace("RelatedPerson/", "")), Optional.empty(), fhirClient, configProperties)
                        .stream().findAny().get()
                ).collect(toList());


        List<ReferenceDto> toCareTeams = consentDto.getActor().stream().filter(ac -> ac.getReference().contains("CareTeam")).collect(toList());

        DetailedConsentDto detailedConsentDto = new DetailedConsentDto();

        return detailedConsentDto.builder()
                .logicalId(consentDto.getLogicalId())
                .identifier(consentDto.getIdentifier())
                .category(consentDto.getCategory())
                .period(consentDto.getPeriod())
                .dateTime(consentDto.getDateTime())
                .status(consentDto.getStatus())
                .generalDesignation(consentDto.isGeneralDesignation())
                .patient(consentDto.getPatient())
                .fromOrganizationActors(fromOrganizationActors)
                .fromPractitionerActors(fromPractitionerActors)
                .fromRelatedPersons(fromRelatedPersons)
                .toOrganizationActors(toOrganizationActors)
                .toPractitionerActors(toPractitionerActors)
                .toRelatedPersons(toRelatedPersons)
                .toCareTeams(toCareTeams)
                .category(consentDto.getCategory())
                .purpose(consentDto.getPurpose())
                .medicalInformation(consentDto.getMedicalInformation())
                .sourceAttachment(consentDto.getSourceAttachment())
                .consentMedicalInfoType(consentDto.getConsentMedicalInfoType())
                .build();
    }


}
