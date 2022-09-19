/*
 *
 * ManageRelatedPersonPage actions
 *
 */

import {
  CREATE_RELATED_PERSON,
  GET_RELATED_PERSON,
  GET_RELATED_PERSON_ERROR,
  GET_RELATED_PERSON_SUCCESS,
  SAVE_RELATED_PERSON_ERROR,
  UPDATE_RELATED_PERSON,
} from './constants';

export function createRelatedPerson(relatedPerson, handleSubmitting) {
  return {
    type: CREATE_RELATED_PERSON,
    relatedPerson,
    handleSubmitting,
  };
}

export function getRelatedPerson(relatedPersonId) {
  return {
    type: GET_RELATED_PERSON,
    relatedPersonId,
  };
}

export function getRelatedPersonSuccess(relatedPerson) {
  return {
    type: GET_RELATED_PERSON_SUCCESS,
    relatedPerson,
  };
}

export function getRelatedPersonError(error) {
  return {
    type: GET_RELATED_PERSON_ERROR,
    error,
  };
}

export function saveRelatedPersonError(error) {
  return {
    type: SAVE_RELATED_PERSON_ERROR,
    error,
  };
}

export function updateRelatedPerson(relatedPerson, handleSubmitting) {
  return {
    type: UPDATE_RELATED_PERSON,
    relatedPerson,
    handleSubmitting,
  };
}

