/*
 *
 * UserLoginDetailsPage reducer
 *
 */

import { fromJS } from 'immutable';
import { GET_USER_LOGIN_DETAILS, GET_USER_LOGIN_DETAILS_ERROR, GET_USER_LOGIN_DETAILS_SUCCESS } from './constants';

const initialState = fromJS({
  loading: false,
  data: null,
});

function userLoginDetailsPageReducer(state = initialState, action) {
  switch (action.type) {
    case GET_USER_LOGIN_DETAILS:
      return state
        .set('loading', true);
    case GET_USER_LOGIN_DETAILS_SUCCESS:
      return state
        .set('loading', false)
        .set('data', fromJS(action.userLoginDetails));
    case GET_USER_LOGIN_DETAILS_ERROR:
      return state
        .set('loading', false)
        .set('error', action.error);
    default:
      return state;
  }
}

export default userLoginDetailsPageReducer;
