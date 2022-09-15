import { showNotification } from 'containers/Notification/actions';
import { makeSelectPatientAppointments } from 'containers/PatientAppointments/selectors';
import { makeSelectPractitionerAppointments } from 'containers/PractitionerAppointments/selectors';
import isEmpty from 'lodash/isEmpty';
import isUndefined from 'lodash/isUndefined';
import { goBack } from 'react-router-redux';
import { all, call, put, select, takeLatest } from 'redux-saga/effects';
import {
  getAppointmentSuccess,
} from './actions';
import {
  getAppointmentApi,
  getAppointmentById,
  saveAppointment,
} from './api';
import {
  GET_APPOINTMENT,
  SAVE_APPOINTMENT,
} from './constants';

function* saveAppointmentSaga(action) {
  try {
    yield call(saveAppointment, action.appointment);
    yield put(showNotification(`Successfully ${determineNotificationForAppointmentInPastTense(action.appointment)} the appointment.`));
    yield call(action.handleSubmitting);
    yield put(goBack());
  } catch (error) {
    yield put(showNotification(`Failed to ${determineNotificationForAppointment(action.appointment)} the appointment.`));
    yield call(action.handleSubmitting);
  }
}

function* watchSaveAppointmentSaga() {
  yield takeLatest(SAVE_APPOINTMENT, saveAppointmentSaga);
}

function* getAppointmentSaga({ appointmentId }) {
  try {
    let appointment;
    // Load appointments from store
    let appointmentsSelector = yield select(makeSelectPatientAppointments());
    if (isUndefined(appointmentsSelector)) {
      appointmentsSelector = yield select(makeSelectPractitionerAppointments());
    }
    const appointments = appointmentsSelector && appointmentsSelector.data && appointmentsSelector.data.elements;
    appointment = getAppointmentById(appointments, appointmentId);
    // Fetch from backend if Appointment is not found in the store
    if (isEmpty(appointment)) {
      appointment = yield call(getAppointmentApi, appointmentId);
    }
    yield put(getAppointmentSuccess(appointment));
  } catch (error) {
    yield put(showNotification('No matching appointment found.'));
    yield put(goBack());
  }
}


function* watchGetAppointmentSaga() {
  yield takeLatest(GET_APPOINTMENT, getAppointmentSaga);
}

export function determineNotificationForAppointment(appointmentFormData) {
  let action = 'create';
  if (appointmentFormData.appointmentId) {
    action = 'edit';
  }
  return action;
}

export function determineNotificationForAppointmentInPastTense(appointmentFormData) {
  let action = 'created';
  if (appointmentFormData.appointmentId) {
    action = 'edited';
  }
  return action;
}

export default function* rootSaga() {
  yield all([
    watchSaveAppointmentSaga(),
    watchGetAppointmentSaga(),
  ]);
}
