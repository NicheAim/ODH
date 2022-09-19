/*
 * AddEpisodeOfCare Messages
 *
 * This contains all the text for the AddEpisodeOfCare component.
 */
import { defineMessages } from 'react-intl';

export default defineMessages({
  header: {
    id: 'ocpui.components.AddEpisodeOfCare.header',
    defaultMessage: 'Episode Of Care',
  },
  episodeOfCareButtton: {
    id: 'ocpui.components.AddEpisodeOfCare.episodeOfCareButtton',
    defaultMessage: 'Add Episode Of Care',
  },
  addEpisodeOFCareDialogHeader: {
    id: 'ocpui.components.AddEpisodeOfCare.addEpisodeOFCareDialogHeader',
    defaultMessage: 'Add Episode Of Care',
  },
  editEpisodeOFCareDialogHeader: {
    id: 'ocpui.components.AddEpisodeOfCare.editEpisodeOFCareDialogHeader',
    defaultMessage: 'Edit Episode Of Care',
  },
  addedCoveragesTable: {
    tableHeaderStatus: {
      id: 'ocpui.components.AddEpisodeOfCare.addedCoveragesTable.tableHeaderStatus',
      defaultMessage: 'Status',
    },
    tableHeaderIdentifier: {
      id: 'ocpui.components.AddEpisodeOfCare.addedCoveragesTable.tableHeaderIdentifier',
      defaultMessage: 'Identifier',
    },
    tableHeaderType: {
      id: 'ocpui.components.AddEpisodeOfCare.addedCoveragesTable.tableHeaderType',
      defaultMessage: 'Type',
    },
    tableHeaderStartDate: {
      id: 'ocpui.components.AddEpisodeOfCare.addedCoveragesTable.tableHeaderStartDate',
      defaultMessage: 'Start Date',
    },
    tableHeaderEndDate: {
      id: 'ocpui.components.AddEpisodeOfCare.addedCoveragesTable.tableHeaderEndDate',
      defaultMessage: 'End Date',
    },
    tableHeaderCareManager: {
      id: 'ocpui.components.AddEpisodeOfCare.addedCoveragesTable.tableHeaderCareManager',
      defaultMessage: 'Care Manager ',
    },
    tableHeaderAction: {
      id: 'ocpui.components.AddEpisodeOfCare.addedCoveragesTable.tableHeaderAction',
      defaultMessage: 'Action',
    },
    tableActionEdit: {
      id: 'ocpui.components.AddEpisodeOfCare.addedCoveragesTable.tableActionEdit',
      defaultMessage: 'Edit',
    },
    tableActionRemove: {
      id: 'ocpui.components.AddEpisodeOfCare.addedCoveragesTable.tableActionRemove',
      defaultMessage: 'Remove',
    },
  },
  validation: {
    required: {
      id: 'ocpui.components.AddEpisodeOfCare.addCoverageForm.validation.required',
      defaultMessage: 'Required',
    },
    minEndDate: {
      id: 'ocpui.components.AddEpisodeOfCare.addCoverageForm.validation.minEndDate',
      defaultMessage: 'Flag End date field must be later than flag Start date field',
    },
    duplicateEOC: {
      id: 'ocpui.components.AddEpisodeOfCare.addCoverageForm.validation.duplicateEOC',
      defaultMessage: 'There is an existing active episode of care of the same type.',
    },
  },
  hintText: {
    careManager: {
      id: 'ocpui.components.AddEpisodeOfCare.addCoverageForm.hintText.careManager',
      defaultMessage: 'Care Manager',
    },
    status: {
      id: 'ocpui.components.AddEpisodeOfCare.addCoverageForm.hintText.status',
      defaultMessage: 'Status',
    },
    patientName: {
      id: 'ocpui.components.AddEpisodeOfCare.addCoverageForm.hintText.status',
      defaultMessage: 'Patient Name',
    },
    type: {
      id: 'ocpui.components.AddEpisodeOfCare.addCoverageForm.hintText.type',
      defaultMessage: 'Type',
    },
    identifier: {
      id: 'ocpui.components.AddEpisodeOfCare.addCoverageForm.hintText.identifier',
      defaultMessage: 'Identifier',
    },
    startDate: {
      id: 'ocpui.components.AddEpisodeOfCare.addCoverageForm.hintText.startDate',
      defaultMessage: 'Start Date',
    },
    endDate: {
      id: 'ocpui.components.AddEpisodeOfCare.addCoverageForm.hintText.endDate',
      defaultMessage: 'End Date',
    },
  },
  floatingLabelText: {
    careManager: {
      id: 'ocpui.components.AddEpisodeOfCare.addCoverageForm.floatingLabelText.careManager',
      defaultMessage: 'Care Manager',
    },
    patientName: {
      id: 'ocpui.components.AddEpisodeOfCare.addCoverageForm.floatingLabelText.status',
      defaultMessage: 'Patient Name',
    },
    type: {
      id: 'ocpui.components.AddEpisodeOfCare.addCoverageForm.floatingLabelText.type',
      defaultMessage: 'Type',
    },
    status: {
      id: 'ocpui.components.AddEpisodeOfCare.addCoverageForm.floatingLabelText.status',
      defaultMessage: 'Status',
    },
    identifier: {
      id: 'ocpui.components.AddEpisodeOfCare.addCoverageForm.floatingLabelText.identifier',
      defaultMessage: 'Identifier',
    },
    startDate: {
      id: 'ocpui.components.AddEpisodeOfCare.addCoverageForm.floatingLabelText.startDate',
      defaultMessage: 'Start Date',
    },
    endDate: {
      id: 'ocpui.components.AddEpisodeOfCare.addCoverageForm.floatingLabelText.endDate',
      defaultMessage: 'End Date',
    },
  },
  saveButton: {
    id: 'ocpui.components.AddEpisodeOfCare.saveButton',
    defaultMessage: 'Save',
  },
  cancelButton: {
    id: 'ocpui.components.AddEpisodeOfCare.cancelButton',
    defaultMessage: 'Cancel',
  },
});
