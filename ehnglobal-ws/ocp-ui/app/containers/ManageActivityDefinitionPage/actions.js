/*
 *
 * ManageActivityDefinitionPage actions
 *
 */

import {
  GET_ACTIVITY_DEFINITION,
  GET_ACTIVITY_DEFINITION_ERROR,
  GET_ACTIVITY_DEFINITION_SUCCESS,
  SAVE_ACTIVITY_DEFINITION,
  SAVE_ACTIVITY_DEFINITION_ERROR,
} from './constants';


export function getActivityDefinition(activityDefinitionId) {
  return {
    type: GET_ACTIVITY_DEFINITION,
    activityDefinitionId,
  };
}

export function getActivityDefinitionSuccess(activityDefinition) {
  return {
    type: GET_ACTIVITY_DEFINITION_SUCCESS,
    activityDefinition,
  };
}

export function getActivityDefinitionError(error) {
  return {
    type: GET_ACTIVITY_DEFINITION_ERROR,
    error,
  };
}

export function saveActivityDefinition(activityDefinitionFormData, handleSubmitting) {
  return {
    type: SAVE_ACTIVITY_DEFINITION,
    activityDefinitionFormData,
    handleSubmitting,
  };
}

export function saveActivityDefinitionError(error) {
  return {
    type: SAVE_ACTIVITY_DEFINITION_ERROR,
    error,
  };
}
