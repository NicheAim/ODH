/*
 *
 * ManageClientPage actions
 *
 */

import { SAVE_CLIENT, SAVE_CLIENT_ERROR, SAVE_CLIENT_SUCCESS, GET_CLIENTS, GET_CLIENTS_SUCCESS, GET_CLIENTS_ERROR, DELETE_CLIENT, DELETE_CLIENT_ERROR, DELETE_CLIENT_SUCCESS } from './constants';

export function saveClient(clientFormData, handleSubmitting) {
  return {
    type: SAVE_CLIENT,
    clientFormData,
    handleSubmitting,
  };
}

export function saveClientSuccess(clientDto) {
  return {
    type: SAVE_CLIENT_SUCCESS,
    clientDto,
  };
}

export function saveClientError(error) {
  return {
    type: SAVE_CLIENT_ERROR,
    error,
  };
}

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

export function deleteClient(clientId) {
  return {
    type: DELETE_CLIENT,
    clientId,
  };
}

export function deleteClientSuccess(clientId) {
  return {
    type: DELETE_CLIENT_SUCCESS,
    clientId,
  };
}

export function deleteClientError(error) {
  return {
    type: DELETE_CLIENT_ERROR,
    error,
  };
}
