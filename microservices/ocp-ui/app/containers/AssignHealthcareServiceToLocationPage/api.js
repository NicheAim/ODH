import { DEFAULT_PAGE_SIZE } from '../App/constants';
import queryString from '../../utils/queryString';
import request from '../../utils/request';
import { BASE_HEALTHCARE_SERVICES_API_URL, BASE_ORGANIZATIONS_API_URL, getEndpoint } from '../../utils/endpointService';

export function queryHealthCareServicesWithLocationAssignmentData(organizationId, locationId, currentPage, status) {
  const params = queryString({
    statusList: status,
    assignedToLocationId: locationId,
    pageNumber: currentPage,
    pageSize: DEFAULT_PAGE_SIZE,
  });
  const baseEndpoint = getEndpoint(BASE_ORGANIZATIONS_API_URL);
  const url = `${baseEndpoint}/${organizationId}/healthcare-services${params}`;
  return request(url);
}

export function assignHealthCareServicesToLocation(orgId, locationIds, healthCareServiceId) {
  const params = queryString({
    organizationId: orgId,
    locationIdList: locationIds,
  });
  const baseEndpoint = getEndpoint(BASE_HEALTHCARE_SERVICES_API_URL);
  const url = `${baseEndpoint}/${healthCareServiceId}/assign${params}`;
  return request(url, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
  });
}

export function unassignHealthCareServicesToLocation(orgId, locationIds, healthCareServiceId) {
  const params = queryString({
    organizationId: orgId,
    locationIdList: locationIds,
  });
  const baseEndpoint = getEndpoint(BASE_HEALTHCARE_SERVICES_API_URL);
  const url = `${baseEndpoint}/${healthCareServiceId}/unassign${params}`;
  return request(url, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
  });
}

export function setHealthcareServiceAssignedToCurrentLocation(healtcareServices, healthcareServiceId, value) {
  let i = 0;
  while (i < healtcareServices.length) {
    const healthcareService = healtcareServices[i];
    if (healthcareService.logicalId === healthcareServiceId) {
      healthcareService.assignedToCurrentLocation = value;
      break;
    }
    i += 1;
  }
}
