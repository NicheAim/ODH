/*
 *
 * Coverages reducer
 *
 */

import { fromJS } from 'immutable';
import {
  GET_COVERAGE,
  GET_COVERAGE_ERROR,
  GET_COVERAGE_SUCCESS } from 'containers/Coverages/constants';

const initialState = fromJS({
  data: {},
  loading: false,
});

function coveragesReducer(state = initialState, action) {
  switch (action.type) {
    case GET_COVERAGE:
      return state.set('loading', true);
    case GET_COVERAGE_SUCCESS:
      return state
        .set('error', false)
        .set('loading', false)
        .set('data', fromJS((action.coverages) || {}));
    case GET_COVERAGE_ERROR:
      return state
        .set('error', action.error)
        .set('loading', false);
    default:
      return state;
  }
}

export default coveragesReducer;
