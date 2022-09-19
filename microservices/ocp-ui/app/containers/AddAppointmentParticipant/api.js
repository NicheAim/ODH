import queryString from 'utils/queryString';
import request from 'utils/request';
import { BASE_APPOINTMENTS_API_URL, getEndpoint } from 'utils/endpointService';

export function getHealthcareServiceReferences(resourceType, resourceValue) {
  const queryParams = queryString({ resourceType, resourceValue });
  const appointmentBaseEndpoint = getEndpoint(BASE_APPOINTMENTS_API_URL);
  const requestURL = `${appointmentBaseEndpoint}/healthcare-service-references${queryParams}`;
  return request(requestURL);
}

export function getLocationReferences(resourceType, resourceValue) {
  const queryParams = queryString({ resourceType, resourceValue });
  const appointmentBaseEndpoint = getEndpoint(BASE_APPOINTMENTS_API_URL);
  const requestURL = `${appointmentBaseEndpoint}/location-references${queryParams}`;
  return request(requestURL);
}

export function getPractitionerReferences(resourceType, resourceValue) {
  const queryParams = queryString({ resourceType, resourceValue });
  const appointmentBaseEndpoint = getEndpoint(BASE_APPOINTMENTS_API_URL);
  const requestURL = `${appointmentBaseEndpoint}/practitioner-references${queryParams}`;
  return request(requestURL);
}

export function searchParticipantReferences(searchType, searchValue, patient, organization, page) {
  const baseEndpoint = getEndpoint(BASE_APPOINTMENTS_API_URL);
  const name = searchValue || '';
  const params = queryString({
    participantType: searchType,
    name,
    patient,
    organization,
    page,
  });
  const requestURL = `${baseEndpoint}/outside-organization-participants/search${params}`;
  return request(requestURL);
}
