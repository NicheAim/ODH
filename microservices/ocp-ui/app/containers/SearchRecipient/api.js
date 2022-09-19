import * as queryString from 'query-string';
import request from 'utils/request';
import { BASE_PARTICIPANTS_API_URL, getEndpoint } from 'utils/endpointService';

export function getRecipients(patientId, member, name, communicationId) {
  const baseEndpoint = getEndpoint(BASE_PARTICIPANTS_API_URL);
  const queryParams = {};
  if (patientId) {
    queryParams.patient = patientId;
  }
  if (communicationId) {
    queryParams.communication = communicationId;
  }
  if (member) {
    queryParams.roles = [member];
  }
  if (name) {
    queryParams.value = name;
  }

  const stringifiedParams = queryString.stringify(queryParams);
  const url = `${baseEndpoint}?${stringifiedParams}`;
  return request(url);
}
