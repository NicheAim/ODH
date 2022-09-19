import { createSelector } from 'reselect';

/**
 * Direct selector to the communication state domain
 */
const selectCommunicationDomain = (state) => state.get('communications');

/**
 * Other specific selectors
 */

const makeSelectCommunications = () => createSelector(
  selectCommunicationDomain,
  (substate) => substate && substate.toJS(),
);

export default makeSelectCommunications;
export {
  selectCommunicationDomain,
};
