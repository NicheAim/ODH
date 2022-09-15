import { createSelector } from 'reselect';

/**
 * Direct selector to the ManageConsentPage state domain
 */
const selectManageConsentPageDomain = (state) => state.get('manageConsentPage');

/**
 * Other specific selectors
 */
const makeSelectConsent = () => createSelector(
  selectManageConsentPageDomain,
  (substate) => substate.get('consent'),
);

/**
 * Default selector used by ManageConsentPage
 */

const makeSelectManageConsentPage = () => createSelector(
  selectManageConsentPageDomain,
  (substate) => substate.toJS(),
);

export default makeSelectManageConsentPage;
export {
  selectManageConsentPageDomain,
  makeSelectConsent,
};
