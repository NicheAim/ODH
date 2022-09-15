/*
 *
 * ManageTaskPage actions
 *
 */

import {
  CREATE_TASK,
  CREATE_TASK_ERROR,
  CREATE_TASK_SUCCESS,
  GET_ACTIVITY_DEFINITIONS,
  GET_ACTIVITY_DEFINITIONS_ERROR,
  GET_ACTIVITY_DEFINITIONS_SUCCESS,
  GET_PRACTITIONERS,
  GET_PRACTITIONERS_ERROR,
  GET_PRACTITIONERS_SUCCESS,
  GET_PRACTITIONER,
  GET_PRACTITIONER_ERROR,
  GET_PRACTITIONER_SUCCESS,
  GET_TASKS_BY_PATIENT,
  GET_TASKS_BY_PATIENT_ERROR,
  GET_TASKS_BY_PATIENT_SUCCESS,
  GET_EVENT_TYPES,
  GET_EVENT_TYPES_ERROR,
  GET_EVENT_TYPES_SUCCESS,
  PUT_TASK,
  PUT_TASK_ERROR,
  PUT_TASK_SUCCESS,
  GET_TASK,
  GET_TASK_ERROR,
  GET_TASK_SUCCESS,
  GET_SUB_TASKS,
  GET_SUB_TASKS_ERROR,
  GET_SUB_TASKS_SUCCESS,
  GET_PARENT_TASK,
  GET_PARENT_TASK_ERROR,
  GET_PARENT_TASK_SUCCESS,
} from './constants';


export function getRequester(practitionerId) {
  return {
    type: GET_PRACTITIONER,
    practitionerId,
  };
}
export function getRequesterSuccess(practitioner) {
  return {
    type: GET_PRACTITIONER_SUCCESS,
    practitioner,
  };
}

export function getRequesterError(err) {
  return {
    type: GET_PRACTITIONER_ERROR,
    err,
  };
}

export function getActivityDefinitions(practitionerId) {
  return {
    type: GET_ACTIVITY_DEFINITIONS,
    practitionerId,
  };
}

export function getActivityDefinitionsSuccess(activityDefinitions) {
  return {
    type: GET_ACTIVITY_DEFINITIONS_SUCCESS,
    activityDefinitions,
  };
}

export function getActivityDefinitionsError(err) {
  return {
    type: GET_ACTIVITY_DEFINITIONS_ERROR,
    err,
  };
}

export function getPractitioners(organizationId) {
  return {
    type: GET_PRACTITIONERS,
    organizationId,
  };
}

export function getPractitionersSuccess(practitioners) {
  return {
    type: GET_PRACTITIONERS_SUCCESS,
    practitioners,
  };
}


export function getPractitionersError(err) {
  return {
    type: GET_PRACTITIONERS_ERROR,
    err,
  };
}

export function getEventTypes(patientId) {
  return {
    type: GET_EVENT_TYPES,
    patientId,
  };
}

export function getEventTypesSuccess(eventTypes) {
  return {
    type: GET_EVENT_TYPES_SUCCESS,
    eventTypes,
  };
}

export function getEventTypesError(err) {
  return {
    type: GET_EVENT_TYPES_ERROR,
    err,
  };
}

export function getTasksByPatient(patientId) {
  return {
    type: GET_TASKS_BY_PATIENT,
    patientId,
  };
}

export function getTasksByPatientSuccess(tasksByPatient) {
  return {
    type: GET_TASKS_BY_PATIENT_SUCCESS,
    tasksByPatient,
  };
}

export function getTasksByPatientError(err) {
  return {
    type: GET_TASKS_BY_PATIENT_ERROR,
    err,
  };
}


export function createTask(taskFormData, handleSubmitting) {
  return {
    type: CREATE_TASK,
    taskFormData,
    handleSubmitting,
  };
}

export function createTaskError(error) {
  return {
    type: CREATE_TASK_ERROR,
    error,
  };
}


export function createTaskSuccess(response) {
  return {
    type: CREATE_TASK_SUCCESS,
    response,
  };
}


export function updateTask(taskFormData, handleSubmitting) {
  return {
    type: PUT_TASK,
    taskFormData,
    handleSubmitting,
  };
}

export function updateTaskError(error) {
  return {
    type: PUT_TASK_ERROR,
    error,
  };
}


export function updateTaskSuccess(response) {
  return {
    type: PUT_TASK_SUCCESS,
    response,
  };
}

export function getTaskById(logicalId) {
  return {
    type: GET_TASK,
    logicalId,
  };
}

export function getTaskByIdError(error) {
  return {
    type: GET_TASK_ERROR,
    error,
  };
}


export function getTaskByIdSuccess(response) {
  return {
    type: GET_TASK_SUCCESS,
    response,
  };
}

export function getSubTasks(logicalId) {
  return {
    type: GET_SUB_TASKS,
    logicalId,
  };
}

export function getSubTasksError(error) {
  return {
    type: GET_SUB_TASKS_ERROR,
    error,
  };
}


export function getSubTasksSuccess(subTasks) {
  return {
    type: GET_SUB_TASKS_SUCCESS,
    subTasks,
  };
}

export function getParentTask(logicalId) {
  return {
    type: GET_PARENT_TASK,
    logicalId,
  };
}

export function getParentTaskSuccess(parentTask) {
  return {
    type: GET_PARENT_TASK_SUCCESS,
    parentTask,
  };
}

export function getParentTaskError(error) {
  return {
    type: GET_PARENT_TASK_ERROR,
    error,
  };
}
