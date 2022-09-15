/*
 *
 * Observations reducer
 *
 */
import { fromJS } from 'immutable';
import {
  GET_OBSERVATIONS,
  GET_OBSERVATIONS_ERROR,
  GET_OBSERVATIONS_SUCCESS
} from './constants';

const initialState = fromJS({
  loading: false,
  observations: [],
});

function observationsReducer(state = initialState, action) {
  switch (action.type) {
    case GET_OBSERVATIONS:
      return state
        .set('loading', true)
        .set('observations', fromJS([]));
    case GET_OBSERVATIONS_SUCCESS:
      return state
        .set('loading', false)
        .set('observations', fromJS(action.observations || []))
    case GET_OBSERVATIONS_ERROR:
      return state
        .set('loading', false)
        .set('error', action.error);
    default:
      return state;
  }
}

export default observationsReducer;
