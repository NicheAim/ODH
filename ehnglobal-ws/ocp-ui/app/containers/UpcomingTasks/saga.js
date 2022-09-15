// import { take, call, put, select } from 'redux-saga/effects';

import { all, call, put, takeLatest } from 'redux-saga/effects';
import { showNotification } from 'containers/Notification/actions';
import { getUpcomingTasks } from './api';
import { getUpcomingTasksError, getUpcomingTasksSuccess } from './actions';
import { GET_UPCOMING_TASKS } from './constants';

function getErrorMessage(err) {
  let errorMessage = '';
  if (err && err.message === 'Failed to fetch') {
    errorMessage = 'Failed to retrieve upcoming tasks. Server is offline.';
  } else if (err && err.response && err.response.status === 404) {
    errorMessage = 'The care coordinator does not have any patients with tasks.';
  } else if (err && err.response && err.response.status === 500) {
    errorMessage = 'Failed to retrieve upcoming tasks. Unknown server error.';
  } else {
    errorMessage = 'Failed to retrieve upcomings tasks. Unknown error.';
  }
  return errorMessage;
}

export function* getUpcomingTasksSaga({ practitionerId }) {
  try {
    const upcomingTasks = yield call(getUpcomingTasks, practitionerId);
    yield put(getUpcomingTasksSuccess(upcomingTasks));
  } catch (err) {
    const errMsg = getErrorMessage(err);
    yield put(getUpcomingTasksError(err));
    yield put(showNotification(errMsg));
  }
}

export function* watchGetUpcomingTasksSaga() {
  yield takeLatest(GET_UPCOMING_TASKS, getUpcomingTasksSaga);
}

export default function* rootSaga() {
  yield all([
    watchGetUpcomingTasksSaga(),
  ]);
}
