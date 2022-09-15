import { createSelector } from 'reselect';

/**
 * Direct selector to the appointmentsCalendar state domain
 */
const selectAppointmentsCalendarDomain = (state) => state.get('appointmentsCalendar');

/**
 * Other specific selectors
 */


/**
 * Default selector used by AppointmentsCalendar
 */

const makeSelectAppointmentsCalendar = () => createSelector(
  selectAppointmentsCalendarDomain,
  (substate) => substate.toJS()
);


const makeSelectIsOutlookAuthenticated = () => createSelector(
  selectAppointmentsCalendarDomain,
  (substate) => substate && substate.get('isOutlookAuthenticated'),
);


export default makeSelectAppointmentsCalendar;
export {
  selectAppointmentsCalendarDomain,
  makeSelectIsOutlookAuthenticated,
};
