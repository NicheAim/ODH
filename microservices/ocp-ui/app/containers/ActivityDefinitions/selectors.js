import { createSelector } from 'reselect';

/**
 * Direct selector to the activityDefinitions state domain
 */
const selectActivityDefinitionsDomain = (state) => state.get('activityDefinitions');

/**
 * Other specific selectors
 */


/**
 * Default selector used by ActivityDefinitions
 */

const makeSelectActivityDefinitions = () => createSelector(
  selectActivityDefinitionsDomain,
  (substate) => substate.toJS()
);

export default makeSelectActivityDefinitions;
export {
  selectActivityDefinitionsDomain,
};
