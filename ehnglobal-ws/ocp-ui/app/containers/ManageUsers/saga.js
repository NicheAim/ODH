import { all, call, put, select, takeLatest } from 'redux-saga/effects';
import { showNotification } from 'containers/Notification/actions';
import { makeSelectOrganization } from 'containers/App/contextSelectors';
import { getGroups } from 'containers/PermissionsGroups/api';
import { ASSIGN_USER_ROLE, GET_GROUPS, GET_USERS } from './constants';
import { assignUserRole, getUsers } from './api';
import {
  assignUserRoleError,
  assignUserRoleSuccess,
  getGroupsError,
  getGroupsSuccess,
  getUsersError,
  getUsersSuccess,
} from './actions';


export function* getUsersSaga() {
  try {
    const organization = yield select(makeSelectOrganization());
    const users = yield call(getUsers, organization.logicalId);
    yield put(getUsersSuccess(users));
  } catch (err) {
    yield put(getUsersError(err));
    yield put(showNotification(`Failed to users: ${getErrorDetail(err)}`));
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

export function* assignUserRoleSaga(action) {
  try {
    yield call(assignUserRole, action.userId, action.groupId);
    yield put(showNotification('Successfully assigned user to permission group.'));
    yield call(action.handleSubmitting);
    yield put(assignUserRoleSuccess(action.userId, action.groupId));
  } catch (err) {
    yield put(assignUserRoleError(err));
    yield put(showNotification(`Failed to assign user to permission group: ${getErrorDetail(err)}`));
    yield call(action.handleSubmitting);
  }
}


export function getErrorDetail(error) {
  let errorDetail = error.message;
  if (error && error.message === 'Failed to fetch') {
    errorDetail = ' Server is offline.';
  } else if (error && error.response && error.response.status === 500) {
    errorDetail = ' Unknown server error.';
  }
  return errorDetail;
}

export function* watchGetUsersSaga() {
  yield takeLatest(GET_USERS, getUsersSaga);
}

export function* watchGetGroupsSaga() {
  yield takeLatest(GET_GROUPS, getGroupsSaga);
}

export function* watchAssignUserRoleSaga() {
  yield takeLatest(ASSIGN_USER_ROLE, assignUserRoleSaga);
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* rootSaga() {
  yield all([
    watchGetUsersSaga(),
    watchGetGroupsSaga(),
    watchAssignUserRoleSaga(),
  ]);
}
