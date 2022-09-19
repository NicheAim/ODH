package gov.samhsa.ocp.ocpfis.service;

import ca.uhn.fhir.context.FhirContext;
import ca.uhn.fhir.rest.api.MethodOutcome;
import ca.uhn.fhir.rest.client.api.IGenericClient;
import ca.uhn.fhir.rest.gclient.IQuery;
import ca.uhn.fhir.rest.gclient.ReferenceClientParam;
import ca.uhn.fhir.rest.gclient.TokenClientParam;
import ca.uhn.fhir.validation.FhirValidator;
import gov.samhsa.ocp.ocpfis.config.FisProperties;
import gov.samhsa.ocp.ocpfis.constants.CareTeamConstants;
import gov.samhsa.ocp.ocpfis.domain.CareTeamFieldEnum;
import gov.samhsa.ocp.ocpfis.domain.ParticipantTypeEnum;
import gov.samhsa.ocp.ocpfis.domain.ProvenanceActivityEnum;
import gov.samhsa.ocp.ocpfis.service.dto.CareTeamDto;
import gov.samhsa.ocp.ocpfis.service.dto.PageDto;
import gov.samhsa.ocp.ocpfis.service.dto.ParticipantDto;
import gov.samhsa.ocp.ocpfis.service.dto.ParticipantReferenceDto;
import gov.samhsa.ocp.ocpfis.service.dto.ReferenceDto;
import gov.samhsa.ocp.ocpfis.service.exception.DuplicateResourceFoundException;
import gov.samhsa.ocp.ocpfis.service.exception.FHIRClientException;
import gov.samhsa.ocp.ocpfis.service.exception.ResourceNotFoundException;
import gov.samhsa.ocp.ocpfis.service.mapping.CareTeamToCareTeamDtoConverter;
import gov.samhsa.ocp.ocpfis.service.mapping.dtotofhirmodel.CareTeamDtoToCareTeamConverter;
import gov.samhsa.ocp.ocpfis.util.DateUtil;
import gov.samhsa.ocp.ocpfis.util.FhirDtoUtil;
import gov.samhsa.ocp.ocpfis.util.FhirOperationUtil;
import gov.samhsa.ocp.ocpfis.util.FhirProfileUtil;
import gov.samhsa.ocp.ocpfis.util.FhirResourceUtil;
import gov.samhsa.ocp.ocpfis.util.pagination.PaginationRepository;
import gov.samhsa.ocp.ocpfis.util.ProvenanceUtil;
import gov.samhsa.ocp.ocpfis.util.RichStringClientParam;
import lombok.extern.slf4j.Slf4j;
import org.hl7.fhir.exceptions.FHIRException;
import org.hl7.fhir.r4.model.Bundle;
import org.hl7.fhir.r4.model.CareTeam;
import org.hl7.fhir.r4.model.CodeableConcept;
import org.hl7.fhir.r4.model.Coding;
import org.hl7.fhir.r4.model.EpisodeOfCare;
import org.hl7.fhir.r4.model.Organization;
import org.hl7.fhir.r4.model.Patient;
import org.hl7.fhir.r4.model.Period;
import org.hl7.fhir.r4.model.Practitioner;
import org.hl7.fhir.r4.model.Reference;
import org.hl7.fhir.r4.model.RelatedPerson;
import org.hl7.fhir.r4.model.Resource;
import org.hl7.fhir.r4.model.ResourceType;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

import java.text.ParseException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collection;
import java.util.List;
import java.util.Optional;
import java.util.stream.Stream;

import static ca.uhn.fhir.rest.api.Constants.PARAM_LASTUPDATED;
import static java.util.stream.Collectors.toList;

@Service
@Slf4j
public class CareTeamServiceImpl implements CareTeamService {

    private final IGenericClient fhirClient;
    private final FhirValidator fhirValidator;
    private final LookUpService lookUpService;
    private final FisProperties fisProperties;
    private final CommunicationService communicationService;
    private final ProvenanceUtil provenanceUtil;
    private final PractitionerServiceImpl practitionerService;

    private final PaginationRepository paginationProxy;
    private final PaginationRepository paginationHapi;

    private final PaginationRepository paginationGcp;

    @Autowired
    public CareTeamServiceImpl(IGenericClient fhirClient, FhirValidator fhirValidator, LookUpService lookUpService, FisProperties fisProperties, CommunicationService communicationService, ProvenanceUtil provenanceUtil, PractitionerServiceImpl practitionerService, @Qualifier("PaginationProxyImpl") PaginationRepository paginationProxy, @Qualifier("PaginationHapiFhirImpl") PaginationRepository paginationHapi, @Qualifier("PaginationGcpImpl") PaginationRepository paginationGcp) {
        this.fhirClient = fhirClient;
        this.fhirValidator = fhirValidator;
        this.lookUpService = lookUpService;
        this.fisProperties = fisProperties;
        this.communicationService = communicationService;
        this.provenanceUtil = provenanceUtil;
        this.practitionerService = practitionerService;
        this.paginationProxy = paginationProxy;
        this.paginationHapi = paginationHapi;
        this.paginationGcp = paginationGcp;
    }

