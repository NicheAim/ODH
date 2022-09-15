import { all, call, put, select, takeLatest } from 'redux-saga/effects';
import { goBack } from 'react-router-redux';

import { makeSelectPatient } from 'containers/App/contextSelectors';
import { showNotification } from 'containers/Notification/actions';
import { getConsentError, getConsentSuccess, saveConsentError } from './actions';
import { getConsent, getErrorDetail, saveConsent } from './api';
import { GET_CONSENT, SAVE_CONSENT } from './constants';


function* getConsentSaga({ consentId }) {
  try {
    const consent = yield call(getConsent, consentId);
    yield put(getConsentSuccess(consent));
  } catch (error) {
    yield put(getConsentError(getErrorDetail(error)));
    yield put(showNotification('No matching consent found.'));
    yield put(goBack());
  }
}

function* saveConsentSaga(action) {
  try {
    const patient = yield select(makeSelectPatient());
    yield call(saveConsent, action.consentFormData, patient);
    yield put(showNotification(`Successfully ${action.consentFormData.logicalId ? 'updated' : 'created'} the consent.`));
    yield call(action.handleSubmitting);
    yield put(goBack());
  } catch (error) {
    yield put(showNotification(`Failed to ${action.consentFormData.logicalId ? 'update' : 'create'} the consent. ${getErrorDetail(error)}`));
    yield call(action.handleSubmitting);
    yield put(saveConsentError(error));
  }
}

function* watchGetConsentSaga() {
  yield takeLatest(GET_CONSENT, getConsentSaga);
}

function* watchSaveConsentSaga() {
  yield takeLatest(SAVE_CONSENT, saveConsentSaga);
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* rootSaga() {
  yield all([
    watchGetConsentSaga(),
    watchSaveConsentSaga(),
  ]);
}
