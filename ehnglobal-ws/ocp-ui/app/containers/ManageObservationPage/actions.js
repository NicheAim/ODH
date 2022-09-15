import {
  GET_MEDICAL_COMPLEXITIES,
  GET_MEDICAL_COMPLEXITIES_SUCCESS,
  GET_SERVICE_INTEGRATION_LEVELS,
  GET_SERVICE_INTEGRATION_LEVELS_SUCCESS,
  GET_SOCIAL_COMPLEXITIES,
  GET_SOCIAL_COMPLEXITIES_SUCCESS,
  CREATE_OBSERVATION,
  CREATE_OBSERVATION_SUCCESS,
  CREATE_OBSERVATION_ERROR,
  UPDATE_OBSERVATION,
  UPDATE_OBSERVATION_SUCCESS,
  UPDATE_OBSERVATION_ERROR,
  GET_OBSERVATION,
  GET_OBSERVATION_SUCCESS,
  GET_OBSERVATION_ERROR,
  CLEAR_OBSERVATION,
  CLEAR_OBSERVATION_SUCCESS,
} from './constants';

export function getMedicalComplexities() {
  return {
    type: GET_MEDICAL_COMPLEXITIES,
  }
}

export function getMedicalComplexitiesSuccess(medicalComplexities) {
  return {
    type: GET_MEDICAL_COMPLEXITIES_SUCCESS,
    medicalComplexities,
  }
}

export function getServiceIntegrationLevels() {
  return {
    type: GET_SERVICE_INTEGRATION_LEVELS,
  }
}

export function getServiceIntegrationLevelsSuccess(serviceIntegrationLevels) {
  return {
    type: GET_SERVICE_INTEGRATION_LEVELS_SUCCESS,
    serviceIntegrationLevels,
  }
}

export function getSocialComplexities() {
  return {
    type: GET_SOCIAL_COMPLEXITIES,
  }
}

export function getSocialComplexitiesSuccess(socialComplexities) {
  return {
    type: GET_SOCIAL_COMPLEXITIES_SUCCESS,
    socialComplexities,
  }
}

export function createObservation(observation, handleSubmitting) {
  return {
    type: CREATE_OBSERVATION,
    observation,
    handleSubmitting,
  }
}

export function createObservationSuccess(response) {
  return {
    type: CREATE_OBSERVATION_SUCCESS,
    response,
  }
}

export function createObservationError(error) {
  return {
    type: CREATE_OBSERVATION_ERROR,
    error,
  }
}

export function updateObservation(updatedObservation, newObservation, handleSubmitting) {
  return {
    type: UPDATE_OBSERVATION,
    updatedObservation,
    newObservation,
    handleSubmitting,
  }
}

export function updateObservationSuccess(response) {
  return {
    type: UPDATE_OBSERVATION_SUCCESS,
    response,
  }
}

export function updateObservationError(error) {
  return {
    type: UPDATE_OBSERVATION_ERROR,
    error,
  }
}

export function getObservation(id) {
  return {
    type: GET_OBSERVATION,
    id,
  }
}

export function getObservationSuccess(observation) {
  return {
    type: GET_OBSERVATION_SUCCESS,
    observation,
  }
}

export function getObservationError(error) {
  return {
    type: GET_OBSERVATION_ERROR,
    error,
  }
}

export function clearObservation() {
  return {
    type: CLEAR_OBSERVATION,
  }
}

export function clearObservationSuccess() {
  return {
    type: CLEAR_OBSERVATION_SUCCESS,
    observation: null,
  }
}