    @Override
    public void createCareTeam(CareTeamDto careTeamDto, Optional<String> loggedInUser) {
        log.info("createCareTeam");
        // checkForDuplicates(careTeamDto);
        try {
            List<String> idList = new ArrayList<>();
            final CareTeam careTeam = CareTeamDtoToCareTeamConverter.map(careTeamDto);

            //Set Profile Meta Data
            // log.info("Trying to set profile meta data");
            // FhirProfileUtil.setCareTeamProfileMetaData(fhirClient, careTeam);
            FhirContext fhirContextinternal = FhirContext.forR4();
            fhirContextinternal.getRestfulClientFactory().setSocketTimeout(Integer.parseInt(fisProperties.getFhir().getClientSocketTimeoutInMs()));

            FhirValidator fhirValidatorinternal = fhirContextinternal.newValidator();
            //Validate
            log.info("Trying to validate fhir resourse");
            FhirOperationUtil.validateFhirResource(fhirValidatorinternal, careTeam, Optional.empty(), ResourceType.CareTeam.name(), "Create CareTeam");

            //Create
            //remove Episode of Care from CareTeam before saving it
            log.info("Trying to remove Episode of Care from CareTeam before saving it");
            Reference rEoc = careTeam.getEncounter();
            careTeam.setEncounter(null);

            log.info("Trying to create resource");
            MethodOutcome methodOutcome = FhirOperationUtil.createFhirResource(fhirClient, careTeam, ResourceType.CareTeam.name());
            idList.add(ResourceType.CareTeam.name() + "/" + FhirOperationUtil.getFhirId(methodOutcome));

            //update care team to the EOC
            log.info("Trying to update care team to te EOC");
            updateEpisodeOfCare(methodOutcome.getId().getIdPart(), careTeam.getName(), rEoc);

            if (fisProperties.isProvenanceEnabled()) {
                provenanceUtil.createProvenance(idList, ProvenanceActivityEnum.CREATE, loggedInUser);
            }
        } catch (FHIRException | ParseException e) {
            log.info("CreateCareTeam Exception on creation");
            log.info(e.getMessage());
            throw new FHIRClientException("FHIR Client returned with an error while creating a care team:" + e.getMessage());
        }
    }


    private void updateEpisodeOfCare(String cTeamId, String cTName, Reference rEoc) {

        //Assign fhir care team resource id.
        Reference careTeamRef = new Reference();
        careTeamRef.setReference("CareTeam/" + cTeamId);
        careTeamRef.setDisplay(cTName);

        String eocId = rEoc.getReference();
        if (eocId != null) {
            int lIndex = eocId.indexOf("/");
            eocId = eocId.substring(lIndex + 1);
        }

        IQuery eocSearchQuery = fhirClient.search().forResource(EpisodeOfCare.class).sort().descending(PARAM_LASTUPDATED);
        eocSearchQuery.where(new TokenClientParam("_id").exactly().code(eocId));
        Bundle eocBundle = (Bundle) eocSearchQuery
                .returnBundle(Bundle.class)
                .encodedJson()
                .execute();
        EpisodeOfCare eoc = (EpisodeOfCare) eocBundle.getEntry().get(0).getResource();
        if (eoc.getTeam() != null && !eoc.getTeam().contains(careTeamRef)) {
            eoc.getTeam().add(careTeamRef);
        }
        FhirOperationUtil.updateFhirResource(fhirClient, eoc, ResourceType.EpisodeOfCare.name());
    }

    @Override
    public void updateCareTeam(String careTeamId, CareTeamDto careTeamDto, Optional<String> loggedInUser) {
        try {
            List<String> idList = new ArrayList<>();
            careTeamDto.setId(careTeamId);
            final CareTeam careTeam = CareTeamDtoToCareTeamConverter.map(careTeamDto);
            //Set Profile Meta Data
            // TODO: Cannot set StructureDefinition URL in Profile Metadata for GCP
//            FhirProfileUtil.setCareTeamProfileMetaData(fhirClient, careTeam);
            FhirContext fhirContextinternal = FhirContext.forR4();
            fhirContextinternal.getRestfulClientFactory().setSocketTimeout(Integer.parseInt(fisProperties.getFhir().getClientSocketTimeoutInMs()));

            FhirValidator fhirValidatorinternal = fhirContextinternal.newValidator();
            //Update
            //remove Episode of Care from CareTeam before saving it
            Reference rEoc = careTeam.getEncounter();
            careTeam.setEncounter(null);

            // Pretty Print Fhir JSON to be saved
//            String careteam_to_be_saved = fhirContextinternal.newJsonParser().encodeResourceToString(careTeam);
//            Gson gson = new GsonBuilder().setPrettyPrinting().create();
//            JsonElement jsonElement = JsonParser.parseString(careteam_to_be_saved);
//            String care_pretty_print = gson.toJson(jsonElement);
//            System.out.println(care_pretty_print);

            //Validate
            FhirOperationUtil.validateFhirResource(fhirValidatorinternal, careTeam, Optional.of(careTeamId), ResourceType.CareTeam.name(), "Update CareTeam");
            MethodOutcome methodOutcome = FhirOperationUtil.updateFhirResource(fhirClient, careTeam, ResourceType.CareTeam.name());
            log.info("CareTeam updated");
            idList.add(ResourceType.CareTeam.name() + "/" + FhirOperationUtil.getFhirId(methodOutcome));
            updateEpisodeOfCare(methodOutcome.getId().getIdPart(), careTeam.getName(), rEoc);
            if (fisProperties.isProvenanceEnabled()) {
                provenanceUtil.createProvenance(idList, ProvenanceActivityEnum.UPDATE, loggedInUser);
            }

        } catch (FHIRException | ParseException e) {
            throw new FHIRClientException("FHIR Client returned with an error while updating a care team:" + e.getMessage());

        }
    }

