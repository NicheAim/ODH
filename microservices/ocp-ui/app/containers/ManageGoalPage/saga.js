import { all, call, put, takeLatest } from 'redux-saga/effects';
import {
  GET_PLAN_DEFINITIONS,
  GET_GOAL_CATEGORIES,
  GET_GOAL_STATUSES,
  GET_GOAL_ACHIEVEMENT_STATUSES,
  CREATE_GOAL,
  UPDATE_GOAL,
  GET_GOAL,
  CLEAR_GOAL,
  GET_PRACTITIONERS,
} from './constants';
import {
  getPlanDefinitions,
  getGoalCategories,
  getGoalStatuses,
  getGoalAchievementStatuses,
  createGoal,
  getGoal,
  updateGoal,
  getPractitioners,
} from './api';
import {
  getPlanDefinitionsError,
  getPlanDefinitionsSuccess,
  getGoalCategoriesSuccess,
  getGoalStatusesSuccess,
  getGoalAchievementStatusesSuccess,
  createGoalSuccess,
  createGoalError,
  updateGoalSuccess,
  updateGoalError,
  getGoalSuccess,
  getGoalError,
  clearGoalSuccess,
  getPractitionersSuccess,
  getPractitionersError,
} from './actions';
import { showNotification } from 'containers/Notification/actions';
import { goBack } from 'react-router-redux';

function getErrorDetail(err) {
  let errorDetail = '';
  if (err && err.message === 'Failed to fetch') {
    errorDetail = ' Server is offline.';
  } else if (err && err.response && err.response.status === 409) {
    errorDetail = ' Duplicate Entry:: Goal already exists for the patient.';
  } else if (err && err.response && err.response.status === 400) {
    errorDetail = ` ${(err.message || err.response.statusText || '').toUpperCase()}.`
  } else if (err && err.response && err.response.status === 500) {
    errorDetail = ' Unknown server error.';
  }
  return errorDetail;
}

export function* getPlanDefinitionsSaga() {
  try {
    const planDefinitions = yield call(getPlanDefinitions);
    yield put(getPlanDefinitionsSuccess(planDefinitions));
  }
  catch (err) {
    yield put(getPlanDefinitionsError(err));
  }
}

export function* watchPlanDefinitionsSaga() {
  yield takeLatest(GET_PLAN_DEFINITIONS, getPlanDefinitionsSaga);
}

export function* getGoalCategoriesSaga() {
  const goalCategories = yield call(getGoalCategories);
  yield put(getGoalCategoriesSuccess(goalCategories));
}

export function* watchGoalCategoriesSaga() {
  yield takeLatest(GET_GOAL_CATEGORIES, getGoalCategoriesSaga);
}

export function* getGoalStatusesSaga() {
  const goalStatuses = yield  call(getGoalStatuses);
  yield put(getGoalStatusesSuccess(goalStatuses));
}

export function* watchGoalStatusesSaga() {
  yield takeLatest(GET_GOAL_STATUSES, getGoalStatusesSaga);
}

export function* getAchievementStatusesSaga() {
  const goalAchievementStatuses = yield call(getGoalAchievementStatuses);
  yield put(getGoalAchievementStatusesSuccess(goalAchievementStatuses));
}

export function* watchGoalAchievementStatusesSaga() {
  yield takeLatest(GET_GOAL_ACHIEVEMENT_STATUSES, getAchievementStatusesSaga);
}

export function* createGoalSaga({ goalFormData, fhirGoal, handleSubmitting }) {
  try {
    const createGoalResponse = yield call(createGoal, goalFormData, fhirGoal);
    yield put(createGoalSuccess(createGoalResponse));
    yield put(showNotification('Goal was created successfully.'));
    yield call(handleSubmitting);
    yield put(goBack());
  }
  catch (error) {
    yield put(showNotification(`Failed to create the Goal.${getErrorDetail(error)}`));
    yield call(handleSubmitting);
    yield put(createGoalError(error));
  }
}

export function* watchCreateGoalSaga() {
  yield takeLatest(CREATE_GOAL, createGoalSaga);
}

export function* updateGoalSaga(action) {
    const { fhirGoal, handleSubmitting } = action;
  try {
    const createGoalResponse = yield call(updateGoal, fhirGoal);
    yield put(updateGoalSuccess(createGoalResponse));
    yield put(showNotification('Goal was updated successfully.'));
    yield call(handleSubmitting);
    yield put(goBack());
  }
  catch (error) {
    yield put(showNotification(`Failed to update the Goal.${getErrorDetail(error)}`));
    yield call(handleSubmitting);
    yield put(updateGoalError(error));
  }
}

export function* watchUpdateGoalSaga() {
  yield takeLatest(UPDATE_GOAL, updateGoalSaga);
}

export function* getGoalSaga(action) {
  try {
    const getGoalResponse = yield call(getGoal, action.id);
    yield put(getGoalSuccess(getGoalResponse));
  }
  catch (error) {
    yield put(showNotification(`Failed to retrieve the Goal.${getErrorDetail(error)}`));
    yield put(getGoalError(error));
  }
}

export function* watchGetGoalSaga() {
  yield takeLatest(GET_GOAL, getGoalSaga);
}

export function* clearGoalSaga() {
  yield put(clearGoalSuccess())
}

export function* watchClearGoalSaga() {
  yield takeLatest(CLEAR_GOAL, clearGoalSaga);
}

export function* getPractitionersSaga(organizationId) {
  try {
    const practitioners = yield call(getPractitioners, organizationId);
    yield put(getPractitionersSuccess(practitioners));
  }
  catch (err) {
    yield put(getPractitionersError(err));
  }
}

export function* watchGetPractitionersSaga() {
  yield takeLatest(GET_PRACTITIONERS, getPractitionersSaga);
}

export default function* rootSaga() {
  yield all([
    watchPlanDefinitionsSaga(),
    watchGoalCategoriesSaga(),
    watchGoalStatusesSaga(),
    watchGoalAchievementStatusesSaga(),
    watchCreateGoalSaga(),
    watchUpdateGoalSaga(),
    watchGetGoalSaga(),
    watchClearGoalSaga(),
    watchGetPractitionersSaga(),
  ]);
}
