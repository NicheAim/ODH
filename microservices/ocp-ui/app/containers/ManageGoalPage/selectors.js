import { createSelector } from 'reselect';

/**
 * Direct selector to the manageTaskPage state domain
 */
const selectManageGoalPageDomain = (state) => state.get('manageGoalPage');

/**
 * Other specific selectors
 */
export const makeSelectPlanDefinitions = () => createSelector(
  selectManageGoalPageDomain,
  (substate) => substate && substate.get('planDefinitions'),
);

export const makeSelectGoalCategories = () => createSelector(
  selectManageGoalPageDomain,
  (substate) => substate && substate.get('goalCategories'),
);

export const makeSelectGoalStatuses = () => createSelector(
  selectManageGoalPageDomain,
  (substate) => substate && substate.get('goalStatuses'),
);

export const makeSelectGoalAchievementStatuses = () => createSelector(
  selectManageGoalPageDomain,
  (substate) => substate && substate.get('goalAchievementStatuses'),
);

export const makeSelectPractitioners = () => createSelector(
  selectManageGoalPageDomain,
  (substate) => substate && substate.get('practitioners'),
);

export const makeSelectPractitioner = () => createSelector(
  selectManageGoalPageDomain,
  (substate) => substate && substate.get('practitioner'),
);

export const makeSelectGoal = () => createSelector(
  selectManageGoalPageDomain,
  (substate) => substate && substate.get('goal'),
);
