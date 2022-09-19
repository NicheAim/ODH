/*
 *
 * AssignHealthCareServiceToLocationPage actions
 *
 */


import {
  GET_HEALTHCARE_SERVICES_LOCATION_ASSIGNMENT,
  GET_HEALTHCARE_SERVICES_LOCATION_ASSIGNMENT_ERROR,
  GET_HEALTHCARE_SERVICES_LOCATION_ASSIGNMENT_SUCCESS,
  INITIALIZE_HEALTHCARE_SERVICES_LOCATION_ASSIGNMENT, MARK_HEALTHCARE_SERVICE_AS_ASSIGNED,
  UNASSIGN_HEALTHCARE_SERVICES_LOCATION_ASSIGNMENT,
  UNASSIGN_HEALTHCARE_SERVICES_LOCATION_ASSIGNMENT_ERROR, UNMARK_HEALTHCARE_SERVICE_AS_ASSIGNED,
  UPDATE_HEALTHCARE_SERVICES_LOCATION_ASSIGNMENT,
  UPDATE_HEALTHCARE_SERVICES_LOCATION_ASSIGNMENT_ERROR,
} from './constants';

export function initializeAssignHealthCareServiceToLocationPage() {
  return {
    type: INITIALIZE_HEALTHCARE_SERVICES_LOCATION_ASSIGNMENT,
  };
}

export function getHealthcareServicesLocationAssignment(currentPage = 1) {
  return {
    type: GET_HEALTHCARE_SERVICES_LOCATION_ASSIGNMENT,
    currentPage,
  };
}

export function getHealthcareServicesLocationAssignmentSuccess(healthcareServices) {
  return {
    type: GET_HEALTHCARE_SERVICES_LOCATION_ASSIGNMENT_SUCCESS,
    healthcareServices,
  };
}

export function getHealthcareServicesLocationAssignmentServicesError(error) {
  return {
    type: GET_HEALTHCARE_SERVICES_LOCATION_ASSIGNMENT_ERROR,
    error,
  };
}

export function updateHealthcareServicesLocationAssignment(healthcareServiceId) {
  return {
    type: UPDATE_HEALTHCARE_SERVICES_LOCATION_ASSIGNMENT,
    healthcareServiceId,
  };
}

export function updateHealthcareServicesLocationAssignmentServicesError(error) {
  return {
    type: UPDATE_HEALTHCARE_SERVICES_LOCATION_ASSIGNMENT_ERROR,
    error,
  };
}

export function unassignHealthcareServicesLocationAssignment(healthcareServiceId) {
  return {
    type: UNASSIGN_HEALTHCARE_SERVICES_LOCATION_ASSIGNMENT,
    healthcareServiceId,
  };
}
export function markHealthcareServiceAsAssigned(healthcareServiceId) {
  return {
    type: MARK_HEALTHCARE_SERVICE_AS_ASSIGNED,
    healthcareServiceId,
  };
}
export function unmarkHealthcareServiceAsAssigned(healthcareServiceId) {
  return {
    type: UNMARK_HEALTHCARE_SERVICE_AS_ASSIGNED,
    healthcareServiceId,
  };
}

export function unassignHealthcareServicesLocationAssignmentServicesError(error) {
  return {
    type: UNASSIGN_HEALTHCARE_SERVICES_LOCATION_ASSIGNMENT_ERROR,
    error,
  };
}
