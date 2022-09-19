/*
 *
 * PractitionerAppointments actions
 *
 */


import {
  ACCEPT_PRACTITIONER_APPOINTMENT,
  ACCEPT_PRACTITIONER_APPOINTMENT_ERROR,
  ACCEPT_PRACTITIONER_APPOINTMENT_SUCCESS,
  CANCEL_PRACTITIONER_APPOINTMENT,
  CANCEL_PRACTITIONER_APPOINTMENT_ERROR,
  CANCEL_PRACTITIONER_APPOINTMENT_SUCCESS,
  DECLINE_PRACTITIONER_APPOINTMENT,
  DECLINE_PRACTITIONER_APPOINTMENT_ERROR,
  DECLINE_PRACTITIONER_APPOINTMENT_SUCCESS,
  GET_PRACTITIONER_APPOINTMENTS,
  GET_PRACTITIONER_APPOINTMENTS_ERROR,
  GET_PRACTITIONER_APPOINTMENTS_SUCCESS,
  INITIALIZE_PRACTITIONER_APPOINTMENTS,
  TENTATIVE_PRACTITIONER_APPOINTMENT,
  TENTATIVE_PRACTITIONER_APPOINTMENT_ERROR,
  TENTATIVE_PRACTITIONER_APPOINTMENT_SUCCESS,
} from './constants';

export function initializePractitionerAppointments() {
  return {
    type: INITIALIZE_PRACTITIONER_APPOINTMENTS,
  };
}

// GET
export function getPractitionerAppointments(query) {
  return {
    type: GET_PRACTITIONER_APPOINTMENTS,
    query,
  };
}

export function getPractitionerAppointmentsSuccess(practitionerAppointmentsPage) {
  return {
    type: GET_PRACTITIONER_APPOINTMENTS_SUCCESS,
    practitionerAppointmentsPage,
  };
}

export function getPractitionerAppointmentsError(error) {
  return {
    type: GET_PRACTITIONER_APPOINTMENTS_ERROR,
    error,
  };
}

// Cancel
export function cancelPractitionerAppointment(id) {
  return {
    type: CANCEL_PRACTITIONER_APPOINTMENT,
    id,
  };
}

export function cancelPractitionerAppointmentSuccess(id) {
  return {
    type: CANCEL_PRACTITIONER_APPOINTMENT_SUCCESS,
    id,
  };
}

export function cancelPractitionerAppointmentError(error) {
  return {
    type: CANCEL_PRACTITIONER_APPOINTMENT_ERROR,
    error,
  };
}

// Accept
export function acceptPractitionerAppointment(id, query) {
  return {
    type: ACCEPT_PRACTITIONER_APPOINTMENT,
    id,
    query,
  };
}

export function acceptPractitionerAppointmentSuccess() {
  return {
    type: ACCEPT_PRACTITIONER_APPOINTMENT_SUCCESS,
  };
}

export function acceptPractitionerAppointmentError(error) {
  return {
    type: ACCEPT_PRACTITIONER_APPOINTMENT_ERROR,
    error,
  };
}

// Decline
export function declinePractitionerAppointment(id, query) {
  return {
    type: DECLINE_PRACTITIONER_APPOINTMENT,
    id,
    query,
  };
}

export function declinePractitionerAppointmentSuccess() {
  return {
    type: DECLINE_PRACTITIONER_APPOINTMENT_SUCCESS,
  };
}

export function declinePractitionerAppointmentError(error) {
  return {
    type: DECLINE_PRACTITIONER_APPOINTMENT_ERROR,
    error,
  };
}

// Tentative
export function tentativePractitionerAppointment(id, query) {
  return {
    type: TENTATIVE_PRACTITIONER_APPOINTMENT,
    id,
    query,
  };
}

export function tentativePractitionerAppointmentSuccess() {
  return {
    type: TENTATIVE_PRACTITIONER_APPOINTMENT_SUCCESS,
  };
}

export function tentativePractitionerAppointmentError(error) {
  return {
    type: TENTATIVE_PRACTITIONER_APPOINTMENT_ERROR,
    error,
  };
}
