/*
 * AppConstants
 * Each action has a corresponding type, which the reducer knows and picks up on.
 * To avoid weird typos between the reducer and the actions, we save them as
 * constants here. We prefix them with 'yourproject/YourComponent' so we avoid
 * reducers accidentally picking up actions they shouldn't.
 *
 * Follow this format:
 * export const YOUR_ACTION_CONSTANT = 'yourproject/YourContainer/YOUR_ACTION_CONSTANT';
 */

export const DEFAULT_LOCALE = 'en';

/**
 *  Action type related constants
 * @type {string}
 */
export const GET_LOOKUPS = 'ocpui/App/GET_LOOKUPS';
export const GET_LOOKUPS_SUCCESS = 'ocpui/App/GET_LOOKUPS_SUCCESS';
export const GET_LOOKUPS_FROM_STORE = 'ocpui/App/GET_LOOKUPS_FROM_STORE';
export const GET_LOOKUPS_ERROR = 'ocpui/App/GET_LOOKUPS_ERROR';

export const GET_CONFIG = 'ocpui/App/GET_CONFIG';
export const GET_CONFIG_SUCCESS = 'ocpui/App/GET_CONFIG_SUCCESS';
export const GET_CONFIG_ERROR = 'ocpui/App/GET_CONFIG_ERROR';

/**
 *  Global object keys
 * @type {string}
 */
export const GLOBAL_LOOKUP_STATE_KEY = 'lookup';
export const GLOBAL_AUTH_STATE_KEY = 'auth';

/**
 * Look up types constants
 * @type {string}
 */
export const ACTIVITYDEFINITIONS = 'ACTIVITYDEFINITIONS';
export const USPSSTATES = 'USPSSTATES';
export const LOCATIONSTATUS = 'LOCATIONSTATUS';
export const LOCATIONPHYSICALTYPE = 'LOCATIONPHYSICALTYPE';
export const ADDRESSTYPE = 'ADDRESSTYPE';
export const ADDRESSUSE = 'ADDRESSUSE';
export const LOCATIONIDENTIFIERSYSTEM = 'LOCATIONIDENTIFIERSYSTEM';
export const PRACTITIONERIDENTIFIERSYSTEM = 'PRACTITIONERIDENTIFIERSYSTEM';
export const PRACTITIONERROLES = 'PRACTITIONERROLES';
export const TELECOMSYSTEM = 'TELECOMSYSTEM';
export const TELECOMUSE = 'TELECOMUSE';
export const CONTACTPURPOSE = 'CONTACTPURPOSE';
export const ORGANIZATIONIDENTIFIERSYSTEM = 'ORGANIZATIONIDENTIFIERSYSTEM';
export const ORGANIZATIONSTATUS = 'ORGANIZATIONSTATUS';
export const PATIENTIDENTIFIERSYSTEM = 'PATIENTIDENTIFIERSYSTEM';
export const ADMINISTRATIVEGENDER = 'ADMINISTRATIVEGENDER';
export const USCORERACE = 'USCORERACE';
export const USCOREETHNICITY = 'USCOREETHNICITY';
export const USCOREBIRTHSEX = 'USCOREBIRTHSEX';
export const LANGUAGE = 'LANGUAGE';
export const CARETEAMCATEGORY = 'CARETEAMCATEGORY';
export const PARTICIPANTTYPE = 'PARTICIPANTTYPE';
export const CARETEAMSTATUS = 'CARETEAMSTATUS';
export const PARTICIPANTROLE = 'PARTICIPANTROLE';
export const CARETEAMREASON = 'CARETEAMREASON';
export const CONDITIONS_PATIENT = 'CONDITIONS_PATIENT';
// Healthcare Service Lookups - Start
export const HEALTHCARESERVICECATEGORY = 'HEALTHCARESERVICECATEGORY';
export const HEALTHCARESERVICETYPE = 'HEALTHCARESERVICETYPE';
export const HEALTHCARESERVICEREFERRALMETHOD =
  'HEALTHCARESERVICEREFERRALMETHOD';
