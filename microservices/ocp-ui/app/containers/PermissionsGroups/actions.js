/*
 *
 * PermissionsGroups actions
 *
 */

import {
  GET_GROUPS,
  GET_GROUPS_ERROR,
  GET_GROUPS_SUCCESS,
  GET_SCOPES,
  GET_SCOPES_ERROR,
  GET_SCOPES_SUCCESS,
  INITIALIZE_PERMISSIONS_GROUP,
  SAVE_GROUP,
  SAVE_GROUP_ERROR,
  SAVE_GROUP_SUCCESS,
} from './constants';

export function initializePermissionsGroup() {
  return {
    type: INITIALIZE_PERMISSIONS_GROUP,
  };
}

export function getGroups() {
  return {
    type: GET_GROUPS,
  };
}

export function getGroupsSuccess(groups) {
  return {
    type: GET_GROUPS_SUCCESS,
    groups,
  };
}

export function getGroupsError(error) {
  return {
    type: GET_GROUPS_ERROR,
    error,
  };
}

export function getScopes() {
  return {
    type: GET_SCOPES,
  };
}

export function getScopesSuccess(scopes) {
  return {
    type: GET_SCOPES_SUCCESS,
    scopes,
  };
}

export function getScopesError(error) {
  return {
    type: GET_SCOPES_ERROR,
    error,
  };
}

export function saveGroup(group, handleSubmitting) {
  return {
    type: SAVE_GROUP,
    group,
    handleSubmitting,
  };
}

export function saveGroupSuccess(group) {
  return {
    type: SAVE_GROUP_SUCCESS,
    group,
  };
}

export function saveGroupError(error) {
  return {
    type: SAVE_GROUP_ERROR,
    error,
  };
}
