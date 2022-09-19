import { createSelector } from 'reselect';

/**
 * Direct selector to the changePassword state domain
 */
const selectChangePasswordDomain = (state) => state.get('changePassword');

/**
 * Other specific selectors
 */


/**
 * Default selector used by ChangePassword
 */

const makeSelectChangePassword = () => createSelector(
  selectChangePasswordDomain,
  (substate) => substate.toJS(),
);

export default makeSelectChangePassword;
export {
  selectChangePasswordDomain,
};
