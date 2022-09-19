// import { take, call, put, select } from 'redux-saga/effects';

// Individual exports for testing
import { all, call, put, takeLatest } from 'redux-saga/effects';

import { showNotification } from 'containers/Notification/actions';
import {
  deleteClientError,
  deleteClientSuccess,
  getClientsError,
  getClientsSuccess,
  saveClientError,
  saveClientSuccess,
} from './actions';
import { createClient, deleteClient, getClients, mapToBackendDto, updateClient } from './api';
import { DELETE_CLIENT, GET_CLIENTS, SAVE_CLIENT } from './constants';

export function* saveClientSaga(action) {
  try {
    if (action.clientFormData.isEdit) {
      yield call(updateClient, action.clientFormData);
    } else {
      yield call(createClient, action.clientFormData);
    }
    const clientDto = yield call(mapToBackendDto, action.clientFormData);
    yield put(showNotification(`Successfully ${getNotificationAction(action.clientFormData)} the SMART app.`));
    yield call(action.handleSubmitting);
    yield put(saveClientSuccess(clientDto));
  } catch (error) {
    yield put(saveClientError(error));
    yield put(showNotification(`Failed to ${getNotificationAction(action.clientFormData)} the SMART app: ${getErrorDetail(error, action.clientFormData.clientId)}`));
    yield call(action.handleSubmitting);
  }
}

export function* getClientsSaga() {
  try {
    const clients = yield call(getClients);
    yield put(getClientsSuccess(clients));
  } catch (error) {
    yield put(getClientsError(error));
    yield put(showNotification('Failed to retrieve SMART Apps.'));
  }
}

export function* deleteClientsSaga(action) {
  try {
    yield call(deleteClient, action.clientId);
    yield put(deleteClientSuccess(action.clientId));
    yield put(showNotification('Successfully delete SMART App.'));
  } catch (error) {
    yield put(showNotification('Failed to delete SMART Apps.'));
    yield put(deleteClientError(error));
  }
}

function getNotificationAction(clientFormData) {
  let action = 'create';
  if (clientFormData.isEdit) {
    action = 'update';
  }
  return action;
}

export function* watchSaveClientSaga() {
  yield [
    takeLatest(SAVE_CLIENT, saveClientSaga),
  ];
}

export function* watchGetClientsSaga() {
  yield takeLatest(GET_CLIENTS, getClientsSaga);
}

export function* watchDeleteClientSaga() {
  yield takeLatest(DELETE_CLIENT, deleteClientsSaga);
}

function getErrorDetail(err, clientId) {
  let errorDetail = '';
  if (err && err.message === 'Failed to fetch') {
    errorDetail = ' Server is offline.';
  } else if (err && err.response && err.response.status === 400) {
    errorDetail = ' Bad request.';
  } else if (err && err.response && err.response.status === 409) {
    errorDetail = ` Duplicate Entry:: Client id ${clientId} already exists.`;
  } else if (err && err.response && err.response.status === 500) {
    errorDetail = ' Unknown server error.';
  }
  return errorDetail;
}

export default function* rootSaga() {
  yield all([
    watchGetClientsSaga(),
    watchSaveClientSaga(),
    watchDeleteClientSaga(),
  ]);
}