    @Override
    public PageDto<CareTeamDto> getCareTeams(Optional<List<String>> statusList, String searchType, String searchValue, Optional<Integer> page, Optional<Integer> size) {
        int numberOfCareTeamMembersPerPage = PaginationRepository.getValidPageSize(fisProperties, size, ResourceType.CareTeam.name());
        IQuery iQuery = fhirClient.search().forResource(CareTeam.class);

        //Set Sort order
        iQuery = FhirOperationUtil.setLastUpdatedTimeSortOrder(iQuery, true);


        //Check for patient
        if (searchType.equalsIgnoreCase("patientId"))
            iQuery.where(new ReferenceClientParam("patient").hasId("Patient/" + searchValue));

        //Check for status
        if (statusList.isPresent() && !statusList.get().isEmpty()) {
            iQuery.where(new TokenClientParam("status").exactly().codes(statusList.get()));
        }

        IQuery iQueryNoCache = FhirOperationUtil.setNoCacheControlDirective(iQuery);


        Bundle firstPageCareTeamBundle;
        Bundle otherPageCareTeamBundle;
        boolean firstPage = true;

        //Bundle retrieves care team along with its participant and subject
        firstPageCareTeamBundle = (Bundle) iQueryNoCache
                .include(CareTeam.INCLUDE_PARTICIPANT)
                .include(CareTeam.INCLUDE_SUBJECT)
                .count(numberOfCareTeamMembersPerPage)
                .returnBundle(Bundle.class).execute();

        if (firstPageCareTeamBundle == null || firstPageCareTeamBundle.getEntry().isEmpty()) {
            log.info("No Care Team members were found for the given criteria.");
            return new PageDto<>(new ArrayList<>(), numberOfCareTeamMembersPerPage, 0, 0, 0, 0);
        }

        otherPageCareTeamBundle = firstPageCareTeamBundle;

        if (page.isPresent() && page.get() > 1 && otherPageCareTeamBundle.getLink(Bundle.LINK_NEXT) != null) {
            firstPage = false;
            if (fisProperties.getFhir().getData_store_tech().equals("gcp")) {
                otherPageCareTeamBundle = paginationGcp.getSearchBundleAfterFirstPage(fhirClient, fisProperties, firstPageCareTeamBundle, page.get(), numberOfCareTeamMembersPerPage);

            } else if (fisProperties.getFhir().getData_store_tech().equals("hapi")) {
                otherPageCareTeamBundle = paginationHapi.getSearchBundleAfterFirstPage(fhirClient, fisProperties, firstPageCareTeamBundle, page.get(), numberOfCareTeamMembersPerPage);

            } else {
                otherPageCareTeamBundle = paginationProxy.getSearchBundleAfterFirstPage(fhirClient, fisProperties, firstPageCareTeamBundle, page.get(), numberOfCareTeamMembersPerPage);

            }
        }

        List<Bundle.BundleEntryComponent> retrievedCareTeamMembers = otherPageCareTeamBundle.getEntry();

        List<CareTeam> careTeams = retrievedCareTeamMembers
                .stream()
                .filter(retrivedBundle -> retrivedBundle.getResource().getResourceType().equals(ResourceType.CareTeam))
                .map(retrievedCareTeamMember -> (CareTeam) retrievedCareTeamMember.getResource())
                .collect(toList());

        List<CareTeamDto> careTeamDtos = careTeams.stream().map(careTeam -> {

            CareTeamDto careTeamDto = new CareTeamDto();
            careTeamDto.setId(careTeam.getIdElement().getIdPart());
            careTeamDto.setName((careTeam.getName() != null && !careTeam.getName().isEmpty()) ? careTeam.getName() : null);
            if (careTeam.getStatus() != null) {
                careTeamDto.setStatusCode((careTeam.getStatus().toCode() != null && !careTeam.getStatus().toCode().isEmpty()) ? careTeam.getStatus().toCode() : null);
                careTeamDto.setStatusDisplay((FhirDtoUtil.getDisplayForCode(careTeam.getStatus().toCode(), lookUpService.getCareTeamStatuses())).orElse(null));
            }

            //Get Category
            careTeam.getCategory().stream().findFirst().ifPresent(category -> category.getCoding().stream().findFirst().ifPresent(coding -> {
                careTeamDto.setCategoryCode((coding.getCode() != null && !coding.getCode().isEmpty()) ? coding.getCode() : null);
                careTeamDto.setCategoryDisplay((FhirDtoUtil.getDisplayForCode(coding.getCode(), lookUpService.getCareTeamCategories())).orElse(null));
            }));
            String subjectReference = careTeam.getSubject().getReference();
            String patientId = subjectReference.substring(subjectReference.lastIndexOf("/") + 1);

            Optional<Bundle.BundleEntryComponent> patientBundleEntryComponent = retrievedCareTeamMembers.stream().filter(careTeamWithItsSubjectAndParticipant -> careTeamWithItsSubjectAndParticipant.getResource().getResourceType().equals(ResourceType.Patient)).filter(patientSubject -> patientSubject.getResource().getIdElement().getIdPart().equalsIgnoreCase(patientId)
            ).findFirst();

            patientBundleEntryComponent.ifPresent(patient -> {
                Patient subjectPatient = (Patient) patient.getResource();

                subjectPatient.getName().stream().findFirst().ifPresent(name -> {
                    careTeamDto.setSubjectLastName((name.getFamily() != null && !name.getFamily().isEmpty()) ? (name.getFamily()) : null);
                    name.getGiven().stream().findFirst().ifPresent(firstname -> careTeamDto.setSubjectFirstName(firstname.toString()));
                });
                careTeamDto.setSubjectId(patientId);
            });

            //Getting the reason codes
            careTeam.getReasonCode().stream().findFirst().ifPresent(reasonCode -> reasonCode.getCoding().stream().findFirst().ifPresent(code -> {
                careTeamDto.setReasonCode((code.getCode() != null && !code.getCode().isEmpty()) ? code.getCode() : null);
                careTeamDto.setReasonDisplay((FhirDtoUtil.getDisplayForCode(code.getCode(), lookUpService.getCareTeamReasons())).orElse(null));
            }));

            //Getting for participant
            List<ParticipantDto> participantDtos = new ArrayList<>();
            careTeam.getParticipant().forEach(participant -> {
                ParticipantDto participantDto = new ParticipantDto();
                //Getting participant role
                if (participant.getRole() != null && !participant.getRole().isEmpty()) {

                    participant.getRole().get(0).getCoding().stream().findFirst().ifPresent(participantRole -> {
                        participantDto.setRoleCode((participantRole.getCode() != null && !participantRole.getCode().isEmpty()) ? participantRole.getCode() : null);
                        participantDto.setRoleDisplay((FhirDtoUtil.getDisplayForCode(participantRole.getCode(), lookUpService.getParticipantRoles())).orElse(null));
                    });

                }

                //Getting participant start and end date
                if (participant.getPeriod() != null && !participant.getPeriod().isEmpty()) {
                    participantDto.setStartDate((participant.getPeriod().getStart() != null) ? DateUtil.convertDateToString(participant.getPeriod().getStart()) : null);
                    participantDto.setEndDate((participant.getPeriod().getEnd() != null) ? DateUtil.convertDateToString(participant.getPeriod().getEnd()) : null);
                }

                //Getting participant member and onBehalfof
                if (participant.getMember() != null && !participant.getMember().isEmpty()) {
                    String participantMemberReference = participant.getMember().getReference();
                    String participantId = participantMemberReference.split("/")[1];
                    String participantType = participantMemberReference.split("/")[0];

                    //Getting the member
                    retrievedCareTeamMembers.forEach(careTeamWithItsSubjectAndPartipant -> {
                        Resource resource = careTeamWithItsSubjectAndPartipant.getResource();
                        if (resource.getResourceType().toString().trim().replaceAll(" ", "").equalsIgnoreCase(participantType.trim().replaceAll(" ", ""))) {

                            if (resource.getIdElement().getIdPart().equalsIgnoreCase(participantId)) {
                                switch (resource.getResourceType()) {
                                    case Patient:
                                        Patient patient = (Patient) resource;
                                        patient.getName().stream().findFirst().ifPresent(name -> {
                                            name.getGiven().stream().findFirst().ifPresent(firstName -> participantDto.setMemberFirstName(Optional.ofNullable(firstName.toString())));
                                            participantDto.setMemberLastName(Optional.ofNullable(name.getFamily()));
                                        });
                                        participantDto.setMemberId(participantId);
                                        participantDto.setMemberType(patient.fhirType());
                                        break;

                                    case Practitioner:
                                        Practitioner practitioner = (Practitioner) resource;
                                        practitioner.getName().stream().findFirst().ifPresent(name -> {
                                            name.getGiven().stream().findFirst().ifPresent(firstName -> participantDto.setMemberFirstName(Optional.ofNullable(firstName.toString())));
                                            participantDto.setMemberLastName(Optional.ofNullable(name.getFamily()));
                                        });
                                        participantDto.setMemberId(participantId);
                                        participantDto.setMemberType(practitioner.fhirType());

                                        if (participant.getOnBehalfOf() != null && !participant.getOnBehalfOf().isEmpty()) {
                                            String organizationId = participant.getOnBehalfOf().getReference().split("/")[1];

                                            Bundle organizationBundle = (Bundle) fhirClient.search().forResource(Organization.class)
                                                    .where(new TokenClientParam("_id").exactly().code(organizationId))
                                                    .prettyPrint()
                                                    .execute();
                                            Optional<Resource> organizationResource = organizationBundle.getEntry().stream().map(Bundle.BundleEntryComponent::getResource).findFirst();
                                            Organization organization = (Organization) organizationResource.get();

                                            participantDto.setOnBehalfOfId(organizationId);
                                            participantDto.setOnBehalfOfName(organization.getName());
                                        }
                                        break;

                                    case Organization:
                                        Organization organization = (Organization) resource;
                                        participantDto.setMemberName(Optional.ofNullable(organization.getName()));
                                        participantDto.setMemberId(participantId);
                                        participantDto.setMemberType(organization.fhirType());
                                        break;

                                    case RelatedPerson:
                                        RelatedPerson relatedPerson = (RelatedPerson) resource;
                                        relatedPerson.getName().stream().findFirst().ifPresent(name -> {
                                            name.getGiven().stream().findFirst().ifPresent(firstName -> participantDto.setMemberFirstName(Optional.ofNullable(firstName.toString())));
                                            participantDto.setMemberLastName(Optional.ofNullable(name.getFamily()));
                                        });
                                        participantDto.setMemberId(participantId);
                                        participantDto.setMemberType(relatedPerson.fhirType());
                                        break;
                                }
                            }
                        }

                    });

                }

                participantDtos.add(participantDto);
            });

            careTeamDto.setParticipants(participantDtos);
            if (careTeam.getPeriod() != null && !careTeam.getPeriod().isEmpty()) {
                careTeamDto.setStartDate((careTeam.getPeriod().getStart() != null) ? DateUtil.convertDateToString(careTeam.getPeriod().getStart()) : null);
                careTeamDto.setEndDate((careTeam.getPeriod().getEnd() != null) ? DateUtil.convertDateToString(careTeam.getPeriod().getEnd()) : null);
            }

            //episodeOfCare
            setEocEachCareTeam(careTeamDto);

            return careTeamDto;
        }).collect(toList());

        double totalPages = Math.ceil((double) otherPageCareTeamBundle.getTotal() / numberOfCareTeamMembersPerPage);
        int currentPage = firstPage ? 1 : page.get();

        return new PageDto<>(careTeamDtos, numberOfCareTeamMembersPerPage, totalPages, currentPage, careTeamDtos.size(), otherPageCareTeamBundle.getTotal());
    }

