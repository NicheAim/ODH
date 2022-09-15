import request from 'utils/request';
import { BASE_PATIENTS_API_URL, BASE_PRACTITIONERS_API_URL, getEndpoint, LOOKUPS_API_URL } from 'utils/endpointService';
import queryString from 'utils/queryString';
import { DEFAULT_PAGE_SIZE, PROVIDER_ROLE } from 'containers/App/constants';

export function getWorkflowRoles() {
  const params = queryString({
    lookUpTypeList: PROVIDER_ROLE,
  });
  const baseEndpoint = getEndpoint(LOOKUPS_API_URL);
  const requestURL = `${baseEndpoint}/${params}`;
  return request(requestURL);
}

export function getPractitionersOnRoleOrganization(role, organizationId, currentPage) {
  const baseEndpoint = getEndpoint(BASE_PRACTITIONERS_API_URL);
  const params = queryString({
    role,
    page: currentPage,
    size: DEFAULT_PAGE_SIZE,
    organization: organizationId,
  });
  const requestURL = `${baseEndpoint}${params}`;
  return request(requestURL);
}

export function searchPatients(searchValue, showInactive, searchType, currentPage) {
  const params = queryString({
    value: searchValue,
    showInactive,
    type: searchType,
    page: currentPage,
    size: DEFAULT_PAGE_SIZE,
  });

  const baseEndpoint = getEndpoint(BASE_PATIENTS_API_URL);
  const requestURL = `${baseEndpoint}/search${params}`;
  return request(requestURL);
}

