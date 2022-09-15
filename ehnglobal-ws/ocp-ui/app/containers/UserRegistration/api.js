import request from 'utils/request';
import queryString from 'utils/queryString';
import { BASE_PATIENTS_API_URL, BASE_PRACTITIONERS_API_URL, getEndpoint } from 'utils/endpointService';
import { DEFAULT_PAGE_SIZE } from 'containers/App/constants';

export function searchResources(searchType, searchValue, resourceType, showInactive, page, organization) {
  const basePractitionerEndpoint = getEndpoint(BASE_PRACTITIONERS_API_URL);
  const basePatientEndpoint = getEndpoint(BASE_PATIENTS_API_URL);
  let params;
  let requestURL;
  if (resourceType === 'Practitioner') {
    params = organization !== undefined ? queryString({
      searchType,
      searchValue,
      showInactive,
      size: DEFAULT_PAGE_SIZE,
      page,
      showAll: false,
      showUser: true,
      organization,
    }) : queryString({
      searchType,
      searchValue,
      showInactive,
      size: DEFAULT_PAGE_SIZE,
      page,
      showAll: false,
      showUser: true,
    });
    requestURL = `${basePractitionerEndpoint}/search${params}`;
  } else {
    params = organization !== undefined ? queryString({
      type: searchType,
      value: searchValue,
      showInactive,
      size: DEFAULT_PAGE_SIZE,
      page,
      showAll: false,
      organization,
    }) : queryString({
      type: searchType,
      value: searchValue,
      showInactive,
      size: DEFAULT_PAGE_SIZE,
      page,
      showAll: false,
    });
    requestURL = `${basePatientEndpoint}/search${params}`;
  }
  return request(requestURL);
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
