/*
 *
 * Practitioners actions
 *
 */

import {
  GET_PRACTITIONERS_IN_ORGANIZATION,
  GET_PRACTITIONERS_IN_ORGANIZATION_ERROR,
  GET_PRACTITIONERS_IN_ORGANIZATION_SUCCESS,
  INITIALIZE_PRACTITIONERS,
  SEARCH_PRACTITIONERS,
  SEARCH_PRACTITIONERS_ERROR,
  SEARCH_PRACTITIONERS_SUCCESS,
} from './constants';

export function initializePractitioners() {
  return {
    type: INITIALIZE_PRACTITIONERS,
  };
}

export function getPractitionersInOrganization(currentPage, pageSize) {
  return {
    type: GET_PRACTITIONERS_IN_ORGANIZATION,
    currentPage,
    pageSize,
  };
}

export function getPractitionersInOrganizationSuccess(practitioners) {
  return {
    type: GET_PRACTITIONERS_IN_ORGANIZATION_SUCCESS,
    practitioners,
  };
}

export function getPractitionersInOrganizationError(error) {
  return {
    type: GET_PRACTITIONERS_IN_ORGANIZATION_ERROR,
    error,
  };
}

export function searchPractitioners(searchType, searchValue, includeInactive, organization, currentPage) {
  return {
    type: SEARCH_PRACTITIONERS,
    searchType,
    searchValue,
    includeInactive,
    organization,
    currentPage,
  };
}

export function searchPractitionersSuccess(practitioners) {
  return {
    type: SEARCH_PRACTITIONERS_SUCCESS,
    practitioners,
  };
}

export function searchPractitionersError(error) {
  return {
    type: SEARCH_PRACTITIONERS_ERROR,
    error,
  };
}
