import queryString from 'utils/queryString';
import request from 'utils/request';
import { BASE_COMMUNICATIONS_API_URL, getEndpoint } from 'utils/endpointService';
import { PAGE_SIZE } from './constants';

const baseEndpoint = getEndpoint(BASE_COMMUNICATIONS_API_URL);

export function getCommunications(patientId, pageNumber, organizationId) {
  const params = queryString({
    searchKey: 'patientId',
    searchValue: patientId,
    pageNumber,
    pageSize: PAGE_SIZE,
    organization: organizationId,
  });
  const url = `${baseEndpoint}/search${params}`;
  return request(url);
}