    private void setEocEachCareTeam(CareTeamDto careTeamDto) {
        String orgId = careTeamDto.getManagingOrganization();
        String patientId = careTeamDto.getSubjectId();
        String cTeamId = careTeamDto.getId();

        //episodeOfCare
        IQuery eocQuery = fhirClient.search().forResource(EpisodeOfCare.class);

        //Check for patient
        eocQuery.where(new ReferenceClientParam("patient").hasId("Patient/" + patientId));

        //Check for organization
        eocQuery.where(new ReferenceClientParam("organization").hasId(orgId));


        Bundle eocBundle = (Bundle) eocQuery
                .returnBundle(Bundle.class)
                .execute();
        Optional<ReferenceDto> eocRefDtoOptional = Optional.empty();
        if (eocBundle != null && !eocBundle.getEntry().isEmpty()) {
            log.info("EpisodeOfCare found for the given criteria.");
            for (Bundle.BundleEntryComponent retrivedBundle : eocBundle.getEntry()) {
                if (retrivedBundle.getResource().getResourceType().equals(ResourceType.EpisodeOfCare)) {
                    EpisodeOfCare eocItem = (EpisodeOfCare) retrivedBundle.getResource();
                    for (Reference ref : eocItem.getTeam()) {
                        if (ref.getReference().equalsIgnoreCase("CareTeam/" + cTeamId)) {
                            eocRefDtoOptional = Optional.of(
                                    ReferenceDto.builder().id("EpisodeOfCare/" + eocItem.getIdElement().getIdPart())
                                            .display(eocItem.getType().get(0).getCoding().get(0).getDisplay())
                                            .build());
                            break;
                        }
                    }
                    break;
                }
            }
        }

        if (eocRefDtoOptional.isPresent()) {
            ReferenceDto referenceDto = eocRefDtoOptional.get();
            careTeamDto.setEpisodeOfCareCode(referenceDto.getId());
            careTeamDto.setEpisodeOfCareType(referenceDto.getDisplay());
        }
    }


