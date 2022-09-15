/*
 *
 * Communication actions
 *
 */


import {
  GET_COMMUNICATIONS, GET_COMMUNICATIONS_ERROR,
  GET_COMMUNICATIONS_SUCCESS, INITIALIZE_COMMUNICATIONS,
} from 'containers/Communications/constants';

export function getCommunications(pageNumber, organizationId) {
  return {
    type: GET_COMMUNICATIONS,
    pageNumber,
    organizationId,
  };
}

export function getCommunicationsSuccess(communications) {
  return {
    type: GET_COMMUNICATIONS_SUCCESS,
    communications,
  };
}

export function getCommunicationsError(error) {
  return {
    type: GET_COMMUNICATIONS_ERROR,
    error,
  };
}

export function initializeCommunication() {
  return {
    type: INITIALIZE_COMMUNICATIONS,
  };
}
