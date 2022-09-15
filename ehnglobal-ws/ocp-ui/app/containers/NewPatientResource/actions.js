/*
 *
 * NewPatientResource actions
 *
 */

import {
  FIND_PATIENT,
  FIND_PATIENT_ERROR,
  FIND_PATIENT_SUCCESS,
  INITIALIZE_FIND_PATIENT,
} from './constants';


export function initializeFindPatient() {
  return {
    type: INITIALIZE_FIND_PATIENT,
  };
}

export function findPatient(firstName, lastName, birthDate, handleSubmitting) {
  return {
    type: FIND_PATIENT,
    firstName,
    lastName,
    birthDate,
    handleSubmitting,
  };
}

export function findPatientSuccess(patient) {
  return {
    type: FIND_PATIENT_SUCCESS,
    patient,
  };
}

export function findPatientError(error) {
  return {
    type: FIND_PATIENT_ERROR,
    error,
  };
}
