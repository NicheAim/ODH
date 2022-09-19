import { all, call, put, select, takeLatest } from 'redux-saga/effects';

import { makeSelectOrganization } from 'containers/App/contextSelectors';
import {
  getPractitionersInOrganizationError,
  getPractitionersInOrganizationSuccess,
  searchPractitionersError,
  searchPractitionersSuccess,
} from './actions';
import { getErrorDetail, getPractitionersInOrganization, searchPractitioners } from './api';
import { GET_PRACTITIONERS_IN_ORGANIZATION, SEARCH_PRACTITIONERS } from './constants';


export function* getPractitionersInOrganizationSaga({ currentPage, pageSize }) {
  try {
    const organization = yield select(makeSelectOrganization());
    const practitioners = yield call(getPractitionersInOrganization, organization.logicalId, currentPage, pageSize);
    yield put(getPractitionersInOrganizationSuccess(practitioners));
  } catch (err) {
    yield put(getPractitionersInOrganizationError(getErrorDetail(err)));
  }
}

export function* watchGetPractitionersInOrganizationSaga() {
  yield takeLatest(GET_PRACTITIONERS_IN_ORGANIZATION, getPractitionersInOrganizationSaga);
}

export function* searchPractitionersSaga({ searchType, searchValue, includeInactive, organization, currentPage }) {
  try {
    const practitioners = yield call(searchPractitioners, searchType, searchValue, includeInactive, organization, currentPage);
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
    watchGetPractitionersInOrganizationSaga(),
    watchSearchPractitionersSaga(),
  ]);
}
