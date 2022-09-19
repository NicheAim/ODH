import { all, call, put, select, takeLatest } from 'redux-saga/effects';
import isEmpty from 'lodash/isEmpty';
import { makeSelectOrganization } from 'containers/App/contextSelectors';
import {
  GET_ACTIVE_LOCATIONS,
  GET_FILTERED_LOCATIONS,
  STATUS_ACTIVE,
  STATUS_INACTIVE,
  STATUS_SUSPENDED,
  SEARCH_LOCATIONS,
} from './constants';
import { getLocationsError, getLocationsSuccess, searchLocationsSuccess, searchLocationsError } from './actions';
import { makeSelectIncludeInactive, makeSelectIncludeSuspended } from './selectors';
import { getErrorDetail, searchLocationsByIdAndStatus, searchLocations } from './api';

/**
 * Get locations by Organization id and status
 * @params action: the action whick contains the status and organization id in the payload
 */
export function* fetchLocationsByOrganizationIdAndStatus(action) {
  try {
    const organization = yield select(makeSelectOrganization());
    const includeInactive = yield select(makeSelectIncludeInactive());
    const includeSuspended = yield select(makeSelectIncludeSuspended());
    const status = [];
    status.push(STATUS_ACTIVE);
    if (includeInactive) status.push(STATUS_INACTIVE);
    if (includeSuspended) status.push(STATUS_SUSPENDED);
    const locations = yield call(searchLocationsByIdAndStatus, organization.logicalId, status, action.currentPage);
    yield put(getLocationsSuccess(locations, includeInactive, includeSuspended));
  } catch (err) {
    yield put(getLocationsError(err));
  }
}

export function* searchLocationsSaga({ searchValue, includeInactive, searchType, currentPage }) {
  try {
    const organization = yield select(makeSelectOrganization());
    let locations = null;
    if (!isEmpty(organization) && !isEmpty(organization.logicalId)) {
      locations = yield call(searchLocations, organization.logicalId, searchValue, includeInactive, searchType, currentPage);
    }
    yield put(searchLocationsSuccess(locations));
  } catch (err) {
    yield put(searchLocationsError(getErrorDetail(err)));
  }
}
/**
 * Root saga manages watcher lifecycle
 */
export function* watchFetchLocations() {
  yield takeLatest(GET_ACTIVE_LOCATIONS, fetchLocationsByOrganizationIdAndStatus);
}

export function* watchFilterLocations() {
  yield takeLatest(GET_FILTERED_LOCATIONS, fetchLocationsByOrganizationIdAndStatus);
}

export function* watchSearchLocationsSaga() {
  yield takeLatest(SEARCH_LOCATIONS, searchLocationsSaga);
}

export default function* rootSaga() {
  yield all([
    watchFetchLocations(),
    watchFilterLocations(),
    watchSearchLocationsSaga(),
  ]);
}
