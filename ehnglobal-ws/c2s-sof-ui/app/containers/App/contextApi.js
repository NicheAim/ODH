import { BASE_ORGANIZATIONS_API_URL, BASE_PATIENTS_API_URL, BASE_PRACTITIONERS_API_URL, getEndpoint } from 'utils/endpointService';
import request from 'utils/request';
import { isPatientResourceType } from 'containers/App/helpers';
import queryString from 'utils/queryString';

export function getPatient(id) {
  const baseEndpoint = getEndpoint(BASE_PATIENTS_API_URL);
  const requestURL = `${baseEndpoint}/${id}`;
  return request(requestURL);
}

export function getOrganizationsByPractitioner(practitionerId) {
  const params = queryString({ practitionerId });
  const requestURL = `${getEndpoint(BASE_ORGANIZATIONS_API_URL)}${params}`;
  return request(requestURL);
}

export function getUserProfile(resourceType, resourceLogicalId) {
  if (isPatientResourceType(resourceType)) {
    return getPatient(resourceLogicalId);
  }
  return getPractitioner(resourceLogicalId);
}

export function getErrorDetail(error) {
  let errorDetail = error.message;
  if (error && error.message === 'Failed to fetch') {
    errorDetail = ' Server is offline.';
  }
  return errorDetail;
}

function getPractitioner(logicalId) {
  const baseEndpoint = getEndpoint(BASE_PRACTITIONERS_API_URL);
  const requestURL = `${baseEndpoint}/${logicalId}`;
  return request(requestURL);
}
