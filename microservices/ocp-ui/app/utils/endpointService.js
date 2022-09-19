import includes from 'lodash/includes';
import isUndefined from 'lodash/isUndefined';
import some from 'lodash/some';
import { env_vars } from '../../env';

// Todo: Make server side configurable
const BASE_API_URL = '/ocp-ui-api';
const BASE_SMART_GATEWAY_URL = '/smart';
const BASE_FHIR_URL = env_vars.REACT_APP_BASE_FHIR_URL;

/**
 *  Constants to hold the external UI Api endpoint Keys
 * @type {string}
 */
const prefixUtils = 'ocpui/utils/';
export const CONFIG_API_URL = prefixUtils + 'CONFIG_API_URL';
export const LOGIN_API_URL = prefixUtils + 'LOGIN_API_URL';
export const REFRESH_TOKEN_URL = prefixUtils + 'REFRESH_TOKEN_URL';
export const CHANGE_PASSWORD_API_URL = prefixUtils + 'CHANGE_PASSWORD_API_URL';
export const LOOKUPS_API_URL = prefixUtils + 'LOOKUPS_API_URL';
export const BASE_CARE_TEAMS_API_URL = prefixUtils + 'BASE_CARE_TEAMS_API_URL';
export const BASE_ORGANIZATION_API_URL =
  prefixUtils + 'BASE_ORGANIZATION_API_URL';
export const BASE_ORGANIZATIONS_API_URL =
  prefixUtils + 'BASE_ORGANIZATIONS_API_URL';
export const BASE_HEALTHCARE_SERVICES_API_URL =
  prefixUtils + 'BASE_HEALTHCARE_SERVICES_API_URL';
export const BASE_LOCATIONS_API_URL = prefixUtils + 'BASE_LOCATIONS_API_URL';
export const BASE_PARTICIPANTS_API_URL =
  prefixUtils + 'BASE_PARTICIPANTS_API_URL';
export const BASE_PATIENTS_API_URL = prefixUtils + 'BASE_PATIENTS_API_URL';
export const BASE_PATIENT_OBSERVATION_API_URL =
  prefixUtils + 'BASE_PATIENT_OBSERVATION_API_URL';
export const BASE_OBSERVATION_PATIENT_REFERENCE =
  prefixUtils + 'BASE_OBSERVATION_PATIENT_REFERENCE';
export const BASE_CONDITIONS_API_URL = prefixUtils + 'BASE_CONDITIONS_API_URL';
export const BASE_PRACTITIONERS_API_URL =
  prefixUtils + 'BASE_PRACTITIONERS_API_URL';
export const BASE_RELATED_PERSONS_API_URL =
  prefixUtils + 'BASE_RELATED_PERSONS_API_URL';
export const BASE_TASKS_API_URL = prefixUtils + 'BASE_TASKS_API_URL';
export const BASE_ATTACHMENTS_API_URL =
  prefixUtils + 'BASE_ATTACHMENTS_API_URL';
export const BASE_GOALS_API_URL = prefixUtils + 'BASE_GOALS_API_URL';
export const BASE_CARE_PLANS_API_URL = prefixUtils + 'BASE_CARE_PLANS_API_URL';
export const BASE_EPISODE_OF_CARES_API_URL =
  prefixUtils + 'BASE_EPISODE_OF_CARES_API_URL';
export const BASE_ACTIVITY_DEFINITIONS_API_URL =
  prefixUtils + 'BASE_ACTIVITY_DEFINITIONS_API_URL';
export const BASE_APPOINTMENTS_API_URL =
  prefixUtils + 'BASE_APPOINTMENTS_API_URL';
export const BASE_OUTLOOK_API_URL = prefixUtils + 'BASE_OUTLOOK_API_URL';
export const BASE_USER_CONTEXT_API_URL =
  prefixUtils + 'BASE_USER_CONTEXT_API_URL';
