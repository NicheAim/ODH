import { all, call, put, takeLatest } from 'redux-saga/effects';
import {
  GET_FILTER_TO_DO,
  GET_PRACTITIONER_TO_DOS } from 'containers/PractitionerToDos/constants';
import { getPractitionerToDos, getFilterToDos } from 'containers/PractitionerToDos/api';
import {
  getFilterToDoError,
  getFilterToDoSuccess,
  getPractitionerToDoError,
  getPractitionerToDoSuccess,
} from 'containers/PractitionerToDos/actions';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import { showNotification } from 'containers/Notification/actions';
import messages from './messages';

export function* getPractitionerToDosSaga(action) {
  try {
    const toDos = yield call(getPractitionerToDos, action.practitionerId, action.definition);
    yield put(getPractitionerToDoSuccess(toDos));
  } catch (error) {
    yield put(showNotification(<FormattedMessage {...messages.noToDoError} />));
    yield put(getPractitionerToDoError(error));
  }
}


export function* getFilterToDoSaga(action) {
  try {
    const toDos = yield call(getFilterToDos, action.practitionerId, action.definition, action.dateRange);
    yield put(getFilterToDoSuccess(toDos));
  } catch (error) {
    yield put(showNotification(<FormattedMessage {...messages.noToDosFound} />));
    yield put(getFilterToDoError(error));
  }
}

export function* watchGetPractitionerToDosSaga() {
  yield takeLatest(GET_PRACTITIONER_TO_DOS, getPractitionerToDosSaga);
}


export function* watchGetFilterToDoSaga() {
  yield takeLatest(GET_FILTER_TO_DO, getFilterToDoSaga);
}

export default function* rootSaga() {
  yield all([
    watchGetPractitionerToDosSaga(),
    watchGetFilterToDoSaga(),
  ]);
}
