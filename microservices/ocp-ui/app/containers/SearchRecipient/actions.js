/*
 *
 * SearchRecipient actions
 *
 */


import {
  ADD_RECIPIENT, GET_RECIPIENTS, GET_RECIPIENTS_ERROR,
  GET_RECIPIENTS_SUCCESS, INITIALIZE_SEARCH_RECIPIENTS,
  REMOVE_RECIPIENT,
  SET_SELECT_RECIPIENT_STATUS, INITIALIZE_LIST_OF_RECIPIENTS, SET_SELECTED_RECIPIENTS,
} from 'containers/SearchRecipient/constants';

export function getRecipients(patientId, member, name, communicationId) {
  return {
    type: GET_RECIPIENTS,
    patientId,
    member,
    communicationId,
    name,
  };
}

export function getRecipientsSuccess(recipients) {
  return {
    type: GET_RECIPIENTS_SUCCESS,
    recipients,
  };
}


export function getRecipientsError(error) {
  return {
    type: GET_RECIPIENTS_ERROR,
    error,
  };
}

export function addSelectedRecipients() {
  return {
    type: ADD_RECIPIENT,
  };
}

export function removeSelectedRecipient(checked, recipientReference) {
  return {
    type: REMOVE_RECIPIENT,
    checked,
    recipientReference,
  };
}

export function setSelectRecipientStatus(checked, recipientReference) {
  return {
    type: SET_SELECT_RECIPIENT_STATUS,
    checked,
    recipientReference,
  };
}

export function initializeListOfRecipients() {
  return {
    type: INITIALIZE_LIST_OF_RECIPIENTS,
  };
}


export function initializeSearchRecipients() {
  return {
    type: INITIALIZE_SEARCH_RECIPIENTS,
  };
}

export function setInitialRecipients(selectedRecipients) {
  return {
    type: SET_SELECTED_RECIPIENTS,
    selectedRecipients,
  };
}
