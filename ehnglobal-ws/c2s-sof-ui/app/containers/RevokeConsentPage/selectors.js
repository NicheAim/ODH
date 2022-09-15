import { createSelector } from 'reselect';

/**
 * Direct selector to the revokeConsentPage state domain
 */
const selectRevokeConsentPageDomain = (state) => state.get('revokeConsentPage');


const makeSelectGetConsentError = () => createSelector(
  selectRevokeConsentPageDomain,
  (subState) => subState.get('error'),
);

const makeSelectConsent = () => createSelector(
  selectRevokeConsentPageDomain,
  (subState) => subState && subState.get('consent'),
);

const makeSelectSubmitting = () => createSelector(
  selectRevokeConsentPageDomain,
  (subState) => subState.get('isSubmitting'),
);

export {
  selectRevokeConsentPageDomain,
  makeSelectGetConsentError,
  makeSelectConsent,
  makeSelectSubmitting,
};
