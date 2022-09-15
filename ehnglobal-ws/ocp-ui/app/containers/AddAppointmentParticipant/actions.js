/*
 *
 * AddAppointmentParticipant actions
 *
 */

import {
  GET_HEALTHCARE_SERVICE_REFERENCES,
  GET_HEALTHCARE_SERVICE_REFERENCES_SUCCESS,
  GET_LOCATION_REFERENCES,
  GET_LOCATION_REFERENCES_SUCCESS,
  GET_PRACTITIONER_REFERENCES,
  GET_PRACTITIONER_REFERENCES_SUCCESS,
  INITIALIZE_PARTICIPANT_REFERENCES,
  INITIALIZE_PARTICIPANT_REFERENCES_ERROR,
  INITIALIZE_PARTICIPANT_REFERENCES_SUCCESS,
  SEARCH_PARTICIPANT_REFERENCES,
  SEARCH_PARTICIPANT_REFERENCES_ERROR,
  SEARCH_PARTICIPANT_REFERENCES_SUCCESS,
} from './constants';

export function initializeParticipantReferences(resourceValue) {
  return {
    type: INITIALIZE_PARTICIPANT_REFERENCES,
    resourceValue,
  };
}

export function initializeParticipantReferencesSuccess(healthcareServices, locations, practitioners) {
  return {
    type: INITIALIZE_PARTICIPANT_REFERENCES_SUCCESS,
    healthcareServices,
    locations,
    practitioners,
  };
}

export function initializeParticipantReferencesError(error) {
  return {
    type: INITIALIZE_PARTICIPANT_REFERENCES_ERROR,
    error,
  };
}

export function getHealthcareServiceReferences(resourceType, resourceValue) {
  return {
    type: GET_HEALTHCARE_SERVICE_REFERENCES,
    resourceType,
    resourceValue,
  };
}

export function getHealthcareServiceReferencesSuccess(healthcareServices) {
  return {
    type: GET_HEALTHCARE_SERVICE_REFERENCES_SUCCESS,
    healthcareServices,
  };
}

export function getLocationReferences(resourceType, resourceValue) {
  return {
    type: GET_LOCATION_REFERENCES,
    resourceType,
    resourceValue,
  };
}

export function getLocationReferencesSuccess(locations) {
  return {
    type: GET_LOCATION_REFERENCES_SUCCESS,
    locations,
  };
}

export function getPractitionerReferences(resourceType, resourceValue) {
  return {
    type: GET_PRACTITIONER_REFERENCES,
    resourceType,
    resourceValue,
  };
}

export function getPractitionerReferencesSuccess(practitioners) {
  return {
    type: GET_PRACTITIONER_REFERENCES_SUCCESS,
    practitioners,
  };
}

export function searchParticipantReferences(searchType, searchValue, patientId, organizationId, currentPage, handleSubmitting) {
  return {
    type: SEARCH_PARTICIPANT_REFERENCES,
    searchType,
    searchValue,
    patientId,
    organizationId,
    currentPage,
    handleSubmitting,
  };
}

export function searchParticipantReferencesSuccess(participants) {
  return {
    type: SEARCH_PARTICIPANT_REFERENCES_SUCCESS,
    participants,
  };
}

export function searchParticipantReferencesError(error) {
  return {
    type: SEARCH_PARTICIPANT_REFERENCES_ERROR,
    error,
  };
}
