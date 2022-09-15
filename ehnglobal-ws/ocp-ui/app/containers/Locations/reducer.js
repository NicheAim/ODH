/*
 *
 * Locations reducer
 *
 */

import { fromJS } from 'immutable';

import {
  GET_ACTIVE_LOCATIONS,
  GET_FILTERED_LOCATIONS,
  GET_LOCATIONS_SUCCESS,
  SEARCH_LOCATIONS,
  SEARCH_LOCATIONS_ERROR,
  SEARCH_LOCATIONS_SUCCESS,
  INITIALIZE_LOCATIONS,
} from './constants';

const initialState = fromJS({
  data: [],
  currentPage: 0,
  totalNumberOfPages: 0,
  includeInactive: false,
  includeSuspended: false,
});

function locationsReducer(state = initialState, action) {
  switch (action.type) {
    case GET_FILTERED_LOCATIONS:
      return state
        .setIn(['currentPage'], action.currentPage)
        .setIn(['includeInactive'], action.includeInactive)
        .setIn(['includeSuspended'], action.includeSuspended);
    case INITIALIZE_LOCATIONS:
      return initialState;
    case GET_LOCATIONS_SUCCESS:
      return state
        .set('data', fromJS((action.locations && action.locations.elements) || []))
        .setIn(['totalNumberOfPages'], action.locations.totalNumberOfPages)
        .setIn(['totalElements'], action.locations.totalElements)
        .setIn(['currentPageSize'], action.locations.currentPageSize)
        .setIn(['currentPage'], action.locations.currentPage);
    case GET_ACTIVE_LOCATIONS: {
      return state
        .setIn(['includeInactive'], false)
        .setIn(['includeSuspended'], false);
    }
    case SEARCH_LOCATIONS: {
      return state
        .setIn(['includeInactive'], true)
        .setIn(['includeSuspended'], true);
    }
    case SEARCH_LOCATIONS_SUCCESS: {
      return state
        .set('data', fromJS((action.locations && action.locations.elements) || []))
        .setIn(['totalNumberOfPages'], action.locations.totalNumberOfPages)
        .setIn(['totalElements'], action.locations.totalElements)
        .setIn(['currentPageSize'], action.locations.currentPageSize)
        .setIn(['currentPage'], action.locations.currentPage);
    }
    case SEARCH_LOCATIONS_ERROR: {
      return state
        .setIn('error', action.error);
    }
    default:
      return state;
  }
}

export default locationsReducer;
