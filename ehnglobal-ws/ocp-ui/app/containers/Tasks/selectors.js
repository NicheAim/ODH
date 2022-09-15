import { createSelector } from 'reselect';

/**
 * Direct selector to the tasks state domain
 */
const selectTasksDomain = (state) => state.get('tasks');

/**
 * Other specific selectors
 */


/**
 * Default selector used by Tasks
 */

const makeSelectTasks = () => createSelector(
  selectTasksDomain,
  (substate) => substate && substate.toJS(),
);


const makeSelectTaskRelatedCommunications = () => createSelector(
  selectTasksDomain,
  (substate) => substate && substate.get('communications') && substate.get('communications').toJS(),
);

export default makeSelectTasks;
export {
  makeSelectTasks,
  makeSelectTaskRelatedCommunications,
};
