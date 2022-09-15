import { all, call, put, takeLatest } from 'redux-saga/effects';
import {
  getGoalsIdsWithTasksIdsFromCarePlanActivity,
  getGoalsWithTaskData,
} from '../../utils/fhirUtils';
import { actions, actionTypes } from './actions';
import { API } from './api';

function getErrorMessage(err) {
  let errorMessage = 'Failed to retrieve data. Unknown error.';

  if (err && err.message === 'Failed to fetch') {
    errorMessage = 'Failed to retrieve data. Server is offline.';
  } else if (err && err.response && err.response.status === 404) {
    errorMessage = 'The patient does not have any goals.';
  } else if (err && err.response && err.response.status === 500) {
    errorMessage = 'Failed to retrieve data. Unknown server error.';
  }

  return errorMessage;
}

function* getGoalsSaga({ patientId }) {
  try {
    const responseData = yield call(API.getGoals, patientId);
    yield put(actions.getGoalsSuccess(responseData));
  } catch (err) {
    const errMsg = getErrorMessage(err);
    yield put(actions.failure(errMsg));
  }
}

function* getCarePlansSaga({ patientId }) {
  try {
    const carePlansResponseData = yield call(API.getCarePlans, patientId);

    if (
      carePlansResponseData &&
      carePlansResponseData.elements &&
      carePlansResponseData.elements[0] &&
      carePlansResponseData.elements[0].activity
    ) {
      const dataIds = getGoalsIdsWithTasksIdsFromCarePlanActivity(
        carePlansResponseData.elements[0].activity
      );

      const arrayOfTasksIds = Object.keys(dataIds.taskIds);
      let tasksIdsWithData = {};
      const tasksTesponseData = yield call(API.getTasks, arrayOfTasksIds);

      if (
        tasksTesponseData &&
        tasksTesponseData.elements &&
        Array.isArray(tasksTesponseData.elements) &&
        tasksTesponseData.elements.length > 0
      ) {
        tasksTesponseData.elements.forEach((item) => {
          if (item.logicalId === undefined || item.logicalId === null) return;

          tasksIdsWithData[item.logicalId] = item;
        });
      }

      const goalsWithTask = getGoalsWithTaskData(
        dataIds.goalsWithTask,
        tasksIdsWithData
      );
      yield put(actions.getGoalsWithTasksSuccess(goalsWithTask));
    }

    yield put(actions.getCarePlanSuccess(carePlansResponseData));
  } catch (err) {
    const errMsg = getErrorMessage(err);
    yield put(actions.failure(errMsg));
  }
}

function* getTasksSaga({ tasksIdsKeys }) {
  try {
    let tasksIdsWithData = {};
    const keys = Object.keys(tasksIdsKeys);

    for (let i = 0; i < keys.length; i++) {
      const key = keys[i];
      const responseData = yield call(API.getTask, key);
      tasksIdsWithData[key] = responseData;
    }

    yield put(actions.getTasksSuccess(tasksIdsWithData));
  } catch (err) {
    const errMsg = getErrorMessage(err);
    yield put(actions.failure(errMsg));
  }
}

function* watchGetGoalsSaga() {
  yield takeLatest(actionTypes.GET_GOALS, getGoalsSaga);
}

function* watchGetCarePlansSaga() {
  yield takeLatest(actionTypes.GET_CARE_PLAN, getCarePlansSaga);
}

function* watchGetTasksSaga() {
  yield takeLatest(actionTypes.GET_TASKS, getTasksSaga);
}

export default function* rootSaga() {
  yield all([
    watchGetGoalsSaga(),
    watchGetCarePlansSaga(),
    watchGetTasksSaga(),
  ]);
}