    @Override
    public List<ParticipantReferenceDto> getCareTeamParticipants(String patient, Optional<List<String>> roles, Optional<String> name, Optional<String> communication) {
        List<ReferenceDto> participantsByRoles = new ArrayList<>();
        List<ParticipantReferenceDto> participantsSelected = new ArrayList<>();

        Bundle careTeamBundle = fhirClient.search().forResource(CareTeam.class)
                .where(new ReferenceClientParam("patient").hasId("Patient/" + patient))
                .include(CareTeam.INCLUDE_PARTICIPANT)
                .returnBundle(Bundle.class).execute();

        if (careTeamBundle != null) {
            List<Bundle.BundleEntryComponent> retrievedCareTeams = careTeamBundle.getEntry();

            if (retrievedCareTeams != null) {
                List<CareTeam> careTeams = retrievedCareTeams.stream()
                        .filter(bundle -> bundle.getResource().getResourceType().equals(ResourceType.CareTeam))
                        .map(careTeamMember -> (CareTeam) careTeamMember.getResource()).collect(toList());


                participantsByRoles = careTeams.stream()
                        .flatMap(it -> CareTeamToCareTeamDtoConverter.mapToParticipants(it, roles, name, fhirClient).stream()).collect(toList());

            }
        }

        //retrieve recipients by Id
        List<String> recipients = new ArrayList<>();

        if (communication.isPresent()) {

            recipients = communicationService.getRecipientsByCommunicationId(patient, communication.get());

        }

        for (ReferenceDto participant : participantsByRoles) {
            ParticipantReferenceDto participantReferenceDto = new ParticipantReferenceDto();
            participantReferenceDto.setReference(participant.getReference());
            participantReferenceDto.setDisplay(participant.getDisplay());

            if (recipients.contains(FhirDtoUtil.getIdFromParticipantReferenceDto(participant))) {
                participantReferenceDto.setSelected(true);
            }
            participantsSelected.add(participantReferenceDto);
        }

        return participantsSelected;
    }

