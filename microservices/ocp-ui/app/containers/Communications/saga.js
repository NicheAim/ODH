import { all, call, put, select, takeLatest } from 'redux-saga/effects';
import { makeSelectPatient } from 'containers/App/contextSelectors';
import { GET_COMMUNICATIONS } from './constants';
import { getCommunicationsError, getCommunicationsSuccess } from './actions';
import { getCommunications } from './api';

export function* getCommunicationsSaga({ pageNumber, organizationId }) {
  try {
    const patient = yield select(makeSelectPatient());
    const communications = yield call(getCommunications, patient.id, pageNumber, organizationId);
    yield put(getCommunicationsSuccess(communications));
  } catch (error) {
    yield put(getCommunicationsError(error));
  }
}

export function* watchGetCommunicationsSaga() {
  yield takeLatest(GET_COMMUNICATIONS, getCommunicationsSaga);
}

export default function* rootSaga() {
  yield all([
    watchGetCommunicationsSaga(),
  ]);
}

