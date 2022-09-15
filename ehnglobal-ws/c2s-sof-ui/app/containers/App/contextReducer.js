/*
 *
 * Context reducer
 *
 */

import { fromJS } from 'immutable';
import {
  CLEAR_ALL,
  CLEAR_PATIENT,
  CLEAR_USER,
  GET_ORGANIZATIONS_BY_PRACTITIONER_ERROR,
  GET_ORGANIZATIONS_BY_PRACTITIONER_SUCCESS,
  GET_PATIENT_ERROR,
  GET_USER_CONTEXT_ERROR,
  SET_PATIENT,
  SET_USER,
} from './contextConstants';


const initialState = fromJS({
  user: null,
  patient: null,
});

function contextReducer(state = initialState, action) {
  switch (action.type) {
    case GET_PATIENT_ERROR:
      return state.setIn(['error', 'patient'], fromJS(action.error));
    case GET_ORGANIZATIONS_BY_PRACTITIONER_ERROR:
      return state.setIn(['error', 'organizations'], fromJS(action.error));
    case GET_USER_CONTEXT_ERROR:
      return state.setIn(['error', 'user'], fromJS(action.error));
    case SET_PATIENT:
      return state.set('patient', fromJS(action.patient));
    case SET_USER:
      return state.set('user', fromJS(action.user));
    case GET_ORGANIZATIONS_BY_PRACTITIONER_SUCCESS:
      return state.set('organizations', fromJS(action.organizations));
    case CLEAR_PATIENT:
      return state.set('patient', fromJS(null));
    case CLEAR_USER:
      return state.set('user', fromJS(null));
    case CLEAR_ALL:
      return fromJS(initialState.toJS());
    default:
      return state;
  }
}

export default contextReducer;
