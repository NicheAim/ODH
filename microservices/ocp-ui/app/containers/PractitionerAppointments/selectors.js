import { createSelector } from 'reselect';

/**
 * Direct selector to the practitionerAppointments state domain
 */
const selectPractitionerAppointmentsDomain = (state) => state.get('practitionerAppointments');

/**
 * Other specific selectors
 */


/**
 * Default selector used by PractitionerAppointments
 */

const makeSelectPractitionerAppointments = () => createSelector(
  selectPractitionerAppointmentsDomain,
  (substate) => substate && substate.toJS()
);

const makeSelectShowPastAppointments = () => createSelector(
  selectPractitionerAppointmentsDomain,
  (substate) => substate && substate.get('showPastAppointments'),
);

export {
  selectPractitionerAppointmentsDomain,
  makeSelectPractitionerAppointments,
  makeSelectShowPastAppointments,
};
