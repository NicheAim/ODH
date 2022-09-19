import { createSelector } from 'reselect';
import selectGlobalDomain from './selectors';
import { GLOBAL_AUTH_STATE_KEY } from './constants';

/**
 * Default selector used by auth
 */

const makeSelectAuth = () => createSelector(
  selectGlobalDomain,
  (globalState) => globalState.get(GLOBAL_AUTH_STATE_KEY).toJS(),
);

export default makeSelectAuth;
