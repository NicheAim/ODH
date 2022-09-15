/*
 *
 * PractitionerTasks actions
 *
 */

import {
  GET_FILTER_TASK, GET_FILTER_TASK_ERROR, GET_FILTER_TASK_SUCCESS,
  GET_PRACTITIONER_TASKS, GET_PRACTITIONER_TASKS_ERROR,
  GET_PRACTITIONER_TASKS_SUCCESS,
} from 'containers/PractitionerTasks/constants';

export function getPractitionerTasks(practitionerId, definition) {
  return {
    type: GET_PRACTITIONER_TASKS,
    practitionerId,
    definition,
  };
}


export function getPractitionerTasksSuccess(tasks) {
  return {
    type: GET_PRACTITIONER_TASKS_SUCCESS,
    tasks,
  };
}

export function getPractitionerTasksError(error) {
  return {
    type: GET_PRACTITIONER_TASKS_ERROR,
    error,
  };
}


export function getFilterTasks(practitionerId, definition, dateRange) {
  return {
    type: GET_FILTER_TASK,
    practitionerId,
    definition,
    dateRange,
  };
}


export function getFilterTaskSuccess(tasks) {
  return {
    type: GET_FILTER_TASK_SUCCESS,
    tasks,
  };
}


export function getFilterTaskError(error) {
  return {
    type: GET_FILTER_TASK_ERROR,
    error,
  };
}
