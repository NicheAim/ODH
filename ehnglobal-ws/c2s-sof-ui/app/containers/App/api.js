import request from 'utils/request';
import { getEndpoint, LOOKUPS_API_URL, CONFIG_API_URL } from 'utils/endpointService';

export function fetchLookups(lookupTypes) {
  const baseEndpoint = getEndpoint(LOOKUPS_API_URL);
  const lookupKeyList = lookupTypes.join();
  const requestURL = `${baseEndpoint}?lookUpTypeList=${lookupKeyList}`;
  return request(requestURL);
}

export function getConfig() {
  const requestURL = getEndpoint(CONFIG_API_URL);
  return request(requestURL);
}
