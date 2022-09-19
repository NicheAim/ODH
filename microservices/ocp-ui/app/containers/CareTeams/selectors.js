import { createSelector } from 'reselect';

/**
 * Direct selector to the careTeams state domain
 */
const selectCareTeamsDomain = (state) => state.get('careTeams');

/**
 * Other specific selectors
 */


/**
 * Default selector used by CareTeams
 */

const makeSelectCareTeams = () => createSelector(
  selectCareTeamsDomain,
  (substate) => substate && substate.toJS(),
);

export default makeSelectCareTeams;
export {
  selectCareTeamsDomain,
};
