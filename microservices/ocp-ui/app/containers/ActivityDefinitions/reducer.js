/*
 *
 * ActivityDefinitions reducer
 *
 */

import { fromJS } from 'immutable';
import {
  GET_ACTIVITY_DEFINITIONS_IN_ORGANIZATION_ERROR,
  GET_ACTIVITY_DEFINITIONS_IN_ORGANIZATION_SUCCESS,
} from './constants';

const initialState = fromJS({
  listActivityDefinitions: {
    data: [],
    currentPage: 0,
    totalNumberOfPages: 0,
    error: false,
  },
});

function activityDefinitionsReducer(state = initialState, action) {
  switch (action.type) {
    case GET_ACTIVITY_DEFINITIONS_IN_ORGANIZATION_SUCCESS:
      return state
        .setIn(['listActivityDefinitions', 'data'], fromJS(action.activityDefinitions.elements))
        .setIn(['listActivityDefinitions', 'totalElements'], action.activityDefinitions.totalElements)
        .setIn(['listActivityDefinitions', 'currentPageSize'], action.activityDefinitions.currentPageSize)
        .setIn(['listActivityDefinitions', 'totalNumberOfPages'], action.activityDefinitions.totalNumberOfPages)
        .setIn(['listActivityDefinitions', 'currentPage'], action.activityDefinitions.currentPage);
    case GET_ACTIVITY_DEFINITIONS_IN_ORGANIZATION_ERROR:
      return state
        .setIn(['listActivityDefinitions', 'error'], action.error);
    default:
      return state;
  }
}

export default activityDefinitionsReducer;
