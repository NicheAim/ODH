/*
 *
 * LaunchPage actions
 *
 */

import {
  GET_METADATA,
  GET_METADATA_SUCCESS,
  GET_METADATA_ERROR,
} from './constants';

export function getMetadata(iss, launch, config) {
  return {
    type: GET_METADATA,
    iss,
    launch,
    config,
  };
}

export function getMetadataSuccess(metadata) {
  return {
    type: GET_METADATA_SUCCESS,
    metadata,
  };
}

export function getMetadataError(error) {
  return {
    type: GET_METADATA_ERROR,
    error,
  };
}
