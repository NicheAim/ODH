/*
 *
 * Conditions actions
 *
 */

import {
  GET_CONDITIONS,
  GET_CONDITIONS_SUCCESS,
  GET_CONDITIONS_ERROR,
  INITIALIZE_CONDITIONS,
} from './constants';

function initializeConditions() {
  return {
    type: INITIALIZE_CONDITIONS,
  };
}

function getConditions(patientId, pageNumber) {
  return {
    type: GET_CONDITIONS,
    patientId,
    pageNumber,
  };
}

function getConditionsSuccess(conditions) {
  return {
    type: GET_CONDITIONS_SUCCESS,
    conditions,
  };
}

function getConditionsError(error) {
  return {
    type: GET_CONDITIONS_ERROR,
    error,
  };
}

export const actions = {
  initializeConditions,
  getConditions,
  getConditionsSuccess,
  getConditionsError,
};
