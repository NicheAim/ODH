import { all, call, put, select, takeLatest } from 'redux-saga/effects';
import { makeSelectOrganization } from 'containers/App/contextSelectors';
import { getActivityDefinitionsInOrganizationError, getActivityDefinitionsInOrganizationSuccess } from './actions';
import { getActivityDefinitionsInOrganization, getErrorDetail } from './api';
import { GET_ACTIVITY_DEFINITIONS_IN_ORGANIZATION } from './constants';

export function* getActivityDefinitionsInOrganizationSaga({ currentPage }) {
  try {
    const organization = yield select(makeSelectOrganization());
    const activityDefinitions = yield call(getActivityDefinitionsInOrganization, organization.logicalId, currentPage);
    yield put(getActivityDefinitionsInOrganizationSuccess(activityDefinitions));
  } catch (error) {
    yield put(getActivityDefinitionsInOrganizationError(getErrorDetail(error)));
  }
}

export function* watchGetActivityDefinitionsInOrganizationSaga() {
  yield takeLatest(GET_ACTIVITY_DEFINITIONS_IN_ORGANIZATION, getActivityDefinitionsInOrganizationSaga);
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* rootSaga() {
  yield all([
    watchGetActivityDefinitionsInOrganizationSaga(),
  ]);
}
