/*
 *
 * ManageCareTeamPage actions
 *
 */

import {
  GET_CARE_TEAM,
  GET_CARE_TEAM_SUCCESS,
  INITIALIZE_MANAGE_CARE_TEAM,
  SAVE_CARE_TEAM,
  GET_EVENT_TYPES, GET_EVENT_TYPES_ERROR,
  GET_EVENT_TYPES_SUCCESS,
} from './constants';

export function initializeManageCareTeam() {
  return {
    type: INITIALIZE_MANAGE_CARE_TEAM,
  };
}

export function getCareTeam(careTeamId) {
  return {
    type: GET_CARE_TEAM,
    careTeamId,
  };
}

export function getCareTeamSuccess(careTeam) {
  return {
    type: GET_CARE_TEAM_SUCCESS,
    careTeam,
  };
}

export function saveCareTeam(careTeamFormData, handleSubmitting) {
  return {
    type: SAVE_CARE_TEAM,
    careTeamFormData,
    handleSubmitting,
  };
}


export function getEventTypes(patientId) {
  return {
    type: GET_EVENT_TYPES,
    patientId,
  };
}

export function getEventTypesSuccess(eventTypes) {
  return {
    type: GET_EVENT_TYPES_SUCCESS,
    eventTypes,
  };
}

export function getEventTypesError(err) {
  return {
    type: GET_EVENT_TYPES_ERROR,
    err,
  };
}
