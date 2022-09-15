/*
 *
 * actions
 *
 */

const actionTypesPrefix = 'ocpui/PatientPage/';

export const actionTypes = {
  FAILURE: actionTypesPrefix + 'FAILURE',
  INITIALIZE: actionTypesPrefix + 'INITIALIZE',
  GET_GOALS: actionTypesPrefix + 'GET_GOALS',
  GET_GOALS_SUCCESS: actionTypesPrefix + 'GET_GOALS_SUCCESS',
  GET_CARE_PLAN: actionTypesPrefix + 'GET_CARE_PLAN',
  GET_CARE_PLAN_SUCCESS: actionTypesPrefix + 'GET_CARE_PLAN_SUCCESS',
  GET_TASKS: actionTypesPrefix + 'GET_TASKS',
  GET_TASKS_SUCCESS: actionTypesPrefix + 'GET_TASKS_SUCCESS',
  GET_GOALS_WITH_TASKS_SUCCESS:
    actionTypesPrefix + 'GET_GOALS_WITH_TASKS_SUCCESS',
  SET_EMERGENCY_CONTACT_RELATED_PERSON:
    actionTypesPrefix + 'SET_EMERGENCY_CONTACT_RELATED_PERSON',
};

function failure(error) {
  return {
    type: actionTypes.FAILURE,
    error,
  };
}

function initialize() {
  return {
    type: actionTypes.INITIALIZE,
  };
}

function setEmergencyContactRelatedPerson(data) {
  return {
    type: actionTypes.SET_EMERGENCY_CONTACT_RELATED_PERSON,
    data,
  };
}

export function getGoals(patientId) {
  return {
    type: actionTypes.GET_GOALS,
    patientId,
  };
}

export function getGoalsSuccess(data) {
  return {
    type: actionTypes.GET_GOALS_SUCCESS,
    responseData: data,
  };
}

export function getCarePlan(patientId) {
  return {
    type: actionTypes.GET_CARE_PLAN,
    patientId,
  };
}

export function getCarePlanSuccess(data) {
  return {
    type: actionTypes.GET_CARE_PLAN_SUCCESS,
    responseData: data,
  };
}

export function getTasks(tasksIdsKeys) {
  return {
    type: actionTypes.GET_TASKS,
    tasksIdsKeys,
  };
}

export function getTasksSuccess(data) {
  return {
    type: actionTypes.GET_TASKS_SUCCESS,
    responseData: data,
  };
}

export function getGoalsWithTasksSuccess(data) {
  return {
    type: actionTypes.GET_GOALS_WITH_TASKS_SUCCESS,
    responseData: data,
  };
}

export const actions = {
  failure,
  initialize,
  setEmergencyContactRelatedPerson,
  getGoals,
  getGoalsSuccess,
  getCarePlan,
  getCarePlanSuccess,
  getTasks,
  getTasksSuccess,
  getGoalsWithTasksSuccess,
};
