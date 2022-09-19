import isUndefined from 'lodash/isUndefined';
import merge from 'lodash/merge';
import 'whatwg-fetch';
import { isSecuredEndpoint } from './endpointService';
import { retrieveToken } from './tokenService';

/**
 * Parses the JSON returned by a network request
 *
 * @param  {object} response A response from a network request
 *
 * @return {object}          The parsed JSON from the request
 */
function parseJSON(response) {
  if (response.status === 204 || response.status === 205) {
    return null;
  }
  return response.text().then((text) => {
    try {
      // try to parse to JSON
      return JSON.parse(text);
    } catch (err) {
      // else return text if exists or null
      return text && text !== '' ? text : null;
    }
  });
}

/**
 * Checks if a network request came back fine, and throws an error if not
 *
 * @param  {object} response   A response from a network request
 *
 * @return {object|undefined} Returns either the response, or throws an error
 */
function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }

  const error = new Error(response.statusText);
  error.response = response;
  throw error;
}

export default function request(requestURL, options) {
  // Check endpoint whether secured
  const isEndpointSecured = isSecuredEndpoint(requestURL);

  // Select request function based on whether secured endpoint
  if (isEndpointSecured) {
    return requestWithJWT(requestURL, options);
  }
  return requestWithoutJWT(requestURL, options);
}

/**
 * Requests a URL, returning a promise
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 *
 * @return {object}           The response data
 */
export function requestWithoutJWT(url, options) {
  return fetch(url, options).then(checkStatus).then(parseJSON);
}

function requestWithJWT(url, options) {
  let fetchOptions = options;
  if (isUndefined(options)) {
    fetchOptions = {};
  }
  const authData = retrieveToken();
  const token = authData && authData.access_token;
  if (token) {
    merge(fetchOptions, { headers: { Authorization: `Bearer ${token}` } });
  } else {
    console.log('No token found');
  }
  return fetch(url, fetchOptions).then(checkStatus).then(parseJSON);
}
