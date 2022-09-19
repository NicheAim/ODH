/*
 *
 * Attachments actions
 *
 */

import {
  GET_BINARY,
  GET_BINARY_SUCCESS,
  GET_DOCUMENT_REFERENCE,
  GET_DOCUMENT_REFERENCES,
  GET_DOCUMENT_REFERENCES_ERROR,
  GET_DOCUMENT_REFERENCES_SUCCESS,
  GET_DOCUMENT_REFERENCE_SUCCESS,
  INITIALIZE_ATTACHMENTS,
} from './constants';

export function initializeAttachments() {
  return {
    type: INITIALIZE_ATTACHMENTS,
  };
}

export function getDocumentReferences(patientId) {
  return {
    type: GET_DOCUMENT_REFERENCES,
    patientId,
  };
}

export function getDocumentReferencesSuccess(data) {
  return {
    type: GET_DOCUMENT_REFERENCES_SUCCESS,
    responseData: data,
  };
}

export function getAttachmentsError(error) {
  return {
    type: GET_DOCUMENT_REFERENCES_ERROR,
    error,
  };
}

export function getDocumentReference(documentReferenceId) {
  return {
    type: GET_DOCUMENT_REFERENCE,
    documentReferenceId,
  };
}

export function getDocumentReferenceSuccess(data) {
  return {
    type: GET_DOCUMENT_REFERENCE_SUCCESS,
    responseData: data,
  };
}

export function getBinary(binaryId) {
  return {
    type: GET_BINARY,
    binaryId,
  };
}

export function getBinarySuccess(data) {
  return {
    type: GET_BINARY_SUCCESS,
    responseData: data,
  };
}
