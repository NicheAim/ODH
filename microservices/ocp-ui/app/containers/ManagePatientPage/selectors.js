import { createSelector } from 'reselect';

/**
 * Direct selector to the managePatientPage state domain
 */
const selectManagePatientPageDomain = (state) => state.get('managePatientPage');

/**
 * Other specific selectors
 */


/**
 * Default selector used by ManagePatientPage
 */

const makeSelecSavePatientError = () => createSelector(
  selectManagePatientPageDomain,
  (substate) => substate.get('error'),
);

const makeSelectPractitioners = () => createSelector(
  selectManagePatientPageDomain,
  (substate) => substate && substate.get('practitioners'),
);

export {
  selectManagePatientPageDomain,
  makeSelecSavePatientError,
  makeSelectPractitioners,
};
