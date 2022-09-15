/*
 *
 * AttestConsentPage actions
 *
 */

import {
  ATTEST_CONSENT,
  ATTEST_CONSENT_ERROR,
  ATTEST_CONSENT_SUCCESS,
  GET_CONSENT,
  GET_CONSENT_ERROR,
  GET_CONSENT_SUCCESS,
  INITIALIZE_ATTEST_CONSENT,
} from './constants';

export function initializeAttestConsentPage() {
  return {
    type: INITIALIZE_ATTEST_CONSENT,
  };
}


export function getConsent(logicalId) {
  return {
    type: GET_CONSENT,
    logicalId,
  };
}

export function getConsentSuccess(consent) {
  return {
    type: GET_CONSENT_SUCCESS,
    consent,
  };
}

export function getConsentError(error) {
  return {
    type: GET_CONSENT_ERROR,
    error,
  };
}

export function attestConsent(logicalId) {
  return {
    type: ATTEST_CONSENT,
    logicalId,
  };
}

export function attestConsentSuccess() {
  return {
    type: ATTEST_CONSENT_SUCCESS,
  };
}

export function attestConsentError(error) {
  return {
    type: ATTEST_CONSENT_ERROR,
    error,
  };
}
