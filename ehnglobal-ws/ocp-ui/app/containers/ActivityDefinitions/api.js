import request from 'utils/request';
import queryString from 'utils/queryString';
import { BASE_ORGANIZATIONS_API_URL, getEndpoint } from 'utils/endpointService';
import { DEFAULT_PAGE_SIZE } from 'containers/App/constants';

export function getActivityDefinitionsInOrganization(organizationId, pageNumber) {
  const baseEndpoint = getEndpoint(BASE_ORGANIZATIONS_API_URL);
  const params = queryString({ pageNumber, pageSize: DEFAULT_PAGE_SIZE });
  const requestURL = `${baseEndpoint}/${organizationId}/activity-definitions${params}`;
  return request(requestURL);
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
