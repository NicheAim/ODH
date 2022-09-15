import { createSelector } from 'reselect';

/**
 * Direct selector to the assignLocationToPractitionerPage state domain
 */
const selectAssignLocationToPractitionerPageDomain = (state) => state.get('assignLocationToPractitionerPage');

/**
 * Other specific selectors
 */

const makeSelectPractitionLocations = () => createSelector(
  selectAssignLocationToPractitionerPageDomain,
  (substate) => substate.get('data').toJS(),
);

const makeSelectQueryLoading = () => createSelector(
  selectAssignLocationToPractitionerPageDomain,
  (substate) => substate.get('loading'),
);

const makeSelectQueryError = () => createSelector(
  selectAssignLocationToPractitionerPageDomain,
  (substate) => substate.get('error'),
);

const makeSelectCurrentPage = () => createSelector(
  selectAssignLocationToPractitionerPageDomain,
  (substate) => substate.get('currentPage'),
);

const makeSelectTotalNumberOfPages = () => createSelector(
  selectAssignLocationToPractitionerPageDomain,
  (substate) => substate.get('totalNumberOfPages'),
);

const makeSelectIncludeInactive = () => createSelector(
  selectAssignLocationToPractitionerPageDomain,
  (substate) => substate.get('includeInactive'),
);

export {
  makeSelectPractitionLocations,
  makeSelectQueryLoading,
  makeSelectQueryError,
  makeSelectCurrentPage,
  makeSelectTotalNumberOfPages,
  makeSelectIncludeInactive,
};
