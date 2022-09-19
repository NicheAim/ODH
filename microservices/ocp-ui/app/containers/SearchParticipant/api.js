import queryString from 'utils/queryString';
import request from 'utils/request';
import { BASE_PARTICIPANTS_API_URL, getEndpoint } from '../../utils/endpointService';

export function searchParticipant(value, member, patientId, organizationId) {
  const baseEndpoint = getEndpoint(BASE_PARTICIPANTS_API_URL);
  let queryParams = queryString({ value, member, patientId, showAll: true, participantForCareTeam: true });
  if (organizationId) {
    queryParams = queryString({ value, member, patientId, showAll: true, participantForCareTeam: true });
  }
  const url = `${baseEndpoint}/search${queryParams}`;
  return request(url);
}
