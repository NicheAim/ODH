/*
 *
 * ResetPassword reducer
 *
 */

import { fromJS } from 'immutable';
import { RESET_PASSWORD, RESET_PASSWORD_ERROR } from './constants';

const initialState = fromJS({
  error: null,
});

function resetPasswordReducer(state = initialState, action) {
  switch (action.type) {
    case RESET_PASSWORD:
      return state.set('error', null);
    case RESET_PASSWORD_ERROR:
      return state.set('error', action.error);
    default:
      return state;
  }
}

export default resetPasswordReducer;
