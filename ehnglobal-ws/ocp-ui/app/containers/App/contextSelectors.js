import { createSelector } from 'reselect';

/**
 * Direct selector to the context state domain
 */
const selectContextDomain = (state) => state.get('context');

/**
 * Other specific selectors
 */


/**
 * Default selector used by Context
 */

const makeSelectContext = () => createSelector(
  selectContextDomain,
  (substate) => substate.toJS(),
);

const makeSelectPatient = () => createSelector(
  selectContextDomain,
  (substate) => substate.get('patient') && substate.get('patient').toJS(),
);

const makeSelectObservation = () => createSelector(
  selectContextDomain,
  (substate) => substate.get('observation') && substate.get('observation').toJS(),
)

const makeSelectOrganization = () => createSelector(
  selectContextDomain,
  (substate) => substate.get('organization') && substate.get('organization').toJS(),
);

const makeSelectLocation = () => createSelector(
  selectContextDomain,
  (substate) => substate.get('location') && substate.get('location').toJS(),
);

const makeSelectPractitioner = () => createSelector(
  selectContextDomain,
  (substate) => substate.get('practitioner') && substate.get('practitioner').toJS(),
);

const makeSelectUser = () => createSelector(
  selectContextDomain,
  (substate) => substate.get('user') && substate.get('user').toJS(),
);


const makeSelectSubscriptionOptions = () => createSelector(
  selectContextDomain,
  (substate) => substate && substate.get('subscriptionOptions').toJS(),
);

export default makeSelectContext;

export {
  selectContextDomain,
  makeSelectPatient,
  makeSelectOrganization,
  makeSelectLocation,
  makeSelectObservation,
  makeSelectUser,
  makeSelectPractitioner,
  makeSelectSubscriptionOptions,
};
