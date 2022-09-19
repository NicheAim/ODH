import { all, call, put, takeLatest } from 'redux-saga/effects';
import { showNotification } from 'containers/Notification/actions';
import { resetPasswordError } from './actions';
import { getErrorDetail, resetPassword } from './api';
import { RESET_PASSWORD } from './constants';

export function* resetPasswordSaga({ userId, newPassword, handleSubmitting, handleCloseDialog }) {
  try {
    yield call(resetPassword, userId, newPassword);
    yield put(showNotification('Successfully reset the password.'));
    yield call(handleSubmitting);
    yield call(handleCloseDialog);
  } catch (error) {
    yield call(handleSubmitting);
    yield put(showNotification('Failed to reset the password.'));
    yield put(resetPasswordError(getErrorDetail(error)));
  }
}

export function* watchResetPasswordSaga() {
  yield takeLatest(RESET_PASSWORD, resetPasswordSaga);
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* rootSaga() {
  yield all([
    watchResetPasswordSaga(),
  ]);
}
