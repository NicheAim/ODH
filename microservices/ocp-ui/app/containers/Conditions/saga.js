import { all, call, put, takeLatest } from 'redux-saga/effects';
// import { getConditionsSuccess, getConditionsError } from './actions';
import { actions } from './actions';
import { getConditions } from './api';
import { GET_CONDITIONS } from './constants';
import { mapConditions } from './utils';

function getErrorMessage(err) {
  let errorMessage = '';
  if (err && err.message === 'Failed to fetch') {
    errorMessage =
      "Failed to retrieve patient's conditions. Server is offline.";
  } else if (err && err.response && err.response.status === 404) {
    errorMessage = 'The patient does not have any conditions.';
  } else if (err && err.response && err.response.status === 500) {
    errorMessage =
      "Failed to retrieve patient's conditions. Unknown server error.";
  } else {
    errorMessage = "Failed to retrieve patient's conditions. Unknown error.";
  }
  return errorMessage;
}

export function* getConditionsSaga({ patientId, pageNumber }) {
  try {
    console.log('getConditionsSaga');
    const result = yield call(getConditions, patientId, pageNumber);
    console.log('result');
    console.log(result);
    yield put(actions.getConditionsSuccess(mapConditions(result)));
    console.log('mapped result');
    console.log(mapConditions(result));
  } catch (error) {
    const errMsg = getErrorMessage(error);
    yield put(actions.getConditionsError(errMsg));
  }
}

export function* watchGetConditionsSaga() {
  yield takeLatest(GET_CONDITIONS, getConditionsSaga);
}

export default function* rootSaga() {
  yield all([watchGetConditionsSaga()]);
}
