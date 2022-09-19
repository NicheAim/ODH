import { createSelector } from 'reselect';

/**
 * Direct selector to the userLoginDetailsPage state domain
 */
const selectUserLoginDetailsPageDomain = (state) => state.get('userLoginDetailsPage');

/**
 * Other specific selectors
 */


/**
 * Default selector used by UserLoginDetailsPage
 */

const makeSelectUserLoginDetailsPage = () => createSelector(
  selectUserLoginDetailsPageDomain,
  (substate) => substate.toJS(),
);

export default makeSelectUserLoginDetailsPage;
export {
  selectUserLoginDetailsPageDomain,
};
