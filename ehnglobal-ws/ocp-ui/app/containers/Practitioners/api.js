import request from 'utils/request';
import queryString from 'utils/queryString';
import { BASE_PRACTITIONERS_API_URL, getEndpoint } from 'utils/endpointService';
import { DEFAULT_PAGE_SIZE } from 'containers/App/constants';

export function getPractitionersInOrganization(organizationId, page, pageSize) {
  const size = pageSize || DEFAULT_PAGE_SIZE;
  const baseEndpoint = getEndpoint(BASE_PRACTITIONERS_API_URL);
  const params = queryString({ page, size, organization: organizationId });
  const requestURL = `${baseEndpoint}${params}`;
  return request(requestURL);
}

export function searchPractitioners(searchType, searchValue, showInactive, organization, page) {
  const baseEndpoint = getEndpoint(BASE_PRACTITIONERS_API_URL);
  const params = queryString({
    searchType,
    searchValue,
    showInactive,
    size: DEFAULT_PAGE_SIZE,
    organization,
    page,
    showAll: true,
  });
  const requestURL = `${baseEndpoint}/search${params}`;
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
