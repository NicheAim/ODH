import { createSelector } from 'reselect';

const selectPatientPageDomain = (state) => state.get('PatientsPage');

const makeSelectPatientPage = () =>
  createSelector(selectPatientPageDomain, (substate) => substate.toJS());

const makeSelectEmergencyContact = () =>
  createSelector(
    selectPatientPageDomain,
    (substate) => substate && substate.get('emergency_contact').toJS()
  );

export {
  selectPatientPageDomain,
  makeSelectPatientPage,
  makeSelectEmergencyContact,
};
