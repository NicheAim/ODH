/*
 *
 * Patients reducer
 *
 */

import { fromJS } from 'immutable';
import isEmpty from 'lodash/isEmpty';
import {
  INITIALIZE_PATIENTS,
  LOAD_PATIENT_SEARCH_RESULT,
  SEARCH_PATIENTS_ERROR,
  SEARCH_PATIENTS_SUCCESS,
  FILTER_PATIENTS_SUCCESS,
} from './constants';

const initialState = fromJS({
  loading: false,
  error: false,
  searchPatients: {
    result: false,
    totalPages: 0,
    currentPageSize: 0,
    currentPage: 0,
  },
});

function patientsReducer(state = initialState, action) {
  switch (action.type) {
    case INITIALIZE_PATIENTS: {
      if (!isEmpty(action.patients)) {
        return initialState.setIn(
          ['searchPatients', 'result'],
          action.patients
        );
      }
      return initialState;
    }
    case LOAD_PATIENT_SEARCH_RESULT:
      return state
        .set('loading', true)
        .set('error', false)
        .setIn(['searchPatients', 'result'], false);
    case SEARCH_PATIENTS_SUCCESS:
      return state
        .setIn(['searchPatients', 'result'], action.searchResult.elements)
        .setIn(
          ['searchPatients', 'currentPage'],
          action.searchResult.currentPage
        )
        .setIn(
          ['searchPatients', 'currentPageSize'],
          action.searchResult.currentPageSize
        )
        .setIn(
          ['searchPatients', 'totalPages'],
          action.searchResult.totalNumberOfPages
        )
        .setIn(
          ['searchPatients', 'totalElements'],
          action.searchResult.totalElements
        )
        .setIn(
          ['searchPatients', 'queryParameters', 'searchTerms'],
          action.queryParameters.searchTerms
        )
        .setIn(
          ['searchPatients', 'queryParameters', 'searchType'],
          action.queryParameters.searchType
        )
        .setIn(
          ['searchPatients', 'queryParameters', 'includeInactive'],
          action.queryParameters.includeInactive
        )
        .set('loading', false);
    case FILTER_PATIENTS_SUCCESS:
      console.log('FILTER_PATIENTS_SUCCESS');
      console.log(FILTER_PATIENTS_SUCCESS);
      return state
        .setIn(['searchPatients', 'result'], action.searchResult.elements)
        .setIn(
          ['searchPatients', 'currentPage'],
          action.searchResult.currentPage
        )
        .setIn(
          ['searchPatients', 'currentPageSize'],
          action.searchResult.currentPageSize
        )
        .setIn(
          ['searchPatients', 'totalPages'],
          action.searchResult.totalNumberOfPages
        )
        .setIn(
          ['searchPatients', 'totalElements'],
          action.searchResult.totalElements
        )
        .setIn(['searchPatients', 'queryParameters', 'searchTerms'], '')
        .setIn(['searchPatients', 'queryParameters', 'searchType'], 'name')
        .setIn(['searchPatients', 'queryParameters', 'includeInactive'], false)
        .set('loading', false);
    case SEARCH_PATIENTS_ERROR:
      return state.set('error', action.error).set('loading', false);
    default:
      return state;
  }
}

export default patientsReducer;
