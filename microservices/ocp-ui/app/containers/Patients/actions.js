/*
 *
 * Patients actions
 *
 */

import {
  INITIALIZE_PATIENTS,
  LOAD_PATIENT_SEARCH_RESULT,
  SEARCH_PATIENTS_ERROR,
  SEARCH_PATIENTS_SUCCESS,
  FILTER_PATIENTS,
  FILTER_PATIENTS_SUCCESS,
  FILTER_PATIENTS_ERROR,
} from './constants';

export function initializePatients(patients) {
  return {
    type: INITIALIZE_PATIENTS,
    patients,
  };
}

export function loadPatientSearchResult(searchTerms, searchType, includeInactive, currentPage, organization) {
  return {
    type: LOAD_PATIENT_SEARCH_RESULT,
    searchTerms,
    searchType,
    includeInactive,
    currentPage,
    organization,
  };
}

export function fitlerPatient(filterBy, organization, practitioner, currentPage) {
  return {
    type: FILTER_PATIENTS,
    filterBy,
    organization,
    practitioner,
    currentPage,
  };
}


export function fitlerPatientError(error) {
  return {
    type: FILTER_PATIENTS_ERROR,
    error,
  };
}

export function fitlerPatientSuccess(searchResult, filterBy) {
  return {
    type: FILTER_PATIENTS_SUCCESS,
    searchResult,
    queryParameters: {
      filterBy,
    },
  };
}

export function searchPatientsSuccess(searchResult, searchTerms, searchType, includeInactive) {
  return {
    type: SEARCH_PATIENTS_SUCCESS,
    searchResult,
    queryParameters: {
      searchTerms, searchType, includeInactive,
    },
  };
}

export function searchPatientsError(error) {
  return {
    type: SEARCH_PATIENTS_ERROR,
    error,
  };
}

