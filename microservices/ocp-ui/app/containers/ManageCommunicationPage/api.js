import {
  BASE_EPISODE_OF_CARES_API_URL,
  BASE_COMMUNICATIONS_API_URL,
  getEndpoint, BASE_PRACTITIONERS_API_URL,
} from 'utils/endpointService';
import * as queryString from 'query-string';
import request from '../../utils/request';

const baseEndpoint = getEndpoint(BASE_COMMUNICATIONS_API_URL);

export function createCommunication(communication) {
  const requestURL = `${baseEndpoint}`;
  return request(requestURL, {
    method: 'POST',
    body: JSON.stringify(communication),
    headers: {
      'Content-Type': 'application/json',
    },
  });
}

export function updateCommunication(communication) {
  const communicationId = communication.logicalId;
  const requestURL = `${baseEndpoint}/${communicationId}`;
  return request(requestURL, {
    method: 'PUT',
    body: JSON.stringify(communication),
    headers: {
      'Content-Type': 'application/json',
    },
  });
}

export function getEpisodeOfCares(patientId, organizationId) {
  const baseEndpointEpisodeOfCare = getEndpoint(BASE_EPISODE_OF_CARES_API_URL);
  const queryParams = { patient: patientId, organization: organizationId };
  const stringifiedParams = queryString.stringify(queryParams);
  const requestURL = `${baseEndpointEpisodeOfCare}?${stringifiedParams}`;
  return request(requestURL);
}

// TODO Refactor when Practitioner profile is establish.
export function getRequester(practitionerId) {
  const practitionerBaseEndpoint = getEndpoint(BASE_PRACTITIONERS_API_URL);
  const requestURL = `${practitionerBaseEndpoint}/${practitionerId}`;
  return request(requestURL);
}
