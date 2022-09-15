import { createSelector } from 'reselect';

/**
 * Direct selector to the launchPage state domain
 */
const selectLaunchPageDomain = (state) => state.get('launchPage');

/**
 * Other specific selectors
 */


/**
 * Default selector used by LaunchPage
 */

const makeSelectLaunchPage = () => createSelector(
  selectLaunchPageDomain,
  (substate) => substate.toJS()
);

export default makeSelectLaunchPage;
export {
  selectLaunchPageDomain,
};
