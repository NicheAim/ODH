/*
 *
 * UserLoginDetailsPage actions
 *
 */

import { GET_USER_LOGIN_DETAILS, GET_USER_LOGIN_DETAILS_ERROR, GET_USER_LOGIN_DETAILS_SUCCESS } from './constants';

export function getUserLoginDetails() {
  return {
    type: GET_USER_LOGIN_DETAILS,
  };
}

export function getUserLoginDetailsSuccess(userLoginDetails) {
  return {
    type: GET_USER_LOGIN_DETAILS_SUCCESS,
    userLoginDetails,
  };
}

export function getUserLoginDetailsError(error) {
  return {
    type: GET_USER_LOGIN_DETAILS_ERROR,
    error,
  };
}
