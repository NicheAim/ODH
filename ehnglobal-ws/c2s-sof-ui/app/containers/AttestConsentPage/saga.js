import { goBack } from 'react-router-redux';
import { all, call, put, takeLatest } from 'redux-saga/effects';
import { showNotification } from 'containers/Notification/actions';
import { attestConsent, getConsent } from './api';
import { attestConsentError, getConsentError, getConsentSuccess } from './actions';
import { ATTEST_CONSENT, GET_CONSENT } from './constants';


function* getConsentSaga({ logicalId }) {
  try {
    const consent = yield call(getConsent, logicalId);
    yield put(getConsentSuccess(consent));
  } catch (error) {
    yield put(showNotification('No matching consent found.'));
    yield put(goBack());
    yield put(getConsentError(error));
  }
}

function* attestConsentSaga({ logicalId }) {
  try {
    yield call(attestConsent, logicalId);
    yield put(showNotification('Successfully signed the consent.'));
    yield put(goBack());
  } catch (error) {
    yield put(showNotification('Failed to sign the consent.'));
    yield put(attestConsentError(error));
  }
}

function* watchGetConsentSaga() {
  yield takeLatest(GET_CONSENT, getConsentSaga);
}

function* watchAttestConsentSaga() {
  yield takeLatest(ATTEST_CONSENT, attestConsentSaga);
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* rootSaga() {
  yield all([
    watchGetConsentSaga(),
    watchAttestConsentSaga(),
  ]);
}
