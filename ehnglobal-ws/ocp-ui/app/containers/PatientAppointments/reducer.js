/*
 *
 * PatientAppointments reducer
 *
 */

import { fromJS } from 'immutable';
import find from 'lodash/find';
import {
  ACCEPT_PATIENT_APPOINTMENT_SUCCESS,
  CANCEL_PATIENT_APPOINTMENT_SUCCESS,
  DATA,
  DECLINE_PATIENT_APPOINTMENT_SUCCESS,
  GET_PATIENT_APPOINTMENTS,
  GET_PATIENT_APPOINTMENTS_ERROR,
  GET_PATIENT_APPOINTMENTS_SUCCESS,
  LOADING,
  STATUS_CODE_CANCELLED,
  TENTATIVE_PATIENT_APPOINTMENT_SUCCESS,
  GET_APPOINTMENT_RELATED_COMMUNICATIONS,
  GET_APPOINTMENT_RELATED_COMMUNICATIONS_SUCCESS,
  GET_APPOINTMENT_RELATED_COMMUNICATIONS_ERROR,
} from './constants';

const initialState = fromJS({
  loading: false,
  query: null,
  showPastAppointments: false,
  communicationLoading: false,
  communicationError: false,
  communications: null,
});

function patientAppointmentsReducer(state = initialState, action) {
  switch (action.type) {
    case GET_PATIENT_APPOINTMENTS:
      return state
        .set(LOADING, true)
        .set('showPastAppointments', action.query.showPastAppointments)
        .set(DATA, null);
    case GET_PATIENT_APPOINTMENTS_SUCCESS:
      return state
        .set(LOADING, false)
        .set(DATA, fromJS(action.patientAppointmentsPage || {}));
    case GET_PATIENT_APPOINTMENTS_ERROR:
      return state.set(LOADING, false);
    case CANCEL_PATIENT_APPOINTMENT_SUCCESS: {
      const data = state.get(DATA).toJS();
      find(data.elements, { logicalId: action.id }).statusCode = STATUS_CODE_CANCELLED;
      return state.set(DATA, fromJS(data));
    }
    case ACCEPT_PATIENT_APPOINTMENT_SUCCESS: {
      const data = state.get(DATA).toJS();
      return state.set(DATA, fromJS(data));
    }
    case DECLINE_PATIENT_APPOINTMENT_SUCCESS: {
      const data = state.get(DATA).toJS();
      return state.set(DATA, fromJS(data));
    }
    case TENTATIVE_PATIENT_APPOINTMENT_SUCCESS: {
      const data = state.get(DATA).toJS();
      return state.set(DATA, fromJS(data));
    }
    case GET_APPOINTMENT_RELATED_COMMUNICATIONS:
      return state.set('communicationLoading', true);
    case GET_APPOINTMENT_RELATED_COMMUNICATIONS_SUCCESS:
      return state
        .set('communicationError', false)
        .set('communicationLoading', false)
        .set('communications', fromJS((action.communications) || {}));
    case GET_APPOINTMENT_RELATED_COMMUNICATIONS_ERROR:
      return state
        .set('communicationError', action.error)
        .set('communicationLoading', false);
    default:
      return state;
  }
}

export default patientAppointmentsReducer;
