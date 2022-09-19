import { BASE_GROUPS_API_URL, BASE_SCOPES_API_URL, getEndpoint } from 'utils/endpointService';
import request from 'utils/request';
import camelCase from 'lodash/camelCase';

const baseGroupsEndpoint = getEndpoint(BASE_GROUPS_API_URL);
const baseScopesEndpoint = getEndpoint(BASE_SCOPES_API_URL);

export function getGroups() {
  return request(baseGroupsEndpoint);
}

export function getScopes() {
  return request(baseScopesEndpoint);
}

export function createGroup(group) {
  return request(baseGroupsEndpoint, {
    method: 'POST',
    body: JSON.stringify(addRolePrefix(group)),
    headers: {
      'Content-Type': 'application/json',
    },
  });
}

export function updateGroup(group) {
  return request(`${baseGroupsEndpoint}/${group.id}`, {
    method: 'PUT',
    body: JSON.stringify(addRolePrefix(group)),
    headers: {
      'Content-Type': 'application/json',
    },
  });
}

function addRolePrefix(group) {
  const { id, displayName, description, scopes } = group;
  return { id, displayName: 'ocp.role.'.concat(camelCase(displayName)), description, scopes };
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
