import { createSelector } from 'reselect';

/**
 * Direct selector to the newPatientResource state domain
 */
const selectNewPatientResourceDomain = (state) => state.get('newPatientResource');

/**
 * Other specific selectors
 */
const makeSelectNewPatientQueryParameters = () => createSelector(
  selectNewPatientResourceDomain,
  (substate) => substate && substate.get('queryParameters').toJS(),
);

const makeSelectNewPatientExists = () => createSelector(
  selectNewPatientResourceDomain,
  (substate) => substate && substate.get('exists'),
);
const makeSelectNewMintPatient = () => createSelector(
  selectNewPatientResourceDomain,
  (substate) => substate && substate.get('patient') && substate.get('patient').toJS(),
);


/**
 * Default selector used by NewPatientResource
 */

const makeSelectNewPatientResource = () => createSelector(
  selectNewPatientResourceDomain,
  (substate) => substate.toJS()
);

export default makeSelectNewPatientResource;
export {
  selectNewPatientResourceDomain,
  makeSelectNewPatientQueryParameters,
  makeSelectNewPatientExists,
  makeSelectNewMintPatient,
};
