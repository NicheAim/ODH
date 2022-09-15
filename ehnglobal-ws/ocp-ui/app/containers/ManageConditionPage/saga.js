import { all, call, put, takeLatest } from 'redux-saga/effects';
import { goBack } from 'react-router-redux';
import { CREATE_CONDITION, GET_CONDITION, UPDATE_CONDITION } from './constants';
import { showNotification } from '../Notification/actions';
import {
  getConditionError,
  getConditionSuccess,
  saveConditionError,
} from './actions';
import { createCondition, getCondition, updateCondition } from './api';

export function* getConditionSaga({ conditionId }) {
  try {
    const condition = yield call(getCondition, conditionId);
    yield put(getConditionSuccess(condition));
    console.log('getConditionSaga END');
  } catch (error) {
    yield put(showNotification('No condition found.'));
    yield put(goBack());
    yield put(getConditionError(error));
  }
}

export function* createConditionSaga(action) {
  try {
    if (action.condition) {
      yield call(createCondition, action.condition);
      yield put(goBack());
    }
  } catch (error) {
    yield put(showNotification('Error in creating condition.'));
    yield put(saveConditionError(error));
  }
}

export function* updateConditionSaga(action) {
  try {
    if (action.condition) {
      yield call(updateCondition, action.condition);
      yield call(action.handleSubmitting);
      yield put(goBack());
    }
  } catch (error) {
    yield put(showNotification('Error in updating condition.'));
    yield call(action.handleSubmitting);
    yield put(saveConditionError(error));
  }
}

export function* watchGetConditionSaga() {
  yield takeLatest(GET_CONDITION, getConditionSaga);
}

export function* watchCreateConditionSaga() {
  yield takeLatest(CREATE_CONDITION, createConditionSaga);
}

export function* watchUpdateConditionSaga() {
  yield takeLatest(UPDATE_CONDITION, updateConditionSaga);
}

export default function* rootSaga() {
  yield all([
    watchGetConditionSaga(),
    watchCreateConditionSaga(),
    watchUpdateConditionSaga(),
  ]);
}
