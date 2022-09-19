import { makeSelectPatient, makeSelectUser } from 'containers/App/contextSelectors';
import { showNotification } from 'containers/Notification/actions';
import { all, call, put, select, takeLatest } from 'redux-saga/effects';
import {
  retrieveOutlookPassword,
  retrieveOutlookUsername,
  storeOutlookPassword,
  storeOutlookUsername,
} from 'utils/tokenService';
import {
  getAppointmentsError,
  getAppointmentsSuccess,
  getOutlookAppointmentsError,
  getOutlookAppointmentsSuccess,
  loginToOWAError,
  loginToOWASuccess,
} from './actions';
import getAppointmentsApi, { getOutlookAppointmentsApi, loginToOWA } from './api';
import { GET_APPOINTMENTS, GET_OUTLOOK_APPOINTMENTS, LOGIN_OUTLOOK } from './constants';

function getErrorMessage(err) {
  let errorMessage = '';
  if (err && err.message === 'Failed to fetch') {
    errorMessage = 'Failed to retrieve the calendar appointment list. Server is offline.';
  } else if (err && err.response && err.response.status === 404) {
    errorMessage = 'No calendar appointments to show.';
  } else if (err && err.response && err.response.status === 500) {
    errorMessage = 'Failed to retrieve the calendar appointment list. Unknown server error.';
  } else {
    errorMessage = 'Failed to retrieve the calendar appointment list. Unknown error.';
  }
  return errorMessage;
}

function getErrorMessageForOutlookAPICall(err) {
  let errorMessage = '';
  if (err && err.message === 'Failed to fetch') {
    errorMessage = 'Failed to retrieve the Outlook appointment list. Server is offline.';
  } else if (err && err.response && err.response.status === 404) {
    errorMessage = 'No Outlook appointments to show.';
  } else if (err && err.response && err.response.status === 500) {
    errorMessage = 'Failed to retrieve the Outlook appointment list. Unknown server error.';
  } else {
    errorMessage = 'Failed to retrieve the Outlook appointment list. Unknown error.';
  }
  return errorMessage;
}


export function getLoginTOWAErrorDetail(err) {
  let errorMessage = '';
  if (err && err.message === 'Failed to fetch') {
    errorMessage = 'Failed to authorize the Outlook Credentials. Server is offline.';
  } else if (err && err.response && err.response.status === 401) {
    errorMessage = 'Failed to authorize the Outlook Credentials';
  } else if (err && err.response && err.response.status === 500) {
    errorMessage = 'Failed to authorize the Outlook Credentials. Unknown server error.';
  }
  return errorMessage;
}


export function* getAppointmentsSaga({ query }) {
  try {
    let queryParams = query;
    const patient = yield select(makeSelectPatient());
    const practitioner = yield select(makeSelectUser());
    const patientId = patient ? patient.id : null;
    const practitionerId = (practitioner && practitioner.fhirResource) ? practitioner.fhirResource.logicalId : null;
    if (practitionerId) {
      queryParams = {
        practitionerId,
        requesterReference: `Practitioner/${practitionerId}`,
      };
    } else if (patientId) {
      queryParams = {
        patientId,
        requesterReference: `Patient/${patientId}`,
      };
    }
    const appointments = yield call(getAppointmentsApi, queryParams);
    yield put(getAppointmentsSuccess(appointments));
  } catch (err) {
    const errMsg = getErrorMessage(err);
    yield put(getAppointmentsError(err));
    yield put(showNotification(errMsg));
  }
}

export function* watchGetAppointmentsSaga() {
  yield takeLatest(GET_APPOINTMENTS, getAppointmentsSaga);
}

export function* getOutlookAppointmentsSaga() {
  // Check in session storage and only then call the API. Else do nothing.
  const outlookUsername = retrieveOutlookUsername();
  const outlookPassword = retrieveOutlookPassword();

  if (outlookUsername !== null && outlookPassword !== null) {
    try {
      const outlookAppointments = yield call(getOutlookAppointmentsApi, outlookUsername, outlookPassword);
      yield put(getOutlookAppointmentsSuccess(outlookAppointments));
    } catch (err) {
      const errMsg = getErrorMessageForOutlookAPICall(err);
      yield put(getOutlookAppointmentsError(err));
      yield put(showNotification(errMsg));
    }
  }
}

export function* watchGetOutlookAppointmentsSaga() {
  yield takeLatest(GET_OUTLOOK_APPOINTMENTS, getOutlookAppointmentsSaga);
}

export function* loginToOWASaga(loginAction) {
  try {
    const loginResponse = yield call(loginToOWA, loginAction.loginCredentials);
    if (loginResponse === null) {
      yield put(loginToOWASuccess(true));
      yield put(showNotification('Successfully authenticated your Outlook credentials.'));
      // put in Session storage and get outlook appointments
      yield call(storeOutlookUsername, loginAction.loginCredentials.username);
      yield call(storeOutlookPassword, loginAction.loginCredentials.password);
      try {
        const outlookAppointments = yield call(getOutlookAppointmentsApi, loginAction.loginCredentials.username, loginAction.loginCredentials.password);
        yield put(getOutlookAppointmentsSuccess(outlookAppointments));
        yield put(showNotification('Displaying your Outlook Calendar events.'));
      } catch (err) {
        const errMsg = getErrorMessageForOutlookAPICall(err);
        yield put(getOutlookAppointmentsError(err));
        yield put(showNotification(errMsg));
      }
    }
  } catch (err) {
    const errMsg = getLoginTOWAErrorDetail(err);
    yield put(loginToOWAError(err));
    yield put(showNotification(errMsg));
  }
}

export function* watchLoginToOWASaga() {
  yield takeLatest(LOGIN_OUTLOOK, loginToOWASaga);
}

export default function* defaultSaga() {
  yield all([
    watchGetAppointmentsSaga(),
    watchGetOutlookAppointmentsSaga(),
    watchLoginToOWASaga(),
  ]);
}
