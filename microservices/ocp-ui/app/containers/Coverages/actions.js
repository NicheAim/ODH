/*
 *
 * Coverages actions
 *
 */
import {
  SAVE_COVERAGE,
  GET_COVERAGE,
  GET_COVERAGE_SUCCESS,
  GET_COVERAGE_ERROR,
} from './constants';

export function getSaveCoverageAction(coverageData, handleSubmitting) {
  return {
    type: SAVE_COVERAGE,
    coverageData,
    handleSubmitting,
  };
}


export function getCoverageAction(pageNumber) {
  return {
    type: GET_COVERAGE,
    pageNumber,
  };
}

export function getCoverageSuccess(coverages) {
  return {
    type: GET_COVERAGE_SUCCESS,
    coverages,
  };
}


export function getCoverageError(error) {
  return {
    type: GET_COVERAGE_ERROR,
    error,
  };
}
