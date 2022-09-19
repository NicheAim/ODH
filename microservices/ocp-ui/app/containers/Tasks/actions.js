const actionTypesPrefix = 'ocpui/Tasks/';

export const actionTypes = {
  FAILURE: `${actionTypesPrefix}FAILURE`,
  INITIALIZE_TASKS: `${actionTypesPrefix}INITIALIZE_TASKS`,
  GET_TASKS: `${actionTypesPrefix}GET_TASKS`,
  GET_TASKS_SUCCESS: `${actionTypesPrefix}GET_TASKS_SUCCESS`,
  GET_TASKS_ERROR: `${actionTypesPrefix}GET_TASKS_ERROR`,
  SEARCH_TASKS: `${actionTypesPrefix}SEARCH_TASKS`,
  SEARCH_TASKS_SUCCESS: `${actionTypesPrefix}SEARCH_TASKS_SUCCESS`,
  CANCEL_TASK: `${actionTypesPrefix}CANCEL_TASK`,
  CANCEL_TASK_SUCCESS: `${actionTypesPrefix}CANCEL_TASK_SUCCESS`,
  CANCEL_TASK_ERROR: `${actionTypesPrefix}CANCEL_TASK_ERROR`,
  GET_TASK_RELATED_COMMUNICATIONS: `${actionTypesPrefix}GET_TASK_RELATED_COMMUNICATIONS`,
  GET_TASK_RELATED_COMMUNICATIONS_SUCCESS: `${actionTypesPrefix}GET_TASK_RELATED_COMMUNICATIONS_SUCCESS`,
  GET_TASK_RELATED_COMMUNICATIONS_ERROR: `${actionTypesPrefix}GET_TASK_RELATED_COMMUNICATIONS_ERROR`,
};

function failure(error) {
  return {
    type: actionTypes.FAILURE,
    error,
  };
}

function initializeTasks() {
  return {
    type: actionTypes.INITIALIZE_TASKS,
  };
}

function getTasks(practitionerId, patientId, statusList, definition) {
  return {
    type: actionTypes.GET_TASKS,
    practitionerId,
    patientId,
    statusList,
    definition,
  };
}

function getTasksSuccess(tasksPage) {
  return {
    type: actionTypes.GET_TASKS_SUCCESS,
    tasksPage,
  };
}

function getTasksError(error) {
  return {
    type: actionTypes.GET_TASKS_ERROR,
    error,
  };
}

function searchTasks(searchType, searchValue, currentPage) {
  return {
    type: actionTypes.SEARCH_TASKS,
    searchType,
    searchValue,
    currentPage,
  };
}

function searchTasksSuccess(tasks) {
  return {
    type: actionTypes.SEARCH_TASKS_SUCCESS,
    tasks,
  };
}

function cancelTask(id) {
  return {
    type: actionTypes.CANCEL_TASK,
    id,
  };
}

function cancelTaskSuccess(id) {
  return {
    type: actionTypes.CANCEL_TASK_SUCCESS,
    id,
  };
}

function cancelTaskError(error) {
  return {
    type: actionTypes.CANCEL_TASK_ERROR,
    error,
  };
}

function getTaskRelatedCommunications(patient, taskId, pageNumber) {
  return {
    type: actionTypes.GET_TASK_RELATED_COMMUNICATIONS,
    patient,
    pageNumber,
    taskId,
  };
}

function getTaskRelatedCommunicationsSuccess(communications) {
  return {
    type: actionTypes.GET_TASK_RELATED_COMMUNICATIONS_SUCCESS,
    communications,
  };
}

function getTaskRelatedCommunicationsError(error) {
  return {
    type: actionTypes.GET_TASK_RELATED_COMMUNICATIONS_ERROR,
    error,
  };
}

export const actions = {
  failure,
  initializeTasks,
  getTasks,
  getTasksSuccess,
  getTasksError,
  searchTasks,
  searchTasksSuccess,
  cancelTask,
  cancelTaskSuccess,
  cancelTaskError,
  getTaskRelatedCommunications,
  getTaskRelatedCommunicationsSuccess,
  getTaskRelatedCommunicationsError,
};
