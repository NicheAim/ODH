import request from 'utils/request';
import { BASE_USERS_API_URL, getEndpoint } from 'utils/endpointService';


export function resetPassword(userId, password) {
  const baseEndpoint = getEndpoint(BASE_USERS_API_URL);
  const requestUrl = `${baseEndpoint}/${userId}/reset-password`;
  return request(requestUrl, {
    method: 'PUT',
    body: JSON.stringify({ password }),
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
