/*
 *
 * UpcomingTasks actions
 *
 */

import { INITIALIZE_UPCOMING_TASKS, GET_UPCOMING_TASKS, GET_UPCOMING_TASKS_ERROR, GET_UPCOMING_TASKS_SUCCESS } from './constants';

export function initializeUpcomingTasks() {
  return {
    type: INITIALIZE_UPCOMING_TASKS,
  };
}

export function getUpcomingTasks(practitionerId) {
  return {
    type: GET_UPCOMING_TASKS,
    practitionerId,
  };
}

export function getUpcomingTasksSuccess(upcomingTasks) {
  return {
    type: GET_UPCOMING_TASKS_SUCCESS,
    upcomingTasks,
  };
}

export function getUpcomingTasksError(error) {
  return {
    type: GET_UPCOMING_TASKS_ERROR,
    error,
  };
}
