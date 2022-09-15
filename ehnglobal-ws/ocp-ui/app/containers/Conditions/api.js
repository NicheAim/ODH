import * as queryString from 'query-string';
import request from 'utils/request';
import { PAGE_SIZE } from './constants';

import { BASE_CONDITIONS_API_URL, getEndpoint } from 'utils/endpointService';

export function getConditions(patientId, pageNumber) {
  const baseEndpoint = getEndpoint(BASE_CONDITIONS_API_URL);
  const pageSize = PAGE_SIZE;
  const queryParams = {
    patient: patientId,
    pagenumber: pageNumber,
    pagesize: pageSize,
  };
  const stringifiedParams = queryString.stringify(queryParams);
  const requestURL = `${baseEndpoint}/?${stringifiedParams}`;
  return request(requestURL);
}
