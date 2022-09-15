/*
 *
 * Locations actions
 *
 */

import {
  GET_ACTIVE_LOCATIONS,
  GET_FILTERED_LOCATIONS,
  GET_LOCATIONS_ERROR,
  GET_LOCATIONS_SUCCESS,
  SEARCH_LOCATIONS,
  SEARCH_LOCATIONS_ERROR,
  SEARCH_LOCATIONS_SUCCESS,
  INITIALIZE_LOCATIONS,
} from './constants';


export function getFilteredLocations(currentPage, includeInactive, includeSuspended) {
  return {
    type: GET_FILTERED_LOCATIONS,
    currentPage,
    includeInactive,
    includeSuspended,
  };
}

export function getActiveLocations(currentPage) {
  return {
    type: GET_ACTIVE_LOCATIONS,
    currentPage,
  };
}

export function getLocationsSuccess(locations, includeInactive, includeSuspended) {
  return {
    type: GET_LOCATIONS_SUCCESS,
    locations,
    includeInactive,
    includeSuspended,
  };
}

export function getLocationsError(error) {
  return {
    type: GET_LOCATIONS_ERROR,
    error,
  };
}

export function searchLocations(searchValue, includeInactive, searchType, currentPage) {
  return {
    type: SEARCH_LOCATIONS,
    searchValue,
    includeInactive,
    searchType,
    currentPage,
  };
}

export function searchLocationsSuccess(locations) {
  return {
    type: SEARCH_LOCATIONS_SUCCESS,
    locations,
  };
}

export function searchLocationsError(error) {
  return {
    type: SEARCH_LOCATIONS_ERROR,
    error,
  };
}

export function initializeLocations() {
  return {
    type: INITIALIZE_LOCATIONS,
  };
}
