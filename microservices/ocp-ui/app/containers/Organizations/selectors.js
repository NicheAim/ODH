import { createSelector } from 'reselect';

/**
 * Direct selector to the organizations state domain
 */
const selectOrganizationsDomain = (state) => state.get('organizations');

/**
 * Other specific selectors
 */

/**
 * Default selector used by Organizations
 */

const makeSelectOrganizations = () => createSelector(
  selectOrganizationsDomain,
  (substate) => substate.toJS(),
);
export default makeSelectOrganizations;

export {
  selectOrganizationsDomain,
};
