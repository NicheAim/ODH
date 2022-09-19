/*
 *
 * SmartContextInitializerPage actions
 *
 */

import { POST_CONTEXT, POST_CONTEXT_ERROR, POST_CONTEXT_SUCCESS } from './constants';

export function postContext(launchId, context, params) {
  return {
    type: POST_CONTEXT,
    launchId,
    context,
    params,
  };
}

export function postContextSuccess(response, redirectUri) {
  return {
    type: POST_CONTEXT_SUCCESS,
    response,
    redirectUri,
  };
}

export function postContextError(error) {
  return {
    type: POST_CONTEXT_ERROR,
    error,
  };
}
