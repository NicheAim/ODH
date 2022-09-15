/*
 *
 * configReducer
 *
 */

import { fromJS } from 'immutable';
import { GET_CONFIG_SUCCESS } from './constants';

// initial state is set to null, so the containers can easily see if a config is fetched yet
const initialState = fromJS(null);

function configReducer(state = initialState, action) {
  switch (action.type) {
    case GET_CONFIG_SUCCESS:
      return fromJS(action.config);
    default:
      return state;
  }
}

export default configReducer;
