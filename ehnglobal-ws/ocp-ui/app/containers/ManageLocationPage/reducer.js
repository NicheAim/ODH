/*
 *
 * ManageLocationPage reducer
 *
 */

import { fromJS } from 'immutable';
import { CREATE_LOCATION_ERROR, CREATE_LOCATION_SUCCESS, GET_LOCATION_ERROR, GET_LOCATION_SUCCESS } from './constants';

const initialState = fromJS({
  error: false,
  location: null,
});

function manageLocationPageReducer(state = initialState, action) {
  switch (action.type) {
    case CREATE_LOCATION_SUCCESS:
      return state
        .set('error', false);
    case CREATE_LOCATION_ERROR:
      return state.set('error', action.error);
    case GET_LOCATION_SUCCESS:
      return state
        .set('location', action.location);
    case GET_LOCATION_ERROR:
      return state
        .set('error', action.error);
    default:
      return state;
  }
}

export default manageLocationPageReducer;
