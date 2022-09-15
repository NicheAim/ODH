import { all, call, put, takeLatest } from 'redux-saga/effects';

import { getErrorDetail } from 'containers/App/helpers';
import { showNotification } from 'containers/Notification/actions';
import {
  addRelatedPersonError,
  removeRelatedPersonError,
  removeRelatedPersonSuccess,
  searchRelatedPersonsError,
  searchRelatedPersonsSuccess,
} from './actions';
import { ADD_RELATED_PERSON, REMOVE_RELATED_PERSON, SEARCH_RELATED_PERSONS } from './constants';
import { addRelatedPerson, removeRelatedPerson, searchRelatedPersons } from './api';


export function* searchRelatedPersonsSaga({ careTeamId, currentPage, searchTerms }) {
  try {
    const relatedPersons = yield call(searchRelatedPersons, careTeamId, currentPage, searchTerms);
    yield put(searchRelatedPersonsSuccess(relatedPersons));
  } catch (error) {
    yield put(searchRelatedPersonsError(getErrorDetail(error)));
  }
}

export function* addRelatedPersonSaga({ careTeamId, relatedPerson, handleSubmitting, handleCloseDialog }) {
  try {
    yield call(addRelatedPerson, careTeamId, relatedPerson);
    yield call(handleSubmitting);
    yield call(handleCloseDialog);
  } catch (error) {
    yield put(showNotification('Failed to add the related person.'));
    yield call(handleSubmitting);
    yield call(handleCloseDialog);
    yield put(addRelatedPersonError(getErrorDetail(error)));
  }
}

export function* removeRelatedPersonSaga({ careTeamId, relatedPerson, handleCloseDialog }) {
  try {
    yield call(removeRelatedPerson, careTeamId, relatedPerson);
    yield put(removeRelatedPersonSuccess());
    yield call(handleCloseDialog);
  } catch (error) {
    yield put(showNotification('Failed to remove the related person.'));
    yield call(handleCloseDialog);
    yield put(removeRelatedPersonError(getErrorDetail(error)));
  }
}

export function* watchSearchRelatedPersonsSaga() {
  yield takeLatest(SEARCH_RELATED_PERSONS, searchRelatedPersonsSaga);
}

export function* watchAddRelatedPersonSaga() {
  yield takeLatest(ADD_RELATED_PERSON, addRelatedPersonSaga);
}

export function* watchRemoveRelatedPersonSaga() {
  yield takeLatest(REMOVE_RELATED_PERSON, removeRelatedPersonSaga);
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* rootSaga() {
  yield all([
    watchSearchRelatedPersonsSaga(),
    watchAddRelatedPersonSaga(),
    watchRemoveRelatedPersonSaga(),
  ]);
}
