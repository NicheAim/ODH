import { createSelector } from 'reselect';

/**
 * Direct selector to the addAppointmentParticipant state domain
 */
const selectAddAppointmentParticipantDomain = (state) => state.get('addAppointmentParticipant');

/**
 * Other specific selectors
 */
const makeSelectHealthcareServiceReferences = () => createSelector(
  selectAddAppointmentParticipantDomain,
  (subState) => subState && subState.get('healthcareServices'),
);

const makeSelectLocationReferences = () => createSelector(
  selectAddAppointmentParticipantDomain,
  (subState) => subState && subState.get('locations'),
);

const makeSelectPractitionerReferences = () => createSelector(
  selectAddAppointmentParticipantDomain,
  (subState) => subState && subState.get('practitioners'),
);

const makeSelectSearchParticipantReferences = () => createSelector(
  selectAddAppointmentParticipantDomain,
  (subState) => subState && subState.get('searchParticipants').toJS(),
);

/**
 * Default selector used by AddAppointmentParticipant
 */

const makeSelectAddAppointmentParticipant = () => createSelector(
  selectAddAppointmentParticipantDomain,
  (substate) => substate.toJS(),
);

export default makeSelectAddAppointmentParticipant;
export {
  selectAddAppointmentParticipantDomain,
  makeSelectHealthcareServiceReferences,
  makeSelectLocationReferences,
  makeSelectPractitionerReferences,
  makeSelectSearchParticipantReferences,
};
