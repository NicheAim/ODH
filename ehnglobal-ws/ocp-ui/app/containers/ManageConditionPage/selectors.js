import { createSelector } from 'reselect';

/**
 * Direct selector to the manageConditionPage state domain
 */
const selectManageConditionPageDomain = (state) =>
  state.get('manageConditionPage');

/**
 * Other specific selectors
 */
const makeSelectCondition = () =>
  createSelector(
    selectManageConditionPageDomain,
    (subState) => subState && subState.get('condition')
  );

/**
 * Default selector used by ManageConditionPage
 */

const makeSelectManageConditionPage = () =>
  createSelector(selectManageConditionPageDomain, (substate) =>
    substate.toJS()
  );

export default makeSelectManageConditionPage;
export { selectManageConditionPageDomain, makeSelectCondition };
