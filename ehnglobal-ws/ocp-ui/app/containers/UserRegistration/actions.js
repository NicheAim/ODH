/*
 *
 * UserRegistration actions
 *
 */

import {
  SEARCH_RESOURCES, SEARCH_RESOURCES_ERROR,
  SEARCH_RESOURCES_SUCCESS, INITIALIZE_USER_REGISTRATION,
} from './constants';

export function initializeUserRegistration() {
  return {
    type: INITIALIZE_USER_REGISTRATION,
  };
}


export function searchResources(searchType, searchValue, resourceType, includeInactive, currentPage, organization) {
  return {
    type: SEARCH_RESOURCES,
    searchType,
    searchValue,
    resourceType,
    includeInactive,
    currentPage,
    organization,
  };
}

export function searchResourcesSuccess(resources) {
  return {
    type: SEARCH_RESOURCES_SUCCESS,
    resources,
  };
}

export function searchResourcesError(error) {
  return {
    type: SEARCH_RESOURCES_ERROR,
    error,
  };
}
