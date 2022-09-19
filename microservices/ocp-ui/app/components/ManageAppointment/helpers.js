import isEmpty from 'lodash/isEmpty';

export function mapToEditParticipants(participants) {
  if (!isEmpty(participants)) {
    return participants
      .map((participant) => {
        const {
          participationStatusCode,
          actorName,
          participantRequiredSystem,
          participationStatusSystem,
          participationTypeDisplay,
          participationTypeCode,
          participationTypeSystem,
          participationStatusDisplay,
          participantRequiredDisplay,
          actorReference,
          participantRequiredCode,
        } = participant;
        return ({
          display: actorName,
          participantRequiredCode,
          participantRequiredDisplay,
          participantRequiredSystem,
          participantStatusCode: participationStatusCode,
          participantStatusDisplay: participationStatusDisplay,
          participantStatusSystem: participationStatusSystem,
          participationTypeCode,
          participationTypeDisplay,
          participationTypeSystem,
          reference: actorReference,
        });
      });
  }
  return [];
}

export function convertDateTimeArrayToTime(dateArray) {
  let timeStr = '';
  if (dateArray && dateArray.length >= 4) {
    const hh = padHourOrMinute(dateArray[3]);
    const mm = padHourOrMinute(dateArray[4]);
    timeStr = `${hh}:${mm}`;
  }
  return timeStr;
}

export function setAppointmentTime(timeStr, dateStr) {
  const timeArray = timeStr && timeStr.split(':');
  const appointmentDate = new Date(dateStr);
  if (timeArray.length > 0) {
    appointmentDate.setHours(timeArray[0], timeArray[1]);
  }
  return appointmentDate;
}

function padHourOrMinute(timeEntry) {
  return parseInt(timeEntry, 10) <= 9 ? '0'.concat(timeEntry) : timeEntry;
}
