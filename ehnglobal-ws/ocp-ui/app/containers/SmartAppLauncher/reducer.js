/*
 *
 * SmartAppLauncher reducer
 *
 */

import { fromJS } from 'immutable';

import { GET_APP_SHORTCUTS_SUCCESS, GET_CLIENTS_SUCCESS } from './constants';

const initialState = fromJS({
  clients: [],
  appShortcuts: {},
});

function smartAppLauncherReducer(state = initialState, action) {
  switch (action.type) {
    case GET_CLIENTS_SUCCESS:
      return state.set('clients', fromJS(action.clients));
    case GET_APP_SHORTCUTS_SUCCESS: {
      return state.set('appShortcuts', fromJS((action.appShortcuts) || {}));
      // return state.set('appShortcuts', fromJS(action.appShortcuts));
    }
    default:
      return state;
  }
}

export default smartAppLauncherReducer;
