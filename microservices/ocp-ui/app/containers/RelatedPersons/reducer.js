/*
 *
 * RelatedPersons reducer
 *
 */

import { fromJS } from 'immutable';
import { actionTypes } from './actions';

const initialState = fromJS({
  data: {},
  loading: false,
});

function relatedPersonsReducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.INITIALIZE_RELATED_PERSONS:
      return initialState;
    case actionTypes.GET_RELATED_PERSONS:
      return state.set('loading', true);
    case actionTypes.GET_RELATED_PERSONS_SUCCESS:
      return state
        .set('error', false)
        .set('loading', false)
        .setIn(
          ['relatedPersons', 'totalElements'],
          action.relatedPersons.totalNumberOfPages
        )
        .set('data', fromJS(action.relatedPersons || {}));
    default:
      return state;
  }
}

export default relatedPersonsReducer;
