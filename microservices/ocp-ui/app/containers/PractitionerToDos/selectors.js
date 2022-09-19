import { createSelector } from 'reselect';

/**
 * Direct selector to the practitionerToDos state domain
 */
const selectPractitionerToDosDomain = (state) => state.get('practitionerToDos');

/**
 * Other specific selectors
 */
const makeSelectPractitionerToDos = () => createSelector(
  selectPractitionerToDosDomain,
  (substate) => substate.get('data').toJS()
);

const makeSelectSearchLoading = () => createSelector(
  selectPractitionerToDosDomain,
  (substate) => substate.get('loading'),
);


export {
  makeSelectPractitionerToDos,
  makeSelectSearchLoading,
};
