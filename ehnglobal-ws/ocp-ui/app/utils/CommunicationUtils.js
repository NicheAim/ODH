
import { BASE_COMMUNICATIONS_API_URL, getEndpoint } from 'utils/endpointService';
import queryString from 'utils/queryString';
import request from 'utils/request';


export function getRoleName(roleReference) {
  const roleName = (roleReference && roleReference.indexOf('/') > 0) ? roleReference.substring(0, roleReference.indexOf('/')) : '';
  return roleName;
}


export function getCommunicationsByAppointment(patient, resourceId, pageNumber, resourceType) {
  const q = {
    patient,
    topic: resourceId,
    resourceType,
    pageNumber,
  };
  const params = queryString(q);
  const baseEndpoint = getEndpoint(BASE_COMMUNICATIONS_API_URL);
  const requestURL = `${baseEndpoint}${params}`;
  return request(requestURL);
}
