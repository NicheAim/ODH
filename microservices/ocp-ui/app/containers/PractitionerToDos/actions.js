/*
 *
 * PractitionerToDos actions
 *
 */

import {
  GET_FILTER_TO_DO, GET_FILTER_TO_DO_ERROR, GET_FILTER_TO_DO_SUCCESS,
  GET_PRACTITIONER_TO_DOS, GET_PRACTITIONER_TO_DOS_ERROR,
  GET_PRACTITIONER_TO_DOS_SUCCESS,
} from 'containers/PractitionerToDos/constants';

export function getPractitionerToDos(practitionerId, definition) {
  return {
    type: GET_PRACTITIONER_TO_DOS,
    practitionerId,
    definition,
  };
}


export function getPractitionerToDoSuccess(toDos) {
  return {
    type: GET_PRACTITIONER_TO_DOS_SUCCESS,
    toDos,
  };
}

export function getPractitionerToDoError(error) {
  return {
    type: GET_PRACTITIONER_TO_DOS_ERROR,
    error,
  };
}


export function getFilterToDos(practitionerId, definition, dateRange) {
  return {
    type: GET_FILTER_TO_DO,
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
