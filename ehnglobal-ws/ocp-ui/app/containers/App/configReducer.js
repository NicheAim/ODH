/*
 *
 * configReducer
 *
 */

import { fromJS } from 'immutable';
import { GET_CONFIG_SUCCESS } from './constants';

const initialState = fromJS({});

function configReducer(state = initialState, action) {
  switch (action.type) {
    case GET_CONFIG_SUCCESS:
      return fromJS(action.config);
    default:
      return state;
  }
}

export default configReducer;
