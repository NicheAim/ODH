import { all, call, put, takeLatest } from 'redux-saga/effects';
import camelCase from 'lodash/camelCase';

import { showNotification } from 'containers/Notification/actions';
import { GET_GROUPS, GET_SCOPES, SAVE_GROUP } from './constants';
import { createGroup, getGroups, getScopes, updateGroup } from './api';
import {
getGroupsError,
getGroupsSuccess,
getScopesError,
getScopesSuccess,
saveGroupError,
saveGroupSuccess,
} from './actions';

export function* getGroupsSaga() {
  try {
    const groups = yield call(getGroups);
    yield put(getGroupsSuccess(groups));
  } catch (err) {
    yield put(getGroupsError(err));
  }
}

export function* getScopesSaga() {
  try {
    const scopes = yield call(getScopes);
    yield put(getScopesSuccess(scopes));
  } catch (err) {
    yield put(getScopesError(err));
  }
}

export function* saveGroupSaga(action) {
  try {
    if (action.group.id !== undefined) {
      yield call(updateGroup, action.group);
    } else {
      yield call(createGroup, action.group);
    }
    yield put(showNotification(`Successfully ${getNotificationAction(action.group)} group.`));
    yield call(action.handleSubmitting);
    yield put(saveGroupSuccess(addRolePrefix(action.group)));
  } catch (error) {
    yield put(saveGroupError(error));
    yield put(showNotification(`Failed to ${getNotificationAction(action.group)} group: ${getErrorDetail(error, action.group.name)}`));
    yield call(action.handleSubmitting);
  }
}

function getNotificationAction(group) {
  let action = 'create';
  if (group.id) {
    action = 'update';
  }
  return action;
}

function getErrorDetail(err, groupName) {
  let errorDetail = '';
  if (err && err.message === 'Failed to fetch') {
    errorDetail = ' Server is offline.';
  } else if (err && err.response && err.response.status === 400) {
    errorDetail = ' Bad request.';
  } else if (err && err.response && err.response.status === 409) {
    errorDetail = ` Duplicate Entry:: Group ${groupName} already exists.`;
  } else if (err && err.response && err.response.status === 500) {
    errorDetail = ' Unknown server error.';
  }
  return errorDetail;
}

function addRolePrefix(group) {
  const { id, displayName, description, scopes } = group;
  return { id, displayName: 'ocp.role.'.concat(camelCase(displayName)), description, scopes };
}


export function* watchGetGroupsSaga() {
  yield takeLatest(GET_GROUPS, getGroupsSaga);
}


export function* watchGetScopesSaga() {
  yield takeLatest(GET_SCOPES, getScopesSaga);
}

export function* watchSaveGroupSaga() {
  yield takeLatest(SAVE_GROUP, saveGroupSaga);
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* rootSaga() {
  yield all([
    watchGetGroupsSaga(),
    watchGetScopesSaga(),
    watchSaveGroupSaga(),
  ]);
}
