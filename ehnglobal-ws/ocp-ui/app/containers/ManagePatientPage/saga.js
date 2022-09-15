import { call, all, put, takeLatest } from 'redux-saga/effects';
import { goBack } from 'react-router-redux';
import { SAVE_PATIENT, GET_PRACTITIONERS } from './constants';
import { savePatientError, getPractitionersError, getPractitionersSuccess } from './actions';
import { postPatient, putPatient, getPractitioners } from './api';
import { showNotification } from '../Notification/actions';


export function* savePatientWorker(action) {
  try {
    if (action.patientFormData.id) {
      yield call(putPatient, action.patientFormData);
    } else {
      yield call(postPatient, action.patientFormData);
    }
    yield put(showNotification(`Successfully ${getNotificationAction(action.patientFormData)} the client.`));
    yield call(action.handleSubmitting);
    yield put(goBack());
  } catch (error) {
    yield put(showNotification(`Failed to ${getNotificationAction(action.patientFormData)} the client.`));
    yield call(action.handleSubmitting);
    yield put(savePatientError(error));
  }
}

export function* watchManagePatientSaga() {
  yield [
    takeLatest(SAVE_PATIENT, savePatientWorker),
  ];
}

function getNotificationAction(patientFormData) {
  let action = 'create';
  if (patientFormData.id) {
    action = 'edit';
  }
  return action;
}

export function* getPractitionersSaga(practitionerId) {
  try {
    const practitioners = yield call(getPractitioners, practitionerId);
    yield put(getPractitionersSuccess(practitioners));
  } catch (err) {
    yield put(getPractitionersError(err));
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export function* watchGetPractitionersSaga() {
  yield takeLatest(GET_PRACTITIONERS, getPractitionersSaga);
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* rootSaga() {
  yield all([
    watchManagePatientSaga(),
    watchGetPractitionersSaga(),
  ]);
}
