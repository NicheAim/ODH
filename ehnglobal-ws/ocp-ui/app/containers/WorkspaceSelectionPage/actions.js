/*
 *
 * WorkspaceSelectionPage actions
 *
 */

import {
  GET_PRACTITIONERS_ON_ROLE_ORGANIZATION,
  GET_PRACTITIONERS_ON_ROLE_ORGANIZATION_SUCCESS,
  GET_WORKFLOW_ROLES,
  GET_WORKFLOW_ROLES_SUCCESS,
  INITIALIZE_SELECTION,
  SEARCH_ORGANIZATIONS,
  SEARCH_ORGANIZATIONS_ERROR,
  SEARCH_ORGANIZATIONS_SUCCESS,
  SEARCH_PATIENTS,
  SEARCH_PATIENTS_ERROR,
  SEARCH_PATIENTS_SUCCESS,
} from './constants';

export function initializeSelection() {
  return {
    type: INITIALIZE_SELECTION,
  };
}

export function getWorkflowRoles() {
  return {
    type: GET_WORKFLOW_ROLES,
  };
}

export function getWorkflowRolesSuccess(workflowRoles) {
  return {
    type: GET_WORKFLOW_ROLES_SUCCESS,
    workflowRoles,
  };
}

export function searchOrganizations(searchValue, showInactive, searchType, currentPage) {
  return {
    type: SEARCH_ORGANIZATIONS,
    searchValue,
    showInactive,
    searchType,
    currentPage,
  };
}

export function searchOrganizationsSuccess(organizations) {
  return {
    type: SEARCH_ORGANIZATIONS_SUCCESS,
    organizations,
  };
}

export function searchOrganizationsError(error) {
  return {
    type: SEARCH_ORGANIZATIONS_ERROR,
    error,
  };
}

export function getPractitionersOnRoleOrganization(role, organization) {
  return {
    type: GET_PRACTITIONERS_ON_ROLE_ORGANIZATION,
    role,
    organization,
  };
}

export function getPractitionersOnRoleOrganizationSuccess(role, practitioners) {
  return {
    type: GET_PRACTITIONERS_ON_ROLE_ORGANIZATION_SUCCESS,
    role,
    practitioners,
  };
}

export function searchPatients(searchValue, showInactive, searchType, currentPage) {
  return {
    type: SEARCH_PATIENTS,
    searchValue,
    showInactive,
    searchType,
    currentPage,
  };
}

export function searchPatientsSuccess(patients) {
  return {
    type: SEARCH_PATIENTS_SUCCESS,
    patients,
  };
}

export function searchPatientsError(error) {
  return {
    type: SEARCH_PATIENTS_ERROR,
    error,
  };
}
