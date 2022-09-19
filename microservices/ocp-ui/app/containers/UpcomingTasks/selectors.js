import { createSelector } from 'reselect';

/**
 * Direct selector to the upcomingTasks state domain
 */
const selectUpcomingTasksDomain = (state) => state.get('upcomingTasks');

/**
 * Default selector used by UpcomingTasks
 */

const makeSelectUpcomingTasks = () => createSelector(
  selectUpcomingTasksDomain,
  (substate) => substate.get('data').toJS()
);

/**
 * Other specific selectors
 */

const makeSelectUpcomingTasksLoading = () => createSelector(
  selectUpcomingTasksDomain,
  (substate) => substate.get('loading'),
);
export default makeSelectUpcomingTasks;

export {
  makeSelectUpcomingTasks,
  makeSelectUpcomingTasksLoading,
};
