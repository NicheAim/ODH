// import { take, call, put, select } from 'redux-saga/effects';

// Individual exports for testing
import { all, call, put, select, takeEvery, takeLatest } from 'redux-saga/effects';
import isEmpty from 'lodash/isEmpty';

import { showNotification } from 'containers/Notification/actions';
import { makeSelectLocation, makeSelectOrganization } from 'containers/App/contextSelectors';
import {
  GET_HEALTHCARE_SERVICES_LOCATION_ASSIGNMENT,
  STATUS_ACTIVE,
  UNASSIGN_HEALTHCARE_SERVICES_LOCATION_ASSIGNMENT,
  UPDATE_HEALTHCARE_SERVICES_LOCATION_ASSIGNMENT,
} from './constants';
import {
  assignHealthCareServicesToLocation,
  queryHealthCareServicesWithLocationAssignmentData,
  unassignHealthCareServicesToLocation,
} from './api';
import {
  getHealthcareServicesLocationAssignmentServicesError,
  getHealthcareServicesLocationAssignmentSuccess,
  markHealthcareServiceAsAssigned,
  unassignHealthcareServicesLocationAssignmentServicesError,
  unmarkHealthcareServiceAsAssigned,
  updateHealthcareServicesLocationAssignmentServicesError,
} from './actions';

export function* getHealthcareServicesLocationAssignmentSaga(action) {
  try {
    const organization = yield select(makeSelectOrganization());
    const location = yield select(makeSelectLocation());
    if (isEmpty(organization) || isEmpty(location) || isEmpty(organization.logicalId) || isEmpty(location.logicalId)) {
      yield put(showNotification('Failed to retrieve healthcare services, organization and/or location is not selected.'));
    } else {
      const status = [];
      status.push(STATUS_ACTIVE);
      const healthCareServices = yield call(queryHealthCareServicesWithLocationAssignmentData, organization.logicalId, location.logicalId, action.currentPage, status);
      yield put(getHealthcareServicesLocationAssignmentSuccess(healthCareServices));
    }
  } catch (err) {
    yield put(getHealthcareServicesLocationAssignmentServicesError(err));
    yield put(showNotification('Failed to retrieve healthcare services, please try again.'));
  }
}

export function* updateHealthcareServicesLocationAssignmentSaga(action) {
  try {
    const organization = yield select(makeSelectOrganization());
    const location = yield select(makeSelectLocation());
    if (isEmpty(organization) || isEmpty(location) || isEmpty(organization.logicalId) || isEmpty(location.logicalId)) {
      yield put(showNotification('Failed to assign the healthcare services to the current location. Organization and/or location is not selected.'));
    } else {
      const locationIds = [];
      locationIds.push(location.logicalId);
      yield call(assignHealthCareServicesToLocation, organization.logicalId, locationIds, action.healthcareServiceId);
      yield put(markHealthcareServiceAsAssigned(action.healthcareServiceId));
      yield put(showNotification('The healthcare service is successfully assigned to current location.'));
    }
  } catch (err) {
    yield put(updateHealthcareServicesLocationAssignmentServicesError(err));
    yield put(showNotification('Failed to assign the healthcare services to the current location. Please try again.'));
  }
}

export function* watchGetHealthcareServicesLocationAssignmentSaga() {
  yield takeLatest(GET_HEALTHCARE_SERVICES_LOCATION_ASSIGNMENT, getHealthcareServicesLocationAssignmentSaga);
}

export function* watchUpdateHealthcareServicesLocationAssignmentSaga() {
  yield takeEvery(UPDATE_HEALTHCARE_SERVICES_LOCATION_ASSIGNMENT, updateHealthcareServicesLocationAssignmentSaga);
}

export function* unassignHealthcareServicesLocationAssignmentSaga(action) {
  try {
    const organization = yield select(makeSelectOrganization());
    const location = yield select(makeSelectLocation());
    if (isEmpty(organization) || isEmpty(location) || isEmpty(organization.logicalId) || isEmpty(location.logicalId)) {
      yield put(showNotification('Failed to unassign the healthcare services from the current location. Organization and/or location is not selected.'));
    } else {
      const locationIds = [];
      locationIds.push(location.logicalId);
      yield call(unassignHealthCareServicesToLocation, organization.logicalId, locationIds, action.healthcareServiceId);
      yield put(unmarkHealthcareServiceAsAssigned(action.healthcareServiceId));
      yield put(showNotification('The healthcare service is successfully unassigned from the current location.'));
    }
  } catch (err) {
    yield put(unassignHealthcareServicesLocationAssignmentServicesError(err));
    yield put(showNotification('Failed to unassign the healthcare services from the current location. Please try again.'));
  }
}

export function* watchUnassignHealthcareServicesLocationAssignmentSaga() {
  yield takeEvery(UNASSIGN_HEALTHCARE_SERVICES_LOCATION_ASSIGNMENT, unassignHealthcareServicesLocationAssignmentSaga);
}

export default function* rootSaga() {
  yield all([
    watchGetHealthcareServicesLocationAssignmentSaga(),
    watchUpdateHealthcareServicesLocationAssignmentSaga(),
    watchUnassignHealthcareServicesLocationAssignmentSaga(),
  ]);
}
