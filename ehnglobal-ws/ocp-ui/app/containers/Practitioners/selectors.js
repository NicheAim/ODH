import { createSelector } from 'reselect';

/**
 * Direct selector to the practitioners state domain
 */
const selectPractitionersDomain = (state) => state.get('practitioners');

/**
 * Other specific selectors
 */

/**
 * Default selector used by Organizations
 */

const makeSelectPractitioners = () => createSelector(
  selectPractitionersDomain,
  (substate) => substate.toJS(),
);

export default makeSelectPractitioners;

export {
  selectPractitionersDomain,
};
