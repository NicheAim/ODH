/*
 *
 * TokenRetrievePage actions
 *
 */

import { GET_TOKEN, GET_TOKEN_ERROR, GET_TOKEN_SUCCESS } from './constants';

export function getToken(code, state, config) {
  return {
    type: GET_TOKEN,
    code,
    state,
    config,
  };
}

export function getTokenSuccess(tokenResponse) {
  return {
    type: GET_TOKEN_SUCCESS,
    tokenResponse,
  };
}

export function getTokenError(error) {
  return {
    type: GET_TOKEN_ERROR,
    error,
  };
}
