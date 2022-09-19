import { LOGIN_URL } from 'containers/App/constants';
import { showNotification } from 'containers/Notification/actions';
import { push } from 'react-router-redux';
import { all, call, put, select, takeLatest } from 'redux-saga/effects';
import { removeToken } from 'utils/tokenService';
import { env_vars } from '../../../env';
import { getAuthData } from '../../utils/auth';
import { getTokenTimeDiff, storeToken } from '../../utils/tokenService';
import {
  contextActions,
  contextActionTypes,
  getSubscriberOptionsSuccess,
  setLocation,
  setObservation,
  setOrganization,
  setPatient,
} from './contextActions';
import {
  contextAPI,
  getLocation,
  getObservation,
  getOrganization,
  getPatient,
  getSubscriberOptions,
} from './contextApi';
import {
  GET_LOCATION,
  GET_OBSERVATION,
  GET_ORGANIZATION,
  GET_PATIENT,
  GET_SUBSCRIBER_OPTIONS,
  REFRESH_LOCATION,
  REFRESH_ORGANIZATION,
  REFRESH_PATIENT,
} from './contextConstants';
import {
  makeSelectLocation,
  makeSelectOrganization,
  makeSelectPatient,
} from './contextSelectors';

export function* refreshPatientSaga() {
  const patient = yield select(makeSelectPatient());
  if (patient && patient.id) {
    const newPatient = yield call(getPatient, patient.id);
    yield put(setPatient(newPatient));
  } else {
    yield put(
      showNotification(
        'Cannot refresh patient context, no patient is selected.'
      )
    );
  }
}

export function* refreshOrganizationSaga() {
  const organization = yield select(makeSelectOrganization());
  if (organization && organization.logicalId) {
    const newOrganization = yield call(getOrganization, organization.logicalId);
    yield put(setOrganization(newOrganization));
  } else {
    yield put(
      showNotification(
        'Cannot refresh organization context, no organization is selected.'
      )
    );
  }
}

export function* refreshLocationSaga() {
  const location = yield select(makeSelectLocation());
  if (location && location.logicalId) {
    const newLocation = yield call(getLocation, location.logicalId);
    yield put(setLocation(newLocation));
  } else {
    yield put(
      showNotification(
        'Cannot refresh location context, no location is selected.'
      )
    );
  }
}

export function* getPatientSaga({ logicalId }) {
  if (logicalId) {
    const newPatient = yield call(getPatient, logicalId);
    yield put(setPatient(newPatient));
  } else {
    yield put(
      showNotification('Cannot get patient context, no patient is selected.')
    );
  }
}

export function* getObservationSaga({ logicalId }) {
  if (logicalId) {
    const observation = yield call(getObservation, logicalId);
    console.log('saga observation');
    yield put(setObservation(observation));
  } else {
    yield put(
      showNotification(
        'Cannot get observation context, no patient is selected.'
      )
    );
  }
}

export function* getOrganizationSaga({ logicalId }) {
  if (logicalId) {
    const newOrganization = yield call(getOrganization, logicalId);
    yield put(setOrganization(newOrganization));
  } else {
    yield put(
      showNotification(
        'Cannot get organization context, no organization is selected.'
      )
    );
  }
}

export function* getLocationSaga({ logicalId }) {
  if (logicalId) {
    const newLocation = yield call(getLocation, logicalId);
    yield put(setLocation(newLocation));
  } else {
    yield put(
      showNotification('Cannot get location context, no location is selected.')
    );
  }
}

function* getSubscriberOptionsSaga(action) {
  try {
    const subscriberOptions = yield call(
      getSubscriberOptions,
      action.patientId
    );
    yield put(getSubscriberOptionsSuccess(subscriberOptions));
  } catch (error) {
    yield put(showNotification('Error in  getting subscriber options'));
  }
}

export function* logoutSaga({ config }) {
  console.log('logoutSaga({ config }) {');
  try {
    yield call(removeToken);
    const authorizationServerEndpoint =
      config && config.oauth2 && config.oauth2.authorizationServerEndpoint;
    const baseHref = document
      .getElementsByTagName('base')[0]
      .getAttribute('href');
    const { protocol, port, hostname } = location;
    setTimeout(() => {
      //TODO use config variable to set the url depending on UAA or keycloak
      //window.location = `${authorizationServerEndpoint}/logout.do?redirect=${protocol}//${hostname}${port ? `:${port}` : port}${baseHref}`;
      window.location = `${
        env_vars.REACT_APP_KEYCLOAK_LOGOUT_URL
      }?redirect_uri=${protocol}//${hostname}${port ? `:${port}` : port}`;
    }, 0);
    yield put(push(LOGIN_URL));
  } catch (error) {
    yield put(showNotification('Failed to logout.'));
    throw error;
  }
}

export function* refreshTokenSaga({ refreshTokenData }) {
  try {
    const responseData = yield call(contextAPI.refreshToken, refreshTokenData);

    if (responseData.access_token) {
      const newAuthData = getAuthData(responseData.access_token);
      yield call(storeToken, newAuthData);

      const tokenTimeDiff = getTokenTimeDiff(newAuthData);

      yield put(
        contextActions.refreshTokenSuccess({
          expiration_token: tokenTimeDiff / 1000,
          refresh_token_data: refreshTokenData,
          expiration_token_epoch: newAuthData.expires_in
        })
      );
    }

  } catch (error) {
    yield put(showNotification('Failed to refreshToken.'));
    throw error;
  }
}

export function* watchRefreshTokenSaga() {
  yield takeLatest(contextActionTypes.REFRESH_TOKEN, refreshTokenSaga);
}

export function* watchLogoutSaga() {
  yield takeLatest(contextActionTypes.LOGOUT, logoutSaga);
}

export function* watchRefreshPatientSaga() {
  yield takeLatest(REFRESH_PATIENT, refreshPatientSaga);
}

export function* watchRefreshOrganizationSaga() {
  yield takeLatest(REFRESH_ORGANIZATION, refreshOrganizationSaga);
}

export function* watchRefreshLocationSaga() {
  yield takeLatest(REFRESH_LOCATION, refreshLocationSaga);
}

export function* watchGetPatientSaga() {
  yield takeLatest(GET_PATIENT, getPatientSaga);
}

export function* watchGetObservationSaga() {
  yield takeLatest(GET_OBSERVATION, getObservationSaga);
}

export function* watchGetOrganizationSaga() {
  yield takeLatest(GET_ORGANIZATION, getOrganizationSaga);
}

export function* watchGetLocationSaga() {
  yield takeLatest(GET_LOCATION, getLocationSaga);
}

function* watchGetSubscriberOptionsSaga() {
  yield takeLatest(GET_SUBSCRIBER_OPTIONS, getSubscriberOptionsSaga);
}

export default function* rootSaga() {
  yield all([
    watchRefreshPatientSaga(),
    watchRefreshOrganizationSaga(),
    watchRefreshLocationSaga(),
    watchGetPatientSaga(),
    watchGetOrganizationSaga(),
    watchGetLocationSaga(),
    watchGetSubscriberOptionsSaga(),
    watchGetObservationSaga(),
    watchLogoutSaga(),
    watchRefreshTokenSaga(),
  ]);
}
