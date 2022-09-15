import { all, call, put, takeLatest } from 'redux-saga/effects';
import {
  GET_MEDICAL_COMPLEXITIES,
  GET_SOCIAL_COMPLEXITIES,
  GET_SERVICE_INTEGRATION_LEVELS,
  CREATE_OBSERVATION,
  UPDATE_OBSERVATION,
  GET_OBSERVATION,
  CLEAR_OBSERVATION
} from './constants';
import {
  getMedicalComplexities,
  getSocialComplexities,
  getServiceIntegrationLevels,
  createObservation,
  updateObservation,
  getObservation
} from './api';
import {
  getMedicalComplexitiesSuccess,
  getServiceIntegrationLevelsSuccess,
  getSocialComplexitiesSuccess,
  createObservationSuccess,
  createObservationError,
  updateObservationSuccess,
  updateObservationError,
  getObservationSuccess,
  getObservationError,
  clearObservationSuccess
} from './actions';
import { showNotification } from 'containers/Notification/actions';
import { goBack } from 'react-router-redux';

function getErrorDetail(err) {
  let errorDetail = '';
  if (err && err.message === 'Failed to fetch') {
    errorDetail = ' Server is offline.';
  }
  else if (err && err.response && err.response.status === 409) {
    errorDetail = ' Duplicate Entry:: Observation already exists for the patient.';
  }
  else if (err && err.response && err.response.status === 400) {
    errorDetail = ` ${(err.message || err.response.statusText || '').toUpperCase()}.`;
  }
  else if (err && err.response && err.response.status === 500) {
    errorDetail = ' Unknown server error.';
  }
  return errorDetail;
}

export function* getMedicalComplexitiesSaga() {
  const medicalComplexities = yield call(getMedicalComplexities);
  yield put(getMedicalComplexitiesSuccess(medicalComplexities));
}

export function* watchGetMedicalComplexitiesSaga() {
  yield takeLatest(GET_MEDICAL_COMPLEXITIES, getMedicalComplexitiesSaga);
}

export function* getSocialComplexitiesSaga() {
  const socialComplexities = yield call(getSocialComplexities);
  yield put(getSocialComplexitiesSuccess(socialComplexities));
}

export function* watchGetSocialComplexitiesSaga() {
  yield takeLatest(GET_SOCIAL_COMPLEXITIES, getSocialComplexitiesSaga);
}

export function* getServiceIntegrationLevelsSaga() {
  const serviceIntegrationLevels = yield call(getServiceIntegrationLevels);
  yield put(getServiceIntegrationLevelsSuccess(serviceIntegrationLevels));
}

export function* watchGetServiceIntegrationLevelsSaga() {
  yield takeLatest(GET_SERVICE_INTEGRATION_LEVELS, getServiceIntegrationLevelsSaga);
}

export function* createObservationSaga({ observation, handleSubmitting }) {
  try {
    const response = yield call(createObservation, observation);
    yield put(createObservationSuccess(response));
    yield put (showNotification('Observation was created successfully.'));
    yield call(handleSubmitting);
    yield put(goBack());
  }
  catch (error) {
    yield put(showNotification(`Failed to create observation.${getErrorDetail(error)}`));
    yield call(handleSubmitting);
    yield put(createObservationError(error));
  }
}

export function* watchCreateObservationSaga() {
  yield takeLatest(CREATE_OBSERVATION, createObservationSaga);
}

export function* updateObservationSaga({ updatedObservation, newObservation, handleSubmitting }) {
  try {
    const updatedResponse = yield call(updateObservation, updatedObservation);
    const response = {
      updatedResponse,
    }
    yield put(updateObservationSuccess(response));
    yield put(showNotification('Observation was updated successfully.'));
    yield call(handleSubmitting);
    yield put(goBack());
  }
  catch (error) {
    yield put(showNotification(`Failed to update observation.${getErrorDetail(error)}`));
    yield call(handleSubmitting);
    yield put(updateObservationError(error));
  }
}

export function* watchUpdateObservationSaga() {
  yield takeLatest(UPDATE_OBSERVATION, updateObservationSaga);
}

export function* getObservationSaga({ id }) {
  try {
    const observation = yield call(getObservation, id);
    yield put(getObservationSuccess(observation));
  }
  catch (error) {
    yield put(showNotification(`Failed to retrieve observation.${getErrorDetail(error)}`));
    yield put(getObservationError(error));
  }
}

export function* watchGetObservationSaga() {
  yield takeLatest(GET_OBSERVATION, getObservationSaga);
}

export function* clearObservationSaga() {
  yield put(clearObservationSuccess());
}

export function* watchClearObservationSaga() {
  yield takeLatest(CLEAR_OBSERVATION, clearObservationSaga);
}

export default function* rootSaga() {
  yield all([
    watchGetMedicalComplexitiesSaga(),
    watchGetSocialComplexitiesSaga(),
    watchGetServiceIntegrationLevelsSaga(),
    watchCreateObservationSaga(),
    watchUpdateObservationSaga(),
    watchGetObservationSaga(),
    watchClearObservationSaga(),
  ]);
}
