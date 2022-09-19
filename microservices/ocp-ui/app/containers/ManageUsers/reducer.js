/*
 *
 * ManageUsers reducer
 *
 */

import { fromJS } from 'immutable';
import find from 'lodash/find';
import pull from 'lodash/pull';
import {
  ASSIGN_USER_ROLE_ERROR,
  ASSIGN_USER_ROLE_SUCCESS,
  GET_GROUPS,
  GET_GROUPS_ERROR,
  GET_GROUPS_SUCCESS,
  GET_USERS,
  GET_USERS_ERROR,
  GET_USERS_SUCCESS,
  INITIALIZE_PERMISSION_ASSIGNMENT,
} from './constants';

const initialState = fromJS({
  loading: false,
  error: false,
  users: [],
  groups: [],
});

function manageUsersReducer(state = initialState, action) {
  switch (action.type) {
    case INITIALIZE_PERMISSION_ASSIGNMENT:
      return initialState;
    case GET_USERS:
      return state
        .set('loading', true);
    case GET_USERS_SUCCESS:
      return state
        .set('loading', false)
        .set('users', fromJS((action.users) || []));
    case GET_USERS_ERROR:
      return state
        .set('loading', false)
        .set('error', action.error);
    case GET_GROUPS:
      return state
        .set('loading', true);
    case GET_GROUPS_SUCCESS: {
      const patientGroup = find(action.groups, { displayName: 'ocp.role.patient' });
      return state
        .set('loading', false)
        .set('groups', fromJS(pull(action.groups, patientGroup) || []));
    }
    case GET_GROUPS_ERROR:
      return state
        .set('loading', false)
        .set('error', action.error);
    case ASSIGN_USER_ROLE_SUCCESS: {
      const users = state.get('users').toJS();
      const groups = state.get('groups').toJS();
      users.map((user) => {
        if (user.id === action.userId) {
          const updatedUser = user;
          updatedUser.displayName = find(groups, { id: action.groupId }).displayName;
          const i = users.indexOf(user);
          users[i] = updatedUser;
          return updatedUser;
        }
        return user;
      });
      return state.set('users', fromJS(users));
    }
    case ASSIGN_USER_ROLE_ERROR:
      return state
        .set('error', action.error);
    default:
      return state;
  }
}

export default manageUsersReducer;
