import { all, call, put, takeLatest } from 'redux-saga/effects';
import { showNotification } from 'containers/Notification/actions';
import { changePassword, getErrorDetail } from './api';
import { changePasswordError } from './actions';
import { CHANGE_PASSWORD } from './constants';

export function* changePasswordSaga({ oldPassword, newPassword, handleSubmitting, handleCloseDrawer }) {
  try {
    yield call(changePassword, oldPassword, newPassword);
    yield put(showNotification('Successfully change the password.'));
    yield call(handleSubmitting);
    yield call(handleCloseDrawer);
  } catch (error) {
    yield call(handleSubmitting);
    yield put(showNotification('Failed to change the password.'));
    yield put(changePasswordError(getErrorDetail(error)));
  }
}

export function* watchChangePasswordSaga() {
  yield takeLatest(CHANGE_PASSWORD, changePasswordSaga);
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* rootSaga() {
  yield all([
    watchChangePasswordSaga(),
  ]);
}
