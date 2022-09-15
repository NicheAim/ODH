/*
 *
 * LoginPage actions
 *
 */

import { LOGIN, LOGIN_ERROR, LOGIN_SUCCESS, LOGIN_KEYCLOAK } from './constants';

export function loginkeycloak() {
  return {
    type: LOGIN_KEYCLOAK,
  };
}

export function login(loginCredentials, handleSubmitting) {
  return {
    type: LOGIN,
    loginCredentials,
    handleSubmitting,
  };
}

export function loginSuccess(isAuthenticated) {
  return {
    type: LOGIN_SUCCESS,
    isAuthenticated,
  };
}

export function loginError(error) {
  return {
    type: LOGIN_ERROR,
    error,
  };
}
