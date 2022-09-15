/*
 *
 * ManageAppointmentPage actions
 *
 */

import {
  GET_APPOINTMENT, GET_APPOINTMENT_SUCCESS,
  INITIALIZE_MANAGE_APPOINTMENT,
  SAVE_APPOINTMENT,
} from './constants';

export function initializeManageAppointment() {
  return {
    type: INITIALIZE_MANAGE_APPOINTMENT,
  };
}

export function getAppointment(appointmentId) {
  return {
    type: GET_APPOINTMENT,
    appointmentId,
  };
}


export function getAppointmentSuccess(appointment) {
  return {
    type: GET_APPOINTMENT_SUCCESS,
    appointment,
  };
}

export function saveAppointment(appointment, handleSubmitting) {
  return {
    type: SAVE_APPOINTMENT,
    appointment,
    handleSubmitting,
  };
}
