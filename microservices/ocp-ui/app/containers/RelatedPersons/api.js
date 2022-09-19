import * as queryString from 'query-string';
import {
  BASE_RELATED_PERSONS_API_URL,
  getEndpoint,
} from '../../utils/endpointService';
import request from '../../utils/request';
import { PAGE_SIZE } from './constants';

const baseEndpoint = getEndpoint(BASE_RELATED_PERSONS_API_URL);

function getRelatedPersons(patientId, showInActive, pageNumber) {
  const pageSize = PAGE_SIZE;
  const queryParams = { patientId, showInActive, pageNumber, pageSize };
  const stringifiedParams = queryString.stringify(queryParams);
  const url = `${baseEndpoint}/search?${stringifiedParams}`;
  return request(url);
}

export const API = {
  getRelatedPersons,
};
