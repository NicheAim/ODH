/*
 *
 * ManagePractitionerPage reducer
 *
 */

import { fromJS } from 'immutable';
import {
  GET_ORGANIZATIONS,
  GET_ORGANIZATIONS_ERROR,
  GET_ORGANIZATIONS_SUCCESS,
  GET_PRACTITIONER_ERROR,
  GET_PRACTITIONER_SUCCESS,
  INITIALIZE_MANAGE_PRACTITIONER,
  SAVE_PRACTITIONER,
  SAVE_PRACTITIONER_ERROR,
  INITIALIZE_ORGANIZATIONS,
} from './constants';

const initialState = fromJS({
  error: false,
  practitioner: null,
  organizations: {
    loading: false,
    data: [],
    currentPage: 0,
    totalNumberOfPages: 0,
  },
});

function managePractitionerPageReducer(state = initialState, action) {
  switch (action.type) {
    case INITIALIZE_MANAGE_PRACTITIONER:
      return initialState;
    case SAVE_PRACTITIONER:
      return state
        .set('error', false);
    case SAVE_PRACTITIONER_ERROR:
      return state
        .set('error', action.error);
    case GET_PRACTITIONER_SUCCESS:
      return state
        .set('practitioner', action.practitioner);
    case GET_PRACTITIONER_ERROR:
      return state
        .set('error', action.error);
    case GET_ORGANIZATIONS:
      return state
        .setIn(['organizations', 'loading'], true);
    case INITIALIZE_ORGANIZATIONS:
      return state
        .setIn(['organizations', 'loading'], false)
        .setIn(['organizations', 'data'], fromJS([]))
        .setIn(['organizations', 'totalNumberOfPages'], 0)
        .setIn(['organizations', 'currentPage'], 0);
    case GET_ORGANIZATIONS_SUCCESS:
      return state
        .setIn(['organizations', 'loading'], false)
        .setIn(['organizations', 'data'], fromJS(action.organizations.elements))
        .setIn(['organizations', 'totalNumberOfPages'], action.organizations.totalNumberOfPages)
        .setIn(['organizations', 'currentPage'], action.organizations.currentPage);
    case GET_ORGANIZATIONS_ERROR:
      return state
        .setIn(['organizations', 'loading'], false)
        .setIn(['organizations', 'data'], fromJS([]))
        .set('error', action.err);
    default:
      return state;
  }
}

export default managePractitionerPageReducer;
