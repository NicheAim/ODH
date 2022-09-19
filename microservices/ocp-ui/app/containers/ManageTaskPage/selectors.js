import { createSelector } from 'reselect';
/**
 * Direct selector to the manageTaskPage state domain
 */
const selectManageTaskPageDomain = (state) => state.get('manageTaskPage');

/**
 * Other specific selectors
 */
const makeSelectActivityDefinitions = () => createSelector(
  selectManageTaskPageDomain,
  (substate) => substate && substate.get('activityDefinitions'),
);

const makeSelectPractitioners = () => createSelector(
  selectManageTaskPageDomain,
  (substate) => substate && substate.get('practitioners'),
);

const makeSelectPractitioner = () => createSelector(
  selectManageTaskPageDomain,
  (substate) => substate && substate.get('practitioner'),
);

const makeSelectEventTypes = () => createSelector(
  selectManageTaskPageDomain,
  (substate) => substate && substate.get('eventTypes'),
);

const makeSelectTasksByPatient = () => createSelector(
  selectManageTaskPageDomain,
  (substate) => substate && substate.get('tasksByPatient'),
);

const makeSelectSubTasks = () => createSelector(
  selectManageTaskPageDomain,
  (substate) => substate && substate.get('subTasks'),
);

const makeSelectParentTask = () => createSelector(
  selectManageTaskPageDomain,
  (substate) => substate && substate.get('parentTask'),
);


export {
  selectManageTaskPageDomain,
  makeSelectActivityDefinitions,
  makeSelectPractitioners,
  makeSelectPractitioner,
  makeSelectEventTypes,
  makeSelectTasksByPatient,
  makeSelectSubTasks,
  makeSelectParentTask,
};
