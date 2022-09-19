import { createSelector } from 'reselect';

/**
 * Direct selector to the manageActivityDefinitionPage state domain
 */
const selectManageActivityDefinitionPageDomain = (state) => state.get('manageActivityDefinitionPage');

/**
 * Other specific selectors
 */

const makeSelectActivityDefinition = () => createSelector(
  selectManageActivityDefinitionPageDomain,
  (substate) => substate.get('activityDefinition'),
);

/**
 * Default selector used by ManageActivityDefinitionPage
 */

const makeSelectManageActivityDefinitionPage = () => createSelector(
  selectManageActivityDefinitionPageDomain,
  (substate) => substate.toJS(),
);

export default makeSelectManageActivityDefinitionPage;
export {
  selectManageActivityDefinitionPageDomain,
  makeSelectActivityDefinition,
};
