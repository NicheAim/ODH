import { makeSelectPatient, makeSelectUser } from 'containers/App/contextSelectors';
import { showNotification } from 'containers/Notification/actions';
import { all, call, put, select, takeLatest } from 'redux-saga/effects';
import { getCommunicationsByAppointment } from 'utils/CommunicationUtils';
import {
  acceptPatientAppointmentError,
  acceptPatientAppointmentSuccess,
  cancelPatientAppointmentError,
  cancelPatientAppointmentSuccess,
  declinePatientAppointmentError,
  declinePatientAppointmentSuccess,
  getPatientAppointmentsError,
  getPatientAppointmentsSuccess,
  tentativePatientAppointmentError,
  tentativePatientAppointmentSuccess,
  getAppointmentRelatedCommunicationsSuccess,
  getAppointmentRelatedCommunications,
} from './actions';
import getPatientAppointmentsApi, {
  acceptAppointment,
  cancelAppointment,
  declineAppointment,
  tentativelyAcceptAppointment,
} from './api';
import {
  ACCEPT_PATIENT_APPOINTMENT,
  CANCEL_PATIENT_APPOINTMENT,
  DECLINE_PATIENT_APPOINTMENT,
  GET_PATIENT_APPOINTMENTS,
  TENTATIVE_PATIENT_APPOINTMENT,
  GET_APPOINTMENT_RELATED_COMMUNICATIONS,
} from './constants';

function getErrorMessage(err) {
  let errorMessage = '';
  if (err && err.message === 'Failed to fetch') {
    errorMessage = 'Failed to retrieve the appointment list. Server is offline.';
  } else if (err && err.response && err.response.status === 404) {
    errorMessage = 'No appointments to show.';
  } else if (err && err.response && err.response.status === 500) {
    errorMessage = 'Failed to retrieve the appointment list. Unknown server error.';
  } else {
    errorMessage = 'Failed to retrieve the appointment list. Unknown error.';
  }
  return errorMessage;
}

export function* getPatientAppointmentsSaga({ query: { showPastAppointments, pageNumber } }) {
  try {
    let queryParams = {
      showPastAppointments,
      pageNumber,
    };
    const patient = yield select(makeSelectPatient());
    const practitioner = yield select(makeSelectUser());
    const patientId = patient ? patient.id : null;
    const practitionerId = (practitioner && practitioner.fhirResource) ? practitioner.fhirResource.logicalId : null;

    if (patientId && practitionerId) {
      queryParams = {
        showPastAppointments,
        pageNumber,
        patientId,
        requesterReference: `Practitioner/${practitionerId}`,
      };
    } else if (patientId) {
      queryParams = {
        showPastAppointments,
        pageNumber,
        patientId,
        requesterReference: `Patient/${patientId}`,
      };
    } else if (practitionerId) {
      queryParams = {
        showPastAppointments,
        pageNumber,
        practitionerId,
        requesterReference: `Practitioner/${practitionerId}`,
      };
    }
    const patientAppointmentsPage = yield call(getPatientAppointmentsApi, queryParams);
    yield put(getPatientAppointmentsSuccess(patientAppointmentsPage));
  } catch (err) {
    const errMsg = getErrorMessage(err);
    yield put(getPatientAppointmentsError(err));
    yield put(showNotification(errMsg));
  }
}

export function* getCommunicationsByAppointmentSaga({ patient, appointmentId, pageNumber }) {
  try {
    const communications = yield call(getCommunicationsByAppointment, patient, appointmentId, pageNumber, 'Appointment');
    yield put(getAppointmentRelatedCommunicationsSuccess(communications));
  } catch (err) {
    const errMsg = getErrorMessage(err);
    yield put(getAppointmentRelatedCommunications(err));
    yield put(showNotification(errMsg));
  }
}

export function* cancelPatientAppointmentSaga({ id }) {
  try {
    yield call(cancelAppointment, id);
    yield put(cancelPatientAppointmentSuccess(id));
    yield put(showNotification('Appointment is cancelled.'));
  } catch (err) {
    yield put(cancelPatientAppointmentError(err));
    yield put(showNotification('Failed to cancel the appointment.'));
  }
}

export function* acceptPatientAppointmentSaga({ id, query: { showPastAppointments, pageNumber } }) {
  try {
    const practitioner = yield select(makeSelectUser());
    const practitionerId = (practitioner && practitioner.fhirResource) ? practitioner.fhirResource.logicalId : null;
    const patient = yield select(makeSelectPatient());
    const patientId = patient ? patient.id : null;
    let queryParams = {};
    let actionQueryParams = {};

    if (patientId && practitionerId) {
      queryParams = {
        showPastAppointments,
        pageNumber,
        patientId,
        practitionerId,
        requesterReference: `Practitioner/${practitionerId}`,
      };
      actionQueryParams = {
        actorReference: `Practitioner/${practitionerId}`,
      };
    } else if (patientId) {
      queryParams = {
        showPastAppointments,
        pageNumber,
        patientId,
        requesterReference: `Patient/${patientId}`,
      };
      actionQueryParams = {
        actorReference: `Patient/${patientId}`,
      };
    } else if (practitionerId) {
      queryParams = {
        showPastAppointments,
        pageNumber,
        practitionerId,
        requesterReference: `Practitioner/${practitionerId}`,
      };
      actionQueryParams = {
        actorReference: `Practitioner/${practitionerId}`,
      };
    }

    yield call(acceptAppointment, id, actionQueryParams);
    yield put(acceptPatientAppointmentSuccess());
    yield put(showNotification('Appointment is accepted.'));

    const patientAppointmentsPage = yield call(getPatientAppointmentsApi, queryParams);
    yield put(getPatientAppointmentsSuccess(patientAppointmentsPage));
  } catch (err) {
    yield put(acceptPatientAppointmentError(err));
    yield put(showNotification('Failed to accept the appointment.'));
  }
}

