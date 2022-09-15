import { all, call, put, takeLatest } from 'redux-saga/effects';

import { getUserLoginDetailsError, getUserLoginDetailsSuccess } from './actions';
import { getErrorDetail, getUserLoginDetails } from './api';
import { GET_USER_LOGIN_DETAILS } from './constants';


export function* getUserLoginDetailsSaga() {
  try {
    const userLoginDetails = yield call(getUserLoginDetails);
    yield put(getUserLoginDetailsSuccess(userLoginDetails));
  } catch (error) {
    yield put(getUserLoginDetailsError(getErrorDetail(error)));
  }
}

export function* watchGetUserLoginDetailsSaga() {
  yield takeLatest(GET_USER_LOGIN_DETAILS, getUserLoginDetailsSaga);
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* rootSaga() {
  yield all([
    watchGetUserLoginDetailsSaga(),
  ]);
}
