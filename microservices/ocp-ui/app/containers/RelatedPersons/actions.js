/*
 *
 * RelatedPersons actions
 *
 */

const actionTypesPrefix = 'ocpui/RelatedPersons/';

export const actionTypes = {
  INITIALIZE_RELATED_PERSONS: actionTypesPrefix + 'INITIALIZE_RELATED_PERSONS',
  GET_RELATED_PERSONS: actionTypesPrefix + 'GET_RELATED_PERSONS',
  GET_RELATED_PERSONS_ERROR: actionTypesPrefix + 'GET_RELATED_PERSONS_ERROR',
  GET_RELATED_PERSONS_SUCCESS:
    actionTypesPrefix + 'GET_RELATED_PERSONS_SUCCESS',
};

function initializeRelatedPersons() {
  return {
    type: actionTypes.INITIALIZE_RELATED_PERSONS,
  };
}

function getRelatedPersons(showInActive, pageNumber) {
  return {
    type: actionTypes.GET_RELATED_PERSONS,
    showInActive,
    pageNumber,
  };
}

function getRelatedPersonsSuccess(relatedPersons) {
  return {
    type: actionTypes.GET_RELATED_PERSONS_SUCCESS,
    relatedPersons,
  };
}

function saveRelatedPersonsError(error) {
  return {
    type: actionTypes.GET_RELATED_PERSONS_ERROR,
    error,
  };
}

export const actions = {
  initializeRelatedPersons,
  getRelatedPersons,
  getRelatedPersonsSuccess,
  saveRelatedPersonsError,
};
