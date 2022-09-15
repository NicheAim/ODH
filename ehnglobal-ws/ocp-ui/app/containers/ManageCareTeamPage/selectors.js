import { createSelector } from 'reselect';

/**
 * Direct selector to the manageCareTeamPage state domain
 */
const selectManageCareTeamPageDomain = (state) => state.get('manageCareTeamPage');

/**
 * Other specific selectors
 */

const makeSelectCareTeam = () => createSelector(
  selectManageCareTeamPageDomain,
  (substate) => substate && substate.get('careTeam'),
);

const makeSelectEventTypes = () => createSelector(
  selectManageCareTeamPageDomain,
  (substate) => substate && substate.get('eventTypes'),
);

export {
  selectManageCareTeamPageDomain,
  makeSelectCareTeam,
  makeSelectEventTypes,
};
