import { createSelector } from 'reselect';

/**
 * Direct selector to the tasks state domain
 */
const selectAttachmentsDomain = (state) => state.get('attachments');

/**
 * Other specific selectors
 */

/**
 * Default selector used by Tasks
 */

const makeSelectAttachments = () =>
  createSelector(
    selectAttachmentsDomain,
    (substate) => substate && substate.toJS()
  );

export { makeSelectAttachments };
