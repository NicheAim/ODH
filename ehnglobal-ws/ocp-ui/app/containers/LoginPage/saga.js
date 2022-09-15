import {
  OCP_ADMIN_ROLE_CODE,
  PATIENT_ROLE_CODE,
} from 'containers/App/constants';
import {
  setOrganization,
  setPatient,
  setUser,
} from 'containers/App/contextActions';
import { getLinkUrlByRole, getRoleByScope } from 'containers/App/helpers';
import { makeSelectLocation } from 'containers/App/selectors';
import { autologin } from 'containers/Authentication/actions';
import { showNotification } from 'containers/Notification/actions';
import jwt from 'jsonwebtoken';
import find from 'lodash/find';
import { push } from 'react-router-redux';
import { all, call, put, select, takeLatest } from 'redux-saga/effects';
import { checkAuthenticated, checkCookies } from 'utils/auth';
import { removeToken, storeAuthStatus, storeToken } from 'utils/tokenService';
import { env_vars } from '../../../env';
import { getTokenTimeDiff } from '../../utils/tokenService';
import { loginError, loginSuccess } from './actions';
import { getLoginErrorDetail, getUserContext, login } from './api';
import { LOGIN, LOGIN_KEYCLOAK } from './constants';

function* loginkeycloak() {
  console.log('loginkeycloak() {');
  const { authData, cookieexists, refreshTokenData } = yield call(checkCookies);
  console.log('Authentication data');
  console.log(authData);
  console.log('There is data');
  console.log(cookieexists);
  console.log('refreshTokenData', refreshTokenData);
  // const sessiontoken = yield call(retrieveToken);
  // Agregar validacion del session storage

  const tokenTimeDiff = getTokenTimeDiff(authData);

  if (cookieexists && authData !== null && tokenTimeDiff < 0) {
    const { autologin: code } = authData;
    const {
      sub: user_id,
      preferred_username: user_name,
      email,
      scope,
      ext_attr,
    } = yield call(jwt.decode, authData.access_token);
    const roleScope = find(
      scope,
      (s) => s.startsWith('ocp.role') && !s.startsWith('ocp.role.smart')
    );
    console.log('roles');
    console.log(roleScope);
    if (roleScope == null) {
      yield put(showNotification('No role found for user'));
      yield call(removeToken);
    }
    console.log(user_id);
    console.log(user_name);
    console.log(email);
    console.log(ext_attr);
    const userRole = yield call(getRoleByScope, roleScope);
    console.log(userRole);
    yield put(
      setUser({ user_id, user_name, email, scope, ext_attr, role: userRole })
    );
    yield call(storeToken, authData);
    yield call(storeAuthStatus, true);
    const isAuthenticated = yield call(checkAuthenticated);
    if (!isAuthenticated) {
      yield put(showNotification('Access is denied.'));
      yield call(removeToken);
    }
    yield put(loginSuccess(isAuthenticated));
    // Retrieving user fhirResource and organization details
    if (userRole !== OCP_ADMIN_ROLE_CODE) {
      const userContext = yield call(getUserContext);
      const { fhirResource, organization } = userContext;
      yield put(
        setUser({
          user_id,
          user_name,
          email,
          scope,
          ext_attr,
          fhirResource,
          role: userRole,
          expiration_token: tokenTimeDiff / 1000,
          expiration_token_epoch: authData.expires_in,
          refresh_token_data: refreshTokenData,
        })
      );
      yield put(setOrganization(organization));
      if (userRole === PATIENT_ROLE_CODE) {
        yield put(setPatient(fhirResource));
      }
    }
    // Redirect to referrer address
    const location = yield select(makeSelectLocation());
    const linkUrl = yield call(getLinkUrlByRole, userRole);
    const { from } = location.state || { from: { pathname: linkUrl } };
    console.log('User Space');
    console.log(linkUrl);
    yield all([put(push(from)), put(autologin(code))]);
  } else {
    const linkUrl = env_vars.REACT_APP_KEYCLOAK_REDIRECT_URL;
    console.log('Link to backend');
    console.log(linkUrl);
    window.location.assign(linkUrl);
  }
}

// else {
//   // const linkUrl = 'http://192.168.122.96:8446/testlogin';
//   // window.location.assign(linkUrl);
// }

function* loginSaga(loginAction) {
  try {
    const loginResponse = yield call(login, loginAction.loginCredentials);
    const {
      authData,
      autologin: { code },
    } = loginResponse;
    const { user_id, user_name, email, scope, ext_attr } = yield call(
      jwt.decode,
      authData.access_token
    );
    const roleScope = find(
      scope,
      (s) => s.startsWith('ocp.role') && !s.startsWith('ocp.role.smart')
    );
    const userRole = yield call(getRoleByScope, roleScope);
    yield put(
      setUser({ user_id, user_name, email, scope, ext_attr, role: userRole })
    );

    yield call(storeToken, authData);
    yield call(storeAuthStatus, true);
    const isAuthenticated = yield call(checkAuthenticated);
    if (!isAuthenticated) {
      yield put(showNotification('Access is denied.'));
      yield call(removeToken);
    }
    yield put(loginSuccess(isAuthenticated));

    // Retrieving user fhirResource and organization details
    if (userRole !== OCP_ADMIN_ROLE_CODE) {
      const userContext = yield call(getUserContext);
      const { fhirResource, organization } = userContext;
      yield put(
        setUser({
          user_id,
          user_name,
          email,
          scope,
          ext_attr,
          fhirResource,
          role: userRole,
        })
      );
      yield put(setOrganization(organization));
      if (userRole === PATIENT_ROLE_CODE) {
        yield put(setPatient(fhirResource));
      }
    }
    // Handle submitting event until finishing all backend call
    yield call(loginAction.handleSubmitting);

    // Redirect to referrer address
    const location = yield select(makeSelectLocation());
    const linkUrl = yield call(getLinkUrlByRole, userRole);
    const { from } = location.state || { from: { pathname: linkUrl } };
    yield all([put(push(from)), put(autologin(code))]);
  } catch (error) {
    yield put(loginError(getLoginErrorDetail(error)));
    yield put(showNotification('Failed to login.'));
    yield call(loginAction.handleSubmitting);
  }
}

function* watchLoginSaga() {
  yield takeLatest(LOGIN, loginSaga);
  yield takeLatest(LOGIN_KEYCLOAK, loginkeycloak);
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* rootSaga() {
  yield all([watchLoginSaga()]);
}
