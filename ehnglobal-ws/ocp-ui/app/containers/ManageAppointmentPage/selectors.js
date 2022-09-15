import { createSelector } from 'reselect';

/**
 * Direct selector to the manageAppointmentPage state domain
 */
const selectManageAppointmentPageDomain = (state) => state.get('manageAppointmentPage');

/**
 * Other specific selectors
 */


const makeSelectAppointment = () => createSelector(
  selectManageAppointmentPageDomain,
  (subState) => subState && subState.get('appointment'),
);


export {
  selectManageAppointmentPageDomain,
  makeSelectAppointment,
};