export const BASE_SMART_URL = prefixUtils + 'BASE_SMART_URL';
export const SMART_AUTHORIZE_URL = prefixUtils + 'SMART_AUTHORIZE_URL';
export const SMART_CLIENTS_URL = prefixUtils + 'SMART_CLIENTS_URL';
export const SMART_APP_SHORTCUTS_URL = prefixUtils + 'SMART_APP_SHORTCUTS_URL';
export const SMART_CLIENTS_META_URL = prefixUtils + 'SMART_CLIENTS_META_URL';
export const SMART_LAUNCHER_URL = prefixUtils + 'SMART_LAUNCHER_URL';
export const BASE_COVERAGE_URL = prefixUtils + 'BASE_COVERAGE_URL';
export const BASE_GROUPS_API_URL = prefixUtils + 'BASE_GROUPS_API_URL';
export const BASE_SCOPES_API_URL = prefixUtils + 'BASE_SCOPES_API_URL';
export const BASE_USERS_API_URL = prefixUtils + 'BASE_USERS_API_URL';
export const BASE_USER_LOGIN_DETAILS_API_URL =
  prefixUtils + 'BASE_USER_LOGIN_DETAILS_API_URL';
export const BASE_HEALTHCARE_SERVICES_REFERENCES_API_URL =
  prefixUtils + 'BASE_HEALTHCARE_SERVICES_REFERENCES_API_URL';
export const BASE_LOCATION_REFERENCES_API_URL =
  prefixUtils + 'BASE_LOCATION_REFERENCES_API_URL';

export const BASE_COMMUNICATIONS_API_URL =
  prefixUtils + 'BASE_COMMUNICATIONS_API_URL';

export const BASE_PLAN_DEFINITIONS_API_URL =
  prefixUtils + 'BASE_PLAN_DEFINITIONS_URL';

export const BASE_TICKET_DASHBOARD = `${prefixUtils}BASE_TICKET_DASHBOARD`;
/**
 * Configure all secured and unsecured endpoints
 * isSecured property is used to specify secured or unsecured endpoint. By default isSecured property will set true if it is missing to set
 * @type {*[]}
 */
