import { createSelector } from 'reselect';

/**
 * Direct selector to the userRegistration state domain
 */
const selectUserRegistrationDomain = (state) => state.get('userRegistration');

/**
 * Other specific selectors
 */


/**
 * Default selector used by UserRegistration
 */

const makeSelectUserRegistration = () => createSelector(
  selectUserRegistrationDomain,
  (substate) => substate.toJS()
);

export default makeSelectUserRegistration;
export {
  selectUserRegistrationDomain,
};
