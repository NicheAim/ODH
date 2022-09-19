/*
 *
 * SearchParticipant actions
 *
 */

import {
  ADD_PARTICIPANT,
  INITIALIZE_SEARCH_PARTICIPANT,
  INITIALIZE_SEARCH_PARTICIPANT_RESULT,
  REMOVE_PARTICIPANT,
  SEARCH_PARTICIPANT,
  SEARCH_PARTICIPANT_ERROR,
  SEARCH_PARTICIPANT_SUCCESS,
} from './constants';

export function getSearchParticipant(name, member, patientId, organizationId) {
  return {
    type: SEARCH_PARTICIPANT,
    name,
    member,
    patientId,
    organizationId,
  };
}

export function addParticipants(participants) {
  return {
    type: ADD_PARTICIPANT,
    participants,
  };
}


export function getSearchParticipantSuccess(searchParticipantResults) {
  return {
    type: SEARCH_PARTICIPANT_SUCCESS,
    searchParticipantResults,
  };
}

export function getSearchParticipantError(error) {
  return {
    type: SEARCH_PARTICIPANT_ERROR,
    error,
  };
}

export function initializeSearchParticipant(initialSelectedParticipants) {
  return {
    type: INITIALIZE_SEARCH_PARTICIPANT,
    initialSelectedParticipants,
  };
}

export function removeParticipant(participant) {
  return {
    type: REMOVE_PARTICIPANT,
    participant,
  };
}


export function initializeSearchParticipantResult() {
  return {
    type: INITIALIZE_SEARCH_PARTICIPANT_RESULT,
  };
}
