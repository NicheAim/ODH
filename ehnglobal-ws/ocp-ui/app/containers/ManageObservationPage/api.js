import {
  getCodeSystem,
  MEDICAL_COMPLEXITY_CODE_SYSTEM,
  SOCIAL_COMPLEXITY_CODE_SYSTEM,
  SERVICE_INTEGRATION_LEVEL_CODE_SYSTEM,
} from './constants';
import request from 'utils/request';
import {
  BASE_PATIENT_OBSERVATION_API_URL,
  getEndpoint,
} from 'utils/endpointService';

export function getMedicalComplexities() {
  return getCodeSystem(MEDICAL_COMPLEXITY_CODE_SYSTEM);
}

export function getSocialComplexities() {
  return getCodeSystem(SOCIAL_COMPLEXITY_CODE_SYSTEM);
}

export function getServiceIntegrationLevels() {
  return getCodeSystem(SERVICE_INTEGRATION_LEVEL_CODE_SYSTEM);
}

export function createObservation (observation) {
  return request(getEndpoint(BASE_PATIENT_OBSERVATION_API_URL), {
    method: 'POST',
    body: JSON.stringify(observation),
    headers: {
      'Content-Type': 'application/json',
    }
  })
}

export function updateObservation (observation) {
  const baseEndpoint = getEndpoint(BASE_PATIENT_OBSERVATION_API_URL);
  const requestURL = `${baseEndpoint}/${observation.id}`
  return request(requestURL, {
    method: 'PUT',
    body: JSON.stringify(observation),
    headers: {
      'Content-Type': 'application/json',
    }
  })
}

export function getObservation(id) {
  const baseEndpoint = getEndpoint(BASE_PATIENT_OBSERVATION_API_URL);
  const requestURL = `${baseEndpoint}/${id}`;
  return request(requestURL);
}
