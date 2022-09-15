import { showNotification } from 'containers/Notification/actions';
import { all, call, put, takeLatest } from 'redux-saga/effects';
import { getCommunicationsByAppointment } from 'utils/CommunicationUtils';
import { actions, actionTypes } from './actions';
import { API } from './api';

function getErrorMessage(err) {
  let errorMessage = '';
  if (err && err.message === 'Failed to fetch') {
    errorMessage = "Failed to retrieve patient's tasks. Server is offline.";
  } else if (err && err.response && err.response.status === 404) {
    errorMessage = 'The patient does not have any tasks.';
  } else if (err && err.response && err.response.status === 500) {
    errorMessage = "Failed to retrieve patient's tasks. Unknown server error.";
  } else {
    errorMessage = "Failed to retrieve patient's tasks. Unknown error.";
  }
  return errorMessage;
}

export function* getTasksSaga({
  practitionerId,
  patientId,
  statusList,
  definition,
}) {
  try {
    // console.log('saga definition:')
    // console.log(definition)
    const tasksPage = yield call(
      API.getTasks,
      practitionerId,
      patientId,
      statusList,
      definition
    );
    yield put(actions.getTasksSuccess(tasksPage));
  } catch (err) {
    const errMsg = getErrorMessage(err);
    yield put(actions.getTasksError(errMsg));
  }
}

export function* cancelTaskSaga({ id }) {
  try {
    yield call(API.cancelTask, id);
    yield put(actions.cancelTaskSuccess(id));
    yield put(showNotification('Task is cancelled.'));
  } catch (err) {
    yield put(actions.cancelTaskError(err));
    yield put(showNotification('Failed to cancel task.'));
  }
}

export function* getTaskRelatedCommunicationsSaga({
  patient,
  taskId,
  pageNumber,
}) {
  try {
    const communications = yield call(
      getCommunicationsByAppointment,
      patient,
      taskId,
      pageNumber,
      'Task'
    );
    yield put(actions.getTaskRelatedCommunicationsSuccess(communications));
  } catch (err) {
    const errMsg = getErrorMessage(err);
    yield put(actions.getTaskRelatedCommunicationsError(err));
    yield put(showNotification(errMsg));
  }
}

export function* watchGetTasksSaga() {
  yield takeLatest(actionTypes.GET_TASKS, getTasksSaga);
}

export function* watchCancelTaskSaga() {
  yield takeLatest(actionTypes.CANCEL_TASK, cancelTaskSaga);
}

export function* watchGetTaskRelatedCommunicationsSaga() {
  yield takeLatest(
    actionTypes.GET_TASK_RELATED_COMMUNICATIONS,
    getTaskRelatedCommunicationsSaga
  );
}

export default function* rootSaga() {
  yield all([
    watchGetTasksSaga(),
    watchCancelTaskSaga(),
    watchGetTaskRelatedCommunicationsSaga(),
  ]);
}
