import { all, call, put, takeLatest } from 'redux-saga/effects';
import { searchOrganizations } from 'containers/Organizations/api';
import { showNotification } from 'containers/Notification/actions';
import {
  GET_PRACTITIONERS_ON_ROLE_ORGANIZATION,
  GET_WORKFLOW_ROLES,
  SEARCH_ORGANIZATIONS,
  SEARCH_PATIENTS,
} from './constants';
import {
  getPractitionersOnRoleOrganizationSuccess,
  getWorkflowRolesSuccess,
  searchOrganizationsError,
  searchOrganizationsSuccess,
  searchPatientsError,
  searchPatientsSuccess,
} from './actions';
import { getPractitionersOnRoleOrganization, getWorkflowRoles, searchPatients } from './api';

export function* getWorkflowRolesSaga() {
  try {
    const workflowRoles = yield call(getWorkflowRoles);
    yield put(getWorkflowRolesSuccess(workflowRoles.providerRoles));
  } catch (err) {
    yield put(showNotification('Failed to get the workflow roles.'));
  }
}

export function* getPractitionersOnRoleOrganizationSaga({ role, organization, currentPage }) {
  try {
    const practitioners = yield call(getPractitionersOnRoleOrganization, role, organization, currentPage);
    yield put(getPractitionersOnRoleOrganizationSuccess(role, practitioners));
  } catch (err) {
    yield put(showNotification('Failed to get practitioners.'));
  }
}

export function* searchPatientsSaga({ searchValue, showInactive, searchType, currentPage }) {
  try {
    const patients = yield call(searchPatients, searchValue, showInactive, searchType, currentPage);
    yield put(searchPatientsSuccess(patients));
  } catch (err) {
    yield put(searchPatientsError(err.message));
  }
}

export function* searchOrganizationsSaga({ searchValue, showInactive, searchType, currentPage }) {
  try {
    const organizations = yield call(searchOrganizations, searchValue, showInactive, searchType, currentPage);
    yield put(searchOrganizationsSuccess(organizations));
  } catch (err) {
    yield put(searchOrganizationsError(err.message));
  }
}

export function* watchGetWorkflowRolesSaga() {
  yield takeLatest(GET_WORKFLOW_ROLES, getWorkflowRolesSaga);
}

export function* watchGetPractitionersOnRoleOrganizationSaga() {
  yield takeLatest(GET_PRACTITIONERS_ON_ROLE_ORGANIZATION, getPractitionersOnRoleOrganizationSaga);
}

export function* watchSearchOrganizationsSaga() {
  yield takeLatest(SEARCH_ORGANIZATIONS, searchOrganizationsSaga);
}

export function* watchSearchPatientsSaga() {
  yield takeLatest(SEARCH_PATIENTS, searchPatientsSaga);
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* rootSaga() {
  yield all([
    watchGetWorkflowRolesSaga(),
    watchGetPractitionersOnRoleOrganizationSaga(),
    watchSearchOrganizationsSaga(),
    watchSearchPatientsSaga(),
  ]);
}
