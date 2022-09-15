import goalCategoryCodeSystem from './assets/code-systems/CodeSystem-goal-category.json';
import goalStatusCodeSystem from './assets/code-systems/CodeSystem-goal-status.json';
import goalAchievementCodeSystem from './assets/code-systems/CodeSystem-goal-achievement.json';

export const GOAL_CATEGORY_CODE_SYSTEM = 'goal-category';
export const GOAL_STATUS_CODE_SYSTEM = 'goal-status';
export const GOAL_ACHIEVEMENT_CODE_SYSTEM = 'goal-achievement';

const CODE_SYSTEMS = {
  [GOAL_CATEGORY_CODE_SYSTEM]: goalCategoryCodeSystem,
  [GOAL_STATUS_CODE_SYSTEM]: goalStatusCodeSystem,
  [GOAL_ACHIEVEMENT_CODE_SYSTEM]: goalAchievementCodeSystem,
}

export function getCodeSystem(codeSystemKey) {
  return CODE_SYSTEMS[codeSystemKey];
}

export const GET_PLAN_DEFINITIONS = 'ocpui/ManageGoalPage/GET_PLAN_DEFINITIONS';
export const GET_PLAN_DEFINITIONS_SUCCESS = 'ocpui/ManageGoalPage/GET_PLAN_DEFINITIONS_SUCCESS';
export const GET_PLAN_DEFINITIONS_ERROR = 'ocpui/ManageGoalPage/GET_PLAN_DEFINITIONS_ERROR';

export const GET_GOAL_CATEGORIES = 'ocpui/ManageGoalPage/GET_GOAL_CATEGORIES';
export const GET_GOAL_CATEGORIES_SUCCESS = 'ocpui/ManageGoalPage/GET_GOAL_CATEGORIES_SUCCESS';

export const GET_GOAL_STATUSES = 'ocpui/ManageGoalPage/GET_GOAL_STATUSES';
export const GET_GOAL_STATUSES_SUCCESS = 'ocpui/ManageGoalPage/GET_GOAL_STATUSES_SUCCESS';

export const GET_GOAL_ACHIEVEMENT_STATUSES = 'ocpui/ManageGoalPage/GET_GOAL_ACHIEVEMENT_STATUSES';
export const GET_GOAL_ACHIEVEMENT_STATUSES_SUCCESS = 'ocpui/ManageGoalPage/GET_GOAL_ACHIEVEMENT_STATUSES_SUCCESS';

export const CREATE_GOAL = 'ocpui/ManageGoalPage/CREATE_GOAL';
export const CREATE_GOAL_SUCCESS = 'ocpui/ManageGoalPage/CREATE_GOAL_SUCCESS';
export const CREATE_GOAL_ERROR = 'ocpui/ManageGoalPage/CREATE_GOAL_ERROR';

export const UPDATE_GOAL = 'ocpui/ManageGoalPage/UPDATE_GOAL';
export const UPDATE_GOAL_SUCCESS = 'ocpui/ManageGoalPage/UPDATE_GOAL_SUCCESS';
export const UPDATE_GOAL_ERROR = 'ocpui/ManageGoalPage/UPDATE_GOAL_ERROR';

export const GET_GOAL = 'ocpui/ManageGoalPage/GET_GOAL';
export const GET_GOAL_SUCCESS = 'ocpui/ManageGoalPage/GET_GOAL_SUCCESS';
export const GET_GOAL_ERROR = 'ocpui/ManageGoalPage/GET_GOAL_ERROR';

export const CLEAR_GOAL = 'ocpui/ManageGoalPage/CLEAR_GOAL';
export const CLEAR_GOAL_SUCCESS = 'ocpui/ManageGoalPage/CLEAR_GOAL_SUCCESS';

export const GET_PRACTITIONERS = 'ocpui/ManageGoalPage/GET_PRACTITIONERS';
export const GET_PRACTITIONERS_SUCCESS = 'ocpui/ManageGoalPage/GET_PRACTITIONERS_SUCCESS';
export const GET_PRACTITIONERS_ERROR = 'ocpui/ManageGoalPage/GET_PRACTITIONERS_ERROR';
