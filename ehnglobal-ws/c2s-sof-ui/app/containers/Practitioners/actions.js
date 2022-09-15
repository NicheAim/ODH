/*
 *
 * Practitioners actions
 *
 */

import {
  GET_PRACTITIONERS,
  GET_PRACTITIONERS_ERROR,
  GET_PRACTITIONERS_SUCCESS,
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

export function getPractitioners(currentPage, pageSize) {
  return {
    type: GET_PRACTITIONERS,
    currentPage,
    pageSize,
  };
}

export function getPractitionersSuccess(practitioners) {
  return {
    type: GET_PRACTITIONERS_SUCCESS,
    practitioners,
  };
}

export function getPractitionersError(error) {
  return {
    type: GET_PRACTITIONERS_ERROR,
    error,
  };
}

export function searchPractitioners(searchType, searchValue, includeInactive, currentPage) {
  return {
    type: SEARCH_PRACTITIONERS,
    searchType,
    searchValue,
    includeInactive,
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