    @Override
    public CareTeamDto getCareTeamById(String careTeamById) {
        Bundle careTeamBundle = fhirClient.search().forResource(CareTeam.class)
                .where(new TokenClientParam("_id").exactly().code(careTeamById))
                .include(CareTeam.INCLUDE_PARTICIPANT)
                .include(CareTeam.INCLUDE_SUBJECT)
                .returnBundle(Bundle.class)
                .execute();

        if (careTeamBundle == null || careTeamBundle.getEntry().size() < 1) {
            throw new ResourceNotFoundException("No CareTeam was found for the given careTeamID : " + careTeamById);
        }

        CareTeam careTeam = (CareTeam) careTeamBundle.getEntry().get(0).getResource();

        return convertCareTeamToCareTeamDto(careTeam);
    }

    @Override
    public List<ReferenceDto> getPatientsInCareTeamsByPractitioner(String practitioner) {
        List<ReferenceDto> patients = new ArrayList<>();

        Bundle bundle = fhirClient.search().forResource(CareTeam.class)
                .where(new ReferenceClientParam("participant").hasId(practitioner))
                .include(CareTeam.INCLUDE_PATIENT)
                .include(CareTeam.INCLUDE_PARTICIPANT)
                .returnBundle(Bundle.class)
                .execute();

        if (bundle != null) {
            List<Bundle.BundleEntryComponent> components = bundle.getEntry();
            if (components != null) {
                patients = components.stream()
                        .filter(it -> it.getResource().getResourceType().equals(ResourceType.CareTeam))
                        .map(it -> (CareTeam) it.getResource())
                        .filter(it -> checkIfParticipantIsCareManager(it.getParticipant()))
                        .map(it -> (Patient) it.getSubject().getResource())
                        .map(FhirDtoUtil::mapPatientToReferenceDto)
                        .collect(toList());
            }
        }

        return patients;
    }

    public PageDto<CareTeamDto> getCareTeamsByPatientAndOrganization(String patient, Optional<String> organization, Optional<List<String>> status, Optional<Integer> pageNumber, Optional<Integer> pageSize) {
        //used api
        int numberOfCareTeamsPerPage = PaginationRepository.getValidPageSize(fisProperties, pageSize, ResourceType.CareTeam.name());

        IQuery iQuery = fhirClient.search().forResource(CareTeam.class)
                .where(new ReferenceClientParam("patient").hasId(patient))
                .include(CareTeam.INCLUDE_SUBJECT)
                .include(CareTeam.INCLUDE_PARTICIPANT);

        if (status.isPresent() && !status.get().isEmpty()) {
            iQuery.where(new TokenClientParam("status").exactly().codes(status.get()));
        }

        IQuery iQueryNoCache = FhirOperationUtil.setNoCacheControlDirective(iQuery);

        Bundle bundle = (Bundle) iQueryNoCache.returnBundle(Bundle.class).execute();

        List<Bundle.BundleEntryComponent> components = FhirOperationUtil.getAllBundleComponentsAsList(bundle, Optional.empty(), fhirClient, fisProperties);

        List<CareTeam> careTeams = components.stream()
                .filter(it -> it.getResource().getResourceType().equals(ResourceType.CareTeam))
                .map(it -> (CareTeam) it.getResource())
                .filter(it -> {
                    if (organization.isPresent()) {
                        List<Reference> managingOrganizations = it.getManagingOrganization();
                        return managingOrganizations.stream().anyMatch(managingOrganization -> managingOrganization.getReference().contains(organization.get()));
                    } else {
                        //do not filter
                        return true;
                    }
                })
                .collect(toList());

        List<CareTeamDto> careTeamDtos = careTeams.stream()
                .map(this::convertCareTeamToCareTeamDto)
                .collect(toList());

        for (CareTeamDto careTeamDto : careTeamDtos) {
            setEocEachCareTeam(careTeamDto);
        }
        return (PageDto<CareTeamDto>) PaginationRepository.applyPaginationForCustomArrayList(careTeamDtos, numberOfCareTeamsPerPage, pageNumber, false);
    }

    @Override
    public void addRelatedPerson(String careTeamId, ParticipantDto participantDto) {

        CareTeam careTeam = fhirClient.read().resource(CareTeam.class).withId(careTeamId).execute();

        List<CareTeam.CareTeamParticipantComponent> components = careTeam.getParticipant();
        components.add(convertParticipantDtoToParticipant(participantDto));
        careTeam.setParticipant(components);

        //Set Profile Meta Data
        FhirProfileUtil.setCareTeamProfileMetaData(fhirClient, careTeam);

        //Validate
        FhirOperationUtil.validateFhirResource(fhirValidator, careTeam, Optional.of(careTeamId), ResourceType.CareTeam.name(), "Update CareTeam(Add Related Person)");

        //Update
        FhirOperationUtil.updateFhirResource(fhirClient, careTeam, ResourceType.CareTeam.name());
    }

    @Override
    public void removeRelatedPerson(String careTeamId, ParticipantDto participantDto) {
        CareTeam careTeam = fhirClient.read().resource(CareTeam.class).withId(careTeamId).execute();

        List<CareTeam.CareTeamParticipantComponent> components = careTeam.getParticipant();
        components.removeIf(com -> com.getMember().getReference().split("/")[1].equals(participantDto.getMemberId()));
        careTeam.setParticipant(components);

        //Set Profile Meta Data
        FhirProfileUtil.setCareTeamProfileMetaData(fhirClient, careTeam);

        //Validate
        FhirOperationUtil.validateFhirResource(fhirValidator, careTeam, Optional.of(careTeamId), ResourceType.CareTeam.name(), "Update CareTeam(Remove Related Person)");

        //Update
        FhirOperationUtil.updateFhirResource(fhirClient, careTeam, ResourceType.CareTeam.name());
    }

