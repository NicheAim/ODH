import { createSelector } from 'reselect';

/**
 * Direct selector to the manageUserRegistration state domain
 */
const selectManageUserRegistrationDomain = (state) => state.get('manageUserRegistration');

/**
 * Other specific selectors
 */


/**
 * Default selector used by ManageUserRegistration
 */

const makeSelectManageUserRegistration = () => createSelector(
  selectManageUserRegistrationDomain,
  (substate) => substate.toJS()
);

const makeSelectFhirResource = () => createSelector(
  selectManageUserRegistrationDomain,
  (substate) => substate && substate.get('fhirResource') && substate.get('fhirResource').toJS(),
);

const makeSelectUser = () => createSelector(
  selectManageUserRegistrationDomain,
  (substate) => substate && substate.get('user') && substate.get('user').toJS(),
);

const makeSelectGroups = () => createSelector(
  selectManageUserRegistrationDomain,
  (substate) => substate && substate.get('groups').toJS(),
);

export default makeSelectManageUserRegistration;
export {
  selectManageUserRegistrationDomain,
  makeSelectUser,
  makeSelectGroups,
  makeSelectFhirResource,
};
