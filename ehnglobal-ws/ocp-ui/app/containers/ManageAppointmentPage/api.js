import isEmpty from 'lodash/isEmpty';
import find from 'lodash/find';
import isUndefined from 'lodash/isUndefined';
import { BASE_APPOINTMENTS_API_URL, getEndpoint } from 'utils/endpointService';
import request from 'utils/request';

const baseEndpoint = getEndpoint(BASE_APPOINTMENTS_API_URL);
const headers = {
  'Content-Type': 'application/json',
};

export function saveAppointment(appointmentFormData) {
  if (appointmentFormData.appointmentId) {
    return updateAppointment(appointmentFormData);
  }
  return createAppointment(appointmentFormData);
}

export function getAppointmentApi(appointmentId) {
  const requestURL = `${baseEndpoint}/${appointmentId}`;
  return request(requestURL);
}

export function getAppointmentById(appointments, appointmentId) {
  if (!isEmpty(appointments)) {
    return find(appointments, { logicalId: appointmentId });
  }
  return null;
}

export function createAppointment(appointmentFormData) {
  const requestUrl = `${baseEndpoint}`;
  const body = JSON.stringify(mapToBackendAppointment(appointmentFormData, true));
  return request(requestUrl, {
    method: 'POST',
    headers,
    body,
  });
}

function updateAppointment(appointmentFormData) {
  const appointmentId = appointmentFormData.appointmentId;
  const requestURL = `${baseEndpoint}/${appointmentId}`;
  return request(requestURL, {
    method: 'PUT',
    body: JSON.stringify(mapToBackendAppointment(appointmentFormData, false)),
    headers: {
      'Content-Type': 'application/json',
    },
  });
}

function mapToBackendAppointment(appointmentFormData, isCreate) {
  const { appointmentStatus, appointmentType, date, creatorRequired, description, startTime, endTime, participants, patientId, patientName, practitionerId, practitionerName } = appointmentFormData;
  const appointmentDataToSubmit = {};
  if (!isUndefined(creatorRequired)) {
    appointmentDataToSubmit.creatorRequired = creatorRequired;
  }

  if (!isUndefined(description)) {
    appointmentDataToSubmit.description = description;
  }

  if (!isUndefined(appointmentType)) {
    appointmentDataToSubmit.typeCode = appointmentType[0].code;
    appointmentDataToSubmit.typeSystem = appointmentType[0].system;
    appointmentDataToSubmit.typeDisplay = appointmentType[0].display;
  }

  if (!isUndefined(date) && !isUndefined(startTime)) {
    appointmentDataToSubmit.start = getDateTimeString(date, startTime);
  }
  if (!isUndefined(date) && !isUndefined(endTime)) {
    appointmentDataToSubmit.end = getDateTimeString(date, endTime);
  }

  // Participants
  if (!isUndefined(participants) && !isEmpty(participants)) {
    appointmentDataToSubmit.participant = mapToBffParticipants(participants);
  }

  if (isCreate) {
    appointmentDataToSubmit.creatorReference = `Practitioner/${practitionerId}`;
    appointmentDataToSubmit.creatorName = practitionerName;

    const patientParticipant = [];
    const patientReference = `Patient/${patientId}`;
    patientParticipant.push({
      actorReference: patientReference,
      actorName: patientName,
    });
    if (!isUndefined(appointmentDataToSubmit.participant) && !isEmpty(appointmentDataToSubmit.participant)) {
      patientParticipant.map((participant) => appointmentDataToSubmit.participant.push(participant));
    } else {
      appointmentDataToSubmit.participant = patientParticipant;
    }
  } else {
    appointmentDataToSubmit.statusCode = appointmentStatus;
  }

  return appointmentDataToSubmit;
}

function mapToBffParticipants(participants) {
  if (!isEmpty(participants)) {
    return participants
      .map((participant) => ({
        participationTypeCode: participant.participationTypeCode,
        participationTypeDisplay: participant.participationTypeDisplay,
        participationTypeSystem: participant.participationTypeSystem,
        participantRequiredCode: participant.participantRequiredCode,
        participantRequiredDisplay: participant.participantRequiredDisplay,
        participantRequiredSystem: participant.participantRequiredSystem,
        participationStatusCode: participant.participationStatusCode,
        participationStatusDisplay: participant.participationStatusDisplay,
        participationStatusSystem: participant.participationStatusSystem,
        actorReference: participant.reference,
        actorName: participant.display,
      }));
  }
  return [];
}

function toDoubleChars(number) {
  if (number < 10) {
    return `0${number}`;
  }
  return number;
}

function getDateString(date) {
  if (!isUndefined(date)) {
    const selectedDate = new Date(date);
    const year = selectedDate.getFullYear();
    // Note: 0=January, 1=February etc.
    const month = toDoubleChars(selectedDate.getMonth() + 1);
    const day = toDoubleChars(selectedDate.getDate());
    return `${year}-${month}-${day}`;
  }
  return null;
}

function getDateTimeString(date, time) {
  const appointmentDateString = getDateString(date);
  const hours = toDoubleChars(new Date(time).getHours());
  const minutes = toDoubleChars(new Date(time).getMinutes());
  return `${appointmentDateString}T${hours}:${minutes}:00.00`;
}
