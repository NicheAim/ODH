/*
 *
 * PermissionsGroups reducer
 *
 */

import { fromJS } from 'immutable';
import {
GET_GROUPS,
GET_GROUPS_ERROR,
GET_GROUPS_SUCCESS,
GET_SCOPES_ERROR,
GET_SCOPES_SUCCESS,
INITIALIZE_PERMISSIONS_GROUP,
SAVE_GROUP,
SAVE_GROUP_ERROR,
SAVE_GROUP_SUCCESS,
} from './constants';

const initialState = fromJS({
  loading: false,
  error: false,
  groups: [],
  scopes: [],
});

function permissionsGroupsReducer(state = initialState, action) {
  switch (action.type) {
    case INITIALIZE_PERMISSIONS_GROUP:
      return initialState;
    case GET_GROUPS:
      return state
        .set('loading', true);
    case GET_GROUPS_SUCCESS:
      return state
        .set('loading', false)
        .set('groups', fromJS((action.groups) || []));
    case GET_GROUPS_ERROR:
      return state
        .set('loading', false)
        .set('error', action.error);
    case GET_SCOPES_SUCCESS:
      return state
        .set('loading', false)
        .set('scopes', fromJS((action.scopes) || []));
    case GET_SCOPES_ERROR:
      return state
        .set('loading', false)
        .set('error', action.error);
    case SAVE_GROUP:
      return state
        .set('loading', true);
    case SAVE_GROUP_SUCCESS: {
      const groups = state.get('groups').toJS();
      if (action.group.id !== undefined) {
        groups.map((group) => {
          if (group.id === action.group.id) {
            const i = groups.indexOf(group);
            groups[i] = action.group;
            return action.group;
          }
          return groups;
        });
        return state
          .set('loading', false)
          .set('groups', fromJS(groups));
      }
      return state
        .set('loading', false)
        .set('groups', fromJS(groups.concat(action.group)));
    }
    case SAVE_GROUP_ERROR:
      return state
        .set('loading', false)
        .set('error', action.error);
    default:
      return state;
  }
}

export default permissionsGroupsReducer;
