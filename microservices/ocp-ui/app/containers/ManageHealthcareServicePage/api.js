import request from 'utils/request';
import { BASE_HEALTHCARE_SERVICES_API_URL, BASE_ORGANIZATION_API_URL, getEndpoint } from 'utils/endpointService';

export function createHealthcareService(healthcareServiceFormData, organizationId) {
  const baseEndpoint = getEndpoint(BASE_ORGANIZATION_API_URL);
  const url = `${baseEndpoint}/${organizationId}/healthcare-services`;
  return request(url, {
    method: 'POST',
    body: JSON.stringify(healthcareServiceFormData),
    headers: {
      'Content-Type': 'application/json',
    },
  });
}

export function updateHealthcareService(healthcareServiceFormData, organizationId) {
  const baseEndpoint = getEndpoint(BASE_ORGANIZATION_API_URL);
  const url = `${baseEndpoint}/${organizationId}/healthcare-services/${healthcareServiceFormData.logicalId}`;
  return request(url, {
    method: 'PUT',
    body: JSON.stringify(healthcareServiceFormData),
    headers: {
      'Content-Type': 'application/json',
    },
  });
}

export function getHealthcareServiceById(logicalId) {
  const baseEndpoint = getEndpoint(BASE_HEALTHCARE_SERVICES_API_URL);
  const requestURL = `${baseEndpoint}/${logicalId}`;
  return request(requestURL);
}
