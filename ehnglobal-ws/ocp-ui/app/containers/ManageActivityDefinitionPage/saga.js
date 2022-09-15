import { all, call, put, select, takeLatest } from 'redux-saga/effects';
import { goBack } from 'react-router-redux';

import { showNotification } from 'containers/Notification/actions';
import { makeSelectOrganization } from 'containers/App/contextSelectors';
import { GET_ACTIVITY_DEFINITION, SAVE_ACTIVITY_DEFINITION } from './constants';
import {
  determineNotificationForSavingActivityDefinition,
  getActivityDefinition,
  getErrorDetail,
  saveActivityDefinition,
} from './api';
import { getActivityDefinitionError, getActivityDefinitionSuccess, saveActivityDefinitionError } from './actions';


function* getActivityDefinitionSaga({ activityDefinitionId }) {
  try {
    const activityDefinition = yield call(getActivityDefinition, activityDefinitionId);
    yield put(getActivityDefinitionSuccess(activityDefinition));
  } catch (error) {
    yield put(getActivityDefinitionError(getErrorDetail(error)));
    yield put(showNotification('No match activity definition found.'));
    yield put(goBack());
  }
}

function* saveActivityDefinitionSaga(action) {
  try {
    const organization = yield select(makeSelectOrganization());
    yield call(saveActivityDefinition, action.activityDefinitionFormData, organization.logicalId);
    yield put(showNotification(`Successfully ${determineNotificationForSavingActivityDefinition(action.activityDefinitionFormData)} the activity definition.`));
    yield call(action.handleSubmitting);
    yield put(goBack());
  } catch (error) {
    yield put(showNotification(`Failed to ${determineNotificationForSavingActivityDefinition(action.activityDefinitionFormData)} the Activity Definition.`));
    yield call(action.handleSubmitting);
    yield put(saveActivityDefinitionError(getErrorDetail(error)));
  }
}

function* watchGetActivityDefinitionSaga() {
  yield takeLatest(GET_ACTIVITY_DEFINITION, getActivityDefinitionSaga);
}

function* watchSaveActivityDefinitionSaga() {
  yield takeLatest(SAVE_ACTIVITY_DEFINITION, saveActivityDefinitionSaga);
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* rootSaga() {
  yield all([
    watchGetActivityDefinitionSaga(),
    watchSaveActivityDefinitionSaga(),
  ]);
}
