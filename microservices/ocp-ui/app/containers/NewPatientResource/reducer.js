/*
 *
 * NewPatientResource reducer
 *
 */

import { fromJS } from 'immutable';
import isEmpty from 'lodash/isEmpty';
import {
  FIND_PATIENT,
  FIND_PATIENT_ERROR,
  FIND_PATIENT_SUCCESS,
  INITIALIZE_FIND_PATIENT,
} from './constants';

const initialState = fromJS({
  loading: false,
  patient: null,
  queryParameters: {
    firstName: null,
    lastName: null,
    birthDate: null,
  },
  exists: false,
  error: null,
});

function newPatientResourceReducer(state = initialState, action) {
  switch (action.type) {
    case INITIALIZE_FIND_PATIENT:
      return initialState;
    case FIND_PATIENT:
      return state
        .set('loading', true)
        .set('patient', null)
        .set('exists', false)
        .set('error', false)
        .setIn(['queryParameters', 'firstName'], action.firstName)
        .setIn(['queryParameters', 'lastName'], action.lastName)
        .setIn(['queryParameters', 'birthDate'], action.birthDate);
    case FIND_PATIENT_SUCCESS:
      return state
        .set('error', false)
        .set('loading', false)
        .set('exists', !isEmpty(action.patient))
        .set('patient', fromJS(action.patient));
    case FIND_PATIENT_ERROR:
      return state
        .set('loading', false)
        .set('exists', false)
        .set('error', action.error);
    default:
      return state;
  }
}

export default newPatientResourceReducer;
