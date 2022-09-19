import request from 'utils/request';
import { BASE_SMART_URL, getEndpoint } from 'utils/endpointService';

export function postContext(launchId, context) {
  const headers = {
    'Content-Type': 'application/json',
  };
  const baseEndpoint = getEndpoint(BASE_SMART_URL);
  const requestUrl = `${baseEndpoint}/launch/${launchId}`;
  const body = JSON.stringify(context);
  return request(requestUrl, {
    method: 'POST',
    headers,
    body,
  });
}
