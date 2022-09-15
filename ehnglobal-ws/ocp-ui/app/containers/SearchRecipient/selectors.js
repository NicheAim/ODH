import { createSelector } from 'reselect';

/**
 * Direct selector to the searchRecipient state domain
 */
const selectSearchRecipientDomain = (state) => state.get('searchRecipient');

/**
 * Other specific selectors
 */


/**
 * Default selector used by SearchRecipient
 */

const makeSelectRecipients = () => createSelector(
  selectSearchRecipientDomain,
  (substate) => substate.get('recipients').toJS()
);

const makeSelectSelectedRecipients = () => createSelector(
  selectSearchRecipientDomain,
  (substate) => substate && substate.get('selectedRecipients').toJS()
);

export {
  makeSelectRecipients,
  makeSelectSelectedRecipients,
};
