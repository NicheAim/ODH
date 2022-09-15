/*
 *
 * Notification actions
 *
 */

import { RESET_NOTIFICATION, SHOW_NOTIFICATION } from './constants';

export function showNotification(message) {
  return {
    type: SHOW_NOTIFICATION,
    message,
  };
}

export function resetNotification() {
  return {
    type: RESET_NOTIFICATION,
  };
}
