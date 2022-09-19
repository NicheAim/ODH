/*
 *
 * ActivityDefinitions actions
 *
 */

import {
  GET_ACTIVITY_DEFINITIONS_IN_ORGANIZATION,
  GET_ACTIVITY_DEFINITIONS_IN_ORGANIZATION_ERROR,
  GET_ACTIVITY_DEFINITIONS_IN_ORGANIZATION_SUCCESS,
} from './constants';

export function getActivityDefinitionsInOrganization(currentPage) {
  return {
    type: GET_ACTIVITY_DEFINITIONS_IN_ORGANIZATION,
    currentPage,
  };
}

export function getActivityDefinitionsInOrganizationSuccess(activityDefinitions) {
  return {
    type: GET_ACTIVITY_DEFINITIONS_IN_ORGANIZATION_SUCCESS,
    activityDefinitions,
  };
}

export function getActivityDefinitionsInOrganizationError(error) {
  return {
    type: GET_ACTIVITY_DEFINITIONS_IN_ORGANIZATION_ERROR,
    error,
  };
}
