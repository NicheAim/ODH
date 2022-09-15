import { createSelector } from 'reselect';

/**
 * Direct selector to the consents state domain
 */
const selectConsentsDomain = (state) => state.get('consents');

/**
 * Other specific selectors
 */


/**
 * Default selector used by Consents
 */

const makeSelectConsents = () => createSelector(
  selectConsentsDomain,
  (substate) => substate.toJS()
);

export default makeSelectConsents;
export {
  selectConsentsDomain,
};