    @Override
    public PageDto<ParticipantDto> getRelatedPersonsByIdForEdit(String careTeamId, Optional<String> name, Optional<Integer> pageNumber, Optional<Integer> pageSize) {
        int numberOfRelatedPersonPerPage = PaginationRepository.getValidPageSize(fisProperties, pageSize, ResourceType.RelatedPerson.name());
        CareTeamDto careTeamDto = getCareTeamById(careTeamId);
        List<ParticipantDto> participantInCareTeam = careTeamDto.getParticipants();

        //Get all the relatedPerson for the patient
        IQuery iQuery = fhirClient.search().forResource(RelatedPerson.class)
                .where(new ReferenceClientParam("patient").hasId(careTeamDto.getSubjectId()));


        name.ifPresent(n -> iQuery.where(new RichStringClientParam("name").contains().value(name.get().trim())));
        IQuery iQueryNoCache = FhirOperationUtil.setNoCacheControlDirective(iQuery);
        Bundle relatedPersonForPatientBundle = (Bundle) iQueryNoCache.returnBundle(Bundle.class).execute();


        List<ParticipantDto> participantDtoFromRelatedPersons = FhirOperationUtil.getAllBundleComponentsAsList(relatedPersonForPatientBundle, Optional.empty(), fhirClient, fisProperties)
                .stream().map(rp -> (RelatedPerson) rp.getResource())
                .map(rp -> {
                    ParticipantDto participantDto = new ParticipantDto();
                    participantDto.setMemberType(ParticipantTypeEnum.relatedPerson.getCode());
                    rp.getName().stream().findFirst().ifPresent(r -> {
                        participantDto.setMemberLastName(Optional.ofNullable(r.getFamily()));
                        r.getGiven().stream().findFirst().ifPresent(given -> participantDto.setMemberFirstName(Optional.ofNullable(given.toString())));
                    });
                    participantDto.setMemberId(rp.getIdElement().getIdPart());
                    participantDto.setIsInCareTeam(Optional.of(false));
                    return participantDto;
                }).collect(toList());


        List<ParticipantDto> participantDtoList = new ArrayList<>();
        participantDtoFromRelatedPersons.forEach(rp -> {
            String memberId = rp.getMemberId();
            Optional<ParticipantDto> participantDto = participantInCareTeam.stream().filter(p -> p.getMemberId().equalsIgnoreCase(memberId)).findFirst();
            if (participantDto.isPresent()) {
                ParticipantDto par = participantDto.get();
                par.setIsInCareTeam(Optional.of(true));
                participantDtoList.add(par);
            } else {
                ParticipantDto par = rp;
                participantDtoList.add(par);
            }
        });

        return (PageDto<ParticipantDto>) PaginationRepository.applyPaginationForCustomArrayList(participantDtoList, numberOfRelatedPersonPerPage, pageNumber, false);
    }

    @Override
    public List<ReferenceDto> getParticipantMemberFromCareTeam(String patient) {
        Bundle careTeamBundle = (Bundle) FhirOperationUtil.setNoCacheControlDirective(fhirClient.search().forResource(CareTeam.class).where(new ReferenceClientParam("patient").hasId(patient)))
                .returnBundle(Bundle.class).execute();

        List<ReferenceDto> careTeamMembers = FhirOperationUtil.getAllBundleComponentsAsList(careTeamBundle, Optional.empty(), fhirClient, fisProperties)
                .stream().map(bEntry -> {
                    CareTeam careTeam = (CareTeam) bEntry.getResource();
                    return convertCareTeamToCareTeamDto(careTeam);
                }).flatMap(ct -> ct.getParticipants().stream().map(part -> {
                    ReferenceDto participantReference = new ReferenceDto();
                    participantReference.setReference(part.getMemberType().substring(0, 1).toUpperCase() + part.getMemberType().substring(1) + "/" + part.getMemberId());
                    if (!part.getMemberType().equalsIgnoreCase(ResourceType.Organization.toString())) {
                        participantReference.setDisplay(part.getMemberFirstName().get() + " " + part.getMemberLastName().get());
                    } else {
                        participantReference.setDisplay(part.getMemberName().get());
                    }
                    return participantReference;
                })).collect(toList());

        List<ReferenceDto> careTeammembersOtherThanOrganization = careTeamMembers.stream()
                .filter(ct -> !ct.getReference().split("/")[0].equalsIgnoreCase(ResourceType.Organization.toString()))
                .collect(toList());

        List<ReferenceDto> careTeammebersInTheOrganization = careTeamMembers.stream()
                .filter(ct -> ct.getReference().split("/")[0].equalsIgnoreCase(ResourceType.Organization.toString()))
                .flatMap(ct -> practitionerService.searchPractitioners(Optional.empty(), Optional.empty(), Optional.of(ct.getReference().split("/")[1]), Optional.empty(), Optional.empty(),
                                Optional.empty(), Optional.of(true)).getElements().stream().map(pr -> {
                            ReferenceDto referenceDto = new ReferenceDto();
                            referenceDto.setReference(ResourceType.Practitioner.toString() + "/" + pr.getLogicalId());
                            pr.getName().stream().findAny().ifPresent(name -> referenceDto.setDisplay(name.getFirstName() + " " + name.getLastName()));
                            return referenceDto;
                        })
                ).collect(toList());


        return Stream.of(careTeammembersOtherThanOrganization, careTeammebersInTheOrganization).flatMap(Collection::stream).distinct().collect(toList());
    }