export function* declinePatientAppointmentSaga({ id, query: { showPastAppointments, pageNumber } }) {
  try {
    const practitioner = yield select(makeSelectUser());
    const practitionerId = (practitioner && practitioner.fhirResource) ? practitioner.fhirResource.logicalId : null;
    const patient = yield select(makeSelectPatient());
    const patientId = patient ? patient.id : null;
    let queryParams = {};
    let actionQueryParams = {};

    if (patientId && practitionerId) {
      queryParams = {
        showPastAppointments,
        pageNumber,
        patientId,
        practitionerId,
        requesterReference: `Practitioner/${practitionerId}`,
      };
      actionQueryParams = {
        actorReference: `Practitioner/${practitionerId}`,
      };
    } else if (patientId) {
      queryParams = {
        showPastAppointments,
        pageNumber,
        patientId,
        requesterReference: `Patient/${patientId}`,
      };
      actionQueryParams = {
        actorReference: `Patient/${patientId}`,
      };
    } else if (practitionerId) {
      queryParams = {
        showPastAppointments,
        pageNumber,
        practitionerId,
        requesterReference: `Practitioner/${practitionerId}`,
      };
      actionQueryParams = {
        actorReference: `Practitioner/${practitionerId}`,
      };
    }

    yield call(declineAppointment, id, actionQueryParams);
    yield put(declinePatientAppointmentSuccess());
    yield put(showNotification('Appointment is declined.'));

    const patientAppointmentsPage = yield call(getPatientAppointmentsApi, queryParams);
    yield put(getPatientAppointmentsSuccess(patientAppointmentsPage));
  } catch (err) {
    yield put(declinePatientAppointmentError(err));
    yield put(showNotification('Failed to decline the appointment.'));
  }
}

export function* tentativelyAcceptPatientAppointmentSaga({ id, query: { showPastAppointments, pageNumber } }) {
  try {
    const practitioner = yield select(makeSelectUser());
    const practitionerId = (practitioner && practitioner.fhirResource) ? practitioner.fhirResource.logicalId : null;
    const patient = yield select(makeSelectPatient());
    const patientId = patient ? patient.id : null;
    let queryParams = {};
    let actionQueryParams = {};

    if (patientId && practitionerId) {
      queryParams = {
        showPastAppointments,
        pageNumber,
        patientId,
        practitionerId,
        requesterReference: `Practitioner/${practitionerId}`,
      };
      actionQueryParams = {
        actorReference: `Practitioner/${practitionerId}`,
      };
    } else if (patientId) {
      queryParams = {
        showPastAppointments,
        pageNumber,
        patientId,
        requesterReference: `Patient/${patientId}`,
      };
      actionQueryParams = {
        actorReference: `Patient/${patientId}`,
      };
    } else if (practitionerId) {
      queryParams = {
        showPastAppointments,
        pageNumber,
        practitionerId,
        requesterReference: `Practitioner/${practitionerId}`,
      };
      actionQueryParams = {
        actorReference: `Practitioner/${practitionerId}`,
      };
    }

    yield call(tentativelyAcceptAppointment, id, actionQueryParams);
    yield put(tentativePatientAppointmentSuccess());
    yield put(showNotification('Appointment is tentatively accepted.'));

    const patientAppointmentsPage = yield call(getPatientAppointmentsApi, queryParams);
    yield put(getPatientAppointmentsSuccess(patientAppointmentsPage));
  } catch (err) {
    yield put(tentativePatientAppointmentError(err));
    yield put(showNotification('Failed to tentatively accept the appointment.'));
  }
}

export function* watchGetPatientAppointmentsSaga() {
  yield takeLatest(GET_PATIENT_APPOINTMENTS, getPatientAppointmentsSaga);
}

export function* watchCancelPatientAppointmentSaga() {
  yield takeLatest(CANCEL_PATIENT_APPOINTMENT, cancelPatientAppointmentSaga);
}

export function* watchAcceptPatientAppointmentSaga() {
  yield takeLatest(ACCEPT_PATIENT_APPOINTMENT, acceptPatientAppointmentSaga);
}

export function* watchDeclinePatientAppointmentSaga() {
  yield takeLatest(DECLINE_PATIENT_APPOINTMENT, declinePatientAppointmentSaga);
}

export function* watchTentativelyAcceptPatientAppointmentSagaSaga() {
  yield takeLatest(TENTATIVE_PATIENT_APPOINTMENT, tentativelyAcceptPatientAppointmentSaga);
}

export function* watchGetCommunicationsByAppointmentSaga() {
  yield takeLatest(GET_APPOINTMENT_RELATED_COMMUNICATIONS, getCommunicationsByAppointmentSaga);
}

// Individual exports for testing
export default function* defaultSaga() {
  yield all([
    watchGetPatientAppointmentsSaga(),
    watchCancelPatientAppointmentSaga(),
    watchAcceptPatientAppointmentSaga(),
    watchDeclinePatientAppointmentSaga(),
    watchTentativelyAcceptPatientAppointmentSagaSaga(),
    watchGetCommunicationsByAppointmentSaga(),
  ]);
}
