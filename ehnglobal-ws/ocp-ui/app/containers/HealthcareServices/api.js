import { DEFAULT_PAGE_SIZE } from '../App/constants';
import request from '../../utils/request';
import queryString from '../../utils/queryString';
import { BASE_ORGANIZATIONS_API_URL, getEndpoint } from '../../utils/endpointService';

export function getHealthcareServicesByOrganization(organizationId, status, currentPage) {
  const baseEndpoint = getEndpoint(BASE_ORGANIZATIONS_API_URL);
  const params = queryString({
    statusList: status,
    pageNumber: currentPage,
    pageSize: DEFAULT_PAGE_SIZE,
  });
  const url = `${baseEndpoint}/${organizationId}/healthcare-services${params}`;
  return request(url);
}

export function getHealthcareServicesByLocation(organizationId, locationId, status, currentPage) {
  const baseEndpoint = getEndpoint(BASE_ORGANIZATIONS_API_URL);
  const params = queryString({
    statusList: status,
    pageNumber: currentPage,
    pageSize: DEFAULT_PAGE_SIZE,
  });
  const url = `${baseEndpoint}/${organizationId}/locations/${locationId}/healthcare-services${params}`;
  return request(url);
}

export function searchHealthcareServicesForOrganization(organizationId, searchValue, includeInactive, searchType, currentPage) {
  const baseEndpoint = getEndpoint(BASE_ORGANIZATIONS_API_URL);
  const params = queryString({
    searchKey: searchType,
    searchValue,
    pageSize: DEFAULT_PAGE_SIZE,
    pageNumber: currentPage,
  });
  const url = `${baseEndpoint}/${organizationId}/healthcare-services${params}`;
  return request(url);
}

export function searchHealthcareServicesForOrganizationLocation(organizationId, locationId, searchValue, includeInactive, searchType, currentPage) {
  const baseEndpoint = getEndpoint(BASE_ORGANIZATIONS_API_URL);
  const params = queryString({
    searchKey: searchType,
    searchValue,
    pageSize: DEFAULT_PAGE_SIZE,
    pageNumber: currentPage,
  });
  const url = `${baseEndpoint}/${organizationId}/locations/${locationId}/healthcare-services${params}`;
  return request(url);
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
