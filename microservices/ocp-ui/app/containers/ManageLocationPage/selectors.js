import { createSelector } from 'reselect';

/**
 * Direct selector to the manageLocationPage state domain
 */
const selectManageLocationPageDomain = (state) => state.get('manageLocationPage');

/**
 * Other specific selectors
 */
const makeSelectLocation = () => createSelector(
  selectManageLocationPageDomain,
  (substate) => substate.get('location'),
);

const makeSelectSaveLocationError = () => createSelector(
  selectManageLocationPageDomain,
  (substate) => substate.get('error'),
);

/**
 * Default selector used by ManageLocationPage
 */

const makeSelectManageLocationPage = () => createSelector(
  selectManageLocationPageDomain,
  (substate) => substate.toJS(),
);

export default makeSelectManageLocationPage;
export {
  selectManageLocationPageDomain,
  makeSelectSaveLocationError,
  makeSelectLocation,
};
