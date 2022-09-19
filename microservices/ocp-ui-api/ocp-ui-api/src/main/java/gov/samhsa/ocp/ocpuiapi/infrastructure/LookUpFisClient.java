package gov.samhsa.ocp.ocpuiapi.infrastructure;

import gov.samhsa.ocp.ocpuiapi.service.dto.IdentifierSystemDto;
import gov.samhsa.ocp.ocpuiapi.service.dto.StatusBooleanValuesDto;
import gov.samhsa.ocp.ocpuiapi.service.dto.ValueSetDto;
import org.springframework.cloud.netflix.feign.FeignClient;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;

@FeignClient(name = "ocp-fis", url = "${ribbon.listOfServers}")
public interface LookUpFisClient {

    @RequestMapping(value = "/lookups/usps-states", method = RequestMethod.GET)
    List<ValueSetDto> getUspsStates();

    @RequestMapping(value = "/lookups/date-ranges", method = RequestMethod.GET)
    Object getDateRanges();

    @RequestMapping(value = "/lookups/identifier-types", method = RequestMethod.GET)
    List<ValueSetDto> getIdentifierTypes(@RequestParam(value = "resourceType", required = false) String resourceType);

    @RequestMapping(value = "/lookups/identifier-systems", method = RequestMethod.GET)
    List<IdentifierSystemDto> getIdentifierSystems(@RequestParam(value = "identifierTypeList", required = false) List<String> identifierTypeList);

    @RequestMapping(value = "/lookups/identifier-uses", method = RequestMethod.GET)
    List<ValueSetDto> getIdentifierUses();

    @RequestMapping(value = "/lookups/location-modes", method = RequestMethod.GET)
    List<ValueSetDto> getLocationModes();

    @RequestMapping(value = "/lookups/location-statuses", method = RequestMethod.GET)
    List<ValueSetDto> getLocationStatuses();

    @RequestMapping(value = "/lookups/location-physical-types", method = RequestMethod.GET)
    List<ValueSetDto> getLocationPhysicalTypes();

    @RequestMapping(value = "/lookups/address-types", method = RequestMethod.GET)
    List<ValueSetDto> getAddressTypes();

    @RequestMapping(value = "/lookups/address-uses", method = RequestMethod.GET)
    List<ValueSetDto> getAddressUses();

    @RequestMapping(value = "/lookups/telecom-uses", method = RequestMethod.GET)
    List<ValueSetDto> getTelecomUses();

    @RequestMapping(value = "/lookups/telecom-systems", method = RequestMethod.GET)
    List<ValueSetDto> getTelecomSystems();

    @RequestMapping(value = "/lookups/organization-statuses", method = RequestMethod.GET)
    List<StatusBooleanValuesDto> getOrganizationStatuses();

    @RequestMapping(value = "/lookups/practitioner-roles", method = RequestMethod.GET)
    List<ValueSetDto> getPractitionerRoles();

    @RequestMapping(value = "/lookups/administrative-genders", method = RequestMethod.GET)
    List<ValueSetDto> getAdministrativeGenders();

    @RequestMapping(value = "/lookups/us-core-races", method = RequestMethod.GET)
    List<ValueSetDto> getUSCoreRaces();

    @RequestMapping(value = "/lookups/us-core-ethnicities", method = RequestMethod.GET)
    List<ValueSetDto> getUSCoreEthnicities();

    @RequestMapping(value = "/lookups/us-core-birthsexes", method = RequestMethod.GET)
    List<ValueSetDto> getUSCoreBirthsexes();

    @RequestMapping(value = "/lookups/languages", method = RequestMethod.GET)
    List<ValueSetDto> getLanguages();

    @RequestMapping(value = "/lookups/healthcare-service-categories", method = RequestMethod.GET)
    List<ValueSetDto> getHealthcareServiceCategories();

    @RequestMapping(value = "/lookups/healthcare-service-types", method = RequestMethod.GET)
    List<ValueSetDto> getHealthcareServiceTypes();

    @RequestMapping(value = "/lookups/healthcare-service-specialities", method = RequestMethod.GET)
    List<ValueSetDto> getHealthcareServiceSpecialities();

    @RequestMapping(value = "/lookups/healthcare-service-referral-methods", method = RequestMethod.GET)
    List<ValueSetDto> getHealthcareServiceReferralMethods();

    @RequestMapping(value = "/lookups/healthcare-service-statuses", method = RequestMethod.GET)
    List<StatusBooleanValuesDto> getHealthcareServiceStatuses();

    @RequestMapping(value = "/lookups/care-team-categories", method = RequestMethod.GET)
    List<ValueSetDto> getCareTeamCategories();

    @RequestMapping(value = "/lookups/participant-types", method = RequestMethod.GET)
    List<ValueSetDto> getParticipantTypes();

    @RequestMapping(value = "/lookups/care-team-statuses", method = RequestMethod.GET)
    List<ValueSetDto> getCareTeamStatuses();

    @RequestMapping(value = "/lookups/care-team-reasons", method = RequestMethod.GET)
    List<ValueSetDto> getCareTeamReasons();

