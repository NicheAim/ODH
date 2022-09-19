/*
 *
 * AssignLocationToPractitionerPage actions
 *
 */

import {
  GET_PRACTIONER_LOCATION_ASSIGNMENT,
  GET_PRACTIONER_LOCATION_ASSIGNMENT_SUCCESS,
  GET_PRACTITIONER_LOCATION_ASSIGNMENT_ERROR,
  INITIALIZE_ASSIGN_LOCATION_TO_PRACTITIONER,
  ASSIGN_PRACTITIONER_LOCATION_ASSIGNMENT,
  ASSIGN_PRACTITIONER_LOCATION_ASSIGNMENT_ERROR,
  UNASSIGN_PRACTITIONER_LOCATION_ASSIGNMENT,
  UNASSIGN_PRACTITIONER_LOCATION_ASSIGNMENT_ERROR,
  MARK_LOCATION_AS_ASSIGNED,
  UNMARK_LOCATION_AS_ASSIGNED,
} from './constants';


export function initializeAssignLocationToPractitionerPage() {
  return {
    type: INITIALIZE_ASSIGN_LOCATION_TO_PRACTITIONER,
  };
}

export function getPractitionerLocationAssignment(currentPage) {
  return {
    type: GET_PRACTIONER_LOCATION_ASSIGNMENT,
    currentPage,
  };
}

export function getPractitionerLocationAssignmentSuccess(practitionerLocations) {
  return {
    type: GET_PRACTIONER_LOCATION_ASSIGNMENT_SUCCESS,
    practitionerLocations,
  };
}

export function getPractitionerLocationAssignmentError(error) {
  return {
    type: GET_PRACTITIONER_LOCATION_ASSIGNMENT_ERROR,
    error,
  };
}

export function assignPractitionerLocationAssignment(locationId) {
  return {
    type: ASSIGN_PRACTITIONER_LOCATION_ASSIGNMENT,
    locationId,
  };
}

export function assignPractitionerLocationAssignmentError(error) {
  return {
    type: ASSIGN_PRACTITIONER_LOCATION_ASSIGNMENT_ERROR,
    error,
  };
}

export function markLocationAsAssigned(locationId) {
  return {
    type: MARK_LOCATION_AS_ASSIGNED,
    locationId,
  };
}
export function unmarkLocationAsAssigned(locationId) {
  return {
    type: UNMARK_LOCATION_AS_ASSIGNED,
    locationId,
  };
}

export function unassignPractitionerLocationAssignment(locationId) {
  return {
    type: UNASSIGN_PRACTITIONER_LOCATION_ASSIGNMENT,
    locationId,
  };
}

export function unassignPractitionerLocationAssignmentError(error) {
  return {
    type: UNASSIGN_PRACTITIONER_LOCATION_ASSIGNMENT_ERROR,
    error,
  };
}
