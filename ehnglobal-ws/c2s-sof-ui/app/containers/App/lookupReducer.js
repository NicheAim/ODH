import { fromJS } from 'immutable';

import {
  CONSENT_ACTION,
  CONSENT_CATEGORY,
  CONSENT_STATE_CODES,
  GET_LOOKUPS,
  GET_LOOKUPS_ERROR,
  GET_LOOKUPS_SUCCESS,
  PURPOSE_OF_USE,
  SECURITY_LABEL,
  SECURITY_ROLE_TYPE,
} from './constants';

// The initial state of the lookup
const initialState = fromJS({
  loading: false,
  error: false,
  // Consent Resource Lookups - Start
  CONSENT_STATE_CODES: [],
  CONSENT_CATEGORY: [],
  SECURITY_LABEL: [],
  SECURITY_ROLE_TYPE: [],
  CONSENT_ACTION: [],
  PURPOSE_OF_USE: [],
  // Consent Resource Lookups - End
});

function lookupReducer(state = initialState, action) {
  switch (action.type) {
    case GET_LOOKUPS:
      return state
        .set('loading', true)
        .set('error', false);
    case GET_LOOKUPS_SUCCESS:
      return state
      // Consent Resource Lookups - Start
        .set(CONSENT_STATE_CODES, fromJS((action.lookups && action.lookups.consentStateCodes) || state.get(CONSENT_STATE_CODES)))
        .set(CONSENT_CATEGORY, fromJS((action.lookups && action.lookups.consentCategory) || state.get(CONSENT_CATEGORY)))
        .set(SECURITY_LABEL, fromJS((action.lookups && action.lookups.securityLabel) || state.get(SECURITY_LABEL)))
        .set(SECURITY_ROLE_TYPE, fromJS((action.lookups && action.lookups.securityRoleType) || state.get(SECURITY_ROLE_TYPE)))
        .set(CONSENT_ACTION, fromJS((action.lookups && action.lookups.consentAction) || state.get(CONSENT_ACTION)))
        .set(PURPOSE_OF_USE, fromJS((action.lookups && action.lookups.purposeOfUse) || state.get(PURPOSE_OF_USE)))
        // Consent Resource Lookups - End
        .set('loading', false);
    case GET_LOOKUPS_ERROR:
      return state
        .set('error', action.error)
        .set('loading', false);
    default:
      return state;
  }
}

export default lookupReducer;
