import { all, call, put, takeLatest } from 'redux-saga/effects';
import { GET_ORGANIZATIONS, SEARCH_ORGANIZATIONS } from './constants';
import { getErrorDetail, getOrganizations, searchOrganizations } from './api';
import {
  getOrganizationsError,
  getOrganizationsSuccess,
  searchOrganizationsError,
  searchOrganizationsSuccess,
} from './actions';

export function* getOrganizationsSaga({ currentPage, pageSize }) {
  try {
    const organizations = yield call(getOrganizations, currentPage, pageSize);
    yield put(getOrganizationsSuccess(organizations));
  } catch (err) {
    yield put(getOrganizationsError(getErrorDetail(err)));
  }
}

export function* searchOrganizationsSaga({ searchValue, showInactive, searchType, currentPage }) {
  try {
    if (searchValue) {
      const organizations = yield call(searchOrganizations, searchValue, showInactive, searchType, currentPage);
      yield put(searchOrganizationsSuccess(organizations));
    }
  } catch (err) {
    yield put(searchOrganizationsError(getErrorDetail(err)));
  }
}

export function* watchGetOrganizationsSaga() {
  yield takeLatest(GET_ORGANIZATIONS, getOrganizationsSaga);
}

export function* watchSearchOrganizationsSaga() {
  yield takeLatest(SEARCH_ORGANIZATIONS, searchOrganizationsSaga);
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* rootSaga() {
  yield all([
    watchGetOrganizationsSaga(),
    watchSearchOrganizationsSaga(),
  ]);
}
