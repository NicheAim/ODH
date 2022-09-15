import { all, call, put, select, takeLatest } from 'redux-saga/effects';
import { goBack } from 'react-router-redux';

import { showNotification } from 'containers/Notification/actions';
import { makeSelectOrganization } from 'containers/App/contextSelectors';
import { createHealthcareService, getHealthcareServiceById, updateHealthcareService } from './api';
import {
  createHealthcareServiceError,
  createHealthcareServiceSuccess,
  getHealthcareServiceByIdError,
  getHealthcareServiceByIdSuccess,
  updateHealthcareServiceError,
  updateHealthcareServiceSuccess,
} from './actions';

import { CREATE_HEALTHCARE_SERVICE, GET_HEALTHCARE_SERVICE, UPDATE_HEALTHCARE_SERVICE } from './constants';

function* createHealthcareServiceSaga(action) {
  try {
    const organization = yield select(makeSelectOrganization());
    const createHealthcareServiceResponse = yield call(createHealthcareService, action.healthcareServiceFormData, organization.logicalId);
    yield put(createHealthcareServiceSuccess(createHealthcareServiceResponse));
    yield put(showNotification('Successfully created the healthcare service.'));
    yield call(action.handleSubmitting);
    yield put(goBack());
  } catch (error) {
    yield put(showNotification(`Failed to create the Healthcare Service.${getErrorDetail(error)}`));
    yield call(action.handleSubmitting);
    yield put(createHealthcareServiceError(error));
  }
}

function* watchCreateHealthcareServiceSaga() {
  yield takeLatest(CREATE_HEALTHCARE_SERVICE, createHealthcareServiceSaga);
}

function* updateHealthcareServiceSaga(action) {
  try {
    const organization = yield select(makeSelectOrganization());
    const updateHealthcareServiceResponse = yield call(updateHealthcareService, action.healthcareServiceFormData, organization.logicalId);
    yield put(updateHealthcareServiceSuccess(updateHealthcareServiceResponse));
    yield put(showNotification('Successfully updated the healthcare service.'));
    yield call(action.handleSubmitting);
    yield put(goBack());
  } catch (error) {
    yield put(showNotification(`Failed to update the Healthcare Service.${getErrorDetail(error)}`));
    yield call(action.handleSubmitting);
    yield put(updateHealthcareServiceError(error));
  }
}

function* watchUpdateHealthcareServiceSaga() {
  yield takeLatest(UPDATE_HEALTHCARE_SERVICE, updateHealthcareServiceSaga);
}

function* getHealthcareServiceByIdSaga({ logicalId }) {
  try {
    const selectedHealthcareService = yield call(getHealthcareServiceById, logicalId);
    yield put(getHealthcareServiceByIdSuccess(selectedHealthcareService));
  } catch (error) {
    yield put(showNotification('No matching healthcare service found.'));
    yield put(goBack());
    yield put(getHealthcareServiceByIdError(error));
  }
}

function* watchGetHealthcareServiceSaga() {
  yield takeLatest(GET_HEALTHCARE_SERVICE, getHealthcareServiceByIdSaga);
}

function getErrorDetail(err) {
  let errorDetail = '';
  if (err && err.message === 'Failed to fetch') {
    errorDetail = ' Server is offline.';
  } else if (err && err.response && err.response.status === 409) {
    errorDetail = ' Duplicate Entry:: Same Category and Type already exists.';
  } else if (err && err.response && err.response.status === 500) {
    errorDetail = ' Unknown server error.';
  }
  return errorDetail;
}

export default function* rootSaga() {
  yield all([
    watchCreateHealthcareServiceSaga(),
    watchUpdateHealthcareServiceSaga(),
    watchGetHealthcareServiceSaga(),
  ]);
}
