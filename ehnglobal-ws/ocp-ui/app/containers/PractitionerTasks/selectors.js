import { createSelector } from 'reselect';

/**
 * Direct selector to the practitionerTasks state domain
 */
const selectPractitionerTasksDomain = (state) => state.get('practitionerTasks');

/**
 * Other specific selectors
 */
const makeSelectPractitionerTasks = () => createSelector(
  selectPractitionerTasksDomain,
  (substate) => substate.get('data').toJS()
);

const makeSelectSearchLoading = () => createSelector(
  selectPractitionerTasksDomain,
  (substate) => substate.get('loading'),
);


export {
  makeSelectPractitionerTasks,
  makeSelectSearchLoading,
};