export const HEALTHCARESERVICESPECIALITY = 'HEALTHCARESERVICESPECIALITY';
export const HEALTHCARESERVICESTATUS = 'HEALTHCARESERVICESTATUS';
// Healthcare Service Lookups - End
// Activity Definition Lookups - Start
export const PUBLICATION_STATUS = 'PUBLICATION_STATUS';
export const DEFINITION_TOPIC = 'DEFINITION_TOPIC';
export const RESOURCE_TYPE = 'RESOURCE_TYPE';
export const ACTION_PARTICIPANT_TYPE = 'ACTION_PARTICIPANT_TYPE';
export const ACTION_PARTICIPANT_ROLE = 'ACTION_PARTICIPANT_ROLE';
export const RELATEDPERSONPATIENTRELATIONSHIPTYPES =
  'RELATEDPERSONPATIENTRELATIONSHIPTYPES';
// Activity Definition Lookups - End
// Task Resource Lookups - Start
export const TASK_STATUS = 'TASK_STATUS';
export const REQUEST_INTENT = 'REQUEST_INTENT';
export const REQUEST_PRIORITY = 'REQUEST_PRIORITY';
export const TASK_PERFORMER_TYPE = 'TASK_PERFORMER_TYPE';
// Task Resource Lookups - End
export const RELATED_ARTIFACT_TYPE = 'RELATED_ARTIFACT_TYPE';
// Appointment Lookups - Start
export const APPOINTMENT_STATUS = 'APPOINTMENT_STATUS';
export const APPOINTMENT_TYPE = 'APPOINTMENT_TYPE';
export const APPOINTMENT_PARTICIPATION_STATUS =
  'APPOINTMENT_PARTICIPATION_STATUS';
export const APPOINTMENT_PARTICIPANT_TYPE = 'APPOINTMENT_PARTICIPANT_TYPE';
export const APPOINTMENT_PARTICIPATION_TYPE = 'APPOINTMENT_PARTICIPATION_TYPE';
export const APPOINTMENT_PARTICIPANT_REQUIRED =
  'APPOINTMENT_PARTICIPANT_REQUIRED';
// Appointment Lookups - End

// practionerRole lookups
export const PROVIDER_ROLE = 'PROVIDER_ROLE';
export const PROVIDER_SPECIALTY = 'PROVIDER_SPECIALTY';
// Communications resource lookups start
export const COMMUNICATION_STATUS = 'COMMUNICATION_STATUS';
export const COMMUNICATION_CATEGORY = 'COMMUNICATION_CATEGORY';
export const COMMUNICATION_NOT_DONE_REASON = 'COMMUNICATION_NOT_DONE_REASON';
export const COMMUNICATION_MEDIUM = 'COMMUNICATION_MEDIUM';
// Communications resource lookups end

// flag lookups
export const FLAG_STATUS = 'FLAG_STATUS';
export const FLAG_CATEGORY = 'FLAG_CATEGORY';

// To do filter date range
export const DATE_RANGE = 'DATE_RANGE';
// Coverage Lookups - Start
export const POLICYHOLDER_RELATIONSHIP = 'POLICYHOLDER_RELATIONSHIP';
export const FM_STATUS = 'FM_STATUS';
export const COVERAGE_TYPE = 'COVERAGE_TYPE';
// Coverage Lookups - End

// Episode of Care Lookups - Start
export const EOC_TYPE = 'EOC_TYPE';
export const EOC_STATUS = 'EOC_STATUS';
// Episode OF Care Lookups - End

/**
 *  Constants to hold the internal urls
 * @type {string}
 */
export const LOGIN_URL = '/ocp-ui/login';
export const PATIENTS_URL = '/ocp-ui/patients';
export const MANAGE_PRACTITIONER_URL = '/ocp-ui/manage-practitioner';
export const MANAGE_ORGANIZATION_URL = '/ocp-ui/manage-organization';
export const MANAGE_LOCATION_URL = '/ocp-ui/manage-location';
export const MANAGE_COMMUNICATION_URL = '/ocp-ui/manage-communication';
export const MANAGE_CARE_TEAM_URL = '/ocp-ui/manage-care-team';
export const MANAGE_PATIENT_URL = '/ocp-ui/manage-patient';
export const MANAGE_RELATED_PERSON_URL = '/ocp-ui/manage-related-person';
export const MANAGE_TASK_URL = '/ocp-ui/manage-task';
export const MANAGE_APPOINTMENT_URL = '/ocp-ui/manage-appointment';
export const MANAGE_HEALTHCARE_SERVICE_URL =
  '/ocp-ui/manage-healthcare-service';
