import { goBack } from 'react-router-redux';
import { all, call, put, takeLatest } from 'redux-saga/effects';

import { showNotification } from 'containers/Notification/actions';
import { GET_LOCATION, POST_CREATE_LOCATION, PUT_LOCATION } from './constants';
import {
  createLocationError,
  createLocationSuccess,
  getLocationError,
  getLocationSuccess,
  putLocationError,
  putLocationSuccess,
} from './actions';
import createLocation, { fetchLocation, updateLocation } from './api';


export function* createLocationSaga(action) {
  try {
    const createLocationResponse = yield call(createLocation, action.location, action.organizationId);
    yield put(createLocationSuccess(createLocationResponse));
    yield put(showNotification('Successfully created the location.'));
    yield put(goBack());
  } catch (err) {
    yield put(showNotification('Failed to create the location.'));
    yield put(createLocationError(err));
  }
}

export function* updateLocationSaga(action) {
  try {
    const response = yield call(updateLocation, action.location, action.organizationId);
    yield put(putLocationSuccess(response));
    yield put(showNotification('Successfully updated the location.'));
    yield put(goBack());
  } catch (err) {
    yield put(showNotification('Failed to update the location.'));
    yield put(putLocationError(err));
  }
}

export function* getLocationSaga(action) {
  try {
    const location = yield call(fetchLocation, action.locationId);
    yield put(getLocationSuccess(location));
  } catch (error) {
    yield put(showNotification('No related location found.'));
    yield put(goBack());
    yield put(getLocationError(error));
  }
}

export function* watchCreateLocationSaga() {
  yield takeLatest(POST_CREATE_LOCATION, createLocationSaga);
}

export function* watchUpdateLocationSaga() {
  yield takeLatest(PUT_LOCATION, updateLocationSaga);
}

export function* watchGetLocationSaga() {
  yield takeLatest(GET_LOCATION, getLocationSaga);
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* rootSaga() {
  yield all([
    watchCreateLocationSaga(),
    watchUpdateLocationSaga(),
    watchGetLocationSaga(),
  ]);
}
