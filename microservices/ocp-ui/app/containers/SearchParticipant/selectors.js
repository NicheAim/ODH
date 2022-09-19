import { createSelector } from 'reselect';

/**
 * Direct selector to the searchParticipant state domain
 */
const selectSearchParticipantDomain = (state) => state.get('searchParticipant');

/**
 * Other specific selectors
 */


/**
 * Default selector used by SearchParticipant
 */

const makeSelectSearchParticipantResults = () => createSelector(
  selectSearchParticipantDomain,
  (substate) => substate.get('searchParticipantResult').toJS()
);

const makeSelectSelectedParticipants = () => createSelector(
  selectSearchParticipantDomain,
  (substate) => substate && substate.get('selectedParticipants').toJS()
);

export {
  selectSearchParticipantDomain,
  makeSelectSearchParticipantResults,
  makeSelectSelectedParticipants,
};
