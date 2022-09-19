import { createSelector } from 'reselect';

const selectManageObservationPageDomain = (state) => state.get('manageObservationPage');

/**
 * Specific selectors
 */
export const makeSelectMedicalComplexities = () => createSelector(
  selectManageObservationPageDomain,
  (substate) => substate && substate.get('medicalComplexities')
);

export const makeSelectSocialComplexities = () => createSelector(
  selectManageObservationPageDomain,
  (substate) => substate && substate.get('socialComplexities')
);

export const makeSelectServiceIntegrationLevels = () => createSelector(
  selectManageObservationPageDomain,
  (substate) => substate && substate.get('serviceIntegrationLevels')
);

export const makeSelectObservation = () => createSelector(
  selectManageObservationPageDomain,
  (substate) => substate && substate.get('observation')
);
