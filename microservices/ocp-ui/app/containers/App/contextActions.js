/*
 *
 * Context actions
 *
 */

import {
  CLEAR_ALL,
  CLEAR_LOCATION,
  CLEAR_ORGANIZATION,
  CLEAR_PATIENT,
  CLEAR_USER,
  GET_LOCATION,
  GET_OBSERVATION,
  GET_ORGANIZATION,
  GET_PATIENT,
  GET_SUBSCRIBER_OPTIONS,
  GET_SUBSCRIBER_OPTIONS_SUCCESS,
  REFRESH_LOCATION,
  REFRESH_ORGANIZATION,
  REFRESH_PATIENT,
  SET_LOCATION,
  SET_OBSERVATION,
  SET_ORGANIZATION,
  SET_PATIENT,
  SET_PRACTITIONER,
  SET_USER,
} from './contextConstants';

const actionTypesPrefix = 'ocpui/Context/';

export const contextActionTypes = {
  LOGOUT: actionTypesPrefix + 'LOGOUT',
  REFRESH_TOKEN: actionTypesPrefix + 'REFRESH_TOKEN',
  REFRESH_TOKEN_SUCCESS: actionTypesPrefix + 'REFRESH_TOKEN_SUCCESS',
};

export function setPatient(patient) {
  return {
    type: SET_PATIENT,
    patient,
  };
}

export function setOrganization(organization) {
  return {
    type: SET_ORGANIZATION,
    organization,
  };
}

export function setLocation(location) {
  return {
    type: SET_LOCATION,
    location,
  };
}

export function setPractitioner(practitioner) {
  return {
    type: SET_PRACTITIONER,
    practitioner,
  };
}

export function setUser(user) {
  return {
    type: SET_USER,
    user,
  };
}

export function clearPatient() {
  return {
    type: CLEAR_PATIENT,
  };
}

export function clearOrganization() {
  return {
    type: CLEAR_ORGANIZATION,
  };
}

export function clearLocation() {
  return {
    type: CLEAR_LOCATION,
  };
}

export function clearUser() {
  return {
    type: CLEAR_USER,
  };
}

export function clearAll() {
  return {
    type: CLEAR_ALL,
  };
}

export function refreshPatient() {
  return {
    type: REFRESH_PATIENT,
  };
}

export function refreshOrganization() {
  return {
    type: REFRESH_ORGANIZATION,
  };
}

export function refreshLocation() {
  return {
    type: REFRESH_LOCATION,
  };
}

export function getPatient(logicalId) {
  return {
    type: GET_PATIENT,
    logicalId,
  };
}

export function getObservation(logicalId) {
  return {
    type: GET_OBSERVATION,
    logicalId,
  };
}

export function setObservation(observation) {
  return {
    type: SET_OBSERVATION,
    observation,
  };
}

export function getOrganization(logicalId) {
  return {
    type: GET_ORGANIZATION,
    logicalId,
  };
}

export function getLocation(logicalId) {
  return {
    type: GET_LOCATION,
    logicalId,
  };
}

export function getSubscriberOptions(patientId) {
  return {
    type: GET_SUBSCRIBER_OPTIONS,
    patientId,
  };
}

export function getSubscriberOptionsSuccess(subscriberOptions) {
  return {
    type: GET_SUBSCRIBER_OPTIONS_SUCCESS,
    subscriberOptions,
  };
}

function logout(config) {
  return {
    type: contextActionTypes.LOGOUT,
    config,
  };
}

function refreshToken(refreshTokenData) {
  return {
    type: contextActionTypes.REFRESH_TOKEN,
    refreshTokenData
  };
}

function refreshTokenSuccess(refreshTokenData) {
  return {
    type: contextActionTypes.REFRESH_TOKEN_SUCCESS,
    refreshTokenData,
  };
}

export const contextActions = {
  clearAll,
  logout,
  refreshToken,
  refreshTokenSuccess,
};
