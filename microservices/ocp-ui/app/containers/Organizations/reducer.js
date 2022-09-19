/*
 *
 * Organizations reducer
 *
 */

import { fromJS } from 'immutable';
import isEmpty from 'lodash/isEmpty';
import {
  GET_ORGANIZATIONS,
  GET_ORGANIZATIONS_ERROR,
  GET_ORGANIZATIONS_SUCCESS,
  INITIALIZE_ORGANIZATIONS,
  SEARCH_ORGANIZATIONS,
  SEARCH_ORGANIZATIONS_ERROR,
  SEARCH_ORGANIZATIONS_SUCCESS,
} from './constants';

const initialState = fromJS({
  loading: false,
  data: [],
  currentPage: 0,
  totalNumberOfPages: 0,
});

function organizationsReducer(state = initialState, action) {
  switch (action.type) {
    case INITIALIZE_ORGANIZATIONS: {
      if (!isEmpty(action.organizations)) {
        return initialState
          .set('data', fromJS(action.organizations));
      }
      return initialState;
    }
    case GET_ORGANIZATIONS:
      return state
        .set('loading', true);
    case GET_ORGANIZATIONS_SUCCESS:
      return state
        .set('loading', false)
        .set('data', fromJS(action.organizations.elements))
        .set('totalNumberOfPages', action.organizations.totalNumberOfPages)
        .set('totalElements', action.organizations.totalElements)
        .set('currentPageSize', action.organizations.currentPageSize)
        .set('currentPage', action.organizations.currentPage);
    case GET_ORGANIZATIONS_ERROR:
      return state
        .set('loading', false)
        .set('data', fromJS([]))
        .set('error', action.error);
    case SEARCH_ORGANIZATIONS:
      return state
        .set('loading', true);
    case SEARCH_ORGANIZATIONS_SUCCESS:
      return state
        .set('loading', false)
        .set('data', fromJS(action.organizations.elements))
        .set('totalNumberOfPages', action.organizations.totalNumberOfPages)
        .set('totalElements', action.organizations.totalElements)
        .set('currentPageSize', action.organizations.currentPageSize)
        .set('currentPage', action.organizations.currentPage);
    case SEARCH_ORGANIZATIONS_ERROR:
      return state
        .set('loading', false)
        .set('data', fromJS([]))
        .set('error', action.error);
    default:
      return state;
  }
}

export default organizationsReducer;