export const ADMIN_MANAGE_PERMISSIONS_URL = '/ocp-ui/manage-permissions';
export const MANAGE_USERS_URL = '/ocp-ui/manage-users';
export const MANAGE_ASSIGN_LOCATION_TO_PRACTITIONER_URL =
  '/ocp-ui/assign-location-practitioner';
export const MANAGE_CLIENT_URL = '/ocp-ui/manage-client';
export const MANAGE_USER_REGISTRATION = '/ocp-ui/manage-user-registration';
export const MANAGE_GOAL_URL = '/ocp-ui/manage-goal';
export const MANAGE_OBSERVATION_URL = '/ocp-ui/manage-observation';
export const MANAGE_CONDITION_URL = '/ocp-ui/manage-condition';

/**
 *  Constants to hold the workspace urls
 * @type {string}
 */
export const ADMIN_WORKSPACE = '/ocp-ui/admin-workspace';
export const PRACTITIONER_WORKSPACE = '/ocp-ui/practitioner-workspace';
export const PATIENT_WORKSPACE = '/ocp-ui/patient-workspace';

/**
 *  Constants to hold the business functional role codes
 * @type {string}
 */
export const OCP_ADMIN_ROLE_CODE = 'ocpAdminRole';
export const PATIENT_ROLE_CODE = 'patientRole';
export const CARE_COORDINATOR_ROLE_CODE = '171M00000X';
export const CARE_MANAGER_ROLE_CODE = 'CAREMNGR';
export const ORGANIZATION_ADMIN_ROLE_CODE = 'ORGADMIN';
export const PCP_ROLE_CODE = 'PCP';
export const BENEFITS_SPECIALIST_ROLE_CODE = 'BENETSPT';
export const HEALTH_ASSISTANT_ROLE_CODE = 'HASST';
export const FRONT_OFFICE_ROLE_CODE = 'FORECEPT';

export const OCP_ADMIN_ROLE_DISPLAY = 'OCP Admin';
export const PATIENT_ROLE_DISPLAY = 'Client';
export const CARE_COORDINATOR_ROLE_DISPLAY = 'Care Coordinator';
export const CARE_MANAGER_ROLE_DISPLAY = 'Care Manager';
export const ORGANIZATION_ADMIN_ROLE_DISPLAY = 'Organization Admin';
export const PCP_ROLE_DISPLAY = 'Primary Care Provider';
export const BENEFITS_SPECIALIST_ROLE_DISPLAY = 'Benefits Specialist';
export const HEALTH_ASSISTANT_ROLE_DISPLAY = 'Health Assistant';
export const FRONT_OFFICE_ROLE_DISPLAY = 'Front Office Receptionist';

/**
 *  Constants to hold the default pagination page size and start page number
 * @type {number}
 */
export const DEFAULT_START_PAGE_NUMBER = 1;
export const DEFAULT_PAGE_SIZE = 10;

/**
 *  Constants to hold the form validation
 */
export const TEXT_MIN_LENGTH = 3;
export const POSTAL_CODE_PATTERN = '^\\d{5}(?:[-\\s]\\d{4})?$';
export const PHONE_PATTERN =
  '^[(]{0,1}[0-9]{3}[)]{0,1}[-s.]{0,1}[0-9]{3}[-s.]{0,1}[0-9]{4}$';

/**
 *  Constants to hold the configuration for date picker
 * @type {object}
 */
export const DATE_PICKER_MODE = {
  PORTRAIT: 'portrait',
  LANDSCAPE: 'landscape',
};

/**
 *  Other constants
 */
export const EMPTY_STRING = '';
export const WHITE_SPACE = ' ';
export const NEW_LINE_CHARACTER = '\n';

/**
 *  To Do definition
 * @type {string}
 */
export const TO_DO_DEFINITION = 'To-Do';

export const CARE_MANAGER_ROLE = 'CAREMNGR';
