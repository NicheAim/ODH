/*
 *
 * Authentication actions
 *
 */

import { AUTOLOGIN, AUTOLOGIN_ERROR, AUTOLOGIN_SUCCESS } from './constants';

export function autologin(code) {
  return {
    type: AUTOLOGIN,
    code,
  };
}

export function autologinSuccess() {
  return {
    type: AUTOLOGIN_SUCCESS,
  };
}

export function autologinError(error) {
  return {
    type: AUTOLOGIN_ERROR,
    error,
  };
}
