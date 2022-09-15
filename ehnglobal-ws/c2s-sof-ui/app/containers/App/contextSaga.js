import { all, call, put, select, takeLatest } from 'redux-saga/effects';
import split from 'lodash/split';

import { showNotification } from 'containers/Notification/actions';
import {
  getOrganizationsByPractitionerError,
  getOrganizationsPractitionerSuccess,
  getPatient as getPatientAction,
  getPatientError,
  getUserContextError,
  refreshPatient,
  setPatient,
  setUser,
} from './contextActions';
import { GET_PATIENT, INITIALIZE_CONTEXT, REFRESH_PATIENT } from './contextConstants';
import { makeSelectPatient, makeSelectUser } from './contextSelectors';
import { getErrorDetail, getOrganizationsByPractitioner, getPatient, getUserProfile } from './contextApi';
import { isPatientResourceType } from './helpers';


export function* initializeContextSaga({ userAuthContext, patientId }) {
  const patient = yield select(makeSelectPatient());
  if (patient && patient.id && patient.id === patientId) {
    yield put(refreshPatient());
  } else {
    yield put(getPatientAction(patientId));
  }

  // initial user context
  try {
    const { user_id, user_name, email, profile } = userAuthContext;
    const profileArray = profile && split(profile, '/', 2);
    const resourceType = profileArray[0];
    const resourceLogicalId = profileArray[1];
    const userProfile = yield call(getUserProfile, resourceType, resourceLogicalId);
    const { logicalId, name, identifiers, addresses, telecoms } = userProfile;
    const fhirResource = { logicalId, name, identifiers, addresses, telecoms };
    yield put(setUser({ user_id, user_name, email, isPatient: isPatientResourceType(resourceType), fhirResource }));
  } catch (error) {
    yield put(getUserContextError(getErrorDetail(error)));
  }

  const user = yield select(makeSelectUser());
  if (user && !user.isPatient) {
    try {
      const organization = yield call(getOrganizationsByPractitioner, user.fhirResource.logicalId);
      yield put(getOrganizationsPractitionerSuccess(organization));
    } catch (error) {
      yield put(getOrganizationsByPractitionerError(getErrorDetail(error)));
      yield put(showNotification('No match organization found.'));
    }
  }
}

export function* refreshPatientSaga() {
  const patient = yield select(makeSelectPatient());
  if (patient && patient.id) {
    const newPatient = yield call(getPatient, patient.id);
    yield put(setPatient(newPatient));
  } else {
    yield put(showNotification('Cannot refresh patient context, no patient is selected.'));
  }
}

export function* getPatientSaga({ logicalId }) {
  try {
    if (logicalId) {
      const newPatient = yield call(getPatient, logicalId);
      yield put(setPatient(newPatient));
    } else {
      yield put(showNotification('Cannot get patient context, no patient is selected.'));
    }
  } catch (error) {
    yield put(getPatientError(getErrorDetail(error)));
  }
}

export function* watchInitializeContextSaga() {
  yield takeLatest(INITIALIZE_CONTEXT, initializeContextSaga);
}

export function* watchRefreshPatientSaga() {
  yield takeLatest(REFRESH_PATIENT, refreshPatientSaga);
}

export function* watchGetPatientSaga() {
  yield takeLatest(GET_PATIENT, getPatientSaga);
}

export default function* rootSaga() {
  yield all([
    watchInitializeContextSaga(),
    watchRefreshPatientSaga(),
    watchGetPatientSaga(),
  ]);
}
