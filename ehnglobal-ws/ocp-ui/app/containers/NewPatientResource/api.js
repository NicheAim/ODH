import request from 'utils/request';
import { BASE_PATIENTS_API_URL, getEndpoint } from 'utils/endpointService';
import Util from 'utils/Util';
import queryString from 'utils/queryString';

const baseEndpoint = getEndpoint(BASE_PATIENTS_API_URL);

export function findPatient(firstName, lastName, birthDate) {
  const params = queryString({
    firstName,
    lastName,
    birthDate: Util.formatDate(birthDate),
  });
  const requestURL = `${baseEndpoint}/find${params}`;
  return request(requestURL);
}
