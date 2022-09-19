import { BASE_GOALS_API_URL, getEndpoint } from 'utils/endpointService';
import request from 'utils/request';
import {
  BASE_CARE_PLANS_API_URL,
  BASE_TASKS_API_URL,
} from '../../utils/endpointService';

export function getGoals(patientId) {
  const searchEndpoint = `search?patientId=` + patientId;
  const baseEndpoint = getEndpoint(BASE_GOALS_API_URL);
  const requestURL = `${baseEndpoint}/${searchEndpoint}`;
  return request(requestURL);
}

export function getCarePlans(patientId) {
  const searchEndpoint = `search?patientId=` + patientId;
  const baseEndpoint = getEndpoint(BASE_CARE_PLANS_API_URL);
  const requestURL = `${baseEndpoint}/${searchEndpoint}`;
  return request(requestURL);
}

export function getTask(tasksId) {
  const baseEndpoint = getEndpoint(BASE_TASKS_API_URL);
  const requestURL = `${baseEndpoint}/${tasksId}`;
  return request(requestURL);
}

export function getTasks(tasksIds) {
  const tasksIdsStr = tasksIds.join(',');
  const baseEndpoint = getEndpoint(BASE_TASKS_API_URL);
  const requestURL = `${baseEndpoint}/multipletasks?taskIds=${tasksIdsStr}`;
  return request(requestURL);
}

export const API = {
  getGoals,
  getCarePlans,
  getTask,
  getTasks,
};
