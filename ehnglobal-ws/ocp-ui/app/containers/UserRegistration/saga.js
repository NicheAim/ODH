// import { take, call, put, select } from 'redux-saga/effects';

import { all, call, put, takeLatest } from 'redux-saga/effects';
import { SEARCH_RESOURCES } from './constants';
import { searchResourcesSuccess, searchResourcesError } from './actions';
import { getErrorDetail, searchResources } from './api';

export function* searchResourcesSaga({ searchType, searchValue, resourceType, includeInactive, currentPage, organization }) {
  try {
    const resources = yield call(searchResources, searchType, searchValue, resourceType, includeInactive, currentPage, organization);
    yield put(searchResourcesSuccess(resources));
  } catch (error) {
    yield put(searchResourcesError(getErrorDetail(error)));
  }
}

export function* watchSearchResourcesSaga() {
  yield takeLatest(SEARCH_RESOURCES, searchResourcesSaga);
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* rootSaga() {
  yield all([
    watchSearchResourcesSaga(),
  ]);
}
