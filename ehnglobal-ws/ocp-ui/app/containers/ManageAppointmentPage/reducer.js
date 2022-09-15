/*
 *
 * ManageAppointmentPage reducer
 *
 */


import { fromJS } from 'immutable';

import {
  GET_APPOINTMENT_SUCCESS,
  INITIALIZE_MANAGE_APPOINTMENT,
} from './constants';

const initialState = fromJS({
  patient: null,
  appointment: null,
});

function manageAppointmentPageReducer(state = initialState, action) {
  switch (action.type) {
    case INITIALIZE_MANAGE_APPOINTMENT:
      return initialState;
    case GET_APPOINTMENT_SUCCESS:
      return state
        .set('appointment', action.appointment);
    default:
      return state;
  }
}

export default manageAppointmentPageReducer;
