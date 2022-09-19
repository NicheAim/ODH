/*
 *
 * Observations actions
 *
 */

import {
  GET_OBSERVATIONS,
  GET_OBSERVATIONS_SUCCESS,
  GET_OBSERVATIONS_ERROR,
} from './constants';

export function getObservations(patientId) {
  return {
    type: GET_OBSERVATIONS,
    patientId,
  };
}

export function getObservationsSuccess(observations) {
  return {
    type: GET_OBSERVATIONS_SUCCESS,
    observations,
  };
}

export function getObservationsError(error) {
  return {
    type: GET_OBSERVATIONS_ERROR,
    error,
  };
}
