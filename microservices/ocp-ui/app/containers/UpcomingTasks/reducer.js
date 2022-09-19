/*
 *
 * UpcomingTasks reducer
 *
 */

import { fromJS } from 'immutable';
import { GET_UPCOMING_TASKS, GET_UPCOMING_TASKS_SUCCESS, GET_UPCOMING_TASKS_ERROR, INITIALIZE_UPCOMING_TASKS } from './constants';

const initialState = fromJS({
  loading: false,
  practitionerId: null,
  data: [],
});

function upcomingTasksReducer(state = initialState, action) {
  switch (action.type) {
    case INITIALIZE_UPCOMING_TASKS:
      return initialState;
    case GET_UPCOMING_TASKS:
      return state
        .set('loading', true)
        .set('practitionerId', action.practitionerId);
    case GET_UPCOMING_TASKS_SUCCESS:
      return state
        .set('loading', false)
        .set('data', fromJS(action.upcomingTasks || {}));
    case GET_UPCOMING_TASKS_ERROR:
      return state.set('loading', false);
    default:
      return state;
  }
}

export default upcomingTasksReducer;
