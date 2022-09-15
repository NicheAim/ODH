/*
 *
 * Context reducer
 *
 */

import { fromJS } from 'immutable';
import { contextActionTypes } from './contextActions';
import {
  CLEAR_ALL,
  CLEAR_LOCATION,
  CLEAR_ORGANIZATION,
  CLEAR_PATIENT,
  CLEAR_USER,
  GET_SUBSCRIBER_OPTIONS_SUCCESS,
  SET_LOCATION,
  SET_ORGANIZATION,
  SET_PATIENT,
  SET_PRACTITIONER,
  SET_USER,
} from './contextConstants';

const initialState = fromJS({
  user: null,
  organization: null,
  location: null,
  practitioner: null,
  patient: null,
  subscriptionOptions: [],
});

function contextReducer(state = initialState, action) {
  switch (action.type) {
    case SET_PATIENT:
      return state.set('patient', fromJS(action.patient));
    case SET_ORGANIZATION:
      return state
        .set(
          'location',
          state.getIn(['organization', 'logicalId']) ===
            action.organization.logicalId
            ? state.get('location')
            : fromJS(null)
        )
        .set('organization', fromJS(action.organization));
    case SET_LOCATION:
      return state.set('location', fromJS(action.location));
    case SET_PRACTITIONER:
      return state.set('practitioner', fromJS(action.practitioner));
    case SET_USER:
      return state.set('user', fromJS(action.user));
    case CLEAR_PATIENT:
      return state.set('patient', fromJS(null));
    case CLEAR_ORGANIZATION:
      return state
        .set('organization', fromJS(null))
        .set('location', fromJS(null));
    case CLEAR_LOCATION:
      return state.set('location', fromJS(null));
    case GET_SUBSCRIBER_OPTIONS_SUCCESS:
      return state.set(
        'subscriptionOptions',
        fromJS(action.subscriberOptions || [])
      );
    case CLEAR_USER:
      return state.set('user', fromJS(null));
    case CLEAR_ALL:
      return fromJS(initialState.toJS());
    case contextActionTypes.REFRESH_TOKEN_SUCCESS:
      const stateJs = state.toJS();
      const stateUser = stateJs.user;
      const newStateUser = {
        ...stateUser,
        ...action.refreshTokenData,
      };
      return state.set('user', fromJS(newStateUser));
    default:
      return state;
  }
}

export default contextReducer;
