import request from 'utils/request';
import { BASE_CONDITIONS_API_URL, getEndpoint } from 'utils/endpointService';

const baseEndpoint = getEndpoint(BASE_CONDITIONS_API_URL);

export function createCondition(condition) {
  const requestURL = `${baseEndpoint}`;
  return request(requestURL, {
    method: 'POST',
    body: JSON.stringify(condition),
    headers: {
      'Content-Type': 'application/json',
    },
  });
}

export function updateCondition(condition) {
  const conditionId = condition.conditionId;
  const requestURL = `${baseEndpoint}/${conditionId}`;
  return request(requestURL, {
    method: 'PUT',
    body: JSON.stringify(condition),
    headers: {
      'Content-Type': 'application/json',
    },
  });
}

export function getCondition(conditionId) {
  const requestURL = `${baseEndpoint}/${conditionId}`;
  return request(requestURL);
}
