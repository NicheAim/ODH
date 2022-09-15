package gov.samhsa.ocp.ocpuiapi.web;

import feign.FeignException;
import gov.samhsa.ocp.ocpuiapi.infrastructure.LookUpFisClient;
import gov.samhsa.ocp.ocpuiapi.service.LookUpTypeEnum;
import gov.samhsa.ocp.ocpuiapi.service.dto.LookUpDataDto;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.Arrays;
import java.util.List;

@RestController
@Slf4j
@RequestMapping("ocp-fis/lookups")
public class LookUpController {

    private static final String NO_LOOKUPS_FOUND_MESSAGE = " Caution!!: No look up values found. Please check ocp-fis logs for error details.";
    private final List<String> allowedLocationIdentifierTypes = Arrays.asList("EN", "TAX", "NIIP", "PRN");
    private final List<String> allowedOrganizationIdentifierTypes = Arrays.asList("EN", "TAX", "NIIP", "PRN");
    private final List<String> allowedPatientIdentifierTypes = Arrays.asList("DL", "PPN", "MR", "DR", "SB", "MA");
    private final List<String> allowedPractitionerIdentifierTypes = Arrays.asList("PRN", "TAX", "MD", "SB");

    private final LookUpFisClient lookupFisClient;

    @Autowired
    public LookUpController(LookUpFisClient lookupFisClient) {
        this.lookupFisClient = lookupFisClient;
    }

