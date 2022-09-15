import { all, call, put, takeLatest } from 'redux-saga/effects';

import { getErrorDetail } from 'containers/App/helpers';
import { findPractitionerError, findPractitionerSuccess } from './actions';
import { findPractitioner } from './api';
import { FIND_PRACTITIONER } from './constants';

export function* findPractitionerSaga({ firstName, lastName, identifierType, identifier, handleSubmitting }) {
  try {
    const practitioner = yield call(findPractitioner, firstName, lastName, identifierType, identifier);
    yield put(findPractitionerSuccess(practitioner));
    yield call(handleSubmitting);
  } catch (error) {
    yield put(findPractitionerError(getErrorDetail(error)));
    yield call(handleSubmitting);
  }
}

export function* watchFindPractitionerSaga() {
  yield takeLatest(FIND_PRACTITIONER, findPractitionerSaga);
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* rootSaga() {
  yield all([
    watchFindPractitionerSaga(),
  ]);
}
