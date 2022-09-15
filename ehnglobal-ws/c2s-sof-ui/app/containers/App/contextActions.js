/*
 *
 * Context actions
 *
 */

import {
  CLEAR_ALL,
  CLEAR_PATIENT,
  CLEAR_USER,
  GET_ORGANIZATIONS_BY_PRACTITIONER_ERROR,
  GET_ORGANIZATIONS_BY_PRACTITIONER_SUCCESS,
  GET_PATIENT,
  GET_PATIENT_ERROR,
  GET_USER_CONTEXT_ERROR,
  INITIALIZE_CONTEXT,
  REFRESH_PATIENT,
  SET_PATIENT,
  SET_USER,
} from './contextConstants';


export function initializeContext(userAuthContext, patientId) {
  return {
    type: INITIALIZE_CONTEXT,
    userAuthContext,
    patientId,
  };
}

export function setPatient(patient) {
  return {
    type: SET_PATIENT,
    patient,
  };
}

export function setUser(user) {
  return {
    type: SET_USER,
    user,
  };
}

export function clearPatient() {
  return {
    type: CLEAR_PATIENT,
  };
}

export function clearUser() {
  return {
    type: CLEAR_USER,
  };
}

export function clearAll() {
  return {
    type: CLEAR_ALL,
  };
}

export function refreshPatient() {
  return {
    type: REFRESH_PATIENT,
  };
}

export function getUserContextError(error) {
  return {
    type: GET_USER_CONTEXT_ERROR,
    error,
  };
}

export function getPatient(logicalId) {
  return {
    type: GET_PATIENT,
    logicalId,
  };
}

export function getPatientError(error) {
  return {
    type: GET_PATIENT_ERROR,
    error,
  };
}

export function getOrganizationsPractitionerSuccess(organizations) {
  return {
    type: GET_ORGANIZATIONS_BY_PRACTITIONER_SUCCESS,
    organizations,
  };
}

export function getOrganizationsByPractitionerError(error) {
  return {
    type: GET_ORGANIZATIONS_BY_PRACTITIONER_ERROR,
    error,
  };
}
