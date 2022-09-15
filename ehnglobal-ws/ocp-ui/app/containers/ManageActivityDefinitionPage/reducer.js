/*
 *
 * ManageActivityDefinitionPage reducer
 *
 */

import { fromJS } from 'immutable';
import {
  GET_ACTIVITY_DEFINITION_ERROR,
  GET_ACTIVITY_DEFINITION_SUCCESS,
  SAVE_ACTIVITY_DEFINITION_ERROR,
} from './constants';

const initialState = fromJS({
  activityDefinition: null,
});

function manageActivityDefinitionPageReducer(state = initialState, action) {
  switch (action.type) {
    case GET_ACTIVITY_DEFINITION_SUCCESS:
      return state.set('activityDefinition', action.activityDefinition);
    case GET_ACTIVITY_DEFINITION_ERROR:
      return state.set('error', action.error);
    case SAVE_ACTIVITY_DEFINITION_ERROR:
      return state.set('error', action.error);
    default:
      return state;
  }
}

export default manageActivityDefinitionPageReducer;
