import request from 'utils/request';
import { BASE_PRACTITIONERS_API_URL, getEndpoint } from 'utils/endpointService';
import queryString from 'utils/queryString';

const baseEndpoint = getEndpoint(BASE_PRACTITIONERS_API_URL);

export function findPractitioner(firstName, lastName, identifierType, identifier) {
  const params = queryString({
    firstName,
    lastName,
    identifierType,
    identifier,
  });
  const requestURL = `${baseEndpoint}/find${params}`;
  return request(requestURL);
}
