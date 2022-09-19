import queryString from 'query-string';
import request from 'utils/request';
import { BASE_TASKS_API_URL, getEndpoint } from 'utils/endpointService';

const baseEndpoint = getEndpoint(BASE_TASKS_API_URL);

export function getPatientToDos(patientId, practitionerId, definition) {
  let queryParams = '';
  if (patientId && !practitionerId) {
    queryParams = { patient: patientId, definition, isTodoList: true };
  } else if (patientId && practitionerId) {
    queryParams = { patient: patientId, practitioner: practitionerId, definition, isTodoList: true };
  }
  const stringifiedParams = queryString.stringify(queryParams);
  const url = `${baseEndpoint}?${stringifiedParams}`;
  return request(url);
}

export function getToDoMainTask(patientId, organizationId, definition, practitionerId) {
  const queryParams = { patient: patientId, organization: organizationId, practitioner: practitionerId, definition };
  const stringifiedParams = queryString.stringify(queryParams);
  const url = `${baseEndpoint}/task-references?${stringifiedParams}`;
  return request(url);
}

export function getFilterToDos(patientId, practitionerId, definition, filterDate) {
  let queryParams = '';
  if (patientId && !practitionerId) {
    queryParams = { patient: patientId, definition, filterDate };
  } else if (patientId && practitionerId) {
    queryParams = { patient: patientId, practitioner: practitionerId, definition, filterDate };
  }
  const stringifiedParams = queryString.stringify(queryParams);
  const url = `${baseEndpoint}?${stringifiedParams}`;
  return request(url);
}

export function cancelToDo(toDoLogicalId) {
  const url = `${baseEndpoint}/${toDoLogicalId}/deactivate`;
  return request(url,
    {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
    });
}
