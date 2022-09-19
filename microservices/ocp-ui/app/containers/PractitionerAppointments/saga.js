import { makeSelectUser } from 'containers/App/contextSelectors';
import { showNotification } from 'containers/Notification/actions';
import { all, call, put, select, takeLatest } from 'redux-saga/effects';
import {
  acceptPractitionerAppointmentError,
  acceptPractitionerAppointmentSuccess,
  cancelPractitionerAppointmentError,
  cancelPractitionerAppointmentSuccess,
  declinePractitionerAppointmentError,
  declinePractitionerAppointmentSuccess,
  getPractitionerAppointmentsError,
  getPractitionerAppointmentsSuccess,
  tentativePractitionerAppointmentError,
  tentativePractitionerAppointmentSuccess,
} from './actions';
import getPractitionerAppointmentsApi, {
  acceptAppointment,
  cancelAppointment,
  declineAppointment,
  tentativelyAcceptAppointment,
} from './api';
import {
  ACCEPT_PRACTITIONER_APPOINTMENT,
  CANCEL_PRACTITIONER_APPOINTMENT,
  DECLINE_PRACTITIONER_APPOINTMENT,
  GET_PRACTITIONER_APPOINTMENTS,
  TENTATIVE_PRACTITIONER_APPOINTMENT,
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

export function* getPractitionerAppointmentsSaga({ query: { showPastAppointments, pageNumber, filterDateOption } }) {
  try {
    const practitioner = yield select(makeSelectUser());
    const practitionerId = (practitioner && practitioner.fhirResource) ? practitioner.fhirResource.logicalId : null;

    const queryParams = {
      showPastAppointments,
      pageNumber,
      filterDateOption,
      requesterReference: `Practitioner/${practitionerId}`,
    };

    const practitionerAppointmentsPage = yield call(getPractitionerAppointmentsApi, practitionerId, queryParams);
    yield put(getPractitionerAppointmentsSuccess(practitionerAppointmentsPage));
  } catch (err) {
    yield put(getPractitionerAppointmentsError(err));
    if (err.response.status !== 404) {
      const errMsg = getErrorMessage(err);
      yield put(showNotification(errMsg));
    }
  }
}

export function* cancelPractitionerAppointmentSaga({ id }) {
  try {
    yield call(cancelAppointment, id);
    yield put(cancelPractitionerAppointmentSuccess(id));
    yield put(showNotification('Appointment is cancelled.'));
  } catch (err) {
    yield put(cancelPractitionerAppointmentError(err));
    yield put(showNotification('Failed to cancel the appointment.'));
  }
}

export function* acceptPractitionerAppointmentSaga({ id, query: { showPastAppointments, pageNumber } }) {
  try {
    const practitioner = yield select(makeSelectUser());
    const practitionerId = (practitioner && practitioner.fhirResource) ? practitioner.fhirResource.logicalId : null;
    let queryParams = {
      showPastAppointments,
      pageNumber,
    };
    let actionQueryParams = {};
    if (practitionerId) {
      actionQueryParams = {
        actorReference: `Practitioner/${practitionerId}`,
      };
      queryParams = {
        showPastAppointments,
        pageNumber,
        practitionerId,
        requesterReference: `Practitioner/${practitionerId}`,
      };
    }
    yield call(acceptAppointment, id, actionQueryParams);
    yield put(acceptPractitionerAppointmentSuccess());
    yield put(showNotification('Appointment is accepted.'));

    const practitionerAppointmentsPage = yield call(getPractitionerAppointmentsApi, queryParams);
    yield put(getPractitionerAppointmentsSuccess(practitionerAppointmentsPage));
  } catch (err) {
    yield put(acceptPractitionerAppointmentError(err));
    yield put(showNotification('Failed to accept the appointment.'));
  }
}

export function* declinePractitionerAppointmentSaga({ id, query: { showPastAppointments, pageNumber } }) {
  try {
    const practitioner = yield select(makeSelectUser());
    const practitionerId = (practitioner && practitioner.fhirResource) ? practitioner.fhirResource.logicalId : null;
    let queryParams = {
      showPastAppointments,
      pageNumber,
    };
    let actionQueryParams = {};
    if (practitionerId) {
      actionQueryParams = {
        actorReference: `Practitioner/${practitionerId}`,
      };
      queryParams = {
        showPastAppointments,
        pageNumber,
        practitionerId,
        requesterReference: `Practitioner/${practitionerId}`,
      };
    }
    yield call(declineAppointment, id, actionQueryParams);
    yield put(declinePractitionerAppointmentSuccess());
    yield put(showNotification('Appointment is declined.'));

    const practitionerAppointmentsPage = yield call(getPractitionerAppointmentsApi, queryParams);
    yield put(getPractitionerAppointmentsSuccess(practitionerAppointmentsPage));
  } catch (err) {
    yield put(declinePractitionerAppointmentError(err));
    yield put(showNotification('Failed to decline the appointment.'));
  }
}

export function* tentativelyAcceptPractitionerAppointmentSaga({ id, query: { showPastAppointments, pageNumber } }) {
  try {
    const practitioner = yield select(makeSelectUser());
    const practitionerId = (practitioner && practitioner.fhirResource) ? practitioner.fhirResource.logicalId : null;
    let queryParams = {
      showPastAppointments,
      pageNumber,
    };
    let actionQueryParams = {};
    if (practitionerId) {
      actionQueryParams = {
        actorReference: `Practitioner/${practitionerId}`,
      };
      queryParams = {
        showPastAppointments,
        pageNumber,
        practitionerId,
        requesterReference: `Practitioner/${practitionerId}`,
      };
    }
    yield call(tentativelyAcceptAppointment, id, actionQueryParams);
    yield put(tentativePractitionerAppointmentSuccess());
    yield put(showNotification('Appointment is tentatively accepted.'));

    const practitionerAppointmentsPage = yield call(getPractitionerAppointmentsApi, queryParams);
    yield put(getPractitionerAppointmentsSuccess(practitionerAppointmentsPage));
  } catch (err) {
    yield put(tentativePractitionerAppointmentError(err));
    yield put(showNotification('Failed to tentatively accept the appointment.'));
  }
}

export function* watchGetPractitionerAppointmentsSaga() {
  yield takeLatest(GET_PRACTITIONER_APPOINTMENTS, getPractitionerAppointmentsSaga);
}

export function* watchCancelPractitionerAppointmentSaga() {
  yield takeLatest(CANCEL_PRACTITIONER_APPOINTMENT, cancelPractitionerAppointmentSaga);
}

export function* watchAcceptPractitionerAppointmentSaga() {
  yield takeLatest(ACCEPT_PRACTITIONER_APPOINTMENT, acceptPractitionerAppointmentSaga);
}

export function* watchDeclinePractitionerAppointmentSaga() {
  yield takeLatest(DECLINE_PRACTITIONER_APPOINTMENT, declinePractitionerAppointmentSaga);
}

export function* watchTentativelyAcceptPractitionerAppointmentSagaSaga() {
  yield takeLatest(TENTATIVE_PRACTITIONER_APPOINTMENT, tentativelyAcceptPractitionerAppointmentSaga);
}

export default function* rootSaga() {
  yield all([
    watchGetPractitionerAppointmentsSaga(),
    watchCancelPractitionerAppointmentSaga(),
    watchAcceptPractitionerAppointmentSaga(),
    watchDeclinePractitionerAppointmentSaga(),
    watchTentativelyAcceptPractitionerAppointmentSagaSaga(),
  ]);
}

