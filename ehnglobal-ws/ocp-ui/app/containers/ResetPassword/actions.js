/*
 *
 * ResetPassword actions
 *
 */

import { RESET_PASSWORD, RESET_PASSWORD_ERROR, RESET_PASSWORD_SUCCESS } from './constants';

export function resetPassword(userId, newPassword, handleSubmitting, handleCloseDialog) {
  return {
    type: RESET_PASSWORD,
    userId,
    newPassword,
    handleSubmitting,
    handleCloseDialog,
  };
}

export function resetPasswordSuccess() {
  return {
    type: RESET_PASSWORD_SUCCESS,
  };
}

export function resetPasswordError(error) {
  return {
    type: RESET_PASSWORD_ERROR,
    error,
  };
}
