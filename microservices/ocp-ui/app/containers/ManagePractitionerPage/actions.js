/*
 *
 * ManagePractitionerPage actions
 *
 */

import {
  GET_PRACTITIONER,
  GET_PRACTITIONER_ERROR,
  GET_PRACTITIONER_SUCCESS,
  INITIALIZE_MANAGE_PRACTITIONER,
  SAVE_PRACTITIONER,
  SAVE_PRACTITIONER_ERROR,
  GET_ORGANIZATIONS, GET_ORGANIZATIONS_SUCCESS, GET_ORGANIZATIONS_ERROR,
  INITIALIZE_ORGANIZATIONS,
} from './constants';

export function initializeManagePractitioner() {
  return {
    type: INITIALIZE_MANAGE_PRACTITIONER,
  };
}

export function savePractitioner(practitionerFormData, handleSubmitting) {
  return {
    type: SAVE_PRACTITIONER,
    practitionerFormData,
    handleSubmitting,
  };
}

export function savePractitionerError(error) {
  return {
    type: SAVE_PRACTITIONER_ERROR,
    error,
  };
}

export function getPractitioner(logicalId) {
  return {
    type: GET_PRACTITIONER,
    logicalId,
  };
}

export function getPractitionerSuccess(practitioner) {
  return {
    type: GET_PRACTITIONER_SUCCESS,
    practitioner,
  };
}

export function getPractitionerError(error) {
  return {
    type: GET_PRACTITIONER_ERROR,
    error,
  };
}

export function initializeOrganizations() {
  return {
    type: INITIALIZE_ORGANIZATIONS,
  };
}

export function getOrganizations(searchValue, showInactive, searchType, currentPage) {
  return {
    type: GET_ORGANIZATIONS,
    searchValue,
    showInactive,
    searchType,
    currentPage,
  };
}

export function getOrganizationsSuccess(organizations) {
  return {
    type: GET_ORGANIZATIONS_SUCCESS,
    organizations,
  };
}

export function getOrganizationsError(err) {
  return {
    type: GET_ORGANIZATIONS_ERROR,
    err,
  };
}
