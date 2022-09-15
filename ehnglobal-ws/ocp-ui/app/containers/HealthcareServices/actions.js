/*
 *
 * HealthcareServices actions
 *
 */

import {
  GET_HEALTHCARE_SERVICES,
  GET_HEALTHCARE_SERVICES_ERROR,
  GET_HEALTHCARE_SERVICES_SUCCESS,
  SEARCH_HEALTHCARE_SERVICES,
  SEARCH_HEALTHCARE_SERVICES_SUCCESS,
  SEARCH_HEALTHCARE_SERVICES_ERROR,
  INITIALIZE_HEALTHCARE_SERVICES,
} from './constants';

export function initializeHealthcareServices() {
  return {
    type: INITIALIZE_HEALTHCARE_SERVICES,
  };
}

export function getHealthcareServices(currentPage = 1, includeInactive = false) {
  return {
    type: GET_HEALTHCARE_SERVICES,
    currentPage,
    includeInactive,
  };
}

export function getHealthcareServicesSuccess(healthcareServices) {
  return {
    type: GET_HEALTHCARE_SERVICES_SUCCESS,
    healthcareServices,
  };
}

export function getHealthcareServicesError(error) {
  return {
    type: GET_HEALTHCARE_SERVICES_ERROR,
    error,
  };
}

export function searchHealthcareServices(searchValue, includeInactive, searchType, currentPage) {
  return {
    type: SEARCH_HEALTHCARE_SERVICES,
    searchValue,
    includeInactive,
    searchType,
    currentPage,
  };
}

export function searchHealthcareServicesSuccess(healthcareServices) {
  return {
    type: SEARCH_HEALTHCARE_SERVICES_SUCCESS,
    healthcareServices,
  };
}

export function searchHealthcareServicesError(error) {
  return {
    type: SEARCH_HEALTHCARE_SERVICES_ERROR,
    error,
  };
}
