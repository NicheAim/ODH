import request from 'utils/request';
import { BASE_USER_LOGIN_DETAILS_API_URL, getEndpoint } from 'utils/endpointService';

export function getUserLoginDetails() {
  const requestURL = getEndpoint(BASE_USER_LOGIN_DETAILS_API_URL);
  return request(requestURL);
}

export function getErrorDetail(error) {
  let errorDetail = error.message;
  if (error && error.message === 'Failed to fetch') {
    errorDetail = ' Server is offline.';
  } else if (error && error.response && error.response.status === 500) {
    errorDetail = ' Unknown server error.';
  }
  return errorDetail;
}
