import { all, call, put, takeLatest } from 'redux-saga/effects';
import { goBack } from 'react-router-redux';

import { getErrorDetail } from 'containers/App/helpers';
import { showNotification } from 'containers/Notification/actions';
import {
  getHealthcareServiceReferences,
  getLocationReferences,
  getPractitionerReferences,
  searchParticipantReferences,
} from './api';
import {
  getHealthcareServiceReferencesSuccess,
  getLocationReferencesSuccess,
  getPractitionerReferencesSuccess,
  initializeParticipantReferencesSuccess,
  searchParticipantReferencesError,
  searchParticipantReferencesSuccess,
} from './actions';
import {
  GET_HEALTHCARE_SERVICE_REFERENCES,
  GET_LOCATION_REFERENCES,
  GET_PRACTITIONER_REFERENCES,
  INITIALIZE_PARTICIPANT_REFERENCES,
  ORGANIZATION_RESOURCE_TYPE,
  SEARCH_PARTICIPANT_REFERENCES,
} from './constants';

function* getHealthcareServiceSaga({ resourceType, resourceValue }) {
  try {
    const healthcareServices = yield call(getHealthcareServiceReferences, resourceType, resourceValue);
    yield put(getHealthcareServiceReferencesSuccess(healthcareServices));
  } catch (error) {
    yield put(showNotification('Error in getting Healthcare Service'));
    yield put(goBack());
  }
}

function* getLocationReferencesSaga({ resourceType, resourceValue }) {
  try {
    const locations = yield call(getLocationReferences, resourceType, resourceValue);
    yield put(getLocationReferencesSuccess(locations));
  } catch (error) {
    yield put(showNotification('Error in getting Locations'));
    yield put(goBack());
  }
}

function* getPractitionerReferencesSaga({ resourceType, resourceValue }) {
  try {
    const practitioners = yield call(getPractitionerReferences, resourceType, resourceValue);
    yield put(getPractitionerReferencesSuccess(practitioners));
  } catch (error) {
    yield put(showNotification('Error in getting practitioners'));
    yield put(goBack());
  }
}

function* initializeParticipantReferencesSaga({ resourceValue }) {
  try {
    const resourceType = ORGANIZATION_RESOURCE_TYPE;
    const healthcareServices = yield call(getHealthcareServiceReferences, resourceType, resourceValue);
    const locations = yield call(getLocationReferences, resourceType, resourceValue);
    const practitioners = yield call(getPractitionerReferences, resourceType, resourceValue);
    yield put(initializeParticipantReferencesSuccess(healthcareServices, locations, practitioners));
  } catch (error) {
    yield put(showNotification('Error in initializing Participant references'));
  }
}

function* searchParticipantReferencesSaga({ searchType, searchValue, patientId, organizationId, currentPage, handleSubmitting }) {
  try {
    const participants = yield call(searchParticipantReferences, searchType, searchValue, patientId, organizationId, currentPage);
    yield put(searchParticipantReferencesSuccess(participants));
    yield call(handleSubmitting);
  } catch (error) {
    yield put(searchParticipantReferencesError(getErrorDetail(error)));
    yield call(handleSubmitting);
  }
}

function* watchGetHealthcareServiceSaga() {
  yield takeLatest(GET_HEALTHCARE_SERVICE_REFERENCES, getHealthcareServiceSaga);
}

function* watchGetLocationReferencesSaga() {
  yield takeLatest(GET_LOCATION_REFERENCES, getLocationReferencesSaga);
}

function* watchGetPractitionerReferencesSaga() {
  yield takeLatest(GET_PRACTITIONER_REFERENCES, getPractitionerReferencesSaga);
}

function* watchInitializeParticipantReferencesSagaSaga() {
  yield takeLatest(INITIALIZE_PARTICIPANT_REFERENCES, initializeParticipantReferencesSaga);
}

function* watchSearchParticipantReferencesSaga() {
  yield takeLatest(SEARCH_PARTICIPANT_REFERENCES, searchParticipantReferencesSaga);
}

export default function* rootSaga() {
  yield all([
    watchGetHealthcareServiceSaga(),
    watchGetLocationReferencesSaga(),
    watchGetPractitionerReferencesSaga(),
    watchInitializeParticipantReferencesSagaSaga(),
    watchSearchParticipantReferencesSaga(),
  ]);
}
