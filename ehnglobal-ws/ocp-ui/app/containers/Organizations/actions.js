/*
 *
 * Organizations actions
 *
 */

import {
  GET_ORGANIZATIONS,
  GET_ORGANIZATIONS_ERROR,
  GET_ORGANIZATIONS_SUCCESS,
  INITIALIZE_ORGANIZATIONS,
  SEARCH_ORGANIZATIONS,
  SEARCH_ORGANIZATIONS_ERROR,
  SEARCH_ORGANIZATIONS_SUCCESS,
} from './constants';

export function initializeOrganizations(organizations) {
  return {
    type: INITIALIZE_ORGANIZATIONS,
    organizations,
  };
}

export function getOrganizations(currentPage, pageSize) {
  return {
    type: GET_ORGANIZATIONS,
    currentPage,
    pageSize,
  };
}

export function getOrganizationsSuccess(organizations) {
  return {
    type: GET_ORGANIZATIONS_SUCCESS,
    organizations,
  };
}

export function getOrganizationsError(error) {
  return {
    type: GET_ORGANIZATIONS_ERROR,
    error,
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
