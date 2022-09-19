import { createSelector } from 'reselect';

/**
 * Direct selector to the manageUsers state domain
 */
const selectManageUsersDomain = (state) => state.get('manageUsers');

/**
 * Other specific selectors
 */
const makeSelectUsers = () => createSelector(
  selectManageUsersDomain,
  (substate) => substate.get('users').toJS(),
);

const makeSelectGroups = () => createSelector(
  selectManageUsersDomain,
  (substate) => substate.get('groups').toJS(),
);

/**
 * Default selector used by ManageUsers
 */

const makeSelectManageUsers = () => createSelector(
  selectManageUsersDomain,
  (substate) => substate.toJS(),
);

export default makeSelectManageUsers;
export {
  selectManageUsersDomain,
  makeSelectUsers,
  makeSelectGroups,
};
