import { createSelector } from 'reselect';

/**
 * Direct selector to the notification state domain
 */
const selectNotificationDomain = (state) => state.get('notification');

/**
 * Other specific selectors
 */


/**
 * Default selector used by Notification
 */

const makeSelectNotification = () => createSelector(
  selectNotificationDomain,
  (substate) => substate.toJS()
);

export default makeSelectNotification;
export {
  selectNotificationDomain,
};
