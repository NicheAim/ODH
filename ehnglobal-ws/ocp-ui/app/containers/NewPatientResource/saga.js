import { all, call, put, takeLatest } from 'redux-saga/effects';

import { getErrorDetail } from 'containers/App/helpers';
import { findPatientError, findPatientSuccess } from './actions';
import { findPatient } from './api';
import { FIND_PATIENT } from './constants';
import { showNotification } from '../Notification/actions';

export function* findPatientSaga({ firstName, lastName, birthDate, handleSubmitting }) {
  try {
    const patient = yield call(findPatient, firstName, lastName, birthDate);
    yield put(findPatientSuccess(patient));
    yield call(handleSubmitting);
  } catch (error) {
     console.log(error && error.response && error.response.status);
    if(error && error.response && error.response.status !== 404)
      {
        console.log("This is other errors");
        yield put(showNotification("Server is not available now, please try again or contact your administrator."));
        yield put(findPatientError(getErrorDetail(error)));
      }
      else
      {
        console.log("This is Not Found errors");
        yield put(findPatientError("Not Found"));
      }
    yield call(handleSubmitting);
  }
}

export function* watchFindPatientSaga() {
  yield takeLatest(FIND_PATIENT, findPatientSaga);
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* rootSaga() {
  yield all([
    watchFindPatientSaga(),
  ]);
}
