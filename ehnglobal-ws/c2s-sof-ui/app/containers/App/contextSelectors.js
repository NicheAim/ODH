import { createSelector } from 'reselect';

/**
 * Direct selector to the context state domain
 */
const selectContextDomain = (state) => state.get('context');

/**
 * Other specific selectors
 */
const makeSelectPatient = () => createSelector(
  selectContextDomain,
  (substate) => substate.get('patient') && substate.get('patient').toJS(),
);

const makeSelectUser = () => createSelector(
  selectContextDomain,
  (substate) => substate.get('user') && substate.get('user').toJS(),
);

const makeSelectOrganizations = () => createSelector(
  selectContextDomain,
  (substate) => substate.get('organizations') && substate.get('organizations').toJS(),
);

/**
 * Default selector used by Context
 */

const makeSelectContext = () => createSelector(
  selectContextDomain,
  (substate) => substate.toJS(),
);

export default makeSelectContext;
export {
  selectContextDomain,
  makeSelectPatient,
  makeSelectUser,
  makeSelectOrganizations,
};
