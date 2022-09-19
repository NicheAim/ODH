import { createSelector } from 'reselect';

/**
 * Direct selector to the patientAppointments state domain
 */
const selectPatientAppointmentsDomain = (state) => state.get('patientAppointments');

/**
 * Other specific selectors
 */


/**
 * Default selector used by PatientAppointments
 */

const makeSelectPatientAppointments = () => createSelector(
  selectPatientAppointmentsDomain,
  (substate) => substate && substate.toJS()
);

const makeSelectCommunicationsByAppointment = () => createSelector(
  selectPatientAppointmentsDomain,
  (substate) => substate && substate.get('communications') && substate.get('communications').toJS(),
);

const makeSelectShowPastAppointments = () => createSelector(
  selectPatientAppointmentsDomain,
  (substate) => substate && substate.get('showPastAppointments'),
);

export {
  selectPatientAppointmentsDomain,
  makeSelectPatientAppointments,
  makeSelectShowPastAppointments,
  makeSelectCommunicationsByAppointment,
};
