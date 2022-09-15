import { all, call, put, takeLatest } from 'redux-saga/effects';
import { goBack } from 'react-router-redux';
import { CREATE_RELATED_PERSON, GET_RELATED_PERSON, UPDATE_RELATED_PERSON } from './constants';
import { showNotification } from '../Notification/actions';
import { getRelatedPersonError, getRelatedPersonSuccess, saveRelatedPersonError } from './actions';
import { createRelatedPerson, getRelatedPerson, updateRelatedPerson } from './api';


export function* getRelatedPersonSaga({ relatedPersonId }) {
  try {
    const relatedPerson = yield call(getRelatedPerson, relatedPersonId);
    yield put(getRelatedPersonSuccess(relatedPerson));
  } catch (error) {
    yield put(showNotification('No related person found.'));
    yield put(goBack());
    yield put(getRelatedPersonError(error));
  }
}

export function* createRelatedPersonSaga(action) {
  try {
    if (action.relatedPerson) {
      yield call(createRelatedPerson, action.relatedPerson);
      yield put(goBack());
    }
  } catch (error) {
    yield put(showNotification('Error in creating related person.'));
    yield put(saveRelatedPersonError(error));
  }
}

export function* updateRelatedPersonSaga(action) {
  try {
    if (action.relatedPerson) {
      yield call(updateRelatedPerson, action.relatedPerson);
      yield call(action.handleSubmitting);
      yield put(goBack());
    }
  } catch (error) {
    yield put(showNotification('Error in updating related person.'));
    yield call(action.handleSubmitting);
    yield put(saveRelatedPersonError(error));
  }
}


export function* watchGetRelatedPersonSaga() {
  yield takeLatest(GET_RELATED_PERSON, getRelatedPersonSaga);
}

export function* watchCreateRelatedPersonSaga() {
  yield takeLatest(CREATE_RELATED_PERSON, createRelatedPersonSaga);
}


export function* watchUpdateRelatedPersonSaga() {
  yield takeLatest(UPDATE_RELATED_PERSON, updateRelatedPersonSaga);
}


export default function* rootSaga() {
  yield all([
    watchGetRelatedPersonSaga(),
    watchCreateRelatedPersonSaga(),
    watchUpdateRelatedPersonSaga(),
  ]);
}
