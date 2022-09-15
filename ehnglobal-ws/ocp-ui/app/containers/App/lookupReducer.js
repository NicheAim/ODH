import { fromJS } from 'immutable';

import {
  ACTION_PARTICIPANT_ROLE,
  ACTION_PARTICIPANT_TYPE,
  ADDRESSTYPE,
  ADDRESSUSE,
  ADMINISTRATIVEGENDER,
  APPOINTMENT_PARTICIPANT_REQUIRED,
  APPOINTMENT_PARTICIPANT_TYPE,
  APPOINTMENT_PARTICIPATION_STATUS,
  APPOINTMENT_PARTICIPATION_TYPE,
  APPOINTMENT_STATUS,
  APPOINTMENT_TYPE,
  CARETEAMCATEGORY,
  CARETEAMREASON,
  CARETEAMSTATUS,
  COMMUNICATION_CATEGORY,
  COMMUNICATION_MEDIUM,
  COMMUNICATION_NOT_DONE_REASON,
  COMMUNICATION_STATUS,
  CONTACTPURPOSE,
  COVERAGE_TYPE,
  DATE_RANGE,
  DEFINITION_TOPIC,
  EOC_STATUS,
  EOC_TYPE,
  FLAG_CATEGORY,
  FLAG_STATUS,
  FM_STATUS,
  GET_LOOKUPS,
  GET_LOOKUPS_ERROR,
  GET_LOOKUPS_SUCCESS,
  HEALTHCARESERVICECATEGORY,
  HEALTHCARESERVICEREFERRALMETHOD,
  HEALTHCARESERVICESPECIALITY,
  HEALTHCARESERVICESTATUS,
  HEALTHCARESERVICETYPE,
  LANGUAGE,
  LOCATIONIDENTIFIERSYSTEM,
  LOCATIONPHYSICALTYPE,
  LOCATIONSTATUS,
  ORGANIZATIONIDENTIFIERSYSTEM,
  ORGANIZATIONSTATUS,
  PARTICIPANTROLE,
  PARTICIPANTTYPE,
  PATIENTIDENTIFIERSYSTEM,
  POLICYHOLDER_RELATIONSHIP,
  PRACTITIONERIDENTIFIERSYSTEM,
  PRACTITIONERROLES,
  PROVIDER_ROLE,
  PROVIDER_SPECIALTY,
  PUBLICATION_STATUS,
  RELATED_ARTIFACT_TYPE,
  RELATEDPERSONPATIENTRELATIONSHIPTYPES,
  REQUEST_INTENT,
  REQUEST_PRIORITY,
  RESOURCE_TYPE,
  TASK_PERFORMER_TYPE,
  TASK_STATUS,
  TELECOMSYSTEM,
  TELECOMUSE,
  USCOREBIRTHSEX,
  USCOREETHNICITY,
  USCORERACE,
  USPSSTATES,
  CONDITIONS_PATIENT,
} from './constants';

