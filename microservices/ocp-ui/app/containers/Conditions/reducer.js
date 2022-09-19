/*
 *
 * Conditions reducer
 *
 */
import { fromJS } from 'immutable';
import {
  GET_CONDITIONS,
  GET_CONDITIONS_ERROR,
  GET_CONDITIONS_SUCCESS,
  INITIALIZE_CONDITIONS,
} from './constants';

const initialState = fromJS({
  data: {},
  loading: false,
});

function conditionsReducer(state = initialState, action) {
  switch (action.type) {
    case INITIALIZE_CONDITIONS:
      return initialState;
    case GET_CONDITIONS:
      return state.set('loading', true);
    case GET_CONDITIONS_SUCCESS:
      console.log('action');
      console.log(action);
      return state
        .set('error', false)
        .set('loading', false)
        .setIn(
          ['conditions', 'totalElements'],
          action.conditions.totalNumberOfPages
        )
        .set('data', fromJS(action.conditions || {}));
    case GET_CONDITIONS_ERROR:
      return state.set('loading', false).set('error', action.error);
    default:
      return state;
  }
}

export default conditionsReducer;
