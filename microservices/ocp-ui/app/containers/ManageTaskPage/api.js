import isEmpty from 'lodash/isEmpty';
import find from 'lodash/find';
import {
  BASE_PRACTITIONERS_API_URL,
  BASE_TASKS_API_URL,
  BASE_EPISODE_OF_CARES_API_URL,
  BASE_ACTIVITY_DEFINITIONS_API_URL,
  getEndpoint,
} from 'utils/endpointService';
import request from 'utils/request';

export function getRequester({ practitionerId }) {
  const baseEndpoint = getEndpoint(BASE_PRACTITIONERS_API_URL);
  const requestURL = `${baseEndpoint}/${practitionerId}`;
  return request(requestURL);
}

export function getActivityDefinitions({ practitionerId }) {
  const baseEndpoint = getEndpoint(BASE_ACTIVITY_DEFINITIONS_API_URL);
  const requestURL = `${baseEndpoint}?practitioner=${practitionerId}`;
  return request(requestURL);
}

export function getEventTypes({ patientId }) {
  const baseEndpoint = getEndpoint(BASE_EPISODE_OF_CARES_API_URL);
  const requestURL = `${baseEndpoint}?patient=${patientId}&status=active`;
  return request(requestURL);
}

export function getTasksByPatient({ patientId }) {
  const baseEndpoint = getEndpoint(BASE_TASKS_API_URL);
  const requestURL = `${baseEndpoint}/task-references/?patient=${patientId}`;
  return request(requestURL);
}


export function getPractitioners({ organizationId }) {
  const baseEndpoint = getEndpoint(BASE_PRACTITIONERS_API_URL);
  const requestURL = `${baseEndpoint}/practitioner-references?organization=${organizationId}`;
  return request(requestURL);
}

export function createTask(taskFormData) {
  const baseEndpoint = getEndpoint(BASE_TASKS_API_URL);
  const requestURL = `${baseEndpoint}`;
  return request(requestURL, {
    method: 'POST',
    body: JSON.stringify(taskFormData),
    headers: {
      'Content-Type': 'application/json',
    },
  });
}

export function updateTask(taskFormData) {
  const taskId = taskFormData.logicalId;
  const baseEndpoint = getEndpoint(BASE_TASKS_API_URL);
  const requestURL = `${baseEndpoint}/${taskId}`;
  return request(requestURL, {
    method: 'PUT',
    body: JSON.stringify(taskFormData),
    headers: {
      'Content-Type': 'application/json',
    },
  });
}

export function getTaskByIdFromStore(tasks, logicalId) {
  if (!isEmpty(tasks)) {
    return find(tasks, { logicalId });
  }
  return null;
}

export function getTaskById(logicalId) {
  const baseEndpoint = getEndpoint(BASE_TASKS_API_URL);
  const requestURL = `${baseEndpoint}/${logicalId}`;
  return request(requestURL);
}

export function getSubTasksByParentId(logicalId) {
  const baseEndpoint = getEndpoint(BASE_TASKS_API_URL);
  const requestURL = `${baseEndpoint}?partOf=${logicalId}`;
  return request(requestURL);
}
