import { call, put, takeLatest, all } from 'redux-saga/effects';
import {
  LOAD_PATIENT_SEARCH_RESULT,
  FILTER_PATIENTS,
} from 'containers/Patients/constants';
import {
  searchPatientsError,
  searchPatientsSuccess,
  fitlerPatientSuccess,
  fitlerPatientError,
} from 'containers/Patients/actions';
import {
  fitlerPatients,
  searchPatients,
} from 'containers/Patients/api';

export function* fetchSearchResultSaga({ searchTerms, searchType, includeInactive, currentPage, organization }) {
  try {
    const searchPatientResult = yield call(searchPatients, searchTerms, searchType, includeInactive, currentPage, organization);
    yield put(searchPatientsSuccess(searchPatientResult, searchTerms, searchType, includeInactive));
  } catch (error) {
    yield put(searchPatientsError(error));
  }
}


export function* filterPatientSaga({ filterBy, organization, practitioner, currentPage }) {
  try {
    const filterPatientResult = yield call(fitlerPatients, filterBy, organization, practitioner, currentPage);
    yield put(fitlerPatientSuccess(filterPatientResult, filterBy));
  } catch (error) {
    yield put(fitlerPatientError(error));
  }
}
/**
 * Root saga manages watcher lifecycle
 */
export function* watchSearchPatients() {
  yield takeLatest(LOAD_PATIENT_SEARCH_RESULT, fetchSearchResultSaga);
}


export function* watchFilterPatients() {
  yield takeLatest(FILTER_PATIENTS, filterPatientSaga);
}


export default function* rootSaga() {
  yield all([
    watchSearchPatients(),
    watchFilterPatients(),
  ]);
}
