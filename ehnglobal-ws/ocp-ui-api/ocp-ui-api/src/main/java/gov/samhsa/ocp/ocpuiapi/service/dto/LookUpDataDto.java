package gov.samhsa.ocp.ocpuiapi.service.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class LookUpDataDto {
    //In alphabetical order
    List<ValueSetDto> addressTypes;
    List<ValueSetDto> addressUses;
    List<ValueSetDto> administrativeGenders;
    List<ValueSetDto> communicationStatus;
    List<ValueSetDto> communicationCategory;
    List<ValueSetDto> communicationNotDoneReason;
    List<ValueSetDto> communicationMedium;
    Object dateRanges;
    List<ValueSetDto> healthcareServiceCategories;
    List<ValueSetDto> healthcareServiceTypes;
    List<ValueSetDto> healthcareServiceSpecialities;
    List<ValueSetDto> healthcareServiceReferralMethods;
    List<StatusBooleanValuesDto> healthcareServiceStatuses;
    List<ValueSetDto> languages;
    List<IdentifierSystemDto> locationIdentifierSystems;
    List<ValueSetDto> locationStatuses;
    List<ValueSetDto> locationTypes;
    List<ValueSetDto> locationPhysicalTypes;
    List<IdentifierSystemDto> organizationIdentifierSystems;
    List<StatusBooleanValuesDto> organizationStatuses;
    List<IdentifierSystemDto> patientIdentifierSystems;
    List<IdentifierSystemDto> practitionerIdentifierSystems;
    List<ValueSetDto> practitionerRoles;
    List<ValueSetDto> telecomSystems;
    List<ValueSetDto> telecomUses;
    List<ValueSetDto> usCoreBirthSex;
    List<ValueSetDto> usCoreEthnicities;
    List<ValueSetDto> usCoreRaces;
    List<ValueSetDto> uspsStates;
    List<ValueSetDto> careTeamCategories;
    List<ValueSetDto> participantTypes;
    List<ValueSetDto> careTeamStatuses;
    List<ValueSetDto> participantRoles;
    List<ValueSetDto> careTeamReasons;
    List<ValueSetDto> publicationStatus;
    List<ValueSetDto> definitionTopic;
    List<ValueSetDto> resourceType;
    List<ValueSetDto> actionParticipantType;
    List<ValueSetDto> actionParticipantRole;
    List<ValueSetDto> relatedPersonPatientRelationshipTypes;
    List<ValueSetDto> taskStatus;
    List<ValueSetDto> observationStatus;
    List<ValueSetDto> requestPriority;
    List<ValueSetDto> taskPerformerType;
    List<ValueSetDto> requestIntent;
    List<ValueSetDto> relatedArtifactType;
    List<ValueSetDto> appointmentStatus;
    List<ValueSetDto> appointmentType;
    List<ValueSetDto> appointmentParticipationStatus;
    List<ValueSetDto> appointmentParticipantType;
    List<ValueSetDto> appointmentParticipationType;
    List<ValueSetDto> appointmentParticipantRequired;
    List<ValueSetDto> providerRoles;
    List<ValueSetDto> providerSpecialties;
    List<ValueSetDto> flagStatus;
    List<ValueSetDto> flagCategory;
    List<ValueSetDto> securityRoleType;
    List<ValueSetDto> purposeOfUse;
    List<ValueSetDto> securityLabel;
    List<ValueSetDto> policyholderRelationship;
    List<ValueSetDto> fmStatus;
    List<ValueSetDto> coverageType;
    List<ValueSetDto> eocStatus;
    List<ValueSetDto> eocType;
    List<ValueSetDto> contactPurpose;
    List<ValueSetDto> conditions;
    List<ValueSetDto> conditions_priorities;
}
