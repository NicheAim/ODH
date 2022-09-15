/*
 *
 * ManagePatientPage reducer
 *
 */

import { fromJS } from 'immutable';
import {
  SAVE_PATIENT, SAVE_PATIENT_ERROR, GET_PRACTITIONERS_ERROR, GET_PRACTITIONERS_SUCCESS,
} from './constants';

const initialState = fromJS({
  error: false,
  patientFormData: {},
});

function managePatientPageReducer(state = initialState, action) {
  switch (action.type) {
    case SAVE_PATIENT:
      return state
        .set('error', false)
        .set('patientFormData', action.patientFormData);
    case GET_PRACTITIONERS_SUCCESS:
      return state
        .set('error', false)
        .set('practitioners', action.practitioners);
    case SAVE_PATIENT_ERROR:
      return state
        .set('error', action.error);
    case GET_PRACTITIONERS_ERROR:
      return state
        .set('error', action.error);
    default:
      return state;
  }
}

export default managePatientPageReducer;