    private CareTeamDto convertCareTeamToCareTeamDto(CareTeam careTeam) {
        final CareTeamDto careTeamDto = CareTeamToCareTeamDtoConverter.map(careTeam, fhirClient);

        if (careTeamDto.getStatusCode() != null) {
            careTeamDto.setStatusDisplay((FhirDtoUtil.getDisplayForCode(careTeamDto.getStatusCode(), lookUpService.getCareTeamStatuses())).orElse(null));
        }

        if (careTeamDto.getCategoryCode() != null) {
            careTeamDto.setCategoryDisplay((FhirDtoUtil.getDisplayForCode(careTeamDto.getCategoryCode(), lookUpService.getCareTeamCategories())).orElse(null));
        }

        if (careTeamDto.getReasonCode() != null) {
            careTeamDto.setReasonDisplay((FhirDtoUtil.getDisplayForCode(careTeamDto.getReasonCode(), lookUpService.getCareTeamReasons())).orElse(null));
        }

        for (ParticipantDto dto : careTeamDto.getParticipants()) {
            if (dto.getRoleCode() != null) {
                dto.setRoleDisplay((FhirDtoUtil.getDisplayForCode(dto.getRoleCode(), lookUpService.getParticipantRoles())).orElse(null));
            }
        }

        return careTeamDto;
    }

    private boolean checkIfParticipantIsCareManager(List<CareTeam.CareTeamParticipantComponent> components) {
        //write logic to check if each participant, if of type Practitioner, is a CareManager or not
        return components.stream()
                .map(component -> {
                    Reference member = component.getMember();
                    String role = "";
                    if (member.getReference().contains(ResourceType.Practitioner.toString())) {
                        role = FhirResourceUtil.getRoleFromCodeableConcept(component.getRole().get(0));
                    }
                    return role;
                })
                .anyMatch(t -> t.contains(CareTeamConstants.CAREMANAGER_ROLE));
    }

    private void checkForDuplicates(CareTeamDto careTeamDto) {
        Bundle careTeamBundle = fhirClient.search().forResource(CareTeam.class)
                .where(new TokenClientParam(CareTeamFieldEnum.STATUS.getCode()).exactly().code(CareTeamConstants.STATUS_ACTIVE))
                .and(new TokenClientParam(CareTeamFieldEnum.SUBJECT.getCode()).exactly().code(careTeamDto.getSubjectId()))
                .and(new TokenClientParam(CareTeamFieldEnum.CATEGORY.getCode()).exactly().code(careTeamDto.getCategoryCode()))
                .returnBundle(Bundle.class)
                .execute();

        log.info("Existing CareTeam size : " + careTeamBundle.getEntry().size());
        if (careTeamBundle.getEntry().size() > 1) {
            throw new DuplicateResourceFoundException("CareTeam already exists with the given subject ID and category Code in active status");
        }
    }

    private CareTeam.CareTeamParticipantComponent convertParticipantDtoToParticipant(ParticipantDto participantDto) {

        CareTeam.CareTeamParticipantComponent careTeamParticipant = new CareTeam.CareTeamParticipantComponent();

        String memberType = participantDto.getMemberType();

        if (memberType.equalsIgnoreCase(ParticipantTypeEnum.practitioner.getCode())) {
            careTeamParticipant.getMember().setReference(ParticipantTypeEnum.practitioner.getName() + "/" + participantDto.getMemberId());

        } else if (memberType.equalsIgnoreCase(ParticipantTypeEnum.patient.getCode())) {
            careTeamParticipant.getMember().setReference(ParticipantTypeEnum.patient.getName() + "/" + participantDto.getMemberId());

        } else if (memberType.equalsIgnoreCase(ParticipantTypeEnum.organization.getCode())) {
            careTeamParticipant.getMember().setReference(ParticipantTypeEnum.organization.getName() + "/" + participantDto.getMemberId());

        } else if (memberType.equalsIgnoreCase(ParticipantTypeEnum.relatedPerson.getCode())) {
            careTeamParticipant.getMember().setReference(ParticipantTypeEnum.relatedPerson.getName() + "/" + participantDto.getMemberId());
        }

        Coding codingRoleCode = new Coding();
        codingRoleCode.setCode(participantDto.getRoleCode());
        CodeableConcept codeableConceptRoleCode = new CodeableConcept().addCoding(codingRoleCode);
        careTeamParticipant.setRole(Arrays.asList(codeableConceptRoleCode));

        Period participantPeriod = new Period();
        try {
            participantPeriod.setStart(DateUtil.convertStringToDate(participantDto.getStartDate()));
            participantPeriod.setEnd(DateUtil.convertStringToDate(participantDto.getEndDate()));
            careTeamParticipant.setPeriod(participantPeriod);
        } catch (ParseException e) {
            e.printStackTrace();
        }
        return careTeamParticipant;
    }

}