// The initial state of the lookup
const initialState = fromJS({
  loading: false,
  error: false,
  CONDITIONS_PATIENT: [],
  USPSSTATES: [],
  LOCATIONPHYSICALTYPE: [],
  LOCATIONSTATUS: [],
  ADDRESSTYPE: [],
  ADDRESSUSE: [],
  LOCATIONIDENTIFIERSYSTEM: [],
  PRACTITIONERIDENTIFIERSYSTEM: [],
  PRACTITIONERROLES: [],
  TELECOMSYSTEM: [],
  TELECOMUSE: [],
  CONTACTPURPOSE: [],
  ORGANIZATIONIDENTIFIERSYSTEM: [],
  ORGANIZATIONSTATUS: [],
  PATIENTIDENTIFIERSYSTEM: [],
  ADMINISTRATIVEGENDER: [],
  USCORERACE: [],
  USCOREETHNICITY: [],
  USCOREBIRTHSEX: [],
  LANGUAGE: [],
  CARETEAMCATEGORY: [],
  PARTICIPANTTYPE: [],
  CARETEAMSTATUS: [],
  PARTICIPANTROLE: [],
  CARETEAMREASON: [],
  HEALTHCARESERVICECATEGORY: [],
  HEALTHCARESERVICETYPE: [],
  HEALTHCARESERVICEREFERRALMETHOD: [],
  RELATEDPERSONPATIENTRELATIONSHIPTYPES: [],
  HEALTHCARESERVICESPECIALITY: [],
  HEALTHCARESERVICESTATUS: [],
  PUBLICATION_STATUS: [],
  DEFINITION_TOPIC: [],
  RESOURCE_TYPE: [],
  ACTION_PARTICIPANT_TYPE: [],
  ACTION_PARTICIPANT_ROLE: [],
  // Task Resource Lookups - Start
  TASK_STATUS: [],
  REQUEST_INTENT: [],
  REQUEST_PRIORITY: [],
  TASK_PERFORMER_TYPE: [],
  // Task Resource Lookups - End
  RELATED_ARTIFACT_TYPE: [],
  APPOINTMENT_PARTICIPANT_REQUIRED: [],
  APPOINTMENT_PARTICIPATION_STATUS: [],
  APPOINTMENT_PARTICIPATION_TYPE: [],
  APPOINTMENT_PARTICIPANT_TYPE: [],
  APPOINTMENT_STATUS: [],
  APPOINTMENT_TYPE: [],
  PROVIDER_ROLE: [],
  PROVIDER_SPECIALTY: [],
  FLAG_STATUS: [],
  FLAG_CATEGORY: [],
  // Communications Resource lookups start
  COMMUNICATION_STATUS: [],
  COMMUNICATION_CATEGORY: [],
  COMMUNICATION_NOT_DONE_REASON: [],
  COMMUNICATION_MEDIUM: [],
  DATE_RANGE: [],
  // Coverage Lookups - Start
  POLICYHOLDER_RELATIONSHIP: [],
  FM_STATUS: [],
  COVERAGE_TYPE: [],
  // Coverage Lookups - End
  // Episode OF Care Lookups - Start
  EOC_TYPE: [],
  EOC_STATUS: [],
  // Episode OF Care Lookups - End
});

