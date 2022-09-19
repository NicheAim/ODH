import { BASE_APPOINTMENTS_API_URL, BASE_OUTLOOK_API_URL, getEndpoint } from 'utils/endpointService';
import queryString from 'utils/queryString';
import request from 'utils/request';

export default function getAppointmentsApi(query) {
  const params = queryString(query);
  const baseEndpoint = getEndpoint(BASE_APPOINTMENTS_API_URL);
  const requestURL = `${baseEndpoint}/not-declined-and-not-paginated${params}`;
  return request(requestURL);
}

export function getOutlookAppointmentsApi(username, password) {
  const baseEndpoint = getEndpoint(BASE_OUTLOOK_API_URL);
  const query = { emailAddress: username, password };
  const params = queryString(query);
  const requestURL = `${baseEndpoint}/calendar${params}`;
  return request(requestURL);
}

export function loginToOWA(loginCredentials) {
  const baseEndpoint = getEndpoint(BASE_OUTLOOK_API_URL);
  const requestURL = `${baseEndpoint}/login`;
  return request(requestURL, {
    method: 'POST',
    body: JSON.stringify(mapToBffCredential(loginCredentials)),
    headers: {
      'Content-Type': 'application/json',
    },
  });
}

function mapToBffCredential(loginCredentials) {
  const { username, password } = loginCredentials;
  return { username, password };
}
