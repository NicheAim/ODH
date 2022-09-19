/*
 *
 * ManagePatientPage actions
 *
 */

import {
  SAVE_PATIENT,
  SAVE_PATIENT_ERROR,
  GET_PRACTITIONERS,
  GET_PRACTITIONERS_ERROR,
  GET_PRACTITIONERS_SUCCESS,
} from './constants';

export function savePatient(patientFormData, handleSubmitting) {
  return {
    type: SAVE_PATIENT,
    patientFormData,
    handleSubmitting,
  };
}

export function savePatientError(err) {
  return {
    type: SAVE_PATIENT_ERROR,
    err,
  };
}

export function getPractitioners(organizationId) {
  return {
    type: GET_PRACTITIONERS,
    organizationId,
  };
}

export function getPractitionersSuccess(practitioners) {
  return {
    type: GET_PRACTITIONERS_SUCCESS,
    practitioners,
  };
}


export function getPractitionersError(err) {
  return {
    type: GET_PRACTITIONERS_ERROR,
    err,
  };
}
