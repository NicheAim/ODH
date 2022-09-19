import { createSelector } from 'reselect';

/**
 * Direct selector to the smartContextInitializerPage state domain
 */
const selectSmartContextInitializerPageDomain = (state) => state.get('smartContextInitializerPage');

/**
 * Other specific selectors
 */


/**
 * Default selector used by SmartContextInitializerPage
 */

const makeSelectSmartContextInitializerPage = () => createSelector(
  selectSmartContextInitializerPageDomain,
  (substate) => substate.toJS()
);

export default makeSelectSmartContextInitializerPage;
export {
  selectSmartContextInitializerPageDomain,
};
