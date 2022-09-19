import find from 'lodash/find';
import isEmpty from 'lodash/isEmpty';
import {
  BASE_OBSERVATION_PATIENT_REFERENCE,
  BASE_PATIENTS_API_URL,
  CONFIG_API_URL,
  getEndpoint,
  LOOKUPS_API_URL,
} from 'utils/endpointService';
import request from 'utils/request';

export function getConfig() {
  const requestURL = getEndpoint(CONFIG_API_URL);
  return request(requestURL);
}

export function fetchLookups(lookupTypes) {
  const baseEndpoint = getEndpoint(LOOKUPS_API_URL);
  const lookupKeyList = lookupTypes.join();
  const requestURL = `${baseEndpoint}?lookUpTypeList=${lookupKeyList}`;
  return request(requestURL);
}

export function getPatientById(patients, patientId) {
  if (!isEmpty(patients)) {
    return find(patients, { id: patientId });
  }
  return null;
}

export function getPatient(patientId) {
  const baseEndpoint = getEndpoint(BASE_PATIENTS_API_URL);
  const requestURL = `${baseEndpoint}/${patientId}`;
  return request(requestURL);
}

export function getObservation(patientId) {
  const baseEndpoint = getEndpoint(BASE_OBSERVATION_PATIENT_REFERENCE);
  const requestURL = `${baseEndpoint}/patient-reference?patient=${patientId}`;
  return request(requestURL);
}
