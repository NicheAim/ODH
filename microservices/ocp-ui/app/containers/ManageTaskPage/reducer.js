/*
 *
 * ManageTaskPage reducer
 *
 */

import { fromJS } from 'immutable';
import {
  CREATE_TASK_ERROR,
  CREATE_TASK_SUCCESS,
  GET_ACTIVITY_DEFINITIONS_ERROR,
  GET_ACTIVITY_DEFINITIONS_SUCCESS,
  GET_PRACTITIONER_ERROR,
  GET_PRACTITIONER_SUCCESS,
  GET_PRACTITIONERS_ERROR,
  GET_PRACTITIONERS_SUCCESS,
  GET_EVENT_TYPES_SUCCESS,
  GET_EVENT_TYPES_ERROR,
  GET_TASK_SUCCESS,
  GET_TASK_ERROR,
  GET_SUB_TASKS_SUCCESS,
  GET_SUB_TASKS_ERROR,
  GET_TASKS_BY_PATIENT_SUCCESS,
  GET_TASKS_BY_PATIENT_ERROR,
  GET_PARENT_TASK_SUCCESS,
} from './constants';

const initialState = fromJS({});

function manageTaskPageReducer(state = initialState, action) {
  switch (action.type) {
    case GET_ACTIVITY_DEFINITIONS_SUCCESS:
      return state
        .set('activityDefinitions', action.activityDefinitions);
    case GET_PRACTITIONER_SUCCESS:
      return state
        .set('practitioner', action.practitioner);
    case GET_PRACTITIONERS_SUCCESS:
      return state
        .set('practitioners', action.practitioners);
    case GET_EVENT_TYPES_SUCCESS:
      return state
        .set('eventTypes', action.eventTypes);
    case CREATE_TASK_SUCCESS:
      return state.set('error', false);
    case GET_TASK_SUCCESS:
      return state
        .set('task', action.task);
    case GET_SUB_TASKS_SUCCESS:
      return state
        .set('subTasks', action.subTasks);
    case GET_PARENT_TASK_SUCCESS:
      return state
        .set('parentTask', action.parentTask);
    case GET_TASKS_BY_PATIENT_SUCCESS:
      return state
        .set('tasksByPatient', action.tasksByPatient);
    case GET_ACTIVITY_DEFINITIONS_ERROR:
    case GET_EVENT_TYPES_ERROR:
    case GET_PRACTITIONER_ERROR:
    case GET_PRACTITIONERS_ERROR:
    case CREATE_TASK_ERROR:
    case GET_TASK_ERROR:
    case GET_TASKS_BY_PATIENT_ERROR:
    case GET_SUB_TASKS_ERROR:
      return state
        .set('loading', false)
        .set('data', fromJS([]));
    default:
      return state;
  }
}

export default manageTaskPageReducer;
