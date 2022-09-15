import { BASE_TASKS_API_URL, getEndpoint } from 'utils/endpointService';
import request from 'utils/request';
import queryString from 'utils/queryString';

export function getUpcomingTasks(practitioner) {
  const baseEndpoint = getEndpoint(BASE_TASKS_API_URL);
  const isUpcomingTasks = true;
  const params = queryString({ isUpcomingTasks, practitioner });
  const requestURL = `${baseEndpoint}${params}`;
  return request(requestURL);
}
