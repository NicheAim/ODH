import isUndefined from 'lodash/isUndefined';
import some from 'lodash/some';
import includes from 'lodash/includes';


const BASE_API_URL = '/c2s-sof-api';

/**
 *  Constants to hold the external UI Api endpoint Keys
 * @type {string}
 */
export const CONFIG_API_URL = 'c2s/utils/CONFIG_API_URL';
export const LOOKUPS_API_URL = 'c2s/utils/LOOKUPS_API_URL';
export const BASE_CONSENTS_API_URL = 'c2s/utils/BASE_CONSENTS_API_URL';
export const BASE_PATIENTS_API_URL = 'c2s/utils/BASE_PATIENTS_API_URL';
export const BASE_ORGANIZATIONS_API_URL = 'c2s/utils/BASE_ORGANIZATIONS_API_URL';
export const BASE_PRACTITIONERS_API_URL = 'c2s/utils/BASE_PRACTITIONERS_API_URL';
export const BASE_USER_CONTEXT_API_URL = 'c2s/utils/BASE_USER_CONTEXT_API_URL';

/**
 * Configure all secured and unsecured endpoints
 * isSecured property is used to specify secured or unsecured endpoint. By default isSecured property will set true if it is missing to set
 * @type {*[]}
 */
const apiEndpoints = [
  { key: CONFIG_API_URL, url: `${BASE_API_URL}/config`, isSecured: false },
  { key: LOOKUPS_API_URL, url: `${BASE_API_URL}/lookups` },

  { key: BASE_USER_CONTEXT_API_URL, url: `${BASE_API_URL}/user-context` },
  { key: BASE_CONSENTS_API_URL, url: `${BASE_API_URL}/consents` },
  { key: BASE_PATIENTS_API_URL, url: `${BASE_API_URL}/patients` },
  { key: BASE_ORGANIZATIONS_API_URL, url: `${BASE_API_URL}/organizations` },
  { key: BASE_PRACTITIONERS_API_URL, url: `${BASE_API_URL}/practitioners` },
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
  if (some(unsecuredEndpoints, (unsecuredEndpoint) => includes(endpoint, unsecuredEndpoint))) {
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
  apiEndpoints
    .map((endpoint) => endpoints.set(endpoint.key, endpoint));
  return endpoints;
}
