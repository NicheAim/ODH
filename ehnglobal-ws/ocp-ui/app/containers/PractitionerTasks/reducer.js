/*
 *
 * PractitionerTasks reducer
 *
 */

import { fromJS } from 'immutable';
import {
  GET_FILTER_TASK,
  GET_FILTER_TASK_ERROR,
  GET_FILTER_TASK_SUCCESS,
  GET_PRACTITIONER_TASKS,
  GET_PRACTITIONER_TASKS_ERROR,
  GET_PRACTITIONER_TASKS_SUCCESS,
} from 'containers/PractitionerTasks/constants';


const initialState = fromJS({
  data: [],
  loading: false,
});

function practitionerTasksReducer(state = initialState, action) {
  switch (action.type) {
    case GET_PRACTITIONER_TASKS:
      return state.set('loading', true);
    case GET_PRACTITIONER_TASKS_SUCCESS:
      return state
        .set('error', false)
        .set('loading', false)
        .set('data', fromJS((action.tasks) || []));
    case GET_PRACTITIONER_TASKS_ERROR:
      return state
        .set('error', true)
        .set('loading', false);
    case GET_FILTER_TASK:
      return state
        .set('error', false)
        .set('loading', true);
    case GET_FILTER_TASK_SUCCESS:
      return state
        .set('error', false)
        .set('loading', false)
        .set('data', fromJS((action.tasks) || []));
    case GET_FILTER_TASK_ERROR:
      return state
        .set('error', true)
        .set('loading', false);
    default:
      return state;
  }
}

export default practitionerTasksReducer;
