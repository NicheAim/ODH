/*
 * AddAppointmentParticipantModal Messages
 *
 * This contains all the text for the AddAppointmentParticipantModal component.
 */
import { defineMessages } from 'react-intl';

export default defineMessages({
  addParticipantBtn: {
    id: 'ocpui.components.AddAppointmentParticipantModal.addParticipantBtn',
    defaultMessage: 'Add Participant Details',
  },
  dialogTitle: {
    id: 'ocpui.components.AddAppointmentParticipantModal.dialogTitle',
    defaultMessage: 'Add Participant Details',
  },
  inOrgTabLabel: {
    id: 'ocpui.containers.AddParticipantForm.inOrgTabLabel',
    defaultMessage: 'Inside Organization',
  },
  outOfOrgTabLabel: {
    id: 'ocpui.containers.AddParticipantForm.outOfOrgTabLabel',
    defaultMessage: 'Out Of Organization',
  },
  locationTabLabel: {
    id: 'ocpui.containers.AddParticipantForm.locationTabLabel',
    defaultMessage: 'Location',
  },
  serviceTabLabel: {
    id: 'ocpui.containers.AddParticipantForm.serviceTabLabel',
    defaultMessage: 'Service',
  },
  addButton: {
    id: 'ocpui.containers.AddParticipantForm.addButton',
    defaultMessage: 'Add',
  },
  confirmButton: {
    id: 'ocpui.containers.AddParticipantForm.confirmButton',
    defaultMessage: 'Confirm',
  },
  cancelButton: {
    id: 'ocpui.containers.AddParticipantForm.cancelButton',
    defaultMessage: 'Cancel',
  },
  searchTooltip: {
    id: 'ocpui.containers.AddParticipantForm.searchTooltip',
    defaultMessage: 'Search',
  },
  menuItemPractitioner: {
    id: 'ocpui.components.AddParticipantForm.hintText.menuItemPractitioner',
    defaultMessage: 'Practitioner',
  },
  menuItemRelatedPerson: {
    id: 'ocpui.components.AddParticipantForm.hintText.menuItemRelatedPerson',
    defaultMessage: 'Related Person',
  },
  noResourceAvailable: {
    id: 'ocpui.components.AddParticipantForm.hintText.noResourceAvailable',
    defaultMessage: ' This resource is not available at any {resourceMessage}. Please select different resource.',
  },
  validation: {
    required: {
      id: 'ocpui.components.AddParticipantForm.validation.required',
      defaultMessage: 'Required',
    },
    minLength: {
      id: 'ocpui.components.AddParticipantForm.validation.minLength',
      defaultMessage: 'Minimum {minimumLength} characters',
    },
  },
  hintText: {
    selectService: {
      id: 'ocpui.components.AddParticipantForm.hintText.selectService',
      defaultMessage: 'Select Service',
    },
    selectLocation: {
      id: 'ocpui.components.AddParticipantForm.hintText.selectLocation',
      defaultMessage: 'Select Location',
    },
    selectPractitioner: {
      id: 'ocpui.components.AddParticipantForm.hintText.selectPractitioner',
      defaultMessage: 'Select Practitioner',
    },
    selectPractitionerAttendance: {
      id: 'ocpui.components.AddParticipantForm.hintText.selectPractitionerAttendance',
      defaultMessage: 'Attendance',
    },
    participantName: {
      id: 'ocpui.components.AddParticipantForm.hintText.participantName',
      defaultMessage: 'Name',
    },
    participantType: {
      id: 'ocpui.components.AddParticipantForm.hintText.participantType',
      defaultMessage: 'Type',
    },
  },
  floatingLabelText: {
    selectService: {
      id: 'ocpui.components.AddParticipantForm.floatingLabelText.selectService',
      defaultMessage: 'Select Service',
    },
    selectLocation: {
      id: 'ocpui.components.AddParticipantForm.floatingLabelText.selectLocation',
      defaultMessage: 'Select Location',
    },
    selectPractitioner: {
      id: 'ocpui.components.AddParticipantForm.floatingLabelText.selectPractitioner',
      defaultMessage: 'Select Practitioner',
    },
    selectPractitionerAttendance: {
      id: 'ocpui.components.AddParticipantForm.floatingLabelText.selectPractitionerAttendance',
      defaultMessage: 'Attendance',
    },
    participantName: {
      id: 'ocpui.components.AddParticipantForm.floatingLabelText.participantName',
      defaultMessage: 'Name',
    },
    participantType: {
      id: 'ocpui.components.AddParticipantForm.floatingLabelText.participantType',
      defaultMessage: 'Type',
    },
  },
  searchParticipantsTable: {
    tableHeaderName: {
      id: 'ocpui.components.addedParticipantsTable.tableHeaderName',
      defaultMessage: 'Name',
    },
    tableHeaderNPI: {
      id: 'ocpui.components.addedParticipantsTable.tableHeaderNPI',
      defaultMessage: 'NPI',
    },
    tableHeaderAssociatedOrgs: {
      id: 'ocpui.components.addedParticipantsTable.tableHeaderAssociatedOrgs',
      defaultMessage: 'Associated Organization(s)',
    },
    tableHeaderAttendance: {
      id: 'ocpui.components.addedParticipantsTable.tableHeaderAttendance',
      defaultMessage: 'Attendance',
    },
    tableHeaderAction: {
      id: 'ocpui.components.addedParticipantsTable.tableHeaderAction',
      defaultMessage: 'Action',
    },
    removeParticipantBtn: {
      id: 'ocpui.components.addedParticipantsTable.removeParticipantBtn',
      defaultMessage: 'Remove',
    },
    noParticipantsFound: {
      id: 'ocpui.components.addedParticipantsTable.noParticipantsFound',
      defaultMessage: 'No Participant Found',
    },
  },
  addedParticipantsTable: {
    tableHeaderName: {
      id: 'ocpui.components.addedParticipantsTable.tableHeaderName',
      defaultMessage: 'Name',
    },
    tableHeaderType: {
      id: 'ocpui.components.addedParticipantsTable.tableHeaderType',
      defaultMessage: 'Type',
    },
    tableHeaderParticipationType: {
      id: 'ocpui.components.addedParticipantsTable.tableHeaderParticipationType',
      defaultMessage: 'Participation Type',
    },
    tableHeaderAttendance: {
      id: 'ocpui.components.addedParticipantsTable.tableHeaderAttendance',
      defaultMessage: 'Attendance',
    },
    tableHeaderStatus: {
      id: 'ocpui.components.addedParticipantsTable.tableHeaderStatus',
      defaultMessage: 'Status',
    },
    tableHeaderAction: {
      id: 'ocpui.components.addedParticipantsTable.tableHeaderAction',
      defaultMessage: 'Action',
    },
    removeParticipantBtn: {
      id: 'ocpui.components.addedParticipantsTable.removeParticipantBtn',
      defaultMessage: 'Remove',
    },
  },
});
