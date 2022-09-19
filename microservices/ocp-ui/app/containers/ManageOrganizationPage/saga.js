import { all, call, put, takeLatest } from 'redux-saga/effects';
import { goBack } from 'react-router-redux';
import { CREATE_ORGANIZATION, UPDATE_ORGANIZATION } from './constants';
import { showNotification } from '../Notification/actions';
import { createOrganizationApiCall, updateOrganizationApiCall } from './api';

function getErrorDetail(err) {
  let errorDetail = '';
  if (err && err.message === 'Failed to fetch') {
    errorDetail = ' Server is offline.';
  } else if (err && err.response && err.response.status === 409) {
    errorDetail = ' Duplicate ID already exists.';
  } else if (err && err.response && err.response.status === 500) {
    errorDetail = ' Unknown server error.';
  }
  return errorDetail;
}

export function* createOrganization(action) {
  try {
    yield call(createOrganizationApiCall, action.organization);
    yield put(showNotification('Successfully created the organization.'));
    yield call(action.callback);
    yield put(goBack());
  } catch (err) {
    yield put(showNotification(`Failed to create the organization.${getErrorDetail(err)}`));
    yield call(action.callback);
  }
}

export function* updateOrganization(action) {
  try {
    yield call(updateOrganizationApiCall, action.id, action.organization);
    yield put(showNotification('Successfully updated the organization.'));
    yield call(action.callback);
    yield put(goBack());
  } catch (err) {
    yield put(showNotification(`Failed to update the organization.${getErrorDetail(err)}`));
    yield call(action.callback);
  }
}


export function* watchCreateOrganization() {
  yield takeLatest(CREATE_ORGANIZATION, createOrganization);
}

export function* watchUpdateOrganization() {
  yield takeLatest(UPDATE_ORGANIZATION, updateOrganization);
}

export default function* rootSaga() {
  yield all([
    watchCreateOrganization(),
    watchUpdateOrganization(),
  ]);
}
