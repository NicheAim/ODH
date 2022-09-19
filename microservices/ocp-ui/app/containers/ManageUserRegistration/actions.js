/*
 *
 * ManageUserRegistration actions
 *
 */

import {
  GET_GROUPS, GET_GROUPS_SUCCESS, GET_GROUPS_ERROR, GET_USER, GET_USER_ERROR,
  GET_USER_SUCCESS, SAVE_USER, INITIALIZE_USER_REGISTRATION, REMOVE_USER,
} from './constants';

export function initializeUserRegistration() {
  return {
    type: INITIALIZE_USER_REGISTRATION,
  };
}

export function getUser(resourceType, resourceId) {
  return {
    type: GET_USER,
    resourceType,
    resourceId,
  };
}

export function getUserSuccess(fhirResource, user) {
  return {
    type: GET_USER_SUCCESS,
    fhirResource,
    user,
  };
}

export function getUserError(error) {
  return {
    type: GET_USER_ERROR,
    error,
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

export function saveUser(userFormData, handleSubmitting) {
  return {
    type: SAVE_USER,
    userFormData,
    handleSubmitting,
  };
}

export function removeUser(userId) {
  return {
    type: REMOVE_USER,
    userId,
  };
}

