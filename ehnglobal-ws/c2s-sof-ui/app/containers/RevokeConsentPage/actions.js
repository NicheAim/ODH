/*
 *
 * RevokeConsentPage actions
 *
 */

import {
  GET_CONSENT,
  GET_CONSENT_ERROR,
  GET_CONSENT_SUCCESS,
  INITIALIZE_REVOKE_CONSENT,
  REVOKE_CONSENT,
  REVOKE_CONSENT_ERROR,
  REVOKE_CONSENT_SUCCESS,
} from './constants';

export function initializeRevokeConsentPage() {
  return {
    type: INITIALIZE_REVOKE_CONSENT,
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

export function revokeConsent(logicalId) {
  return {
    type: REVOKE_CONSENT,
    logicalId,
  };
}

export function revokeConsentSuccess() {
  return {
    type: REVOKE_CONSENT_SUCCESS,
  };
}

export function revokeConsentError(error) {
  return {
    type: REVOKE_CONSENT_ERROR,
    error,
  };
}
