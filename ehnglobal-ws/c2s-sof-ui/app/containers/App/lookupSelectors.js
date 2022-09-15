import { createSelector } from 'reselect';
import {
  CONSENT_STATE_CODES,
  GLOBAL_LOOKUP_STATE_KEY,
  PURPOSE_OF_USE,
  SECURITY_LABEL,
} from 'containers/App/constants';
import selectGlobalDomain from './selectors';

const makeSelectLookups = (name) => createSelector(
  selectGlobalDomain,
  (globalState) => globalState.get(GLOBAL_LOOKUP_STATE_KEY).get(name).toJS(),
);

const makeSelectConsentStateCodes = () => createSelector(
  selectGlobalDomain,
  (globalState) => globalState.get(GLOBAL_LOOKUP_STATE_KEY).get(CONSENT_STATE_CODES).toJS(),
);

const makeSelectSecurityLabel = () => createSelector(
  selectGlobalDomain,
  (globalState) => globalState.get(GLOBAL_LOOKUP_STATE_KEY).get(SECURITY_LABEL).toJS(),
);

const makeSelectPurposeOfUse = () => createSelector(
  selectGlobalDomain,
  (globalState) => globalState.get(GLOBAL_LOOKUP_STATE_KEY).get(PURPOSE_OF_USE).toJS(),
);

export {
  makeSelectLookups,
  makeSelectConsentStateCodes,
  makeSelectSecurityLabel,
  makeSelectPurposeOfUse,
};
