import queryString from 'query-string';
import request from 'utils/request';
import { BASE_TASKS_API_URL, getEndpoint } from 'utils/endpointService';

const baseEndpoint = getEndpoint(BASE_TASKS_API_URL);

export function getPractitionerTasks(practitionerId, definition) {
  // const queryParams = { practitioner: practitionerId, definition, isTodoList: true };
  const queryParams = { practitioner: practitionerId};
  const stringifiedParams = queryString.stringify(queryParams);
  const url = `${baseEndpoint}?${stringifiedParams}`;
  return request(url);
}

export function getFilterTasks(practitionerId, definition, filterDate) {
  const queryParams = { practitioner: practitionerId, filterDate };
  // const queryParams = { practitioner: practitionerId, definition, isTodoList: true, filterDate };
  const stringifiedParams = queryString.stringify(queryParams);
  const url = `${baseEndpoint}?${stringifiedParams}`;
  return request(url);
}
