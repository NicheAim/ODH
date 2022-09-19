/*
 *
 * Practitioners reducer
 *
 */

import { fromJS } from 'immutable';
import {
  GET_PRACTITIONERS_IN_ORGANIZATION,
  GET_PRACTITIONERS_IN_ORGANIZATION_ERROR,
  GET_PRACTITIONERS_IN_ORGANIZATION_SUCCESS,
  INITIALIZE_PRACTITIONERS,
  SEARCH_PRACTITIONERS,
  SEARCH_PRACTITIONERS_ERROR,
  SEARCH_PRACTITIONERS_SUCCESS,
} from './constants';

const initialState = fromJS({
  loading: false,
  data: null,
  currentPage: 0,
  totalNumberOfPages: 0,
  error: false,
});

function practitionersReducer(state = initialState, action) {
  switch (action.type) {
    case INITIALIZE_PRACTITIONERS:
      return initialState;
    case GET_PRACTITIONERS_IN_ORGANIZATION:
      return state
        .set('loading', true);
    case GET_PRACTITIONERS_IN_ORGANIZATION_SUCCESS:
      return state
        .set('loading', false)
        .set('data', fromJS(action.practitioners.elements))
        .set('totalElements', action.practitioners.totalElements)
        .set('currentPageSize', action.practitioners.currentPageSize)
        .set('totalNumberOfPages', action.practitioners.totalNumberOfPages)
        .set('currentPage', action.practitioners.currentPage);
    case GET_PRACTITIONERS_IN_ORGANIZATION_ERROR:
      return state
        .set('loading', false)
        .set('error', action.error);
    case SEARCH_PRACTITIONERS:
      return state
        .set('loading', true);
    case SEARCH_PRACTITIONERS_SUCCESS:
      return state
        .set('loading', false)
        .set('data', fromJS(action.practitioners.elements))
        .set('totalElements', action.practitioners.totalElements)
        .set('currentPageSize', action.practitioners.currentPageSize)
        .set('totalNumberOfPages', action.practitioners.totalNumberOfPages)
        .set('currentPage', action.practitioners.currentPage);
    case SEARCH_PRACTITIONERS_ERROR:
      return state
        .set('loading', false)
        .set('error', action.error);
    default: {
      return state;
    }
  }
}

export default practitionersReducer;
