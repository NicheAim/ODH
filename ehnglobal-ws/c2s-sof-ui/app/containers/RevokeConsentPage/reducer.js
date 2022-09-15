/*
 *
 * RevokeConsentPage reducer
 *
 */


import { fromJS } from 'immutable';
import {
  GET_CONSENT_ERROR,
  GET_CONSENT_SUCCESS,
  INITIALIZE_REVOKE_CONSENT,
  REVOKE_CONSENT,
  REVOKE_CONSENT_ERROR,
  REVOKE_CONSENT_SUCCESS,
} from './constants';

const initialState = fromJS({
  error: false,
  consent: null,
  isSubmitting: false,
});

function RevokeConsentPageReducer(state = initialState, action) {
  switch (action.type) {
    case INITIALIZE_REVOKE_CONSENT:
      return initialState;
    case GET_CONSENT_SUCCESS:
      return state
        .set('consent', action.consent);
    case GET_CONSENT_ERROR:
      return state
        .set('error', action.error);
    case REVOKE_CONSENT:
      return state.set('isSubmitting', true);
    case REVOKE_CONSENT_SUCCESS:
      return state.set('isSubmitting', false);
    case REVOKE_CONSENT_ERROR:
      return state.set('isSubmitting', false);
    default:
      return state;
  }
}

export default RevokeConsentPageReducer;

