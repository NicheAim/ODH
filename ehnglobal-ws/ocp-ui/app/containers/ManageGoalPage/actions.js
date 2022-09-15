import {
  GET_PLAN_DEFINITIONS,
  GET_PLAN_DEFINITIONS_SUCCESS,
  GET_PLAN_DEFINITIONS_ERROR,
  GET_GOAL_CATEGORIES,
  GET_GOAL_CATEGORIES_SUCCESS,
  GET_GOAL_STATUSES,
  GET_GOAL_STATUSES_SUCCESS,
  GET_GOAL_ACHIEVEMENT_STATUSES,
  GET_GOAL_ACHIEVEMENT_STATUSES_SUCCESS,
  CREATE_GOAL,
  CREATE_GOAL_SUCCESS,
  CREATE_GOAL_ERROR,
  UPDATE_GOAL,
  UPDATE_GOAL_SUCCESS,
  UPDATE_GOAL_ERROR,
  GET_GOAL,
  GET_GOAL_SUCCESS,
  GET_GOAL_ERROR,
  CLEAR_GOAL,
  CLEAR_GOAL_SUCCESS,
  GET_PRACTITIONERS,
  GET_PRACTITIONERS_ERROR,
  GET_PRACTITIONERS_SUCCESS,
} from './constants';

export function getGoalCategories() {
  return {
    type: GET_GOAL_CATEGORIES,
  }
}

export function getGoalCategoriesSuccess(goalCategories) {
  return {
    type: GET_GOAL_CATEGORIES_SUCCESS,
    goalCategories,
  }
}

export function getGoalStatuses() {
  return {
    type: GET_GOAL_STATUSES,
  }
}

export function getGoalStatusesSuccess(goalStatuses) {
  return {
    type: GET_GOAL_STATUSES_SUCCESS,
    goalStatuses,
  }
}

export function getGoalAchievementStatuses() {
  return {
    type: GET_GOAL_ACHIEVEMENT_STATUSES,
  }
}

export function getGoalAchievementStatusesSuccess(goalAchievementStatuses) {
  return {
    type: GET_GOAL_ACHIEVEMENT_STATUSES_SUCCESS,
    goalAchievementStatuses,
  }
}

export function getPlanDefinitions() {
  return {
    type: GET_PLAN_DEFINITIONS,
  }
}

export function getPlanDefinitionsSuccess(planDefinitions) {
  return {
    type: GET_PLAN_DEFINITIONS_SUCCESS,
    planDefinitions,
  }
}

export function getPlanDefinitionsError(err) {
  return {
    type: GET_PLAN_DEFINITIONS_ERROR,
    err,
  }
}

export function createGoal(goalFormData, fhirGoal, handleSubmitting) {
  return {
    type: CREATE_GOAL,
    goalFormData,
    fhirGoal,
    handleSubmitting,
  }
}

export function createGoalSuccess(response) {
  return {
    type: CREATE_GOAL_SUCCESS,
    response,
  }
}

export function createGoalError(error) {
  return {
    type: CREATE_GOAL_ERROR,
    error,
  }
}

export function updateGoal(fhirGoal, handleSubmitting) {
  return {
    type: UPDATE_GOAL,
    fhirGoal,
    handleSubmitting,
  }
}

export function updateGoalSuccess(response) {
  return {
    type: UPDATE_GOAL_SUCCESS,
    response,
  }
}

export function updateGoalError(error) {
  return {
    type: UPDATE_GOAL_ERROR,
    error,
  }
}

export function getGoal(id) {
  return {
    type: GET_GOAL,
    id,
  }
}

export function getGoalSuccess(goal) {
  return {
    type: GET_GOAL_SUCCESS,
    goal,
  }
}

export function getGoalError(error) {
  return {
    type: GET_GOAL_ERROR,
    error,
  }
}

export function clearGoal() {
  return {
    type: CLEAR_GOAL,
  }
}

export function clearGoalSuccess() {
  return {
    type: CLEAR_GOAL_SUCCESS,
    goal: null,
  }
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
