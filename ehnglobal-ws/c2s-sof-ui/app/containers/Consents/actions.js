/*
 *
 * Consents actions
 *
 */

import {
  GET_CONSENTS,
  GET_CONSENTS_ERROR,
  GET_CONSENTS_SUCCESS,
  INITIALIZE_CONSENTS,
  GET_CONSENT,
  GET_CONSENT_ERROR,
  GET_CONSENT_SUCCESS,
  DELETE_CONSENT,
  DELETE_CONSENT_ERROR,
  DELETE_CONSENT_SUCCESS,
} from 'containers/Consents/constants';

export function initializeConsents(consents) {
  return {
    type: INITIALIZE_CONSENTS,
    consents,
  };
}

export function getConsents(pageNumber) {
  return {
    type: GET_CONSENTS,
    pageNumber,
  };
}

export function getConsentsSuccess(consents) {
  return {
    type: GET_CONSENTS_SUCCESS,
    consents,
  };
}

export function getConsentsError(error) {
  return {
    type: GET_CONSENTS_ERROR,
    error,
  };
}

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

export function deleteConsent(consent) {
  return {
    type: DELETE_CONSENT,
    consent,
  };
}

export function deleteConsentSuccess(consent) {
  return {
    type: DELETE_CONSENT_SUCCESS,
    consent,
  };
}

export function deleteConsentError(error) {
  return {
    type: DELETE_CONSENT_ERROR,
    error,
  };
}
