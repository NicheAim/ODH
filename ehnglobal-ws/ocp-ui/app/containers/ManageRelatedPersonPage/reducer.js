/*
 *
 * ManageRelatedPersonPage reducer
 *
 */

import { fromJS } from 'immutable';
import { GET_RELATED_PERSON_ERROR, GET_RELATED_PERSON_SUCCESS, SAVE_RELATED_PERSON_ERROR } from './constants';

const initialState = fromJS({
  error: false,
  relatedPerson: null,
});

function manageRelatedPersonPageReducer(state = initialState, action) {
  switch (action.type) {
    case GET_RELATED_PERSON_SUCCESS:
      return state
        .set('relatedPerson', action.relatedPerson);
    case GET_RELATED_PERSON_ERROR:
      return state
        .set('error', action.error);
    case SAVE_RELATED_PERSON_ERROR:
      return state
        .set('error', action.error);
    default:
      return state;

  }
}

export default manageRelatedPersonPageReducer;
