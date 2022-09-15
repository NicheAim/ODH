import { all, call, put, takeLatest } from 'redux-saga/effects';
import {
  GET_FILTER_TASK,
  GET_PRACTITIONER_TASKS } from 'containers/PractitionerTasks/constants';
import { getPractitionerTasks, getFilterTasks } from 'containers/PractitionerTasks/api';
import {
  getFilterTaskError,
  getFilterTaskSuccess,
  getPractitionerTasksError,
  getPractitionerTasksSuccess,
} from 'containers/PractitionerTasks/actions';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import { showNotification } from 'containers/Notification/actions';
import messages from './messages';

export function* getPractitionerTasksSaga(action) {
  try {
    const tasks = yield call(getPractitionerTasks, action.practitionerId, action.definition);
    console.log("tasks")
    console.log(tasks)
    yield put(getPractitionerTasksSuccess(tasks));
  } catch (error) {
    yield put(showNotification(<FormattedMessage {...messages.noTaskError} />));
    yield put(getPractitionerTasksError(error));
  }
}


export function* getFilterTaskSaga(action) {
  try {
    const tasks = yield call(getFilterTasks, action.practitionerId, action.definition, action.dateRange);
    yield put(getFilterTaskSuccess(tasks));
  } catch (error) {
    yield put(showNotification(<FormattedMessage {...messages.noTasksFound} />));
    yield put(getFilterTaskError(error));
  }
}

export function* watchGetPractitionerTasksSaga() {
  yield takeLatest(GET_PRACTITIONER_TASKS, getPractitionerTasksSaga);
}


export function* watchGetFilterTaskSaga() {
  yield takeLatest(GET_FILTER_TASK, getFilterTaskSaga);
}

export default function* rootSaga() {
  yield all([
    watchGetPractitionerTasksSaga(),
    watchGetFilterTaskSaga(),
  ]);
}
