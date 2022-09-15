import { all, call, put, takeLatest } from 'redux-saga/effects';
import {
  GET_PATIENT_TO_DOS, GET_PATIENT_TO_DO_MAIN_TASK, GET_FILTER_TO_DO, CANCEL_TO_DO,
  GET_TO_DO_RELATED_COMMUNICATIONS,
} from 'containers/PatientToDos/constants';
import {
  getPatientToDoError,
  getPatientToDoSuccess,
  getPatientToDoMainTaskError,
  getPatientToDoMainTaskSuccess, getFilterToDoSuccess, getFilterToDoError,
  cancelToDosError, cancelToDoSuccess, getToDoRelatedCommunicationsError, getToDoRelatedCommunicationsSuccess,
} from 'containers/PatientToDos/actions';
import { getCommunicationsByAppointment } from 'utils/CommunicationUtils';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import { showNotification } from 'containers/Notification/actions';
import { getFilterToDos, getPatientToDos, getToDoMainTask, cancelToDo } from 'containers/PatientToDos/api';
import messages from './messages';


export function* getPatientToDosSaga(action) {
  try {
    const toDos = yield call(getPatientToDos, action.patientId, action.practitionerId, action.definition);
    yield put(getPatientToDoSuccess(toDos));
  } catch (error) {
    yield put(showNotification(<FormattedMessage {...messages.noToDoError} />));
    yield put(getPatientToDoError(error));
  }
}


export function* getToDoMainTaskSaga(action) {
  try {
    const toDoMainTask = yield call(getToDoMainTask, action.patientId, action.organizationId, action.definition, action.practitionerId);
    yield put(getPatientToDoMainTaskSuccess(toDoMainTask));
  } catch (error) {
    yield put(showNotification(<FormattedMessage {...messages.noTaskReferenceError} />));
    yield put(getPatientToDoMainTaskError(error));
  }
}

export function* getFilterToDoSaga(action) {
  try {
    const toDos = yield call(getFilterToDos, action.patientId, action.practitionerId, action.definition, action.dateRange);
    yield put(getFilterToDoSuccess(toDos));
  } catch (error) {
    yield put(showNotification(<FormattedMessage {...messages.noToDosFound} />));
    yield put(getFilterToDoError(error));
  }
}

export function* cancelToDoSaga(action) {
  try {
    if (action.toDoLogicalId) {
      yield call(cancelToDo, action.toDoLogicalId);
      yield put(showNotification(<FormattedMessage {...messages.cancelToDoSuccess} />));
      yield put(cancelToDoSuccess(action.toDoLogicalId));
    }
  } catch (error) {
    yield put(showNotification(<FormattedMessage {...messages.cancelToDoError} />));
    yield put(cancelToDosError(error));
  }
}


export function* getToDoRelatedCommunicationsSaga({ patient, toDoId, pageNumber }) {
  try {
    const communications = yield call(getCommunicationsByAppointment, patient, toDoId, pageNumber, 'ToDo');
    yield put(getToDoRelatedCommunicationsSuccess(communications));
  } catch (err) {
    const error = 'Error in getting To Do related Communications.';
    yield put(getToDoRelatedCommunicationsError(error));
    yield put(showNotification(error));
  }
}

export function* watchGetPatientToDosSaga() {
  yield takeLatest(GET_PATIENT_TO_DOS, getPatientToDosSaga);
}

export function* watchGetToDoMainTaskSaga() {
  yield takeLatest(GET_PATIENT_TO_DO_MAIN_TASK, getToDoMainTaskSaga);
}


export function* watchGetFilterToDoSaga() {
  yield takeLatest(GET_FILTER_TO_DO, getFilterToDoSaga);
}

export function* watchCancelToDoSaga() {
  yield takeLatest(CANCEL_TO_DO, cancelToDoSaga);
}

export function* watchGetToDoRelatedCommunicationsSaga() {
  yield takeLatest(GET_TO_DO_RELATED_COMMUNICATIONS, getToDoRelatedCommunicationsSaga);
}

export default function* rootSaga() {
  yield all([
    watchGetPatientToDosSaga(),
    watchGetToDoMainTaskSaga(),
    watchGetFilterToDoSaga(),
    watchCancelToDoSaga(),
    watchGetToDoRelatedCommunicationsSaga(),
  ]);
}
