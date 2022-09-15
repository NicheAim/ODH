/*
 *
 * reducer
 *
 */

import { fromJS } from 'immutable';
import { actionTypes } from './actions';

const initialState = fromJS({
  loading: false,
  data: {},
  carePlan: {},
  tasks: {},
  goalsWithTask: {},
  emergency_contact: null,
});

function reducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.INITIALIZE:
      return initialState;

    case actionTypes.FAILURE:
      return state.set('loading', false).set('error', action.error);

    case actionTypes.GET_GOALS:
      return state.set('loading', true).set('data', fromJS({}));

    case actionTypes.GET_GOALS_SUCCESS:
      return state
        .set('loading', false)
        .set('data', fromJS(action.responseData || {}));

    case actionTypes.GET_CARE_PLAN:
      return state.set('loading', true).set('carePlan', fromJS({}));

    case actionTypes.GET_CARE_PLAN_SUCCESS:
      return state
        .set('loading', false)
        .set('carePlan', fromJS(action.responseData || {}));

    case actionTypes.GET_TASKS:
      return state.set('loading', true).set('carePlan', fromJS({}));

    case actionTypes.GET_TASKS_SUCCESS:
      return state
        .set('loading', false)
        .set('tasks', fromJS(action.responseData || {}));

    case actionTypes.GET_GOALS_WITH_TASKS_SUCCESS:
      return state.set('goalsWithTask', fromJS(action.responseData || {}));

    case actionTypes.SET_EMERGENCY_CONTACT_RELATED_PERSON:
      return state.set('emergency_contact', fromJS(action.data || {}));

    default:
      return state;
  }
}

export default reducer;
