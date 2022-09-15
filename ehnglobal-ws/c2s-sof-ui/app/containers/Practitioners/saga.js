import { all, call, put, takeLatest } from 'redux-saga/effects';
import {
  getPractitionersError,
  getPractitionersSuccess,
  searchPractitionersError,
  searchPractitionersSuccess,
} from './actions';
import { getErrorDetail, getPractitioners, searchPractitioners } from './api';
import { GET_PRACTITIONERS, SEARCH_PRACTITIONERS } from './constants';


export function* getPractitionersSaga({ currentPage, pageSize }) {
  try {
    const practitioners = yield call(getPractitioners, currentPage, pageSize);
    yield put(getPractitionersSuccess(practitioners));
  } catch (err) {
    yield put(getPractitionersError(getErrorDetail(err)));
  }
}

export function* watchGetPractitionersSaga() {
  yield takeLatest(GET_PRACTITIONERS, getPractitionersSaga);
}

export function* searchPractitionersSaga({ searchType, searchValue, includeInactive, currentPage }) {
  try {
    const practitioners = yield call(searchPractitioners, searchType, searchValue, includeInactive, currentPage);
    yield put(searchPractitionersSuccess(practitioners));
  } catch (error) {
    yield put(searchPractitionersError(getErrorDetail(error)));
  }
}

export function* watchSearchPractitionersSaga() {
  yield takeLatest(SEARCH_PRACTITIONERS, searchPractitionersSaga);
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* rootSaga() {
  yield all([
    watchGetPractitionersSaga(),
    watchSearchPractitionersSaga(),
  ]);
}
