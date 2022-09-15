import request from 'utils/request';
import { getEndpoint, LOGIN_API_URL, BASE_USER_CONTEXT_API_URL } from 'utils/endpointService';

export function login(loginCredentials) {
  const requestEndpoint = getEndpoint(LOGIN_API_URL);
  return request(requestEndpoint, {
    method: 'POST',
    body: JSON.stringify(mapToBffCredential(loginCredentials)),
    headers: {
      'Content-Type': 'application/json',
    },
  });
}

export function getUserContext() {
  const requestEndpoint = getEndpoint(BASE_USER_CONTEXT_API_URL);
  return request(requestEndpoint);
}

function mapToBffCredential(loginCredentials) {
  const { username, password } = loginCredentials;
  return { username, password };
}

export function getLoginErrorDetail(error) {
  let errorDetail = '';
  if (error && error.message === 'Failed to fetch') {
    errorDetail = ' Server is offline.';
  } else if (error && error.response && error.response.status === 500) {
    errorDetail = ' Unknown server error.';
  }
  return errorDetail;
}
