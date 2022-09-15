import { createSelector } from 'reselect';

/**
 * Direct selector to the manageClientPage state domain
 */
const selectManageClientPageDomain = (state) => state.get('manageClientPage');

/**
 * Other specific selectors
 */


/**
 * Default selector used by ManageClientPage
 */

const makeSelectManageClientPage = () => createSelector(
  selectManageClientPageDomain,
  (substate) => substate.toJS()
);

const makeSelectSmartApps = () => createSelector(
  selectManageClientPageDomain,
  (substate) => substate.get('clients').toJS(),
);

export default makeSelectManageClientPage;
export {
  selectManageClientPageDomain,
  makeSelectSmartApps,
};