    @RequestMapping(value = "/lookups/participant-roles", method = RequestMethod.GET)
    List<ValueSetDto> getParticipantRoles();

    @RequestMapping(value = "/lookups/related-person-patient-relationship-types", method = RequestMethod.GET)
    List<ValueSetDto> getRelatedPersonPatientRelationshipTypes();

    @RequestMapping(value = "/lookups/publication-status", method = RequestMethod.GET)
    List<ValueSetDto> getPublicationStatus();

    @RequestMapping(value = "/lookups/definition-topic", method = RequestMethod.GET)
    List<ValueSetDto> getDefinitionTopic();

    @RequestMapping(value = "/lookups/resource-type", method = RequestMethod.GET)
    List<ValueSetDto> getResourceType();

    @RequestMapping(value = "/lookups/action-participant-role", method = RequestMethod.GET)
    List<ValueSetDto> getActionParticipantRole();

    @RequestMapping(value = "/lookups/action-participant-type", method = RequestMethod.GET)
    List<ValueSetDto> getActionParticipantType();

    @RequestMapping(value = "/lookups/task-status", method = RequestMethod.GET)
    List<ValueSetDto> getTaskStatus();

    @RequestMapping(value = "/lookups/request-priority", method = RequestMethod.GET)
    List<ValueSetDto> getRequestPriority();

    @RequestMapping(value = "/lookups/task-performer-type", method = RequestMethod.GET)
    List<ValueSetDto> getTaskPerformerType();

    @RequestMapping(value = "/lookups/request-intent", method = RequestMethod.GET)
    List<ValueSetDto> getRequestIntent();

    @RequestMapping(value = "lookups/activity-definition-related-artifact-types", method = RequestMethod.GET)
    List<ValueSetDto> getActivityDefinitionRelatedArtifactTypes();

    @RequestMapping(value = "lookups/communication-statuses", method = RequestMethod.GET)
    List<ValueSetDto> getCommunicationStatus();

    @RequestMapping(value = "lookups/communication-categories", method = RequestMethod.GET)
    List<ValueSetDto> getCommunicationCategory();

    @RequestMapping(value = "lookups/communication-not-done-reasons", method = RequestMethod.GET)
    List<ValueSetDto> getCommunicationNotDoneReason();

    @RequestMapping(value = "lookups/communication-mediums", method = RequestMethod.GET)
    List<ValueSetDto> getCommunicationMedium();

    @RequestMapping(value = "lookups/appointment-statuses", method = RequestMethod.GET)
    List<ValueSetDto> getAppointmentStatus();

    @RequestMapping(value = "lookups/appointment-types", method = RequestMethod.GET)
    List<ValueSetDto> getAppointmentType();

    @RequestMapping(value = "lookups/appointment-participation-statuses", method = RequestMethod.GET)
    List<ValueSetDto> getAppointmentParticipationStatus();

    @RequestMapping(value = "lookups/appointment-participant-types", method = RequestMethod.GET)
    List<ValueSetDto> getAppointmentParticipantType();

    @RequestMapping(value = "lookups/appointment-participation-types", method = RequestMethod.GET)
    List<ValueSetDto> getAppointmentParticipationType();

    @RequestMapping(value = "lookups/appointment-participant-required", method = RequestMethod.GET)
    List<ValueSetDto> getAppointmentParticipantRequired();

    @RequestMapping(value = "lookups/provider-role", method = RequestMethod.GET)
    List<ValueSetDto> getProviderRole();

    @RequestMapping(value = "lookups/provider-specialty", method = RequestMethod.GET)
    List<ValueSetDto> getProviderSpecialty();

    @RequestMapping(value = "lookups/flag-status", method = RequestMethod.GET)
    List<ValueSetDto> getFlagStatus();

    @RequestMapping(value = "lookups/flag-category", method = RequestMethod.GET)
    List<ValueSetDto> getFlagCategory();

    @RequestMapping(value = "lookups/policyholder-relationship", method = RequestMethod.GET)
    List<ValueSetDto> getPolicyholderRelationship();

    @RequestMapping(value = "lookups/fm-status", method = RequestMethod.GET)
    List<ValueSetDto> getFmStatus();

    @RequestMapping(value = "lookups/coverage-type", method = RequestMethod.GET)
    List<ValueSetDto> getCoverageType();

    @RequestMapping(value="/lookups/eoc-status",method = RequestMethod.GET)
    List<ValueSetDto> getEocStatus();

    @RequestMapping(value="/lookups/eoc-type",method = RequestMethod.GET)
    List<ValueSetDto> getEocType();

    @RequestMapping(value="/lookups/contact-purpose",method = RequestMethod.GET)
    List<ValueSetDto> getContactPurpose();

    @RequestMapping(value = "/lookups/conditions-patient", method = RequestMethod.GET)
    List<ValueSetDto> getConditions();

    @RequestMapping(value = "/lookups/conditions-priorities", method = RequestMethod.GET)
    List<ValueSetDto> getConditionsPriorities();
}