function lookupReducer(state = initialState, action) {
  switch (action.type) {
    case GET_LOOKUPS:
      return state.set('loading', true).set('error', false);
    case GET_LOOKUPS_SUCCESS:
      return (
        state
          .set(
            CONDITIONS_PATIENT,
            fromJS(
              (action.lookups && action.lookups.conditions) ||
                state.get(CONDITIONS_PATIENT)
            )
          )
          .set(
            USPSSTATES,
            fromJS(
              (action.lookups && action.lookups.uspsStates) ||
                state.get(USPSSTATES)
            )
          )
          .set(
            ADDRESSTYPE,
            fromJS(
              (action.lookups && action.lookups.addressTypes) ||
                state.get(ADDRESSTYPE)
            )
          )
          .set(
            ADDRESSUSE,
            fromJS(
              (action.lookups && action.lookups.addressUses) ||
                state.get(ADDRESSUSE)
            )
          )
          .set(
            LOCATIONIDENTIFIERSYSTEM,
            fromJS(
              (action.lookups && action.lookups.locationIdentifierSystems) ||
                state.get(LOCATIONIDENTIFIERSYSTEM)
            )
          )
          .set(
            PRACTITIONERIDENTIFIERSYSTEM,
            fromJS(
              (action.lookups &&
                action.lookups.practitionerIdentifierSystems) ||
                state.get(PRACTITIONERIDENTIFIERSYSTEM)
            )
          )
          .set(
            TELECOMSYSTEM,
            fromJS(
              (action.lookups && action.lookups.telecomSystems) ||
                state.get(TELECOMSYSTEM)
            )
          )
          .set(
            TELECOMUSE,
            fromJS(
              (action.lookups && action.lookups.telecomUses) ||
                state.get(TELECOMUSE)
            )
          )
          .set(
            CONTACTPURPOSE,
            fromJS(
              (action.lookups && action.lookups.contactPurpose) ||
                state.get(CONTACTPURPOSE)
            )
          )
          .set(
            LOCATIONSTATUS,
            fromJS(
              (action.lookups && action.lookups.locationStatuses) ||
                state.get(LOCATIONSTATUS)
            )
          )
          .set(
            LOCATIONPHYSICALTYPE,
            fromJS(
              (action.lookups && action.lookups.locationPhysicalTypes) ||
                state.get(LOCATIONPHYSICALTYPE)
            )
          )
          .set(
            ORGANIZATIONIDENTIFIERSYSTEM,
            fromJS(
              (action.lookups &&
                action.lookups.organizationIdentifierSystems) ||
                state.get(ORGANIZATIONIDENTIFIERSYSTEM)
            )
          )
          .set(
            ORGANIZATIONSTATUS,
            fromJS(
              (action.lookups && action.lookups.organizationStatuses) ||
                state.get(ORGANIZATIONSTATUS)
            )
          )
          .set(
            PRACTITIONERROLES,
            fromJS(
              (action.lookups && action.lookups.practitionerRoles) ||
                state.get(PRACTITIONERROLES)
            )
          )
          .set(
            PATIENTIDENTIFIERSYSTEM,
            fromJS(
              (action.lookups && action.lookups.patientIdentifierSystems) ||
                state.get(PATIENTIDENTIFIERSYSTEM)
            )
          )
          .set(
            ADMINISTRATIVEGENDER,
            fromJS(
              (action.lookups && action.lookups.administrativeGenders) ||
                state.get(ADMINISTRATIVEGENDER)
            )
          )
          .set(
            USCORERACE,
            fromJS(
              (action.lookups && action.lookups.usCoreRaces) ||
                state.get(USCORERACE)
            )
          )
          .set(
            USCOREETHNICITY,
            fromJS(
              (action.lookups && action.lookups.usCoreEthnicities) ||
                state.get(USCOREETHNICITY)
            )
          )
          .set(
            USCOREBIRTHSEX,
            fromJS(
              (action.lookups && action.lookups.usCoreBirthSex) ||
                state.get(USCOREBIRTHSEX)
            )
          )
          .set(
            LANGUAGE,
            fromJS(
              (action.lookups && action.lookups.languages) ||
                state.get(LANGUAGE)
            )
          )
          .set(
            CARETEAMCATEGORY,
            fromJS(
              (action.lookups && action.lookups.careTeamCategories) ||
                state.get(CARETEAMCATEGORY)
            )
          )
          .set(
            PARTICIPANTTYPE,
            fromJS(
              (action.lookups && action.lookups.participantTypes) ||
                state.get(PARTICIPANTTYPE)
            )
          )
          .set(
            CARETEAMSTATUS,
            fromJS(
              (action.lookups && action.lookups.careTeamStatuses) ||
                state.get(CARETEAMSTATUS)
            )
          )
          .set(
            PARTICIPANTROLE,
            fromJS(
              (action.lookups && action.lookups.participantRoles) ||
                state.get(PARTICIPANTROLE)
            )
          )
          .set(
            CARETEAMREASON,
            fromJS(
              (action.lookups && action.lookups.careTeamReasons) ||
                state.get(CARETEAMREASON)
            )
          )
          .set(
            HEALTHCARESERVICECATEGORY,
            fromJS(
              (action.lookups && action.lookups.healthcareServiceCategories) ||
                state.get(HEALTHCARESERVICECATEGORY)
            )
          )
          .set(
            HEALTHCARESERVICETYPE,
            fromJS(
              (action.lookups && action.lookups.healthcareServiceTypes) ||
                state.get(HEALTHCARESERVICETYPE)
            )
          )
          .set(
            HEALTHCARESERVICEREFERRALMETHOD,
            fromJS(
              (action.lookups &&
                action.lookups.healthcareServiceReferralMethods) ||
                state.get(HEALTHCARESERVICEREFERRALMETHOD)
            )
          )
          .set(
            HEALTHCARESERVICESPECIALITY,
            fromJS(
              (action.lookups &&
                action.lookups.healthcareServiceSpecialities) ||
                state.get(HEALTHCARESERVICESPECIALITY)
            )
          )
          .set(
            HEALTHCARESERVICESTATUS,
            fromJS(
              (action.lookups && action.lookups.healthcareServiceStatuses) ||
                state.get(HEALTHCARESERVICESTATUS)
            )
          )
          .set(
            PUBLICATION_STATUS,
            fromJS(
              (action.lookups && action.lookups.publicationStatus) ||
                state.get(PUBLICATION_STATUS)
            )
          )
          .set(
            DEFINITION_TOPIC,
            fromJS(
              (action.lookups && action.lookups.definitionTopic) ||
                state.get(DEFINITION_TOPIC)
            )
          )
          .set(
            RESOURCE_TYPE,
            fromJS(
              (action.lookups && action.lookups.resourceType) ||
                state.get(RESOURCE_TYPE)
            )
          )
          .set(
            ACTION_PARTICIPANT_TYPE,
            fromJS(
              (action.lookups && action.lookups.actionParticipantType) ||
                state.get(ACTION_PARTICIPANT_TYPE)
            )
          )
          .set(
            ACTION_PARTICIPANT_ROLE,
            fromJS(
              (action.lookups && action.lookups.actionParticipantRole) ||
                state.get(ACTION_PARTICIPANT_ROLE)
            )
          )
          .set(
            RELATEDPERSONPATIENTRELATIONSHIPTYPES,
            fromJS(
              (action.lookups &&
                action.lookups.relatedPersonPatientRelationshipTypes) ||
                state.get(RELATEDPERSONPATIENTRELATIONSHIPTYPES)
            )
          )
          // Task Resource Lookups - Start
          .set(
            TASK_STATUS,
            fromJS(
              (action.lookups && action.lookups.taskStatus) ||
                state.get(TASK_STATUS)
            )
          )
          .set(
            REQUEST_INTENT,
            fromJS(
              (action.lookups && action.lookups.requestIntent) ||
                state.get(REQUEST_INTENT)
            )
          )
          .set(
            REQUEST_PRIORITY,
            fromJS(
              (action.lookups && action.lookups.requestPriority) ||
                state.get(REQUEST_PRIORITY)
            )
          )
          .set(
            TASK_PERFORMER_TYPE,
            fromJS(
              (action.lookups && action.lookups.taskPerformerType) ||
                state.get(TASK_PERFORMER_TYPE)
            )
          )
          // Task Resource Lookups - End
          .set(
            RELATED_ARTIFACT_TYPE,
            fromJS(
              (action.lookups && action.lookups.relatedArtifactType) ||
                state.get(RELATED_ARTIFACT_TYPE)
            )
          )
          // Appointment Lookups - Start
          .set(
            APPOINTMENT_PARTICIPANT_REQUIRED,
            fromJS(
              (action.lookups &&
                action.lookups.appointmentParticipantRequired) ||
                state.get(APPOINTMENT_PARTICIPANT_REQUIRED)
            )
          )
          .set(
            APPOINTMENT_PARTICIPATION_STATUS,
            fromJS(
              (action.lookups &&
                action.lookups.appointmentParticipationStatus) ||
                state.get(APPOINTMENT_PARTICIPATION_STATUS)
            )
          )
          .set(
            APPOINTMENT_PARTICIPATION_TYPE,
            fromJS(
              (action.lookups && action.lookups.appointmentParticipationType) ||
                state.get(APPOINTMENT_PARTICIPATION_TYPE)
            )
          )
          .set(
            APPOINTMENT_PARTICIPANT_TYPE,
            fromJS(
              (action.lookups && action.lookups.appointmentParticipantType) ||
                state.get(APPOINTMENT_PARTICIPANT_TYPE)
            )
          )
          .set(
            APPOINTMENT_STATUS,
            fromJS(
              (action.lookups && action.lookups.appointmentStatus) ||
                state.get(APPOINTMENT_STATUS)
            )
          )
          .set(
            APPOINTMENT_TYPE,
            fromJS(
              (action.lookups && action.lookups.appointmentType) ||
                state.get(APPOINTMENT_TYPE)
            )
          )
          // Appointment Lookups - End
          .set(
            PROVIDER_ROLE,
            fromJS(
              (action.lookups && action.lookups.providerRoles) ||
                state.get(PROVIDER_ROLE)
            )
          )
          .set(
            PROVIDER_SPECIALTY,
            fromJS(
              (action.lookups && action.lookups.providerSpecialties) ||
                state.get(PROVIDER_SPECIALTY)
            )
          )
          // flag lookups
          .set(
            FLAG_STATUS,
            fromJS(
              (action.lookups && action.lookups.flagStatus) ||
                state.get(FLAG_STATUS)
            )
          )
          .set(
            FLAG_CATEGORY,
            fromJS(
              (action.lookups && action.lookups.flagCategory) ||
                state.get(FLAG_CATEGORY)
            )
          )
          // Communication Resource lookups start
          .set(
            COMMUNICATION_STATUS,
            fromJS(
              (action.lookups && action.lookups.communicationStatus) ||
                state.get(COMMUNICATION_STATUS)
            )
          )
          .set(
            COMMUNICATION_CATEGORY,
            fromJS(
              (action.lookups && action.lookups.communicationCategory) ||
                state.get(COMMUNICATION_CATEGORY)
            )
          )
          .set(
            COMMUNICATION_NOT_DONE_REASON,
            fromJS(
              (action.lookups && action.lookups.communicationNotDoneReason) ||
                state.get(COMMUNICATION_NOT_DONE_REASON)
            )
          )
          .set(
            COMMUNICATION_MEDIUM,
            fromJS(
              (action.lookups && action.lookups.communicationMedium) ||
                state.get(COMMUNICATION_MEDIUM)
            )
          )
          // Coverage Lookups - Start
          .set(
            POLICYHOLDER_RELATIONSHIP,
            fromJS(
              (action.lookups && action.lookups.policyholderRelationship) ||
                state.get(POLICYHOLDER_RELATIONSHIP)
            )
          )
          .set(
            FM_STATUS,
            fromJS(
              (action.lookups && action.lookups.fmStatus) ||
                state.get(FM_STATUS)
            )
          )
          .set(
            COVERAGE_TYPE,
            fromJS(
              (action.lookups && action.lookups.coverageType) ||
                state.get(COVERAGE_TYPE)
            )
          )
          // Coverage Lookups - End
          // Episode of Care Lookups - Start
          .set(
            EOC_TYPE,
            fromJS(
              (action.lookups && action.lookups.eocType) || state.get(EOC_TYPE)
            )
          )
          .set(
            EOC_STATUS,
            fromJS(
              (action.lookups && action.lookups.eocStatus) ||
                state.get(EOC_STATUS)
            )
          )
          // Episode of Care Lookups - End
          .set(
            DATE_RANGE,
            fromJS(
              (action.lookups && action.lookups.dateRanges) ||
                state.get(DATE_RANGE)
            )
          )
          .set('loading', false)
      );
    case GET_LOOKUPS_ERROR:
      return state.set('error', action.error).set('loading', false);
    default:
      return state;
  }
}

export default lookupReducer;
