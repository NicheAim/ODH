/*
 *
 * ManageConsentPage actions
 *
 */

import { GET_CONSENT, GET_CONSENT_ERROR, GET_CONSENT_SUCCESS, SAVE_CONSENT, SAVE_CONSENT_ERROR } from './constants';


export function getConsent(consentId) {
  return {
    type: GET_CONSENT,
    consentId,
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

export function saveConsent(consentFormData, handleSubmitting) {
  return {
    type: SAVE_CONSENT,
    consentFormData,
    handleSubmitting,
  };
}

export function saveConsentError(error) {
  return {
    type: SAVE_CONSENT_ERROR,
    error,
  };
}
