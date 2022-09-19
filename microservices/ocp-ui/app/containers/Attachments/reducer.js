/*
 *
 * Attachments reducer
 *
 */

import { fromJS } from 'immutable';
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

const initialState = fromJS({
  loading: false,
  data: {},
  documentReference: {},
  binaryReference: '',
  binaryResource: {},
});

export function getSplitReference(value) {
  const splitedValue = value.split('/');
  const splitRe = {
    resourceType: splitedValue[0],
    uuid: splitedValue[1],
  };

  return splitRe;
}

function matchingBinaryUuidFromUrl(url) {
  if (url === undefined) return undefined;

  const regex1 = /(Binary\/.+)/gi;
  const matchedValues = url.match(regex1);

  if (matchedValues !== undefined && matchedValues[0] !== undefined) {
    return getSplitReference(matchedValues[0]).uuid;
  }

  return undefined;
}

function attachmentsReducer(state = initialState, action) {
  switch (action.type) {
    case INITIALIZE_ATTACHMENTS:
      return initialState;
    case GET_DOCUMENT_REFERENCES:
      return state.set('loading', true).set('data', fromJS({}));
    case GET_DOCUMENT_REFERENCES_SUCCESS:
      return state
        .set('loading', false)
        .set('data', fromJS(action.responseData || {}));
    case GET_DOCUMENT_REFERENCES_ERROR:
      return state.set('loading', false).set('error', action.error);
    case GET_DOCUMENT_REFERENCE:
      return state.set('loading', true).set('documentReference', fromJS({}));
    case GET_DOCUMENT_REFERENCE_SUCCESS:
      const attachmentUrl = action.responseData.content[0].attachment.url;
      const matchingBinaryUuid = matchingBinaryUuidFromUrl(attachmentUrl);
      return state
        .set('loading', false)
        .set('documentReference', fromJS(action.responseData || {}))
        .set('binaryReference', fromJS(matchingBinaryUuid || ''));
    case GET_BINARY:
      return state.set('loading', true).set('binaryResource', fromJS({}));
    case GET_BINARY_SUCCESS:
      return state
        .set('loading', false)
        .set('binaryResource', fromJS(action.responseData || {}));
    default:
      return state;
  }
}

export default attachmentsReducer;
