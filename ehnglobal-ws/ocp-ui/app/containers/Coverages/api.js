
import { DEFAULT_PAGE_SIZE } from '../App/constants';
import request from '../../utils/request';
import queryString from '../../utils/queryString';
import {
  BASE_COVERAGE_URL,
  BASE_PATIENTS_API_URL,
  getEndpoint,
} from '../../utils/endpointService';


const baseEndpoint = getEndpoint(BASE_COVERAGE_URL);

export function saveCoverage(coverageData) {
  const requestURL = `${baseEndpoint}`;
  return request(requestURL, {
    method: 'POST',
    body: JSON.stringify(coverageData),
    headers: {
      'Content-Type': 'application/json',
    },
  });
}

export function getCoverages(patientId, pageNumber) {
  const params = queryString({
    searchKey: 'patientId',
    searchValue: patientId,
    pageNumber,
    pageSize: DEFAULT_PAGE_SIZE,
  });
  const patientBaseEndpoint = getEndpoint(BASE_PATIENTS_API_URL);
  const url = `${patientBaseEndpoint}/${patientId}/coverages${params}`;
  return request(url);
}
