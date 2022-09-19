import request from 'utils/request';
import { BASE_SMART_URL, getEndpoint, SMART_APP_SHORTCUTS_URL, SMART_CLIENTS_META_URL } from 'utils/endpointService';

export function getClients() {
  const baseEndpoint = getEndpoint(SMART_CLIENTS_META_URL);
  return request(baseEndpoint);
}

export function getAppShortcuts() {
  const baseEndpoint = getEndpoint(SMART_APP_SHORTCUTS_URL);
  return request(baseEndpoint);
}

export function createLaunch(context) {
  const headers = {
    'Content-Type': 'application/json',
  };
  const baseEndpoint = getEndpoint(BASE_SMART_URL);
  const requestUrl = `${baseEndpoint}/launch`;
  const body = JSON.stringify(context);
  return request(requestUrl, {
    method: 'POST',
    headers,
    body,
  });
}
