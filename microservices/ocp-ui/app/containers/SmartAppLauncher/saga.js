import { all, call, put, select, takeLatest } from 'redux-saga/effects';
import get from 'lodash/get';
import { getEndpoint, SMART_LAUNCHER_URL } from 'utils/endpointService';
import Util from 'utils/Util';
import makeSelectContext from 'containers/App/contextSelectors';
import { showNotification } from 'containers/Notification/actions';
import { CREATE_LAUNCH, GET_APP_SHORTCUTS, GET_CLIENTS } from './constants';
import { createLaunch, getAppShortcuts, getClients } from './api';
import {
  createLaunchError,
  createLaunchSuccess,
  getAppShortcutsError,
  getAppShortcutsSuccess,
  getClientsError,
  getClientsSuccess,
} from './actions';


export function* getClientsSaga() {
  try {
    const clients = yield call(getClients);
    yield put(getClientsSuccess(clients));
  } catch (error) {
    yield put(getClientsError(error));
    yield put(showNotification('Failed to retrieve SMART Apps.'));
  }
}

function* getAppShortcutsSaga() {
  try {
    const appShortcuts = yield call(getAppShortcuts);
    yield put(getAppShortcutsSuccess(appShortcuts));
  } catch (error) {
    yield put(showNotification('Cannot get smart app shortcuts configuration.'));
    yield put(getAppShortcutsError(error));
  }
}

export function* createLaunchSaga({ clientId }) {
  try {
    const { organization, location, patient, encounter, resource } = yield select(makeSelectContext());
    const context = Util.pickByNonNullAndNonEmptyString({
      organization: get(organization, ['logicalId']) || get(organization, ['id']),
      location: get(location, ['logicalId']) || get(location, ['id']),
      patient: get(patient, ['logicalId']) || get(patient, ['id']),
      encounter: get(encounter, ['logicalId']) || get(encounter, ['id']),
      resource: get(resource, ['logicalId']) || get(resource, ['id']),
    });
    const { launch } = yield call(createLaunch, context);
    yield put(createLaunchSuccess(launch));
    const smartLauncherUrl = getEndpoint(SMART_LAUNCHER_URL);
    window.open(`${smartLauncherUrl}?client_id=${clientId}&launch=${launch}`);
  } catch (error) {
    yield put(createLaunchError(error));
    yield put(showNotification('Failed to submit the launch context.'));
  }
}

export function* watchGetClientsSaga() {
  yield takeLatest(GET_CLIENTS, getClientsSaga);
}

function* watchGetAppShortcutsSaga() {
  yield takeLatest(GET_APP_SHORTCUTS, getAppShortcutsSaga);
}

export function* watchCreateLaunchSaga() {
  yield takeLatest(CREATE_LAUNCH, createLaunchSaga);
}

export default function* rootSaga() {
  yield all([
    watchGetClientsSaga(),
    watchGetAppShortcutsSaga(),
    watchCreateLaunchSaga(),
  ]);
}
