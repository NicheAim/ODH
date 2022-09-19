/*
 *
 * WorkspaceSelectionPage reducer
 *
 */

import { fromJS } from 'immutable';
import {
  GET_PRACTITIONERS_ON_ROLE_ORGANIZATION_SUCCESS,
  GET_WORKFLOW_ROLES_SUCCESS,
  INITIALIZE_SELECTION,
  SEARCH_ORGANIZATIONS,
  SEARCH_ORGANIZATIONS_ERROR,
  SEARCH_ORGANIZATIONS_SUCCESS,
  SEARCH_PATIENTS,
  SEARCH_PATIENTS_ERROR,
  SEARCH_PATIENTS_SUCCESS,
} from 'containers/WorkspaceSelectionPage/constants';

const initialState = fromJS({
  workflowRoles: {
    data: [],
  },
  practitioners: {
    role: null,
    data: [],
    currentPage: 0,
    totalNumberOfPages: 0,
  },
  searchOrganizations: {
    loading: false,
    result: [],
    currentPage: 0,
    totalNumberOfPages: 0,
  },
  searchPatients: {
    loading: false,
    result: [],
    currentPage: 0,
    totalNumberOfPages: 0,
  },
});

function workspaceSelectionPageReducer(state = initialState, action) {
  switch (action.type) {
    case INITIALIZE_SELECTION:
      return state
        .setIn(['practitioners', 'role'], null)
        .setIn(['practitioners', 'data'], fromJS([]))
        .setIn(['practitioners', 'totalElements'], 0)
        .setIn(['practitioners', 'totalNumberOfPages'], 0)
        .setIn(['practitioners', 'currentPage'], 0)
        .setIn(['searchOrganizations', 'result'], fromJS([]))
        .setIn(['searchOrganizations', 'totalElements'], 0)
        .setIn(['searchOrganizations', 'totalNumberOfPages'], 0)
        .setIn(['searchOrganizations', 'currentPage'], 0)
        .setIn(['searchPatients', 'result'], fromJS([]))
        .setIn(['searchPatients', 'totalElements'], 0)
        .setIn(['searchPatients', 'totalNumberOfPages'], 0)
        .setIn(['searchPatients', 'currentPage'], 0);
    case GET_WORKFLOW_ROLES_SUCCESS:
      return state
        .setIn(['workflowRoles', 'data'], fromJS(action.workflowRoles));
    case GET_PRACTITIONERS_ON_ROLE_ORGANIZATION_SUCCESS:
      return state
        .setIn(['practitioners', 'role'], action.role)
        .setIn(['practitioners', 'data'], fromJS(action.practitioners.elements))
        .setIn(['practitioners', 'totalElements'], action.practitioners.totalElements)
        .setIn(['practitioners', 'currentPageSize'], action.practitioners.currentPageSize)
        .setIn(['practitioners', 'totalNumberOfPages'], action.practitioners.totalNumberOfPages)
        .setIn(['practitioners', 'currentPage'], action.practitioners.currentPage);
    case SEARCH_ORGANIZATIONS:
      return state
        .setIn(['searchOrganizations', 'loading'], true);
    case SEARCH_ORGANIZATIONS_SUCCESS:
      return state
        .setIn(['searchOrganizations', 'loading'], false)
        .setIn(['searchOrganizations', 'result'], fromJS(action.organizations.elements))
        .setIn(['searchOrganizations', 'totalElements'], action.organizations.totalElements)
        .setIn(['searchOrganizations', 'currentPageSize'], action.organizations.currentPageSize)
        .setIn(['searchOrganizations', 'totalNumberOfPages'], action.organizations.totalNumberOfPages)
        .setIn(['searchOrganizations', 'currentPage'], action.organizations.currentPage);
    case SEARCH_ORGANIZATIONS_ERROR:
      return state
        .setIn(['searchOrganizations', 'loading'], false)
        .setIn(['searchOrganizations', 'error'], action.error);
    case SEARCH_PATIENTS:
      return state
        .setIn(['searchPatients', 'loading'], true);
    case SEARCH_PATIENTS_SUCCESS:
      return state
        .setIn(['searchPatients', 'loading'], false)
        .setIn(['searchPatients', 'result'], fromJS(action.patients.elements))
        .setIn(['searchPatients', 'totalElements'], action.patients.totalElements)
        .setIn(['searchPatients', 'currentPageSize'], action.patients.currentPageSize)
        .setIn(['searchPatients', 'totalNumberOfPages'], action.patients.totalNumberOfPages)
        .setIn(['searchPatients', 'currentPage'], action.patients.currentPage);
    case SEARCH_PATIENTS_ERROR:
      return state
        .setIn(['searchPatients', 'loading'], false)
        .setIn(['searchPatients', 'error'], action.error);
    default:
      return state;
  }
}

export default workspaceSelectionPageReducer;