const apiEndpoints = [
  { key: CONFIG_API_URL, url: `${BASE_API_URL}/config`, isSecured: false },
  { key: LOGIN_API_URL, url: `${BASE_API_URL}/login`, isSecured: false },
  {
    key: REFRESH_TOKEN_URL,
    url: `${BASE_API_URL}/refreshlogin`,
    isSecured: false,
  },
  {
    key: LOOKUPS_API_URL,
    url: `${BASE_API_URL}/ocp-fis/lookups`,
    isSecured: false,
  },
  {
    key: BASE_USER_LOGIN_DETAILS_API_URL,
    url: `${BASE_API_URL}/sample-user-login-details`,
    isSecured: false,
  },

  { key: CHANGE_PASSWORD_API_URL, url: `${BASE_API_URL}/change-password` },
  { key: BASE_CARE_TEAMS_API_URL, url: `${BASE_API_URL}/ocp-fis/care-teams` },
  {
    key: BASE_ORGANIZATION_API_URL,
    url: `${BASE_API_URL}/ocp-fis/organization`,
  },
  {
    key: BASE_ORGANIZATIONS_API_URL,
    url: `${BASE_API_URL}/ocp-fis/organizations`,
  },
  {
    key: BASE_HEALTHCARE_SERVICES_API_URL,
    url: `${BASE_API_URL}/ocp-fis/healthcare-services`,
  },
  {
    key: BASE_HEALTHCARE_SERVICES_REFERENCES_API_URL,
    url: `${BASE_API_URL}/ocp-fis/healthcare-service-references`,
  },
  {
    key: BASE_LOCATION_REFERENCES_API_URL,
    url: `${BASE_API_URL}/ocp-fis/location-references`,
  },
  { key: BASE_LOCATIONS_API_URL, url: `${BASE_API_URL}/ocp-fis/locations` },
  {
    key: BASE_PARTICIPANTS_API_URL,
    url: `${BASE_API_URL}/ocp-fis/participants`,
  },
  { key: BASE_PATIENTS_API_URL, url: `${BASE_API_URL}/ocp-fis/patients` },
  {
    key: BASE_PATIENT_OBSERVATION_API_URL,
    url: `${BASE_API_URL}/ocp-fis/observations`,
  },
  {
    key: BASE_OBSERVATION_PATIENT_REFERENCE,
    url: `${BASE_API_URL}/ocp-fis/observationpatient`,
  },
  {
    key: BASE_CONDITIONS_API_URL,
    url: `${BASE_API_URL}/ocp-fis/conditions`,
  },
  {
    key: BASE_PRACTITIONERS_API_URL,
    url: `${BASE_API_URL}/ocp-fis/practitioners`,
  },
  {
    key: BASE_RELATED_PERSONS_API_URL,
    url: `${BASE_API_URL}/ocp-fis/relatedpersons`,
  },
  { key: BASE_TASKS_API_URL, url: `${BASE_API_URL}/ocp-fis/tasks` },
  { key: BASE_ATTACHMENTS_API_URL, url: `${BASE_API_URL}/ocp-fis/attachments` },
  { key: BASE_GOALS_API_URL, url: `${BASE_API_URL}/ocp-fis/goals` },
  { key: BASE_CARE_PLANS_API_URL, url: `${BASE_API_URL}/ocp-fis/careplans` },
  {
    key: BASE_EPISODE_OF_CARES_API_URL,
    url: `${BASE_API_URL}/ocp-fis/episode-of-cares`,
  },
  {
    key: BASE_ACTIVITY_DEFINITIONS_API_URL,
    url: `${BASE_API_URL}/ocp-fis/activity-definitions`,
  },
  {
    key: BASE_APPOINTMENTS_API_URL,
    url: `${BASE_API_URL}/ocp-fis/appointments`,
  },
  { key: BASE_OUTLOOK_API_URL, url: `${BASE_API_URL}/ocp-fis/outlook` },
  {
    key: BASE_COMMUNICATIONS_API_URL,
    url: `${BASE_API_URL}/ocp-fis/communications`,
  },
  { key: BASE_USER_CONTEXT_API_URL, url: `${BASE_API_URL}/user-context` },
  { key: BASE_GROUPS_API_URL, url: `${BASE_API_URL}/groups` },
  { key: BASE_SCOPES_API_URL, url: `${BASE_API_URL}/scopes` },
  { key: BASE_USERS_API_URL, url: `${BASE_API_URL}/users` },
  // { key: BASE_USERS_API_URL, url: `${BASE_API_URL}/testlogin`, isSecured: false },
  // TODO: consider moving all SMART endpoints under smart-gateway
  { key: BASE_SMART_URL, url: `${BASE_API_URL}/smart` },
  { key: SMART_AUTHORIZE_URL, url: `${BASE_SMART_GATEWAY_URL}/authorize` },
  { key: SMART_CLIENTS_URL, url: `${BASE_SMART_GATEWAY_URL}/clients` },
  {
    key: SMART_CLIENTS_META_URL,
    url: `${BASE_SMART_GATEWAY_URL}/clients/meta`,
    isSecured: false,
  },
  {
    key: SMART_APP_SHORTCUTS_URL,
    url: `${BASE_API_URL}/smart/app-shortcuts`,
    isSecured: false,
  },
  {
    key: SMART_LAUNCHER_URL,
    url: `${BASE_SMART_GATEWAY_URL}/launcher`,
    isSecured: false,
  },
  { key: BASE_COVERAGE_URL, url: `${BASE_API_URL}/ocp-fis/coverage` },
  {
    key: BASE_PLAN_DEFINITIONS_API_URL,
    url: `${BASE_API_URL}/ocp-fis/plandefinitions`,
  },
  {
    key: BASE_TICKET_DASHBOARD,
    url: `${BASE_API_URL}/ticket`,
  },
];

const configuredEndpoints = collectEndpoints();

export function getEndpoint(key) {
  const requestEndpoint = configuredEndpoints.get(key);
  if (isUndefined(requestEndpoint)) {
    throw Error(`No ${key} endpoint configured.`);
  }
  return requestEndpoint.url;
}

/**
 *  Check the endpoint whether secured
 * @param endpoint
 * @returns {boolean}
 */
export function isSecuredEndpoint(endpoint) {
  let isEndpointSecured = true;
  const endpoints = Array.from(configuredEndpoints.values());

  // Collect all unsecured endpoints
  const unsecuredEndpoints = endpoints
    .filter((ep) => ep.isSecured === false)
    .map((ep) => ep.url);
  if (
    some(unsecuredEndpoints, (unsecuredEndpoint) =>
      includes(endpoint, unsecuredEndpoint)
    )
  ) {
    isEndpointSecured = false;
  }

  return isEndpointSecured;
}

/**
 * Collect all endpoints
 * @returns {*}
 */
export function collectEndpoints() {
  const endpoints = new Map();
  apiEndpoints.map((endpoint) => endpoints.set(endpoint.key, endpoint));
  return endpoints;
}
