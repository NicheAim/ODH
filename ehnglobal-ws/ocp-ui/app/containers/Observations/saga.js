import { all, call, put, takeLatest } from 'redux-saga/effects';
import {
  getObservationsSuccess,
  getObservationsError,
} from './actions';
import { getObservations } from './api';
import { GET_OBSERVATIONS } from './constants';
import { mapObervations } from './utils';

function getErrorMessage(err) {
  let errorMessage = '';
  if (err && err.message === 'Failed to fetch') {
    errorMessage =
      "Failed to retrieve patient's observations. Server is offline.";
  }
  else if (err && err.response && err.response.status === 404) {
    errorMessage = 'The patient does not have any observations.';
  }
  else if (err && err.response && err.response.status === 500) {
    errorMessage =
      "Failed to retrieve patient's observations. Unknown server error.";
  }
  else {
    errorMessage = "Failed to retrieve patient's observations. Unknown error.";
  }
  return errorMessage;
}

export function* getObservationsSaga({ patientId }) {
  try {
    const result = yield call(getObservations, patientId);
    yield put(getObservationsSuccess(mapObervations(result)));
  }
  catch (error) {
    const errMsg = getErrorMessage(error);
    yield put(getObservationsError(errMsg));
  }
}

export function* watchGetObservationsSaga() {
  yield takeLatest(GET_OBSERVATIONS, getObservationsSaga);
}

export default function* rootSaga() {
  yield all([
    watchGetObservationsSaga(),
  ]);
}