    @GetMapping()
    public LookUpDataDto getAllLookUpValues(@RequestParam(value = "lookUpTypeList", required = false) List<String> lookUpTypeList) {
        LookUpDataDto lookUpData = new LookUpDataDto();

        //Conditions
        if(lookUpTypeList == null || lookUpTypeList.size() == 0 || lookUpTypeList.stream().anyMatch(LookUpTypeEnum.CONDITIONS_PATIENT.name()::equalsIgnoreCase)) {
            log.info("Getting look up values for " + LookUpTypeEnum.CONDITIONS_PATIENT.name());
            try {
                lookUpData.setConditions(lookupFisClient.getConditions());
            } catch (FeignException e) {
                log.error(LookUpTypeEnum.CONDITIONS_PATIENT.name() + " " + e.getMessage());
            }
        }

        if(lookUpTypeList == null || lookUpTypeList.size() == 0 || lookUpTypeList.stream().anyMatch(LookUpTypeEnum.CONDITIONS_PRIORITIES.name()::equalsIgnoreCase)) {
            log.info("Getting look up values for "+LookUpTypeEnum.CONDITIONS_PRIORITIES.name());
            try {
                lookUpData.setConditions_priorities(lookupFisClient.getConditionsPriorities());
            } catch (FeignException e) {
                log.error(LookUpTypeEnum.CONDITIONS_PRIORITIES.name() + " " + e.getMessage());
            }
        }

        //Address type
        if (lookUpTypeList == null || lookUpTypeList.size() == 0 || lookUpTypeList.stream().anyMatch(LookUpTypeEnum.ADDRESSTYPE.name()::equalsIgnoreCase)) {
            log.info("Getting look up values for " + LookUpTypeEnum.ADDRESSTYPE.name());
            try {
                lookUpData.setAddressTypes(lookupFisClient.getAddressTypes());
            } catch (FeignException fe) {
                //Do nothing
                log.error("(" + LookUpTypeEnum.ADDRESSTYPE.name() + ")" + NO_LOOKUPS_FOUND_MESSAGE);
            }
        }

        //Address use
        if (lookUpTypeList == null || lookUpTypeList.size() == 0 || lookUpTypeList.stream().anyMatch(LookUpTypeEnum.ADDRESSUSE.name()::equalsIgnoreCase)) {
            log.info("Getting look up values for " + LookUpTypeEnum.ADDRESSUSE.name());
            try {
                lookUpData.setAddressUses(lookupFisClient.getAddressUses());
            } catch (FeignException fe) {
                //Do nothing
                log.error("(" + LookUpTypeEnum.ADDRESSUSE.name() + ")" + NO_LOOKUPS_FOUND_MESSAGE);
            }
        }

        //Location identifier system
        if (lookUpTypeList == null || lookUpTypeList.size() == 0 || lookUpTypeList.stream().anyMatch(LookUpTypeEnum.LOCATIONIDENTIFIERSYSTEM.name()::equalsIgnoreCase)) {
            log.info("Getting look up values for " + LookUpTypeEnum.LOCATIONIDENTIFIERSYSTEM.name());
            try {
                lookUpData.setLocationIdentifierSystems(lookupFisClient.getIdentifierSystems(allowedLocationIdentifierTypes));
            } catch (FeignException fe) {
                //Do nothing
                log.error("(" + LookUpTypeEnum.LOCATIONIDENTIFIERSYSTEM.name() + ")" + NO_LOOKUPS_FOUND_MESSAGE);
            }
        }

        //Location status
        if (lookUpTypeList == null || lookUpTypeList.size() == 0 || lookUpTypeList.stream().anyMatch(LookUpTypeEnum.LOCATIONSTATUS.name()::equalsIgnoreCase)) {
            log.info("Getting look up values for " + LookUpTypeEnum.LOCATIONSTATUS.name());
            try {
                lookUpData.setLocationStatuses(lookupFisClient.getLocationStatuses());
            } catch (FeignException fe) {
                //Do nothing
                log.error("(" + LookUpTypeEnum.LOCATIONSTATUS.name() + ")" + NO_LOOKUPS_FOUND_MESSAGE);
            }
        }

        //Location Physical Type
        if (lookUpTypeList == null || lookUpTypeList.size() == 0 || lookUpTypeList.stream().anyMatch(LookUpTypeEnum.LOCATIONPHYSICALTYPE.name()::equalsIgnoreCase)) {
            log.info("Getting look up values for " + LookUpTypeEnum.LOCATIONPHYSICALTYPE.name());
            try {
                lookUpData.setLocationPhysicalTypes(lookupFisClient.getLocationPhysicalTypes());
            } catch (FeignException fe) {
                //Do nothing
                log.error("(" + LookUpTypeEnum.LOCATIONPHYSICALTYPE.name() + ")" + NO_LOOKUPS_FOUND_MESSAGE);
            }
        }

        //Org identifier system
        if (lookUpTypeList == null || lookUpTypeList.size() == 0 || lookUpTypeList.stream().anyMatch(LookUpTypeEnum.ORGANIZATIONIDENTIFIERSYSTEM.name()::equalsIgnoreCase)) {
            log.info("Getting look up values for " + LookUpTypeEnum.ORGANIZATIONIDENTIFIERSYSTEM.name());
            try {
                lookUpData.setOrganizationIdentifierSystems(lookupFisClient.getIdentifierSystems(allowedOrganizationIdentifierTypes));
            } catch (FeignException fe) {
                //Do nothing
                log.error("(" + LookUpTypeEnum.ORGANIZATIONIDENTIFIERSYSTEM.name() + ")" + NO_LOOKUPS_FOUND_MESSAGE);
            }
        }

        if (lookUpTypeList == null || lookUpTypeList.size() == 0 || lookUpTypeList.stream().anyMatch(LookUpTypeEnum.ORGANIZATIONSTATUS.name()::equalsIgnoreCase)) {
            log.info("Getting look up values for " + LookUpTypeEnum.ORGANIZATIONSTATUS.name());
            try {
                lookUpData.setOrganizationStatuses(lookupFisClient.getOrganizationStatuses());
            } catch (FeignException fe) {
                //Do nothing
                log.error("(" + LookUpTypeEnum.ORGANIZATIONSTATUS.name() + ")" + NO_LOOKUPS_FOUND_MESSAGE);
            }
        }

        if (lookUpTypeList == null || lookUpTypeList.size() == 0 || lookUpTypeList.stream().anyMatch(LookUpTypeEnum.DATE_RANGE.name()::equalsIgnoreCase)) {
            log.info("Getting look up values for " + LookUpTypeEnum.DATE_RANGE.name());
            try {
                lookUpData.setDateRanges(lookupFisClient.getDateRanges());
            } catch (FeignException fe) {
                //Do nothing
                log.error("(" + LookUpTypeEnum.DATE_RANGE.name() + ")" + NO_LOOKUPS_FOUND_MESSAGE);
            }
        }

        //Patient identifier system
        if (lookUpTypeList == null || lookUpTypeList.size() == 0 || lookUpTypeList.stream().anyMatch(LookUpTypeEnum.PATIENTIDENTIFIERSYSTEM.name()::equalsIgnoreCase)) {
            log.info("Getting look up values for " + LookUpTypeEnum.PATIENTIDENTIFIERSYSTEM.name());
            try {
                lookUpData.setPatientIdentifierSystems(lookupFisClient.getIdentifierSystems(allowedPatientIdentifierTypes));
            } catch (FeignException fe) {
                //Do nothing
                log.error("(" + LookUpTypeEnum.PATIENTIDENTIFIERSYSTEM.name() + ")" + NO_LOOKUPS_FOUND_MESSAGE);
            }
        }

        //Practitioner identifier system
        if (lookUpTypeList == null || lookUpTypeList.size() == 0 || lookUpTypeList.stream().anyMatch(LookUpTypeEnum.PRACTITIONERIDENTIFIERSYSTEM.name()::equalsIgnoreCase)) {
            log.info("Getting look up values for " + LookUpTypeEnum.PRACTITIONERIDENTIFIERSYSTEM.name());
            try {
                lookUpData.setPractitionerIdentifierSystems(lookupFisClient.getIdentifierSystems(allowedPractitionerIdentifierTypes));
            } catch (FeignException fe) {
                //Do nothing
                log.error("(" + LookUpTypeEnum.PRACTITIONERIDENTIFIERSYSTEM.name() + ")" + NO_LOOKUPS_FOUND_MESSAGE);
            }
        }

        //Telecom Systems
        if (lookUpTypeList == null || lookUpTypeList.size() == 0 || lookUpTypeList.stream().anyMatch(LookUpTypeEnum.TELECOMSYSTEM.name()::equalsIgnoreCase)) {
            log.info("Getting look up values for " + LookUpTypeEnum.TELECOMSYSTEM.name());
            try {
                lookUpData.setTelecomSystems(lookupFisClient.getTelecomSystems());
            } catch (FeignException fe) {
                //Do nothing
                log.error("(" + LookUpTypeEnum.TELECOMSYSTEM.name() + ")" + NO_LOOKUPS_FOUND_MESSAGE);
            }
        }

        //Telecom Use
        if (lookUpTypeList == null || lookUpTypeList.size() == 0 || lookUpTypeList.stream().anyMatch(LookUpTypeEnum.TELECOMUSE.name()::equalsIgnoreCase)) {
            log.info("Getting look up values for " + LookUpTypeEnum.TELECOMUSE.name());
            try {
                lookUpData.setTelecomUses(lookupFisClient.getTelecomUses());
            } catch (FeignException fe) {
                //Do nothing
                log.error("(" + LookUpTypeEnum.TELECOMUSE.name() + ")" + NO_LOOKUPS_FOUND_MESSAGE);
            }
        }

        //US States
        if (lookUpTypeList == null || lookUpTypeList.size() == 0 || lookUpTypeList.stream().anyMatch(LookUpTypeEnum.USPSSTATES.name()::equalsIgnoreCase)) {
            log.info("Getting look up values for " + LookUpTypeEnum.USPSSTATES.name());
            try {
                lookUpData.setUspsStates(lookupFisClient.getUspsStates());
            } catch (FeignException fe) {
                //Do nothing
                log.error("(" + LookUpTypeEnum.USPSSTATES.name() + ")" + NO_LOOKUPS_FOUND_MESSAGE);
            }
        }

        if (lookUpTypeList == null || lookUpTypeList.size() == 0 || lookUpTypeList.stream().anyMatch(LookUpTypeEnum.PRACTITIONERROLES.name()::equalsIgnoreCase)) {
            log.info("Getting look up values for " + LookUpTypeEnum.PRACTITIONERROLES.name());
            try {
                lookUpData.setPractitionerRoles(lookupFisClient.getPractitionerRoles());
            } catch (FeignException fe) {
                //Do nothing
                log.error("(" + LookUpTypeEnum.PRACTITIONERROLES.name() + ")" + NO_LOOKUPS_FOUND_MESSAGE);
            }
        }

        //Administrative Gender
        if (lookUpTypeList == null || lookUpTypeList.size() == 0 || lookUpTypeList.stream().anyMatch(LookUpTypeEnum.ADMINISTRATIVEGENDER.name()::equalsIgnoreCase)) {
            log.info("Getting look up values for " + LookUpTypeEnum.ADMINISTRATIVEGENDER.name());
            try {
                lookUpData.setAdministrativeGenders(lookupFisClient.getAdministrativeGenders());
            } catch (FeignException fe) {
                //Do nothing
                log.error("(" + LookUpTypeEnum.ADMINISTRATIVEGENDER.name() + ")" + NO_LOOKUPS_FOUND_MESSAGE);
            }
        }

        //US Core Races
        if (lookUpTypeList == null || lookUpTypeList.size() == 0 || lookUpTypeList.stream().anyMatch(LookUpTypeEnum.USCORERACE.name()::equalsIgnoreCase)) {
            log.info("Getting look up values for " + LookUpTypeEnum.USCORERACE.name());
            try {
                lookUpData.setUsCoreRaces(lookupFisClient.getUSCoreRaces());
            } catch (FeignException fe) {
                //Do nothing
                log.error("(" + LookUpTypeEnum.USCORERACE.name() + ")" + NO_LOOKUPS_FOUND_MESSAGE);
            }
        }

        //US Core Ethnicities
        if (lookUpTypeList == null || lookUpTypeList.size() == 0 || lookUpTypeList.stream().anyMatch(LookUpTypeEnum.USCOREETHNICITY.name()::equalsIgnoreCase)) {
            log.info("Getting look up values for " + LookUpTypeEnum.USCOREETHNICITY.name());
            try {
                lookUpData.setUsCoreEthnicities(lookupFisClient.getUSCoreEthnicities());
            } catch (FeignException fe) {
                //Do nothing
                log.error("(" + LookUpTypeEnum.USCOREETHNICITY.name() + ")" + NO_LOOKUPS_FOUND_MESSAGE);
            }
        }

        //US Core Birthsexes
        if (lookUpTypeList == null || lookUpTypeList.size() == 0 || lookUpTypeList.stream().anyMatch(LookUpTypeEnum.USCOREBIRTHSEX.name()::equalsIgnoreCase)) {
            log.info("Getting look up values for " + LookUpTypeEnum.USCOREBIRTHSEX.name());
            try {
                lookUpData.setUsCoreBirthSex(lookupFisClient.getUSCoreBirthsexes());
            } catch (FeignException fe) {
                //Do nothing
                log.error("(" + LookUpTypeEnum.USCOREBIRTHSEX.name() + ")" + NO_LOOKUPS_FOUND_MESSAGE);
            }
        }

        //Languages
        if (lookUpTypeList == null || lookUpTypeList.size() == 0 || lookUpTypeList.stream().anyMatch(LookUpTypeEnum.LANGUAGE.name()::equalsIgnoreCase)) {
            log.info("Getting look up values for " + LookUpTypeEnum.LANGUAGE.name());
            try {
                lookUpData.setLanguages(lookupFisClient.getLanguages());
            } catch (FeignException fe) {
                //Do nothing
                log.error("(" + LookUpTypeEnum.LANGUAGE.name() + ")" + NO_LOOKUPS_FOUND_MESSAGE);
            }
        }

        //Healthcare service categories
        if (lookUpTypeList == null || lookUpTypeList.size() == 0 || lookUpTypeList.stream().anyMatch(LookUpTypeEnum.HEALTHCARESERVICECATEGORY.name()::equalsIgnoreCase)) {
            log.info("Getting look up values for " + LookUpTypeEnum.HEALTHCARESERVICECATEGORY.name());
            try {
                lookUpData.setHealthcareServiceCategories(lookupFisClient.getHealthcareServiceCategories());
            } catch (FeignException fe) {
                //Do nothing
                log.error("(" + LookUpTypeEnum.HEALTHCARESERVICECATEGORY.name() + ")" + NO_LOOKUPS_FOUND_MESSAGE);
            }
        }

        //Healthcare service types
        if (lookUpTypeList == null || lookUpTypeList.size() == 0 || lookUpTypeList.stream().anyMatch(LookUpTypeEnum.HEALTHCARESERVICETYPE.name()::equalsIgnoreCase)) {
            log.info("Getting look up values for " + LookUpTypeEnum.HEALTHCARESERVICETYPE.name());
            try {
                lookUpData.setHealthcareServiceTypes(lookupFisClient.getHealthcareServiceTypes());
            } catch (FeignException fe) {
                //Do nothing
                log.error("(" + LookUpTypeEnum.HEALTHCARESERVICETYPE.name() + ")" + NO_LOOKUPS_FOUND_MESSAGE);
            }
        }

        //Healthcare service specialities
        if (lookUpTypeList == null || lookUpTypeList.size() == 0 || lookUpTypeList.stream().anyMatch(LookUpTypeEnum.HEALTHCARESERVICESPECIALITY.name()::equalsIgnoreCase)) {
            log.info("Getting look up values for " + LookUpTypeEnum.HEALTHCARESERVICESPECIALITY.name());
            try {
                lookUpData.setHealthcareServiceSpecialities(lookupFisClient.getHealthcareServiceSpecialities());
            } catch (FeignException fe) {
                //Do nothing
                log.error("(" + LookUpTypeEnum.HEALTHCARESERVICESPECIALITY.name() + ")" + NO_LOOKUPS_FOUND_MESSAGE);
            }
        }

        //Healthcare service ReferralMethods
        if (lookUpTypeList == null || lookUpTypeList.size() == 0 || lookUpTypeList.stream().anyMatch(LookUpTypeEnum.HEALTHCARESERVICEREFERRALMETHOD.name()::equalsIgnoreCase)) {
            log.info("Getting look up values for " + LookUpTypeEnum.HEALTHCARESERVICEREFERRALMETHOD.name());
            try {
                lookUpData.setHealthcareServiceReferralMethods(lookupFisClient.getHealthcareServiceReferralMethods());
            } catch (FeignException fe) {
                //Do nothing
                log.error("(" + LookUpTypeEnum.HEALTHCARESERVICEREFERRALMETHOD.name() + ")" + NO_LOOKUPS_FOUND_MESSAGE);
            }
        }

        if (lookUpTypeList == null || lookUpTypeList.size() == 0 || lookUpTypeList.stream().anyMatch(LookUpTypeEnum.HEALTHCARESERVICESTATUS.name()::equalsIgnoreCase)) {
            log.info("Getting look up values for " + LookUpTypeEnum.HEALTHCARESERVICESTATUS.name());
            try {
                lookUpData.setHealthcareServiceStatuses(lookupFisClient.getHealthcareServiceStatuses());
            } catch (FeignException fe) {
                //Do nothing
                log.error("(" + LookUpTypeEnum.HEALTHCARESERVICESTATUS.name() + ")" + NO_LOOKUPS_FOUND_MESSAGE);
            }
        }


        //Care Team Category
        if (lookUpTypeList == null || lookUpTypeList.size() == 0 || lookUpTypeList.stream().anyMatch(LookUpTypeEnum.CARETEAMCATEGORY.name()::equalsIgnoreCase)) {
            log.info("Getting look up values for " + LookUpTypeEnum.CARETEAMCATEGORY.name());
            try {
                lookUpData.setCareTeamCategories(lookupFisClient.getCareTeamCategories());
            } catch (FeignException fe) {
                log.error("(" + LookUpTypeEnum.CARETEAMCATEGORY.name() + ")" + NO_LOOKUPS_FOUND_MESSAGE);
            }
        }

        //Participant Type
        if (lookUpTypeList == null || lookUpTypeList.size() == 0 || lookUpTypeList.stream().anyMatch(LookUpTypeEnum.PARTICIPANTTYPE.name()::equalsIgnoreCase)) {
            log.info("Getting look up values for " + LookUpTypeEnum.PARTICIPANTTYPE.name());
            try {
                lookUpData.setParticipantTypes(lookupFisClient.getParticipantTypes());
            } catch (FeignException fe) {
                log.error("(" + LookUpTypeEnum.PARTICIPANTTYPE.name() + ")" + NO_LOOKUPS_FOUND_MESSAGE);
            }
        }

        //Care Team Status
        if (lookUpTypeList == null || lookUpTypeList.size() == 0 || lookUpTypeList.stream().anyMatch(LookUpTypeEnum.CARETEAMSTATUS.name()::equalsIgnoreCase)) {
            log.info("Getting look up values for " + LookUpTypeEnum.CARETEAMSTATUS.name());
            try {
                lookUpData.setCareTeamStatuses(lookupFisClient.getCareTeamStatuses());
            } catch (FeignException fe) {
                log.error("(" + LookUpTypeEnum.CARETEAMSTATUS.name() + ")" + NO_LOOKUPS_FOUND_MESSAGE);
            }
        }

        //Participant Role
        if (lookUpTypeList == null || lookUpTypeList.size() == 0 || lookUpTypeList.stream().anyMatch(LookUpTypeEnum.PARTICIPANTROLE.name()::equalsIgnoreCase)) {
            log.info("Getting look up values for " + LookUpTypeEnum.PARTICIPANTROLE.name());
            try {
                lookUpData.setParticipantRoles(lookupFisClient.getParticipantRoles());
            } catch (FeignException fe) {
                log.error("(" + LookUpTypeEnum.PARTICIPANTROLE.name() + ")" + NO_LOOKUPS_FOUND_MESSAGE);
            }
        }

        //Care Team Reason
        if (lookUpTypeList == null || lookUpTypeList.size() == 0 || lookUpTypeList.stream().anyMatch(LookUpTypeEnum.CARETEAMREASON.name()::equalsIgnoreCase)) {
            log.info("Getting look up values for " + LookUpTypeEnum.CARETEAMREASON.name());
            try {
                lookUpData.setCareTeamReasons(lookupFisClient.getCareTeamReasons());
            } catch (FeignException fe) {
                log.error("(" + LookUpTypeEnum.CARETEAMREASON.name() + ")" + NO_LOOKUPS_FOUND_MESSAGE);
            }
        }

        //RelatedPerson PatientRelationshipType
        if (lookUpTypeList == null || lookUpTypeList.size() == 0 || lookUpTypeList.stream().anyMatch(LookUpTypeEnum.RELATEDPERSONPATIENTRELATIONSHIPTYPES.name()::equalsIgnoreCase)) {
            log.info("Getting look up values for " + LookUpTypeEnum.RELATEDPERSONPATIENTRELATIONSHIPTYPES.name());
            try {
                lookUpData.setRelatedPersonPatientRelationshipTypes(lookupFisClient.getRelatedPersonPatientRelationshipTypes());
            } catch (FeignException fe) {
                log.error("(" + LookUpTypeEnum.RELATEDPERSONPATIENTRELATIONSHIPTYPES.name() + ")" + NO_LOOKUPS_FOUND_MESSAGE);
            }
        }

        //Publication Status
        if (lookUpTypeList == null || lookUpTypeList.size() == 0 || lookUpTypeList.stream().anyMatch(LookUpTypeEnum.PUBLICATION_STATUS.name()::equalsIgnoreCase)) {
            log.info("Getting look up values for " + LookUpTypeEnum.PUBLICATION_STATUS.name());
            try {
                lookUpData.setPublicationStatus(lookupFisClient.getPublicationStatus());
            } catch (FeignException fe) {
                log.error("(" + LookUpTypeEnum.PUBLICATION_STATUS.name() + ")" + NO_LOOKUPS_FOUND_MESSAGE);
            }
        }


        //Definition Topic
        if (lookUpTypeList == null || lookUpTypeList.size() == 0 || lookUpTypeList.stream().anyMatch(LookUpTypeEnum.DEFINITION_TOPIC.name()::equalsIgnoreCase)) {
            log.info("Getting look up values for " + LookUpTypeEnum.DEFINITION_TOPIC.name());
            try {
                lookUpData.setDefinitionTopic(lookupFisClient.getDefinitionTopic());
            } catch (FeignException fe) {
                log.error("(" + LookUpTypeEnum.DEFINITION_TOPIC.name() + ")" + NO_LOOKUPS_FOUND_MESSAGE);
            }
        }

        //Resource Type
        if (lookUpTypeList == null || lookUpTypeList.size() == 0 || lookUpTypeList.stream().anyMatch(LookUpTypeEnum.RESOURCE_TYPE.name()::equalsIgnoreCase)) {
            log.info("Getting look up values for " + LookUpTypeEnum.RESOURCE_TYPE.name());
            try {
                lookUpData.setResourceType(lookupFisClient.getResourceType());
            } catch (FeignException fe) {
                log.error("(" + LookUpTypeEnum.RESOURCE_TYPE.name() + ")" + NO_LOOKUPS_FOUND_MESSAGE);
            }
        }

        //Action participant role
        if (lookUpTypeList == null || lookUpTypeList.size() == 0 || lookUpTypeList.stream().anyMatch(LookUpTypeEnum.ACTION_PARTICIPANT_ROLE.name()::equalsIgnoreCase)) {
            log.info("Getting look up values for " + LookUpTypeEnum.ACTION_PARTICIPANT_ROLE.name());
            try {
                lookUpData.setActionParticipantRole(lookupFisClient.getActionParticipantRole());
            } catch (FeignException fe) {
                log.error("(" + LookUpTypeEnum.ACTION_PARTICIPANT_ROLE.name() + ")" + NO_LOOKUPS_FOUND_MESSAGE);
            }
        }

        //Action participant type
        if (lookUpTypeList == null || lookUpTypeList.size() == 0 || lookUpTypeList.stream().anyMatch(LookUpTypeEnum.ACTION_PARTICIPANT_TYPE.name()::equalsIgnoreCase)) {
            log.info("Getting look up values for " + LookUpTypeEnum.ACTION_PARTICIPANT_TYPE.name());
            try {
                lookUpData.setActionParticipantType(lookupFisClient.getActionParticipantType());
            } catch (FeignException fe) {
                log.error("(" + LookUpTypeEnum.ACTION_PARTICIPANT_TYPE.name() + ")" + NO_LOOKUPS_FOUND_MESSAGE);
            }
        }

        //Task Status
        if (lookUpTypeList == null || lookUpTypeList.size() == 0 || lookUpTypeList.stream().anyMatch(LookUpTypeEnum.TASK_STATUS.name()::equalsIgnoreCase)) {
            log.info("Getting look up values for " + LookUpTypeEnum.TASK_STATUS.name());
            try {
                lookUpData.setTaskStatus(lookupFisClient.getTaskStatus());
            } catch (FeignException fe) {
                log.error("(" + LookUpTypeEnum.TASK_STATUS.name() + ")" + NO_LOOKUPS_FOUND_MESSAGE);
            }
        }

        //Request priority
        if (lookUpTypeList == null || lookUpTypeList.size() == 0 || lookUpTypeList.stream().anyMatch(LookUpTypeEnum.REQUEST_PRIORITY.name()::equalsIgnoreCase)) {
            log.info("Getting look up values for " + LookUpTypeEnum.REQUEST_PRIORITY.name());
            try {
                lookUpData.setRequestPriority(lookupFisClient.getRequestPriority());
            } catch (FeignException fe) {
                log.error("(" + LookUpTypeEnum.REQUEST_PRIORITY.name() + ")" + NO_LOOKUPS_FOUND_MESSAGE);
            }
        }

        //Task Performer Type
        if (lookUpTypeList == null || lookUpTypeList.size() == 0 || lookUpTypeList.stream().anyMatch(LookUpTypeEnum.TASK_PERFORMER_TYPE.name()::equalsIgnoreCase)) {
            log.info("Getting look up values for " + LookUpTypeEnum.TASK_PERFORMER_TYPE.name());
            try {
                lookUpData.setTaskPerformerType(lookupFisClient.getTaskPerformerType());
            } catch (FeignException fe) {
                log.error("(" + LookUpTypeEnum.TASK_PERFORMER_TYPE.name() + ")" + NO_LOOKUPS_FOUND_MESSAGE);
            }
        }

        //Request Intent
        if (lookUpTypeList == null || lookUpTypeList.size() == 0 || lookUpTypeList.stream().anyMatch(LookUpTypeEnum.REQUEST_INTENT.name()::equalsIgnoreCase)) {
            log.info("Getting look up values for " + LookUpTypeEnum.REQUEST_INTENT.name());
            try {
                lookUpData.setRequestIntent(lookupFisClient.getRequestIntent());
            } catch (FeignException fe) {
                log.error("(" + LookUpTypeEnum.REQUEST_INTENT.name() + ")" + NO_LOOKUPS_FOUND_MESSAGE);
            }
        }

        //Activity Definition RelatedArtifactTypes
        if (lookUpTypeList == null || lookUpTypeList.size() == 0 || lookUpTypeList.stream().anyMatch(LookUpTypeEnum.RELATED_ARTIFACT_TYPE.name()::equalsIgnoreCase)) {
            log.info("Getting look up values for " + LookUpTypeEnum.RELATED_ARTIFACT_TYPE);
            try {
                lookUpData.setRelatedArtifactType(lookupFisClient.getActivityDefinitionRelatedArtifactTypes());
            } catch (FeignException fe) {
                log.error("(" + LookUpTypeEnum.RELATED_ARTIFACT_TYPE.name() + ")" + NO_LOOKUPS_FOUND_MESSAGE);
            }
        }

        //Communication Status
        if (lookUpTypeList == null || lookUpTypeList.size() == 0 || lookUpTypeList.stream().anyMatch(LookUpTypeEnum.COMMUNICATION_STATUS.name()::equalsIgnoreCase)) {
            log.info("Getting look up values for " + LookUpTypeEnum.COMMUNICATION_STATUS);
            try {
                lookUpData.setCommunicationStatus(lookupFisClient.getCommunicationStatus());
            } catch (FeignException fe) {
                log.error("(" + LookUpTypeEnum.COMMUNICATION_STATUS.name() + ")" + NO_LOOKUPS_FOUND_MESSAGE);
            }
        }

        //Communication Category
        if (lookUpTypeList == null || lookUpTypeList.size() == 0 || lookUpTypeList.stream().anyMatch(LookUpTypeEnum.COMMUNICATION_CATEGORY.name()::equalsIgnoreCase)) {
            log.info("Getting look up values for " + LookUpTypeEnum.COMMUNICATION_CATEGORY);
            try {
                lookUpData.setCommunicationCategory(lookupFisClient.getCommunicationCategory());
            } catch (FeignException fe) {
                log.error("(" + LookUpTypeEnum.COMMUNICATION_CATEGORY.name() + ")" + NO_LOOKUPS_FOUND_MESSAGE);
            }
        }

        //Communication Not Done Reason
        if (lookUpTypeList == null || lookUpTypeList.size() == 0 || lookUpTypeList.stream().anyMatch(LookUpTypeEnum.COMMUNICATION_NOT_DONE_REASON.name()::equalsIgnoreCase)) {
            log.info("Getting look up values for " + LookUpTypeEnum.COMMUNICATION_NOT_DONE_REASON);
            try {
                lookUpData.setCommunicationNotDoneReason(lookupFisClient.getCommunicationNotDoneReason());
            } catch (FeignException fe) {
                log.error("(" + LookUpTypeEnum.COMMUNICATION_NOT_DONE_REASON.name() + ")" + NO_LOOKUPS_FOUND_MESSAGE);
            }
        }

        //Communication Medium
        if (lookUpTypeList == null || lookUpTypeList.size() == 0 || lookUpTypeList.stream().anyMatch(LookUpTypeEnum.COMMUNICATION_MEDIUM.name()::equalsIgnoreCase)) {
            log.info("Getting look up values for " + LookUpTypeEnum.COMMUNICATION_MEDIUM);
            try {
                lookUpData.setCommunicationMedium(lookupFisClient.getCommunicationMedium());
            } catch (FeignException fe) {
                log.error("(" + LookUpTypeEnum.COMMUNICATION_MEDIUM.name() + ")" + NO_LOOKUPS_FOUND_MESSAGE);
            }
        }

        //Appointment Status
        if (lookUpTypeList == null || lookUpTypeList.size() == 0 || lookUpTypeList.stream().anyMatch(LookUpTypeEnum.APPOINTMENT_STATUS.name()::equalsIgnoreCase)) {
            log.info("Getting look up values for " + LookUpTypeEnum.APPOINTMENT_STATUS);
            try {
                lookUpData.setAppointmentStatus(lookupFisClient.getAppointmentStatus());
            } catch (FeignException fe) {
                log.error("(" + LookUpTypeEnum.APPOINTMENT_STATUS.name() + ")" + NO_LOOKUPS_FOUND_MESSAGE);
            }
        }

        //Appointment Type
        if (lookUpTypeList == null || lookUpTypeList.size() == 0 || lookUpTypeList.stream().anyMatch(LookUpTypeEnum.APPOINTMENT_TYPE.name()::equalsIgnoreCase)) {
            log.info("Getting look up values for " + LookUpTypeEnum.APPOINTMENT_TYPE);
            try {
                lookUpData.setAppointmentType(lookupFisClient.getAppointmentType());
            } catch (FeignException fe) {
                log.error("(" + LookUpTypeEnum.APPOINTMENT_TYPE.name() + ")" + NO_LOOKUPS_FOUND_MESSAGE);
            }
        }

        //Appointment Participation Status
        if (lookUpTypeList == null || lookUpTypeList.size() == 0 || lookUpTypeList.stream().anyMatch(LookUpTypeEnum.APPOINTMENT_PARTICIPATION_STATUS.name()::equalsIgnoreCase)) {
            log.info("Getting look up values for " + LookUpTypeEnum.APPOINTMENT_PARTICIPATION_STATUS);
            try {
                lookUpData.setAppointmentParticipationStatus(lookupFisClient.getAppointmentParticipationStatus());
            } catch (FeignException fe) {
                log.error("(" + LookUpTypeEnum.APPOINTMENT_PARTICIPATION_STATUS.name() + ")" + NO_LOOKUPS_FOUND_MESSAGE);
            }
        }

        //Appointment Participant Type
        if (lookUpTypeList == null || lookUpTypeList.size() == 0 || lookUpTypeList.stream().anyMatch(LookUpTypeEnum.APPOINTMENT_PARTICIPANT_TYPE.name()::equalsIgnoreCase)) {
            log.info("Getting look up values for " + LookUpTypeEnum.APPOINTMENT_PARTICIPANT_TYPE);
            try {
                lookUpData.setAppointmentParticipantType(lookupFisClient.getAppointmentParticipantType());
            } catch (FeignException fe) {
                log.error("(" + LookUpTypeEnum.APPOINTMENT_PARTICIPANT_TYPE.name() + ")" + NO_LOOKUPS_FOUND_MESSAGE);
            }
        }

        //Appointment Participation Type
        if (lookUpTypeList == null || lookUpTypeList.size() == 0 || lookUpTypeList.stream().anyMatch(LookUpTypeEnum.APPOINTMENT_PARTICIPATION_TYPE.name()::equalsIgnoreCase)) {
            log.info("Getting look up values for " + LookUpTypeEnum.APPOINTMENT_PARTICIPATION_TYPE);
            try {
                lookUpData.setAppointmentParticipationType(lookupFisClient.getAppointmentParticipationType());
            } catch (FeignException fe) {
                log.error("(" + LookUpTypeEnum.APPOINTMENT_PARTICIPATION_TYPE.name() + ")" + NO_LOOKUPS_FOUND_MESSAGE);
            }
        }

        //Appointment Participant Required
        if (lookUpTypeList == null || lookUpTypeList.size() == 0 || lookUpTypeList.stream().anyMatch(LookUpTypeEnum.APPOINTMENT_PARTICIPANT_REQUIRED.name()::equalsIgnoreCase)) {
            log.info("Getting look up values for " + LookUpTypeEnum.APPOINTMENT_PARTICIPANT_REQUIRED);
            try {
                lookUpData.setAppointmentParticipantRequired(lookupFisClient.getAppointmentParticipantRequired());
            } catch (FeignException fe) {
                log.error("(" + LookUpTypeEnum.APPOINTMENT_PARTICIPANT_REQUIRED.name() + ")" + NO_LOOKUPS_FOUND_MESSAGE);
            }
        }

        //Provider Role
        if (lookUpTypeList == null || lookUpTypeList.size() == 0 || lookUpTypeList.stream().anyMatch(LookUpTypeEnum.PROVIDER_ROLE.name()::equalsIgnoreCase)) {
            log.info("Getting look up values for " + LookUpTypeEnum.PROVIDER_ROLE);
            try {
                lookUpData.setProviderRoles(lookupFisClient.getProviderRole());
            } catch (FeignException fe) {
                log.error("(" + LookUpTypeEnum.PROVIDER_ROLE.name() + ")" + NO_LOOKUPS_FOUND_MESSAGE);
            }
        }

        //Provider Specialty
        if (lookUpTypeList == null || lookUpTypeList.size() == 0 || lookUpTypeList.stream().anyMatch(LookUpTypeEnum.PROVIDER_SPECIALTY.name()::equalsIgnoreCase)) {
            log.info("Getting look up values for " + LookUpTypeEnum.PROVIDER_SPECIALTY);
            try {
                lookUpData.setProviderSpecialties(lookupFisClient.getProviderSpecialty());
            } catch (FeignException fe) {
                log.error("(" + LookUpTypeEnum.PROVIDER_SPECIALTY.name() + ")" + NO_LOOKUPS_FOUND_MESSAGE);
            }
        }

        //Flag Status
        if (lookUpTypeList == null || lookUpTypeList.size() == 0 || lookUpTypeList.stream().anyMatch(LookUpTypeEnum.FLAG_STATUS.name()::equalsIgnoreCase)) {
            log.info("Getting look up values for " + LookUpTypeEnum.FLAG_STATUS);
            try {
                lookUpData.setFlagStatus(lookupFisClient.getFlagStatus());
            } catch (FeignException fe) {
                log.error("(" + LookUpTypeEnum.FLAG_STATUS.name() + ")" + NO_LOOKUPS_FOUND_MESSAGE);
            }
        }

        //Flag Category
        if (lookUpTypeList == null || lookUpTypeList.size() == 0 || lookUpTypeList.stream().anyMatch(LookUpTypeEnum.FLAG_CATEGORY.name()::equalsIgnoreCase)) {
            log.info("Getting look up values for " + LookUpTypeEnum.FLAG_CATEGORY);
            try {
                lookUpData.setFlagCategory(lookupFisClient.getFlagCategory());
            } catch (FeignException fe) {
                log.error("(" + LookUpTypeEnum.FLAG_CATEGORY.name() + ")" + NO_LOOKUPS_FOUND_MESSAGE);
            }
        }

        //Policyholder Relationship
        if (lookUpTypeList == null || lookUpTypeList.size() == 0 || lookUpTypeList.stream().anyMatch(LookUpTypeEnum.POLICYHOLDER_RELATIONSHIP.name()::equalsIgnoreCase)) {
            log.info("Getting look up values for " + LookUpTypeEnum.POLICYHOLDER_RELATIONSHIP);
            try {
                lookUpData.setPolicyholderRelationship(lookupFisClient.getPolicyholderRelationship());
            } catch (FeignException fe) {
                log.error("(" + LookUpTypeEnum.POLICYHOLDER_RELATIONSHIP.name() + ")" + NO_LOOKUPS_FOUND_MESSAGE);
            }
        }

        //Fm Status
        if (lookUpTypeList == null || lookUpTypeList.size() == 0 || lookUpTypeList.stream().anyMatch(LookUpTypeEnum.FM_STATUS.name()::equalsIgnoreCase)) {
            log.info("Getting look up values for " + LookUpTypeEnum.FM_STATUS);
            try {
                lookUpData.setFmStatus(lookupFisClient.getFmStatus());
            } catch (FeignException fe) {
                log.error("(" + LookUpTypeEnum.FM_STATUS.name() + ")" + NO_LOOKUPS_FOUND_MESSAGE);
            }
        }

        //Coverage Type
        if (lookUpTypeList == null || lookUpTypeList.size() == 0 || lookUpTypeList.stream().anyMatch(LookUpTypeEnum.COVERAGE_TYPE.name()::equalsIgnoreCase)) {
            log.info("Getting look up values for " + LookUpTypeEnum.COVERAGE_TYPE);
            try {
                lookUpData.setCoverageType(lookupFisClient.getCoverageType());
            } catch (FeignException fe) {
                log.error("(" + LookUpTypeEnum.COVERAGE_TYPE.name() + ")" + NO_LOOKUPS_FOUND_MESSAGE);
            }
        }

        //EOC Status
        if (lookUpTypeList == null || lookUpTypeList.size() == 0 || lookUpTypeList.stream().anyMatch(LookUpTypeEnum.EOC_STATUS.name()::equalsIgnoreCase)) {
            log.info("Getting look up values for " + LookUpTypeEnum.EOC_STATUS);
            try {
                lookUpData.setEocStatus(lookupFisClient.getEocStatus());
            } catch (FeignException fe) {
                log.error("(" + LookUpTypeEnum.EOC_STATUS.name() + ")" + NO_LOOKUPS_FOUND_MESSAGE);
            }
        }

        //EOC Type
        if (lookUpTypeList == null || lookUpTypeList.size() == 0 || lookUpTypeList.stream().anyMatch(LookUpTypeEnum.EOC_TYPE.name()::equalsIgnoreCase)) {
            log.info("Getting look up values for " + LookUpTypeEnum.EOC_TYPE);
            try {
                lookUpData.setEocType(lookupFisClient.getEocType());
            } catch (FeignException fe) {
                log.error("(" + LookUpTypeEnum.EOC_TYPE.name() + ")" + NO_LOOKUPS_FOUND_MESSAGE);
            }
        }

        //Contact Purpose
        if (lookUpTypeList == null || lookUpTypeList.size() == 0 || lookUpTypeList.stream().anyMatch(LookUpTypeEnum.CONTACTPURPOSE.name()::equalsIgnoreCase)) {
            log.info("Getting look up values for " + LookUpTypeEnum.CONTACTPURPOSE);
            try {
                lookUpData.setContactPurpose(lookupFisClient.getContactPurpose());
            } catch (FeignException fe) {
                log.error("(" + LookUpTypeEnum.CONTACTPURPOSE.name() + ")" + NO_LOOKUPS_FOUND_MESSAGE);
            }
        }

        return lookUpData;
    }
}
