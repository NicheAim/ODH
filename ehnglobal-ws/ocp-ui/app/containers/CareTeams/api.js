import queryString from 'utils/queryString';
import request from 'utils/request';
import { DEFAULT_PAGE_SIZE, DEFAULT_START_PAGE_NUMBER } from 'containers/App/constants';
import { BASE_CARE_TEAMS_API_URL, getEndpoint } from 'utils/endpointService';

export function getCareTeams(organizationId, patientId, pageNumber = DEFAULT_START_PAGE_NUMBER, pageSize = DEFAULT_PAGE_SIZE) {
  const baseEndpoint = getEndpoint(BASE_CARE_TEAMS_API_URL);
  const params = queryString({
    organization: organizationId,
    patient: patientId,
    pageNumber,
    pageSize,
  });
  const requestURL = `${baseEndpoint}${params}`;
  return request(requestURL);
}
