/*
 * PractitionerAppointments Messages
 *
 * This contains all the text for the PractitionerAppointments component.
 */
import { defineMessages } from 'react-intl';

export default defineMessages({
  header: {
    id: 'ocpui.containers.PractitionerAppointments.header',
    defaultMessage: 'Upcoming Appointments',
  },
  noUpcomingAppointments: {
    id: 'ocpui.containers.PractitionerAppointments.noUpcomingAppointments',
    defaultMessage: 'No appointments found.',
  },
  buttonLabelCreateNew: {
    id: 'ocpui.containers.PractitionerAppointments.buttonLabelCreateNew',
    defaultMessage: 'Add New Appointment',
  },
  showPastAppointments: {
    id: 'ocpui.containers.PractitionerAppointments.checkbox.showPastAppointments',
    defaultMessage: 'Show Past Appointments',
  },
  filterLabel: {
    id: 'ocpui.containers.PractitionerAppointments.checkbox.filterLabel',
    defaultMessage: 'Select a date range to filter',
  },
  dialogTitleOpenEvent: {
    id: 'ocpui.containers.PractitionerAppointments.dialogTitleOpenEvent',
    defaultMessage: 'Confirm Navigation',
  },
  confirmNavigation: {
    id: 'ocpui.containers.PractitionerAppointments.confirmNavigation',
    defaultMessage: 'View Patient Details?',
  },
  dialogButtonLabelOK: {
    id: 'ocpui.containers.PractitionerAppointments.dialogButtonLabelOK',
    defaultMessage: 'OK',
  },
  dialogButtonLabelCancel: {
    id: 'ocpui.containers.PractitionerAppointments.dialogButtonLabelCancel',
    defaultMessage: 'Cancel',
  },
});
