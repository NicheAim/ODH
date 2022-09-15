/*
 *
 * ManageConditionPage actions
 *
 */

import {
  CREATE_CONDITION,
  GET_CONDITION,
  GET_CONDITION_ERROR,
  GET_CONDITION_SUCCESS,
  SAVE_CONDITION_ERROR,
  UPDATE_CONDITION,
} from './constants';

export function createCondition(condition, handleSubmitting) {
  return {
    type: CREATE_CONDITION,
    condition,
    handleSubmitting,
  };
}

export function getCondition(conditionId) {
  return {
    type: GET_CONDITION,
    conditionId,
  };
}

export function getConditionSuccess(condition) {
  return {
    type: GET_CONDITION_SUCCESS,
    condition,
  };
}

export function getConditionError(error) {
  return {
    type: GET_CONDITION_ERROR,
    error,
  };
}

export function saveConditionError(error) {
  return {
    type: SAVE_CONDITION_ERROR,
    error,
  };
}

export function updateCondition(condition, handleSubmitting) {
  return {
    type: UPDATE_CONDITION,
    condition,
    handleSubmitting,
  };
}
