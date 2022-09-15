/*
 *
 * AttestConsentPage reducer
 *
 */

import { fromJS } from 'immutable';
import {
  ATTEST_CONSENT,
  ATTEST_CONSENT_ERROR,
  ATTEST_CONSENT_SUCCESS,
  GET_CONSENT_ERROR,
  GET_CONSENT_SUCCESS,
  INITIALIZE_ATTEST_CONSENT,
} from './constants';

const initialState = fromJS({
  error: false,
  consent: null,
  isSubmitting: false,
});

function attestConsentPageReducer(state = initialState, action) {
  switch (action.type) {
    case INITIALIZE_ATTEST_CONSENT:
      return initialState;
    case GET_CONSENT_SUCCESS:
      return state
        .set('consent', action.consent);
    case GET_CONSENT_ERROR:
      return state
        .set('error', action.error);
    case ATTEST_CONSENT:
      return state.set('isSubmitting', true);
    case ATTEST_CONSENT_SUCCESS:
      return state.set('isSubmitting', false);
    case ATTEST_CONSENT_ERROR:
      return state.set('isSubmitting', false);
    default:
      return state;
  }
}

export default attestConsentPageReducer;
