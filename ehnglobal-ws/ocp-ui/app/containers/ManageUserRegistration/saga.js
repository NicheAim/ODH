// import { take, call, put, select } from 'redux-saga/effects';

import { all, call, put, takeLatest } from 'redux-saga/effects';
import { goBack } from 'react-router-redux';

import { showNotification } from 'containers/Notification/actions';
import { getGroups } from 'containers/PermissionsGroups/api';
import { GET_GROUPS, GET_USER, SAVE_USER, REMOVE_USER } from './constants';
import { getFhirResource, getUser, saveUser, updateUser, removeUser } from './api';
import { getGroupsError, getGroupsSuccess, getUserError, getUserSuccess } from './actions';

export function* getUserSaga(action) {
  try {
    const fhirResource = yield call(getFhirResource, action.resourceType, action.resourceId);
    const user = yield call(getUser, action.resourceType, action.resourceId);
    yield put(getUserSuccess(fhirResource, user));
  } catch (err) {
    yield put(getUserError(err));
    yield put(showNotification(`Failed to users: ${getErrorDetail(err)}`));
  }
}

export function* saveUserSaga(action) {
  try {
    if (action.userFormData.isEditing) {
      yield call(updateUser, action.userFormData);
      yield put(showNotification('Successfully update user account'));
    } else {
      yield call(saveUser, action.userFormData);
      yield put(showNotification('Successfully create user account'));
    }
    yield call(action.handleSubmitting);
    yield put(goBack());
  } catch (err) {
    yield put(showNotification(`Failed to create user: ${getErrorDetail(err, action.userFormData.username)}`));
    yield call(action.handleSubmitting);
  }
}

export function* removeUserSaga(action) {
  try {
    yield call(removeUser, action.userId);
    yield put(showNotification('Successfully remove user account'));
    yield put(goBack());
  } catch (err) {
    yield put(showNotification('Failed to remove user, please try again'));
  }
}

export function* getGroupsSaga() {
  try {
    const groups = yield call(getGroups);
    yield put(getGroupsSuccess(groups));
  } catch (err) {
    yield put(getGroupsError(err));
  }
}

export function getErrorDetail(error, username) {
  let errorDetail = error.message;
  if (error && error.message === 'Failed to fetch') {
    errorDetail = ' Server is offline.';
  } else if (error && error.response && error.response.status === 400) {
    errorDetail = ' Bad request.';
  } else if (error && error.response && error.response.status === 409) {
    errorDetail = ` Duplicate Entry:: username ${username} already exists.`;
  } else if (error && error.response && error.response.status === 500) {
    errorDetail = ' Unknown server error.';
  }
  return errorDetail;
}

export function* watchGetUserSaga() {
  yield takeLatest(GET_USER, getUserSaga);
}

export function* watchGetGroupsSaga() {
  yield takeLatest(GET_GROUPS, getGroupsSaga);
}

export function* watchSaveUserSaga() {
  yield takeLatest(SAVE_USER, saveUserSaga);
}

export function* watchRemoveUserSaga() {
  yield takeLatest(REMOVE_USER, removeUserSaga);
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* rootSaga() {
  yield all([
    watchGetUserSaga(),
    watchSaveUserSaga(),
    watchGetGroupsSaga(),
    watchRemoveUserSaga(),
  ]);
}
