/*
 *
 * ChangePassword reducer
 *
 */

import { fromJS } from 'immutable';
import { CHANGE_PASSWORD, CHANGE_PASSWORD_ERROR } from './constants';

const initialState = fromJS({
  error: null,
});

function changePasswordReducer(state = initialState, action) {
  switch (action.type) {
    case CHANGE_PASSWORD:
      return state.set('error', null);
    case CHANGE_PASSWORD_ERROR:
      return state.set('error', action.error);
    default:
      return state;
  }
}

export default changePasswordReducer;
