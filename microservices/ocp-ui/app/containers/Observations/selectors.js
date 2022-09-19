import { createSelector } from 'reselect';

const selectObservationsDomain = (state) => state.get('observations');

const makeSelectObservations = () =>
  createSelector(
    selectObservationsDomain,
    (substate) => substate.get('observations') && substate.get('observations').toJS(),
  );

const makeSelectLoading = () =>
  createSelector(
    selectObservationsDomain,
    (substate) => substate.get('loading') && substate.get('loading'),
  );

export {
  makeSelectObservations,
  makeSelectLoading,
};
