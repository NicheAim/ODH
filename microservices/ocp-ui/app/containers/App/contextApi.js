import {
  BASE_LOCATIONS_API_URL,
  BASE_ORGANIZATIONS_API_URL,
  BASE_PATIENTS_API_URL,
  BASE_PATIENT_OBSERVATION_API_URL,
  getEndpoint,
} from 'utils/endpointService';
import request from 'utils/request';
import { REFRESH_TOKEN_URL } from '../../utils/endpointService';

export function getPatient(id) {
  const baseEndpoint = getEndpoint(BASE_PATIENTS_API_URL);
  const requestURL = `${baseEndpoint}/${id}`;
  return request(requestURL);
}

export function getOrganization(id) {
  const baseEndpoint = getEndpoint(BASE_ORGANIZATIONS_API_URL);
  const requestURL = `${baseEndpoint}/${id}`;
  return request(requestURL);
}

export function getLocation(id) {
  const baseEndpoint = getEndpoint(BASE_LOCATIONS_API_URL);
  const requestURL = `${baseEndpoint}/${id}`;
  return request(requestURL);
}

export function getSubscriberOptions(patientId) {
  const patientBaseEndpoint = getEndpoint(BASE_PATIENTS_API_URL);
  const requestURL = `${patientBaseEndpoint}/${patientId}/subscriber-options`;
  return request(requestURL);
}

export function getObservation(id) {
  const baseEndpoint = getEndpoint(BASE_PATIENT_OBSERVATION_API_URL);
  const requestURL = `${baseEndpoint}?id=${id}`;
  return request(requestURL);
}

function refreshToken(refreshData) {
  console.log('api refreshToken(refreshData) {', refreshData);
  const baseEndpoint = getEndpoint(REFRESH_TOKEN_URL);
  const requestURL = `${baseEndpoint}`;

  const refreshTokenData = {
    refresh_token: refreshData,
    access_token: '',
    expires_in: '',
    refresh_expires_in: '',
    token_type: '',
    id_token: '',
    session_state: '',
    scope: '',
  };

  return request(requestURL, {
    method: 'POST',
    body: JSON.stringify(refreshTokenData),
    headers: {
      'Content-Type': 'application/json',
    },
  });
}

export const contextAPI = {
  refreshToken,
};
