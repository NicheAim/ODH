/*
 *
 * ManageGoalPage reducer
 *
 */
import { fromJS } from 'immutable';
import {
  GET_PLAN_DEFINITIONS_SUCCESS,
  GET_PLAN_DEFINITIONS_ERROR,
  GET_GOAL_CATEGORIES_SUCCESS,
  GET_GOAL_STATUSES_SUCCESS,
  GET_GOAL_ACHIEVEMENT_STATUSES_SUCCESS,
  CREATE_GOAL_SUCCESS,
  CREATE_GOAL_ERROR,
  UPDATE_GOAL_SUCCESS,
  UPDATE_GOAL_ERROR,
  GET_GOAL_SUCCESS,
  GET_GOAL_ERROR,
  CLEAR_GOAL_SUCCESS,
  GET_PRACTITIONERS_SUCCESS,
  GET_PRACTITIONERS_ERROR,
} from './constants';

const initialState = fromJS({});

function manageGoalPageReducer(state = initialState, action) {
  switch (action.type) {
    case GET_PLAN_DEFINITIONS_SUCCESS:
      return state
        .set('planDefinitions', action.planDefinitions);
    case GET_GOAL_CATEGORIES_SUCCESS:
      return state
        .set('goalCategories', action.goalCategories);
    case GET_GOAL_STATUSES_SUCCESS:
      return state
        .set('goalStatuses', action.goalStatuses);
    case GET_GOAL_ACHIEVEMENT_STATUSES_SUCCESS:
      return state
        .set('goalAchievementStatuses', action.goalAchievementStatuses);
    case GET_PRACTITIONERS_SUCCESS:
      return state
        .set('practitioners', action.practitioners);
    case CREATE_GOAL_SUCCESS:
    case UPDATE_GOAL_SUCCESS:
      return state.set('error', false);
    case GET_GOAL_SUCCESS:
    case CLEAR_GOAL_SUCCESS:
      return state.set('goal', action.goal);
    case GET_PRACTITIONERS_ERROR:
    case GET_PLAN_DEFINITIONS_ERROR:
    case CREATE_GOAL_ERROR:
    case GET_GOAL_ERROR:
    case UPDATE_GOAL_ERROR:
      return state
        .set('loading', false)
        .set('data', fromJS([]));
    default:
      return state;
  }
}

export default manageGoalPageReducer;
