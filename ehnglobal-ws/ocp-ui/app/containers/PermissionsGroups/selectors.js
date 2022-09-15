import { createSelector } from 'reselect';

/**
 * Direct selector to the permissionsGroups state domain
 */
const selectPermissionsGroupsDomain = (state) => state.get('permissionsGroups');

/**
 * Other specific selectors
 */


/**
 * Default selector used by PermissionsGroups
 */

const makeSelectPermissionsGroups = () => createSelector(
  selectPermissionsGroupsDomain,
  (substate) => substate.toJS(),
);

const makeSelectGroups = () => createSelector(
  selectPermissionsGroupsDomain,
  (substate) => substate.get('groups').toJS(),
);

const makeSelectScopes = () => createSelector(
  selectPermissionsGroupsDomain,
  (substate) => substate.get('scopes').toJS(),
);

export default makeSelectPermissionsGroups;
export {
  makeSelectGroups,
  makeSelectScopes,
};
