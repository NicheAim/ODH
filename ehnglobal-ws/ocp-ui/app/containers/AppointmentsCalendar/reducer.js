/*
 *
 * AppointmentsCalendar reducer
 *
 */

import { fromJS } from 'immutable';
import {
  DATA,
  GET_APPOINTMENTS,
  GET_APPOINTMENTS_ERROR,
  GET_APPOINTMENTS_SUCCESS,
  GET_OUTLOOK_APPOINTMENTS,
  GET_OUTLOOK_APPOINTMENTS_ERROR,
  GET_OUTLOOK_APPOINTMENTS_SUCCESS,
  IS_OUTLOOK_AUTHENTICATED,
  LOADING,
  LOGIN_OUTLOOK_SUCCESS,
  OUTLOOK_DATA,
} from './constants';

const initialState = fromJS({
  loading: false,
  query: null,
  isOutlookAuthenticated: false,
});

function appointmentsCalendarReducer(state = initialState, action) {
  switch (action.type) {
    case GET_APPOINTMENTS:
      return state
        .set(LOADING, true)
        .set(DATA, null);
    case GET_APPOINTMENTS_SUCCESS:
      return state
        .set(LOADING, false)
        .set(DATA, fromJS(action.appointments || {}));
    case GET_APPOINTMENTS_ERROR:
      return state.set(LOADING, false);
    case GET_OUTLOOK_APPOINTMENTS:
      return state
        .set(LOADING, true)
        .set(OUTLOOK_DATA, null);
    case GET_OUTLOOK_APPOINTMENTS_SUCCESS:
      return state
        .set(LOADING, false)
        .set(OUTLOOK_DATA, fromJS(action.outlookAppointments || {}));
    case GET_OUTLOOK_APPOINTMENTS_ERROR:
      return state.set(LOADING, false);
    case LOGIN_OUTLOOK_SUCCESS:
      return state.set(IS_OUTLOOK_AUTHENTICATED, action.isAuthenticated);
    default:
      return state;
  }
}

export default appointmentsCalendarReducer;
