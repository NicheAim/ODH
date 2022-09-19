/*
 *
 * PatientAppointments actions
 *
 */


import {
  ACCEPT_PATIENT_APPOINTMENT,
  ACCEPT_PATIENT_APPOINTMENT_ERROR,
  ACCEPT_PATIENT_APPOINTMENT_SUCCESS,
  CANCEL_PATIENT_APPOINTMENT,
  CANCEL_PATIENT_APPOINTMENT_ERROR,
  CANCEL_PATIENT_APPOINTMENT_SUCCESS,
  DECLINE_PATIENT_APPOINTMENT,
  DECLINE_PATIENT_APPOINTMENT_ERROR,
  DECLINE_PATIENT_APPOINTMENT_SUCCESS,
  GET_PATIENT_APPOINTMENTS,
  GET_PATIENT_APPOINTMENTS_ERROR,
  GET_PATIENT_APPOINTMENTS_SUCCESS,
  INITIALIZE_PATIENT_APPOINTMENTS,
  TENTATIVE_PATIENT_APPOINTMENT,
  TENTATIVE_PATIENT_APPOINTMENT_ERROR,
  TENTATIVE_PATIENT_APPOINTMENT_SUCCESS,
  GET_APPOINTMENT_RELATED_COMMUNICATIONS,
  GET_APPOINTMENT_RELATED_COMMUNICATIONS_SUCCESS,
  GET_APPOINTMENT_RELATED_COMMUNICATIONS_ERROR,
} from './constants';

export function initializePatientAppointments() {
  return {
    type: INITIALIZE_PATIENT_APPOINTMENTS,
  };
}

// GET
export function getPatientAppointments(query) {
  return {
    type: GET_PATIENT_APPOINTMENTS,
    query,
  };
}

export function getPatientAppointmentsSuccess(patientAppointmentsPage) {
  return {
    type: GET_PATIENT_APPOINTMENTS_SUCCESS,
    patientAppointmentsPage,
  };
}

export function getPatientAppointmentsError(error) {
  return {
    type: GET_PATIENT_APPOINTMENTS_ERROR,
    error,
  };
}

// Cancel
export function cancelPatientAppointment(id) {
  return {
    type: CANCEL_PATIENT_APPOINTMENT,
    id,
  };
}

export function cancelPatientAppointmentSuccess(id) {
  return {
    type: CANCEL_PATIENT_APPOINTMENT_SUCCESS,
    id,
  };
}

export function cancelPatientAppointmentError(error) {
  return {
    type: CANCEL_PATIENT_APPOINTMENT_ERROR,
    error,
  };
}

/* Accept*/
export function acceptPatientAppointment(id, query) {
  return {
    type: ACCEPT_PATIENT_APPOINTMENT,
    id,
    query,
  };
}

export function acceptPatientAppointmentSuccess() {
  return {
    type: ACCEPT_PATIENT_APPOINTMENT_SUCCESS,
  };
}

export function acceptPatientAppointmentError(error) {
  return {
    type: ACCEPT_PATIENT_APPOINTMENT_ERROR,
    error,
  };
}

/* Decline*/
export function declinePatientAppointment(id, query) {
  return {
    type: DECLINE_PATIENT_APPOINTMENT,
    id,
    query,
  };
}

export function declinePatientAppointmentSuccess() {
  return {
    type: DECLINE_PATIENT_APPOINTMENT_SUCCESS,
  };
}

export function declinePatientAppointmentError(error) {
  return {
    type: DECLINE_PATIENT_APPOINTMENT_ERROR,
    error,
  };
}

/* Tentative*/
export function tentativePatientAppointment(id, query) {
  return {
    type: TENTATIVE_PATIENT_APPOINTMENT,
    id,
    query,
  };
}

export function tentativePatientAppointmentSuccess() {
  return {
    type: TENTATIVE_PATIENT_APPOINTMENT_SUCCESS,
  };
}

export function tentativePatientAppointmentError(error) {
  return {
    type: TENTATIVE_PATIENT_APPOINTMENT_ERROR,
    error,
  };
}

export function getAppointmentRelatedCommunications(patient, appointmentId, pageNumber) {
  return {
    type: GET_APPOINTMENT_RELATED_COMMUNICATIONS,
    patient,
    pageNumber,
    appointmentId,
  };
}


export function getAppointmentRelatedCommunicationsSuccess(communications) {
  return {
    type: GET_APPOINTMENT_RELATED_COMMUNICATIONS_SUCCESS,
    communications,
  };
}


export function getAppointmentRelatedCommunicationsError(error) {
  return {
    type: GET_APPOINTMENT_RELATED_COMMUNICATIONS_ERROR,
    error,
  };
}

