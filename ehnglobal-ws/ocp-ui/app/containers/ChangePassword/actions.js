/*
 *
 * ChangePassword actions
 *
 */

import { CHANGE_PASSWORD, CHANGE_PASSWORD_ERROR, CHANGE_PASSWORD_SUCCESS } from './constants';

export function changePassword(oldPassword, newPassword, handleSubmitting, handleCloseDrawer) {
  return {
    type: CHANGE_PASSWORD,
    oldPassword,
    newPassword,
    handleSubmitting,
    handleCloseDrawer,
  };
}

export function changePasswordSuccess() {
  return {
    type: CHANGE_PASSWORD_SUCCESS,
  };
}

export function changePasswordError(error) {
  return {
    type: CHANGE_PASSWORD_ERROR,
    error,
  };
}
