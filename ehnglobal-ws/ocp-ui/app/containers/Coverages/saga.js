import { all, call, put, takeLatest, select } from 'redux-saga/effects';

import { showNotification } from 'containers/Notification/actions';
import { makeSelectPatient } from 'containers/App/contextSelectors';
import { DEFAULT_START_PAGE_NUMBER } from 'containers/App/constants';
import { getCoverageError,
  getCoverageSuccess,
  getCoverageAction,
} from './actions';
import {
  SAVE_COVERAGE,
  GET_COVERAGE,
} from './constants';
import {
  saveCoverage,
  getCoverages,
} from './api';


function* saveCoverageSaga(action) {
  try {
    yield call(saveCoverage, action.coverageData);
    yield put(showNotification('Success in created Coverage.'));
    yield call(action.handleSubmitting);
    yield put(getCoverageAction(DEFAULT_START_PAGE_NUMBER));
  } catch (error) {
    yield put(showNotification('Error in creating coverage.'));
    yield call(action.handleSubmitting);
  }
}


export function* getCoveragesSaga({ pageNumber }) {
  try {
    const patient = yield select(makeSelectPatient());
    const coverages = yield call(getCoverages, patient.id, pageNumber);
    yield put(getCoverageSuccess(coverages));
  } catch (error) {
    yield put(getCoverageError(error));
  }
}

function* watchSaveCoverageSaga() {
  yield takeLatest(SAVE_COVERAGE, saveCoverageSaga);
}

export function* watchGetCoveragesSaga() {
  yield takeLatest(GET_COVERAGE, getCoveragesSaga);
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* rootSaga() {
  yield all([
    watchSaveCoverageSaga(),
    watchGetCoveragesSaga(),
  ]);
}
