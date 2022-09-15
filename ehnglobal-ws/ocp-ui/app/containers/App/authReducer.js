/*
 *
 * authReducer
 *
 */

import { fromJS } from 'immutable';
import { checkAuthenticated } from '../../utils/auth';
import { LOGIN, LOGIN_ERROR, LOGIN_SUCCESS } from '../LoginPage/constants';
import { contextActionTypes } from './contextActions';

const initialState = fromJS({
  isAuthenticating: false,
  isAuthenticated: checkAuthenticated(),
});

function authReducer(state = initialState, action) {
  switch (action.type) {
    case LOGIN:
      return state.set('isAuthenticating', true);
    case LOGIN_SUCCESS:
      return state
        .set('isAuthenticating', false)
        .set('isAuthenticated', action.isAuthenticated);
    case LOGIN_ERROR:
      return state
        .set('isAuthenticating', false)
        .set('isAuthenticated', false)
        .set('error', action.error);
    case contextActionTypes.LOGOUT:
      return initialState;
    default:
      return state;
  }
}

export default authReducer;
