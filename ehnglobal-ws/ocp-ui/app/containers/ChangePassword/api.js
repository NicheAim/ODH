import request from 'utils/request';
import { CHANGE_PASSWORD_API_URL, getEndpoint } from 'utils/endpointService';


export function changePassword(oldPassword, password) {
  const requestUrl = getEndpoint(CHANGE_PASSWORD_API_URL);
  return request(requestUrl, {
    method: 'PUT',
    body: JSON.stringify({ oldPassword, password }),
    headers: {
      'Content-Type': 'application/json',
    },
  });
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
