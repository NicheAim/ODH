/*
 *
 * ManageUserRegistration reducer
 *
 */

import { fromJS } from 'immutable';
import {
  GET_GROUPS, GET_GROUPS_ERROR, GET_GROUPS_SUCCESS, GET_USER,
  GET_USER_ERROR, GET_USER_SUCCESS, SAVE_USER_ERROR, INITIALIZE_USER_REGISTRATION,
} from './constants';

const initialState = fromJS({
  loading: false,
  error: false,
  groups: [],
  user: null,
});

function manageUserRegistrationReducer(state = initialState, action) {
  switch (action.type) {
    case INITIALIZE_USER_REGISTRATION:
      return initialState;
    case GET_USER:
      return state
        .set('loading', true);
    case GET_USER_SUCCESS:
      return state
        .set('loading', false)
        .set('fhirResource', fromJS(action.fhirResource))
        .set('user', fromJS(action.user));
    case GET_USER_ERROR:
      return state
        .set('loading', false)
        .set('error', action.error);
    case GET_GROUPS:
      return state
        .set('loading', true);
    case GET_GROUPS_SUCCESS:
      return state
        .set('loading', false)
        .set('groups', fromJS(action.groups));
    case GET_GROUPS_ERROR:
      return state
        .set('loading', false)
        .set('error', action.error);
    case SAVE_USER_ERROR:
      return state
        .set('loading', false)
        .set('error', action.error);
    default:
      return state;
  }
}

export default manageUserRegistrationReducer;
