import { createSelector } from 'reselect';

/**
 * Direct selector to the manageRelatedPersonModal state domain
 */
const selectManageRelatedPersonModalDomain = (state) => state.get('manageRelatedPersonModal');

/**
 * Other specific selectors
 */


/**
 * Default selector used by ManageRelatedPersonModal
 */

const makeSelectManageRelatedPersonModal = () => createSelector(
  selectManageRelatedPersonModalDomain,
  (substate) => substate.toJS(),
);

export default makeSelectManageRelatedPersonModal;
export {
  selectManageRelatedPersonModalDomain,
};
