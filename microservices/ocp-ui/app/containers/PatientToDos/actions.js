/*
 *
 * PatientToDos actions
 *
 */

import {
  GET_PATIENT_TO_DOS, GET_PATIENT_TO_DOS_ERROR, GET_PATIENT_TO_DOS_SUCCESS, GET_PATIENT_TO_DO_MAIN_TASK,
  GET_PATIENT_TO_DO_MAIN_TASK_ERROR,
  GET_PATIENT_TO_DO_MAIN_TASK_SUCCESS, GET_FILTER_TO_DO, GET_FILTER_TO_DO_SUCCESS, GET_FILTER_TO_DO_ERROR,
  CANCEL_TO_DO_SUCCESS, CANCEL_TO_DO, CANCEL_TO_DO_ERROR, GET_TO_DO_RELATED_COMMUNICATIONS,
  GET_TO_DO_RELATED_COMMUNICATIONS_SUCCESS, GET_TO_DO_RELATED_COMMUNICATIONS_ERROR,
} from 'containers/PatientToDos/constants';

export function getPatientToDos(patientId, practitionerId, definition) {
  return {
    type: GET_PATIENT_TO_DOS,
    patientId,
    practitionerId,
    definition,
  };
}


export function getPatientToDoSuccess(toDos) {
  return {
    type: GET_PATIENT_TO_DOS_SUCCESS,
    toDos,
  };
}

export function getPatientToDoError(error) {
  return {
    type: GET_PATIENT_TO_DOS_ERROR,
    error,
  };
}


export function getPatientToDoMainTask(patientId, organizationId, definition, practitionerId) {
  return {
    type: GET_PATIENT_TO_DO_MAIN_TASK,
    patientId,
    organizationId,
    definition,
    practitionerId,
  };
}

export function getPatientToDoMainTaskSuccess(toDoMainTask) {
  return {
    type: GET_PATIENT_TO_DO_MAIN_TASK_SUCCESS,
    toDoMainTask,
  };
}


export function getPatientToDoMainTaskError(error) {
  return {
    type: GET_PATIENT_TO_DO_MAIN_TASK_ERROR,
    error,
  };
}
export function cancelToDos(toDoLogicalId) {
  return {
    type: CANCEL_TO_DO,
    toDoLogicalId,
  };
}

export function cancelToDoSuccess(toDoLogicalId) {
  return {
    type: CANCEL_TO_DO_SUCCESS,
    toDoLogicalId,
  };
}

export function cancelToDosError(error) {
  return {
    type: CANCEL_TO_DO_ERROR,
    error,
  };
}


export function getFilterToDos(patientId, practitionerId, definition, dateRange) {
  return {
    type: GET_FILTER_TO_DO,
    patientId,
    practitionerId,
    definition,
    dateRange,
  };
}


export function getFilterToDoSuccess(toDos) {
  return {
    type: GET_FILTER_TO_DO_SUCCESS,
    toDos,
  };
}


export function getFilterToDoError(error) {
  return {
    type: GET_FILTER_TO_DO_ERROR,
    error,
  };
}


export function getToDoRelatedCommunications(patient, toDoId, pageNumber) {
  return {
    type: GET_TO_DO_RELATED_COMMUNICATIONS,
    patient,
    pageNumber,
    toDoId,
  };
}


export function getToDoRelatedCommunicationsSuccess(communications) {
  return {
    type: GET_TO_DO_RELATED_COMMUNICATIONS_SUCCESS,
    communications,
  };
}


export function getToDoRelatedCommunicationsError(error) {
  return {
    type: GET_TO_DO_RELATED_COMMUNICATIONS_ERROR,
    error,
  };
}

