/*
 *
 * ManageRelatedPersonModal reducer
 *
 */

import { fromJS } from 'immutable';
import {
  REMOVE_RELATED_PERSON,
  REMOVE_RELATED_PERSON_ERROR,
  REMOVE_RELATED_PERSON_SUCCESS,
  SEARCH_RELATED_PERSONS,
  SEARCH_RELATED_PERSONS_ERROR,
  SEARCH_RELATED_PERSONS_SUCCESS,
} from './constants';


const initialState = fromJS({
  loading: false,
  submitting: false,
  data: [],
  currentPage: 0,
  totalNumberOfPages: 0,
});

function manageRelatedPersonModalReducer(state = initialState, action) {
  switch (action.type) {
    case SEARCH_RELATED_PERSONS:
      return state.set('loading', true);
    case SEARCH_RELATED_PERSONS_SUCCESS:
      return state
        .set('loading', false)
        .set('data', fromJS(action.relatedPersons.elements))
        .set('totalElements', action.relatedPersons.totalElements)
        .set('currentPageSize', action.relatedPersons.currentPageSize)
        .set('totalNumberOfPages', action.relatedPersons.totalNumberOfPages)
        .set('currentPage', action.relatedPersons.currentPage)
        .set('error', false);
    case SEARCH_RELATED_PERSONS_ERROR:
      return state
        .set('loading', false)
        .set('error', action.error);
    case REMOVE_RELATED_PERSON:
      return state.set('submitting', true);
    case REMOVE_RELATED_PERSON_SUCCESS:
      return state.set('submitting', false);
    case REMOVE_RELATED_PERSON_ERROR:
      return state.set('submitting', false);
    default:
      return state;
  }
}

export default manageRelatedPersonModalReducer;
