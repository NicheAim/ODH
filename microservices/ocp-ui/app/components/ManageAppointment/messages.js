/*
 * ManageAppointment Messages
 *
 * This contains all the text for the ManageAppointment component.
 */
import { defineMessages } from 'react-intl';

export default defineMessages({
  title: {
    id: 'ocpui.components.ManageAppointment.title',
    defaultMessage: 'General Information',
  },
  patientName: {
    id: 'ocpui.components.ManageAppointment.patientName',
    defaultMessage: 'Patient',
  },
  participantTitle: {
    id: 'ocpui.components.ManageAppointment.participantTitle',
    defaultMessage: 'Participant',
  },
  removeParticipantBtnLabel: {
    id: 'ocpui.components.ManageAppointment.manageForm.removeParticipantBtnLabel',
    defaultMessage: 'Remove',
  },
  participantTableHeaderName: {
    id: 'ocpui.components.ManageAppointment.manageForm.participantTableHeaderName',
    defaultMessage: 'Name',
  },
  participantTableHeaderService: {
    id: 'ocpui.components.ManageAppointment.manageForm.participantTableHeaderService',
    defaultMessage: 'Service',
  },
  participantTableHeaderLocation: {
    id: 'ocpui.components.ManageAppointment.manageForm.participantTableHeaderLocation',
    defaultMessage: 'Location',
  },
  participantTableHeaderType: {
    id: 'ocpui.components.ManageAppointment.manageForm.participantTableHeaderType',
    defaultMessage: 'Participant Type',
  },
  participantTableHeaderActor: {
    id: 'ocpui.components.ManageAppointment.manageForm.participantTableHeaderActor',
    defaultMessage: 'Actor',
  },
  participantTableHeaderDate: {
    id: 'ocpui.components.ManageAppointment.manageForm.participantTableHeaderDate',
    defaultMessage: 'Date',
  },
  participantTableHeaderStartTime: {
    id: 'ocpui.components.ManageAppointment.manageForm.participantTableHeaderStartTime',
    defaultMessage: 'Start Time',
  },
  participantTableHeaderEndTime: {
    id: 'ocpui.components.ManageAppointment.manageForm.participantTableHeaderEndTime',
    defaultMessage: 'End Time',
  },
  participantTableHeaderAction: {
    id: 'ocpui.components.ManageAppointment.manageForm.participantTableHeaderAction',
    defaultMessage: 'Action',
  },
  participantTableHeaderParticipationType: {
    id: 'ocpui.components.ManageAppointment.manageForm.participantTableHeaderParticipationType',
    defaultMessage: 'Participation Type',
  },
  participantTableHeaderParticipationStatus: {
    id: 'ocpui.components.ManageAppointment.manageForm.participantTableHeaderParticipationStatus',
    defaultMessage: 'Status',
  },
  participantTableHeaderRequired: {
    id: 'ocpui.components.ManageAppointment.manageForm.participantTableHeaderRequired',
    defaultMessage: 'Attendance',
  },
  noParticipantAdded: {
    id: 'ocpui.components.ManageAppointment.manageForm.noParticipantAdded',
    defaultMessage: 'No participant added',
  },
  validation: {
    minLength: {
      id: 'ocpui.components.ManageAppointment.manageForm.validation.minLength',
      defaultMessage: 'Minimum {minimumLength} characters',
    },
    required: {
      id: 'ocpui.components.ManageAppointment.manageForm.validation.required',
      defaultMessage: 'Required',
    },
    invalid: {
      id: 'ocpui.components.ManageAppointment.manageForm.validation.invalid',
      defaultMessage: 'Invalid value',
    },
    minStartDate: {
      id: 'ocpui.components.ManageAppointment.manageForm.validation.minStartDate',
      defaultMessage: 'Date cannot be in the past',
    },
    minStartTime: {
      id: 'ocpui.components.ManageAppointment.manageForm.validation.minStartTime',
      defaultMessage: 'Start Time field cannot be in the past',
    },
    minEndTime: {
      id: 'ocpui.components.ManageAppointment.manageForm.validation.minEndTime',
      defaultMessage: 'End Time field must be later than Start Time field',
    },
    checkParticipants: {
      id: 'ocpui.components.ManageAppointment.manageForm.validation.checkParticipants',
      defaultMessage: 'At least one participant must be selected',
    },
    invalidDateRange: {
      id: 'ocpui.components.ManageAppointment.manageForm.validation.invalidDateRange',
      defaultMessage: 'End time before start time.',
    },
  },
  hintText: {
    description: {
      id: 'ocpui.components.ManageAppointment.manageForm.hintText.description',
      defaultMessage: 'Description',
    },
    appointmentType: {
      id: 'ocpui.components.ManageAppointment.manageForm.hintText.appointmentType',
      defaultMessage: 'Appointment Type',
    },
    appointmentOriginatorRequired: {
      id: 'ocpui.components.ManageAppointment.manageForm.hintText.appointmentOriginatorRequired',
      defaultMessage: 'Originator Attendance',
    },
    status: {
      id: 'ocpui.components.ManageAppointment.manageForm.hintText.status',
      defaultMessage: 'Appointment Status',
    },
    date: {
      id: 'ocpui.components.ManageAppointment.manageForm.hintText.date',
      defaultMessage: 'Date',
    },
    startTime: {
      id: 'ocpui.components.ManageAppointment.manageForm.hintText.startTime',
      defaultMessage: 'Start Time',
    },
    endTime: {
      id: 'ocpui.components.ManageAppointment.manageForm.hintText.endTime',
      defaultMessage: 'End Time',
    },
  },
  floatingLabelText: {
    description: {
      id: 'ocpui.components.ManageAppointment.manageForm.floatingLabelText.description',
      defaultMessage: 'Description',
    },
    appointmentType: {
      id: 'ocpui.components.ManageAppointment.manageForm.floatingLabelText.appointmentType',
      defaultMessage: 'Appointment Type',
    },
    appointmentOriginatorRequired: {
      id: 'ocpui.components.ManageAppointment.manageForm.floatingLabelText.appointmentOriginatorRequired',
      defaultMessage: 'Originator Attendance',
    },
    status: {
      id: 'ocpui.components.ManageAppointment.manageForm.floatingLabelText.status',
      defaultMessage: 'Appointment Status',
    },
    date: {
      id: 'ocpui.components.ManageAppointment.manageForm.floatingLabelText.date',
      defaultMessage: 'Date',
    },
    startTime: {
      id: 'ocpui.components.ManageAppointment.manageForm.floatingLabelText.startTime',
      defaultMessage: 'Start Time',
    },
    endTime: {
      id: 'ocpui.components.ManageAppointment.manageForm.floatingLabelText.endTime',
      defaultMessage: 'End Time',
    },
  },
});
