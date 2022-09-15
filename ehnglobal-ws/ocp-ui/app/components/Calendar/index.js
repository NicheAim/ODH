/**
 *
 * Calendar
 *
 */

import isUndefined from 'lodash/isUndefined';
import moment from 'moment';
import PropTypes from 'prop-types';
import React from 'react';
import BigCalendar from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';

// Setup the localizer by providing the moment (or globalize) Object
// to the correct localizer.
BigCalendar.momentLocalizer(moment);
const allViews = ['month', 'day', 'week'];

// TODO: Get the translations from messages.js
const messages = {
  next: 'Next',
  previous: 'Previous',
  today: 'Today',
  month: 'Month',
  day: 'Day',
  week: 'Week',
};

function Calendar(props) { // eslint-disable-line react/prefer-stateless-function
  const { elements, manageAppointmentUrl } = props;
  let appointments = {};
  if (!isUndefined(elements) && props.elements !== null) {
    appointments = elements.map((element) => {
      const appointment = {};
      appointment.id = element.logicalId;
      appointment.title = element.description;
      // appointment.description = element.description;
      appointment.start = new Date(element.start[0], element.start[1] - 1, element.start[2], element.start[3], element.start[4]);
      appointment.end = new Date(element.end[0], element.end[1] - 1, element.end[2], element.end[3], element.end[4]);
      appointment.isOutlookAppointment = false;
      appointment.editUrl = `${manageAppointmentUrl}/${element.logicalId}`;
      appointment.patientId = element.patientId;
      appointment.status = element.statusCode;
      appointment.patientName = element.patientName;
      appointment.myResponse = element.requesterParticipationStatusCode;
      appointment.allParticipantNames = element.participantName;
      appointment.organizerName = element.creatorName;
      appointment.canEdit = element.canEdit;
      return appointment;
    });
  }

  if (!isUndefined(props.outlookElements) && props.outlookElements !== null) {
    const outlookAppointments = props.outlookElements.map((element) => {
      const outlookAppointment = {};
      outlookAppointment.id = element.calUid;
      outlookAppointment.title = element.subject;
      // outlookAppointment.description = element.subject;
      outlookAppointment.start = new Date(element.start[0], element.start[1] - 1, element.start[2], element.start[3], element.start[4]);
      outlookAppointment.end = new Date(element.end[0], element.end[1] - 1, element.end[2], element.end[3], element.end[4]);
      outlookAppointment.isOutlookAppointment = true;
      outlookAppointment.myResponse = element.myResponse;
      outlookAppointment.allParticipantNames = element.allAttendeeName;
      outlookAppointment.organizerName = element.organizerName;
      outlookAppointment.requiredParticipantNames = element.requiredAttendeeName;
      outlookAppointment.optionalParticipantNames = element.optionalAttendeeName;
      return outlookAppointment;
    });
    appointments.push(...outlookAppointments);
  }

  return (
    <div style={{ height: 800 }}>
      <BigCalendar
        popup
        selectable
        onDoubleClickEvent={(appointment) => props.handleDoubleClickEvent(appointment, appointment.patientId)}
        events={appointments}
        defaultView="week"
        views={allViews}
        step={30}
        timeslots={4}
        showMultiDayTimes
        defaultDate={new Date()}
        messages={messages}
        tooltipAccessor={(appointment) => props.tooltipAccessor(appointment)}
        eventPropGetter={
          (appointment) => {
            const newStyle = {
              backgroundColor: '#009688',
              color: 'white',
              borderRadius: '0px',
              border: 'none',
            };

            if (appointment.isOutlookAppointment) {
              newStyle.color = 'black';
              newStyle.backgroundColor = '#2D7BC0';
              if (appointment.myResponse === 'NoResponseReceived') {
                newStyle.backgroundColor = '#CDE6F7';
              }
            }
            if (!appointment.isOutlookAppointment && appointment.myResponse === 'needs-action') {
              newStyle.backgroundColor = '#E3999D';
              newStyle.color = 'black';
            }

            if (!appointment.isOutlookAppointment && appointment.myResponse === 'tentative') {
              newStyle.backgroundColor = '#9868b9';
              newStyle.color = 'black';
            }

            return {
              className: '',
              style: newStyle,
            };
          }
        }
      />
    </div>
  );
}

Calendar.propTypes = {
  elements: PropTypes.array,
  outlookElements: PropTypes.array,
  manageAppointmentUrl: PropTypes.string,
  handleDoubleClickEvent: PropTypes.func,
  tooltipAccessor: PropTypes.func,
};

export default Calendar;
