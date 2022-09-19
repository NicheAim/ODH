/*
 *
 * SmartAppLauncher actions
 *
 */

import {
  CREATE_LAUNCH,
  CREATE_LAUNCH_ERROR,
  CREATE_LAUNCH_SUCCESS,
  GET_APP_SHORTCUTS,
  GET_APP_SHORTCUTS_ERROR,
  GET_APP_SHORTCUTS_SUCCESS,
  GET_CLIENTS,
  GET_CLIENTS_ERROR,
  GET_CLIENTS_SUCCESS,
} from './constants';

export function getClients() {
  return {
    type: GET_CLIENTS,
  };
}

export function getClientsSuccess(clients) {
  return {
    type: GET_CLIENTS_SUCCESS,
    clients,
  };
}

export function getClientsError(error) {
  return {
    type: GET_CLIENTS_ERROR,
    error,
  };
}

export function getAppShortcuts() {
  return {
    type: GET_APP_SHORTCUTS,
  };
}

export function getAppShortcutsSuccess(appShortcuts) {
  return {
    type: GET_APP_SHORTCUTS_SUCCESS,
    appShortcuts,
  };
}

export function getAppShortcutsError(error) {
  return {
    type: GET_APP_SHORTCUTS_ERROR,
    error,
  };
}

export function createLaunch(clientId) {
  return {
    type: CREATE_LAUNCH,
    clientId,
  };
}

export function createLaunchSuccess(launch) {
  return {
    type: CREATE_LAUNCH_SUCCESS,
    launch,
  };
}

export function createLaunchError(error) {
  return {
    type: CREATE_LAUNCH_ERROR,
    error,
  };
}
