/*
 *
 * Notification reducer
 *
 */

import { fromJS } from 'immutable';
import { RESET_NOTIFICATION, SHOW_NOTIFICATION } from './constants';

const initialState = fromJS({
  open: false,
  message: '',
});

function notificationReducer(state = initialState, action) {
  switch (action.type) {
    case SHOW_NOTIFICATION:
      return state
        .set('open', true)
        .set('message', action.message || '');
    case RESET_NOTIFICATION:
      return state
        .set('open', false)
        .set('message', '');
    default:
      return state;
  }
}

export default notificationReducer;
