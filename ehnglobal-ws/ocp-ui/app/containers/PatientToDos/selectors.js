import { createSelector } from 'reselect';

/**
 * Direct selector to the patientToDos state domain
 */
const selectPatientToDosDomain = (state) => state.get('patientToDos');

/**
 * Other specific selectors
 */


/**
 * Default selector used by PatientToDos
 */
const makeSelectPatientToDos = () => createSelector(
  selectPatientToDosDomain,
  (substate) => substate && substate.get('data').toJS()
);

const makeSelectPatientToDoMainTask = () => createSelector(
  selectPatientToDosDomain,
  (substate) => substate && substate.get('toDoMainTask').toJS()
);


const makeSelectSearchLoading = () => createSelector(
  selectPatientToDosDomain,
  (substate) => substate.get('loading'),
);


const makeSelectToDoRelatedCommunications = () => createSelector(
  selectPatientToDosDomain,
  (substate) => substate && substate.get('communications') && substate.get('communications').toJS(),
);

export {
  makeSelectPatientToDos,
  makeSelectPatientToDoMainTask,
  makeSelectSearchLoading,
  makeSelectToDoRelatedCommunications,
};
