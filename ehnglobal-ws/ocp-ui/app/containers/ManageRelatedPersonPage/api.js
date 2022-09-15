import request from 'utils/request';
import { BASE_RELATED_PERSONS_API_URL, getEndpoint } from 'utils/endpointService';

const baseEndpoint = getEndpoint(BASE_RELATED_PERSONS_API_URL);

export function createRelatedPerson(relatedPerson) {
  const requestURL = `${baseEndpoint}`;
  return request(requestURL, {
    method: 'POST',
    body: JSON.stringify(relatedPerson),
    headers: {
      'Content-Type': 'application/json',
    },
  });
}

export function updateRelatedPerson(relatedPerson) {
  const relatedPersonId = relatedPerson.relatedPersonId;
  const requestURL = `${baseEndpoint}/${relatedPersonId}`;
  return request(requestURL, {
    method: 'PUT',
    body: JSON.stringify(relatedPerson),
    headers: {
      'Content-Type': 'application/json',
    },
  });
}

export function getRelatedPerson(relatedPersonId) {
  const requestURL = `${baseEndpoint}/${relatedPersonId}`;
  return request(requestURL);
}
