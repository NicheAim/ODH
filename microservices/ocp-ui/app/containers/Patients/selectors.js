import { createSelector } from 'reselect';

/**
 * Direct selector to the patients
 */
const selectPatients = (state) => state.get('patients');

/**
 * Other specific selectors
 */
const makeSelectPatients = () => createSelector(
  selectPatients,
  (substate) => substate.get('patients'),
);

const makeSelectSearchLoading = () => createSelector(
  selectPatients,
  (patientsState) => patientsState.get('loading'),
);

const makeSelectSearchError = () => createSelector(
  selectPatients,
  (patientsState) => patientsState.get('error'),
);

const makeSelectPatientSearchResult = () => createSelector(
  selectPatients,
  (patientsState) => patientsState && patientsState.getIn(['searchPatients', 'result']),
);

const makeSelectPatientTotalElements = () => createSelector(
  selectPatients,
  (patientsState) => patientsState && patientsState.getIn(['searchPatients', 'totalElements']),
);

const makeSelectCurrentPageSize = () => createSelector(
  selectPatients,
  (patientsState) => patientsState.getIn(['searchPatients', 'currentPageSize']),
);

const makeSelectCurrentPage = () => createSelector(
  selectPatients,
  (patientsState) => patientsState.getIn(['searchPatients', 'currentPage']),
);

const makeSelectTotalPages = () => createSelector(
  selectPatients,
  (patientsState) => patientsState.getIn(['searchPatients', 'totalPages']),
);

const makeSelectQuerySearchTerms = () => createSelector(
  selectPatients,
  (patientsState) => patientsState.getIn(['searchPatients', 'queryParameters', 'searchTerms']),
);

const makeSelectQuerySearchType = () => createSelector(
  selectPatients,
  (patientsState) => patientsState.getIn(['searchPatients', 'queryParameters', 'searchType']),
);

const makeSelectQueryIncludeInactive = () => createSelector(
  selectPatients,
  (patientsState) => patientsState.getIn(['searchPatients', 'queryParameters', 'includeInactive']),
);


export default makeSelectPatients;
export {
  selectPatients,
  makeSelectSearchLoading,
  makeSelectSearchError,
  makeSelectPatientSearchResult,
  makeSelectCurrentPageSize,
  makeSelectCurrentPage,
  makeSelectTotalPages,
  makeSelectQuerySearchTerms,
  makeSelectQuerySearchType,
  makeSelectQueryIncludeInactive,
  makeSelectPatientTotalElements,
};
