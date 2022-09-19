import { createSelector } from 'reselect';

/**
 * Direct selector to the smartAppLauncher state domain
 */
const selectSmartAppLauncherDomain = (state) => state.get('smartAppLauncher');

/**
 * Other specific selectors
 */
const makeSelectSmartAppShortcuts = () => createSelector(
  selectSmartAppLauncherDomain,
  (substate) => substate.get('appShortcuts') && substate.get('appShortcuts').toJS(),
);

/**
 * Default selector used by SmartAppLauncher
 */

const makeSelectSmartAppLauncher = () => createSelector(
  selectSmartAppLauncherDomain,
  (substate) => substate.toJS(),
);

const makeSelectSmartApps = () => createSelector(
  selectSmartAppLauncherDomain,
  (substate) => substate.get('clients').toJS(),
);

export default makeSelectSmartAppLauncher;
export {
  selectSmartAppLauncherDomain,
  makeSelectSmartAppLauncher,
  makeSelectSmartApps,
  makeSelectSmartAppShortcuts,
};
