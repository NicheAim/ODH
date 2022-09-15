/*
 *
 * CareTeams actions
 *
 */

import { GET_CARE_TEAMS, GET_CARE_TEAMS_ERROR, GET_CARE_TEAMS_SUCCESS, INITIALIZE_CARE_TEAMS } from './constants';

export function initializeCareTeams() {
  return {
    type: INITIALIZE_CARE_TEAMS,
  };
}

export function getCareTeams(pageNumber, statusList = []) {
  return {
    type: GET_CARE_TEAMS,
    pageNumber,
    statusList,
  };
}

export function getCareTeamsSuccess(careTeamsPage) {
  return {
    type: GET_CARE_TEAMS_SUCCESS,
    careTeamsPage,
  };
}

export function getCareTeamsError(error) {
  return {
    type: GET_CARE_TEAMS_ERROR,
    error,
  };
}
