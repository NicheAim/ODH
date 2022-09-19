import request from 'utils/request';
import { getEndpoint, SMART_CLIENTS_URL } from 'utils/endpointService';

const baseEndpoint = getEndpoint(SMART_CLIENTS_URL);

export function getClients() {
  return request(baseEndpoint);
}

export function createClient(clientFormData) {
  const requestURL = `${baseEndpoint}`;
  return request(requestURL, {
    method: 'POST',
    body: JSON.stringify(mapToBackendDto(clientFormData)),
    headers: {
      'Content-Type': 'application/json',
    },
  });
}

export function updateClient(clientFormData) {
  const requestURL = `${baseEndpoint}/${clientFormData.clientId}`;
  return request(requestURL, {
    method: 'PUT',
    body: JSON.stringify(mapToBackendDto(clientFormData)),
    headers: {
      'Content-Type': 'application/json',
    },
  });
}

export function deleteClient(clientId) {
  const requestURL = `${baseEndpoint}/${clientId}`;
  return request(requestURL, {
    method: 'DELETE',
  });
}

export function mapToBackendDto(clientFormData) {
  const { appIcon, appLaunchUrl, clientId, clientType, name, redirectUris, defaultClientScopes, clientSecret } = clientFormData;
  const appIconByte = appIcon && appIcon[0] && appIcon[0].base64;
  return {
    appIcon: appIconByte && appIconByte.substring(appIconByte.indexOf(',') + 1),
    appLaunchUrl,
    clientId,
    clientType,
    clientSecret,
    name,
    redirectUris: redirectUris.replace(/\s+/g, '').split(','),
    defaultClientScopes: defaultClientScopes.replace(/\s+/g, '').split(','),
  };
}
