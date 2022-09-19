/*
 *
 * Communication reducer
 *
 */

import { fromJS } from 'immutable';
import {
  GET_COMMUNICATIONS,
  GET_COMMUNICATIONS_ERROR,
  GET_COMMUNICATIONS_SUCCESS,
  INITIALIZE_COMMUNICATIONS,
} from 'containers/Communications/constants';

const initialState = fromJS({
  data: {},
  loading: false,
});

function communicationsReducer(state = initialState, action) {
  switch (action.type) {
    case INITIALIZE_COMMUNICATIONS:
      return initialState;
    case GET_COMMUNICATIONS:
      return state.set('loading', true);
    case GET_COMMUNICATIONS_SUCCESS:
      return state
        .set('error', false)
        .set('loading', false)
        .set('data', fromJS((action.communications) || {}));
    case GET_COMMUNICATIONS_ERROR:
      return state
        .set('error', action.error)
        .set('loading', false);
    default:
      return state;
  }
}

export default communicationsReducer;
