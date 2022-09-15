/*
 *
 * Locations Service
 *
 */

import { DEFAULT_PAGE_SIZE } from 'containers/App/constants';
import request from 'utils/request';
import queryString from 'utils/queryString';
import { BASE_ORGANIZATIONS_API_URL, getEndpoint } from 'utils/endpointService';

const baseEndpoint = getEndpoint(BASE_ORGANIZATIONS_API_URL);

export function searchLocationsByIdAndStatus(organizationId, status, currentPage) {
  const url = createUrl(organizationId, status, currentPage);
  return request(url);
}

export function searchLocations(organizationId, searchValue, includeInactive, searchType, currentPage) {
  const params = queryString({
    searchKey: searchType,
    searchValue,
    pageSize: DEFAULT_PAGE_SIZE,
    pageNumber: currentPage,
  });
  const url = `${baseEndpoint}/${organizationId}/locations/${params}`;
  return request(url);
}

function createUrl(organizationId, statusList, pageNumber) {
  const params = { pageNumber, statusList, pageSize: DEFAULT_PAGE_SIZE };
  const queryParams = queryString(params);
  const baseUrl = `${baseEndpoint}/${organizationId}`.concat('/locations');
  return baseUrl.concat(queryParams);
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
