/*
 *
 * PractitionerAppointments reducer
 *
 */

import { fromJS } from 'immutable';
import find from 'lodash/find';
import {
  ACCEPT_PRACTITIONER_APPOINTMENT_SUCCESS,
  CANCEL_PRACTITIONER_APPOINTMENT_SUCCESS,
  DATA,
  DECLINE_PRACTITIONER_APPOINTMENT_SUCCESS,
  GET_PRACTITIONER_APPOINTMENTS,
  GET_PRACTITIONER_APPOINTMENTS_ERROR,
  GET_PRACTITIONER_APPOINTMENTS_SUCCESS,
  LOADING,
  STATUS_CODE_CANCELLED,
  TENTATIVE_PRACTITIONER_APPOINTMENT_SUCCESS,
} from './constants';

const initialState = fromJS({
  loading: false,
  query: null,
  showPastAppointments: false,
});

function practitionerAppointmentsReducer(state = initialState, action) {
  switch (action.type) {
    case GET_PRACTITIONER_APPOINTMENTS:
      return state
        .set(LOADING, true)
        .set('showPastAppointments', action.query.showPastAppointments)
        .set(DATA, null);
    case GET_PRACTITIONER_APPOINTMENTS_SUCCESS:
      return state
        .set(LOADING, false)
        .set(DATA, fromJS(action.practitionerAppointmentsPage || {}));
    case GET_PRACTITIONER_APPOINTMENTS_ERROR:
      return state.set(LOADING, false);
    case CANCEL_PRACTITIONER_APPOINTMENT_SUCCESS: {
      const data = state.get(DATA).toJS();
      find(data.elements, { logicalId: action.id }).statusCode = STATUS_CODE_CANCELLED;
      return state.set(DATA, fromJS(data));
    }
    case ACCEPT_PRACTITIONER_APPOINTMENT_SUCCESS: {
      const data = state.get(DATA).toJS();
      return state.set(DATA, fromJS(data));
    }
    case DECLINE_PRACTITIONER_APPOINTMENT_SUCCESS: {
      const data = state.get(DATA).toJS();
      return state.set(DATA, fromJS(data));
    }
    case TENTATIVE_PRACTITIONER_APPOINTMENT_SUCCESS: {
      const data = state.get(DATA).toJS();
      return state.set(DATA, fromJS(data));
    }
    default:
      return state;
  }
}

export default practitionerAppointmentsReducer;
