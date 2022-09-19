import { createSelector } from 'reselect';

/**
 * Direct selector to the newPractitionerResource state domain
 */
const selectNewPractitionerResourceDomain = (state) => state.get('newPractitionerResource');

/**
 * Other specific selectors
 */
const makeSelectNewPractitionerQueryParameters = () => createSelector(
  selectNewPractitionerResourceDomain,
  (substate) => substate && substate.get('queryParameters').toJS(),
);

const makeSelectNewPractitionerExists = () => createSelector(
  selectNewPractitionerResourceDomain,
  (substate) => substate && substate.get('exists'),
);

/**
 * Default selector used by NewPractitionerResource
 */

const makeSelectNewPractitionerResource = () => createSelector(
  selectNewPractitionerResourceDomain,
  (substate) => substate.toJS(),
);

export default makeSelectNewPractitionerResource;
export {
  selectNewPractitionerResourceDomain,
  makeSelectNewPractitionerQueryParameters,
  makeSelectNewPractitionerExists,
};
