/*
 *
 * ManageObservationPage reducer
 *
 */
import { fromJS } from 'immutable';
import {
  GET_MEDICAL_COMPLEXITIES_SUCCESS,
  GET_SOCIAL_COMPLEXITIES_SUCCESS,
  GET_SERVICE_INTEGRATION_LEVELS_SUCCESS,
  CREATE_OBSERVATION_SUCCESS,
  CREATE_OBSERVATION_ERROR,
  UPDATE_OBSERVATION_SUCCESS,
  UPDATE_OBSERVATION_ERROR,
  GET_OBSERVATION_SUCCESS,
  GET_OBSERVATION_ERROR,
  CLEAR_OBSERVATION_SUCCESS,
} from './constants';

const initialState = fromJS({
  loading: false,
});

function manageObservationPageReducer(state = initialState, action) {
  switch (action.type) {
    case GET_MEDICAL_COMPLEXITIES_SUCCESS:
      return state
        .set('medicalComplexities', action.medicalComplexities);
    case GET_SOCIAL_COMPLEXITIES_SUCCESS:
      return state
        .set('socialComplexities', action.socialComplexities);
    case GET_SERVICE_INTEGRATION_LEVELS_SUCCESS:
      return state
        .set('serviceIntegrationLevels', action.serviceIntegrationLevels);
    case GET_OBSERVATION_SUCCESS:
    case CLEAR_OBSERVATION_SUCCESS:
      return state
        .set('observation', action.observation);
    case CREATE_OBSERVATION_SUCCESS:
    case UPDATE_OBSERVATION_SUCCESS:
      return state
        .set('response', action.response);
    case GET_OBSERVATION_ERROR:
    case CREATE_OBSERVATION_ERROR:
    case UPDATE_OBSERVATION_ERROR:
      return state
        .set('loading', false)
        .set('data', fromJS([]));
    default:
      return state;
  }
}

export default manageObservationPageReducer;
