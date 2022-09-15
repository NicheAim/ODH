/*
 *
 * HealthcareServices reducer
 *
 */

import { fromJS } from 'immutable';
import {
  GET_HEALTHCARE_SERVICES,
  GET_HEALTHCARE_SERVICES_ERROR,
  GET_HEALTHCARE_SERVICES_SUCCESS,
  SEARCH_HEALTHCARE_SERVICES,
  SEARCH_HEALTHCARE_SERVICES_SUCCESS,
  SEARCH_HEALTHCARE_SERVICES_ERROR,
  INITIALIZE_HEALTHCARE_SERVICES,
} from './constants';

const initialState = fromJS({
  loading: false,
  error: false,
  data: [],
  currentPage: 0,
  totalNumberOfPages: 0,
  includeInactive: false,
});

function healthcareServicesReducer(state = initialState, action) {
  switch (action.type) {
    case INITIALIZE_HEALTHCARE_SERVICES:
      return initialState;
    case GET_HEALTHCARE_SERVICES: {
      return state
        .set('data', fromJS([]))
        .set('currentPage', action.currentPage)
        .set('includeInactive', action.includeInactive)
        .set('loading', true)
        .set('error', false);
    }
    case GET_HEALTHCARE_SERVICES_SUCCESS:
      return state
        .set('data', fromJS((action.healthcareServices && action.healthcareServices.elements) || []))
        .set('loading', false)
        .set('totalNumberOfPages', action.healthcareServices.totalNumberOfPages)
        .set('totalElements', action.healthcareServices.totalElements)
        .set('currentPageSize', action.healthcareServices.currentPageSize)
        .set('currentPage', action.healthcareServices.currentPage);
    case GET_HEALTHCARE_SERVICES_ERROR:
      return state
        .set('error', action.error)
        .set('loading', false);
    case SEARCH_HEALTHCARE_SERVICES: {
      return state
        .set('data', fromJS([]))
        .set('currentPage', action.currentPage)
        .set('includeInactive', action.includeInactive)
        .set('loading', true)
        .set('error', false);
    }
    case SEARCH_HEALTHCARE_SERVICES_SUCCESS:
      return state
        .set('data', fromJS((action.healthcareServices && action.healthcareServices.elements) || []))
        .set('loading', false)
        .set('totalNumberOfPages', action.healthcareServices.totalNumberOfPages)
        .set('totalElements', action.healthcareServices.totalElements)
        .set('currentPageSize', action.healthcareServices.currentPageSize)
        .set('currentPage', action.healthcareServices.currentPage);
    case SEARCH_HEALTHCARE_SERVICES_ERROR:
      return state
        .set('error', action.error)
        .set('loading', false);
    default:
      return state;
  }
}

export default healthcareServicesReducer;
