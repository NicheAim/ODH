/*
 * PatientAppointments Messages
 *
 * This contains all the text for the PatientAppointments component.
 */
import { defineMessages } from 'react-intl';

export default defineMessages({
  header: {
    id: 'ocpui.containers.PatientAppointments.header',
    defaultMessage: 'Upcoming Appointments',
  },
  noUpcomingAppointments: {
    id: 'ocpui.containers.PatientAppointments.noUpcomingAppointments',
    defaultMessage: 'No appointments found.',
  },
  buttonLabelCreateNew: {
    id: 'ocpui.containers.PatientAppointments.buttonLabelCreateNew',
    defaultMessage: 'New Appointment',
  },
  showPastAppointments: {
    id: 'ocpui.containers.PatientAppointments.checkbox.showPastAppointments',
    defaultMessage: 'Show Past Appointments',
  },
});
