import { all, call, put, takeEvery, select } from 'redux-saga/effects';
import isEqual from 'lodash/isEqual';

import { getLookupTypesNotInStore } from 'utils/LookupService';
import { showNotification } from 'containers/Notification/actions';
import contextRootSaga from './contextSaga';
import { fetchLookups, getConfig } from './api';
import { GET_LOOKUPS, GET_CONFIG } from './constants';
import { getLookupsError, getLookupsFromStore, getLookupsSuccess, getConfigSuccess, getConfigError, getConfig as getConfigAction } from './actions';
import { makeSelectConfig } from './selectors';

export function* getConfigSaga() {
  try {
    const currentConfig = yield select(makeSelectConfig());
    const newConfig = yield call(getConfig);
    if (!isEqual(currentConfig, newConfig)) {
      yield put(getConfigSuccess(newConfig));
    }
  } catch (error) {
    yield put(showNotification('Failed to retrieve configuration from server.'));
    yield put(getConfigError(error));
  }
}

export function* getLookups(action) {
  try {
    const lookupTypesNotInStore = yield getLookupTypesNotInStore(action);
    if (lookupTypesNotInStore.length > 0) {
      const lookups = yield call(fetchLookups, lookupTypesNotInStore);
      yield put(getLookupsSuccess(lookups));
    } else {
      yield put(getLookupsFromStore());
    }
  } catch (err) {
    yield put(getLookupsError(err));
  }
}

export function* initConfigSaga() {
  yield put(getConfigAction());
}

export function* watchGetLookupsSaga() {
  yield takeEvery(GET_LOOKUPS, getLookups);
}

export function* watchGetConfigSaga() {
  yield takeEvery(GET_CONFIG, getConfigSaga);
}

export default function* rootSaga() {
  yield all([
    watchGetConfigSaga(),
    watchGetLookupsSaga(),
    // TODO: further investigate why contextRootSaga cannot be injected within App.js
    contextRootSaga(),
    initConfigSaga(), // get ui config on application load
  ]);
}
