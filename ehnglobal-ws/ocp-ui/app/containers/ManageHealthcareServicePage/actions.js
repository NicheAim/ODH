/*
 *
 * ManageHealthcareServicePage actions
 *
 */

import {
  CREATE_HEALTHCARE_SERVICE,
  CREATE_HEALTHCARE_SERVICE_ERROR,
  CREATE_HEALTHCARE_SERVICE_SUCCESS,
  GET_HEALTHCARE_SERVICE,
  GET_HEALTHCARE_SERVICE_ERROR,
  GET_HEALTHCARE_SERVICE_SUCCESS,
  UPDATE_HEALTHCARE_SERVICE,
  UPDATE_HEALTHCARE_SERVICE_ERROR,
  UPDATE_HEALTHCARE_SERVICE_SUCCESS,
} from './constants';


export function createHealthcareService(healthcareServiceFormData, handleSubmitting) {
  return {
    type: CREATE_HEALTHCARE_SERVICE,
    healthcareServiceFormData,
    handleSubmitting,
  };
}

export function createHealthcareServiceError(error) {
  return {
    type: CREATE_HEALTHCARE_SERVICE_ERROR,
    error,
  };
}


export function createHealthcareServiceSuccess(response) {
  return {
    type: CREATE_HEALTHCARE_SERVICE_SUCCESS,
    response,
  };
}

export function updateHealthcareService(healthcareServiceFormData, handleSubmitting) {
  return {
    type: UPDATE_HEALTHCARE_SERVICE,
    healthcareServiceFormData,
    handleSubmitting,
  };
}

export function updateHealthcareServiceError(error) {
  return {
    type: UPDATE_HEALTHCARE_SERVICE_ERROR,
    error,
  };
}


export function updateHealthcareServiceSuccess(response) {
  return {
    type: UPDATE_HEALTHCARE_SERVICE_SUCCESS,
    response,
  };
}

export function getHealthcareServiceById(logicalId) {
  return {
    type: GET_HEALTHCARE_SERVICE,
    logicalId,
  };
}

export function getHealthcareServiceByIdSuccess(healthcareService) {
  return {
    type: GET_HEALTHCARE_SERVICE_SUCCESS,
    healthcareService,
  };
}

export function getHealthcareServiceByIdError(error) {
  return {
    type: GET_HEALTHCARE_SERVICE_ERROR,
    error,
  };
}
