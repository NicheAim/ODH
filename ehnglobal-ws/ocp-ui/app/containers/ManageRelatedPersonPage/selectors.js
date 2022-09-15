import { createSelector } from 'reselect';

/**
 * Direct selector to the manageRelatedPersonPage state domain
 */
const selectManageRelatedPersonPageDomain = (state) => state.get('manageRelatedPersonPage');

/**
 * Other specific selectors
 */
const makeSelectRelatedPerson = () => createSelector(
  selectManageRelatedPersonPageDomain,
  (subState) => subState && subState.get('relatedPerson'),
);

/**
 * Default selector used by ManageRelatedPersonPage
 */

const makeSelectManageRelatedPersonPage = () => createSelector(
  selectManageRelatedPersonPageDomain,
  (substate) => substate.toJS(),
);

export default makeSelectManageRelatedPersonPage;
export {
  selectManageRelatedPersonPageDomain,
  makeSelectRelatedPerson,
};
