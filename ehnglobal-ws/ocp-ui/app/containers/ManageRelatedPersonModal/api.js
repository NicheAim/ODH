import request from 'utils/request';
import queryString from 'utils/queryString';
import { BASE_CARE_TEAMS_API_URL, getEndpoint } from 'utils/endpointService';
import { DEFAULT_PAGE_SIZE } from 'containers/App/constants';


const baseEndpoint = getEndpoint(BASE_CARE_TEAMS_API_URL);

export function searchRelatedPersons(careTeamId, pageNumber, searchTerms) {
  const params = queryString({
    name: searchTerms,
    pageNumber,
    pageSize: DEFAULT_PAGE_SIZE,
  });
  const requestURL = `${baseEndpoint}/${careTeamId}/related-persons/search${params}`;
  return request(requestURL);
}

export function addRelatedPerson(careTeamId, relatedPerson) {
  const requestURL = `${baseEndpoint}/${careTeamId}/add-related-person`;
  return request(requestURL, {
    method: 'PUT',
    body: JSON.stringify(relatedPerson),
    headers: {
      'Content-Type': 'application/json',
    },
  });
}

export function removeRelatedPerson(careTeamId, relatedPerson) {
  const requestURL = `${baseEndpoint}/${careTeamId}/remove-related-person`;
  return request(requestURL, {
    method: 'PUT',
    body: JSON.stringify(relatedPerson),
    headers: {
      'Content-Type': 'application/json',
    },
  });
}
