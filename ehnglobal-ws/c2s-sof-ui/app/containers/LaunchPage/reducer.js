/*
 *
 * LaunchPage reducer
 *
 */

import { fromJS } from 'immutable';
import {
  GET_METADATA,
} from './constants';

const initialState = fromJS({
  iss: null,
  launch: null,
  state: null,
  metadata: {},
});

function launchPageReducer(state = initialState, action) {
  switch (action.type) {
    case GET_METADATA:
      return state
        .set('iss', action.iss)
        .set('launch', action.launch);
    default:
      return state;
  }
}

export default launchPageReducer;
