/*
 *
 * ManageClientPage reducer
 *
 */

import { fromJS } from 'immutable';
import pull from 'lodash/pull';
import find from 'lodash/find';
import { DELETE_CLIENT_SUCCESS, GET_CLIENTS_SUCCESS, SAVE_CLIENT_SUCCESS } from './constants';

const initialState = fromJS({ clients: [] });

function manageClientPageReducer(state = initialState, action) {
  switch (action.type) {
    case GET_CLIENTS_SUCCESS:
      return state.set('clients', fromJS(action.clients));
    case SAVE_CLIENT_SUCCESS: {
      const clients = state.get('clients').toJS();
      if (find(clients, { clientId: action.clientDto.clientId }) !== undefined) {
        pull(clients, find(clients, { clientId: action.clientDto.clientId }));
      }
      return state.set('clients', fromJS(clients.concat(action.clientDto)));
    }
    case DELETE_CLIENT_SUCCESS: {
      const clients = state.get('clients').toJS();
      const deletedClient = find(clients, { clientId: action.clientId });
      return state.set('clients', fromJS(pull(clients, deletedClient)));
    }
    default:
      return state;
  }
}

export default manageClientPageReducer;
