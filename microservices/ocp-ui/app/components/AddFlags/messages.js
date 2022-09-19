/*
 * AddFlags Messages
 *
 * This contains all the text for the AddFlags component.
 */
import { defineMessages } from 'react-intl';

export default defineMessages({
  header: {
    id: 'ocpui.components.AddFlags.header',
    defaultMessage: 'Advisory',
  },
  addFlagButton: {
    id: 'ocpui.components.AddFlags.addFlagButton',
    defaultMessage: 'Add Advisory',
  },
  addFlagDialogHeader: {
    id: 'ocpui.components.AddFlags.addFlagDialogHeader',
    defaultMessage: 'Add Advisory',
  },
  addedFlagsTable: {
    tableHeaderStatus: {
      id: 'ocpui.components.AddFlags.addedFlagsTable.tableHeaderStatus',
      defaultMessage: 'Status',
    },
    tableHeaderCategory: {
      id: 'ocpui.components.AddFlags.addedFlagsTable.tableHeaderCategory',
      defaultMessage: 'Category',
    },
    tableHeaderCode: {
      id: 'ocpui.components.AddFlags.addedFlagsTable.tableHeaderCode',
      defaultMessage: 'Note',
    },
    tableHeaderStartDate: {
      id: 'ocpui.components.AddFlags.addedFlagsTable.tableHeaderStartDate',
      defaultMessage: 'Start Date',
    },
    tableHeaderEndDate: {
      id: 'ocpui.components.AddFlags.addedFlagsTable.tableHeaderEndDate',
      defaultMessage: 'End Date',
    },
    tableHeaderAuthor: {
      id: 'ocpui.components.AddFlags.addedFlagsTable.tableHeaderAuthor',
      defaultMessage: 'Author',
    },
    tableHeaderAction: {
      id: 'ocpui.components.AddFlags.addedFlagsTable.tableHeaderAction',
      defaultMessage: 'Action',
    },
    tableActionEdit: {
      id: 'ocpui.components.AddFlags.addedFlagsTable.tableActionEdit',
      defaultMessage: 'Edit',
    },
    tableActionRemove: {
      id: 'ocpui.components.AddFlags.addedFlagsTable.tableActionRemove',
      defaultMessage: 'Remove',
    },
  },
  validation: {
    required: {
      id: 'ocpui.components.AddFlags.addFlagForm.validation.required',
      defaultMessage: 'Required',
    },
    minEndDate: {
      id: 'ocpui.components.AddFlags.addFlagForm.validation.minEndDate',
      defaultMessage: 'Flag End date field must be later than flag Start date field',
    },
  },
  hintText: {
    category: {
      id: 'ocpui.components.AddFlags.addFlagForm.hintText.category',
      defaultMessage: 'Category',
    },
    status: {
      id: 'ocpui.components.AddFlags.addFlagForm.hintText.status',
      defaultMessage: 'Status',
    },
    patientName: {
      id: 'ocpui.components.AddFlags.addFlagForm.hintText.status',
      defaultMessage: 'Patient Name',
    },
    author: {
      id: 'ocpui.components.AddFlags.addFlagForm.hintText.author',
      defaultMessage: 'Author',
    },
    code: {
      id: 'ocpui.components.AddFlags.addFlagForm.hintText.code',
      defaultMessage: 'Note',
    },
    startDate: {
      id: 'ocpui.components.AddFlags.addFlagForm.hintText.startDate',
      defaultMessage: 'Start Date',
    },
    endDate: {
      id: 'ocpui.components.AddFlags.addFlagForm.hintText.endDate',
      defaultMessage: 'end Date',
    },
  },
  floatingLabelText: {
    category: {
      id: 'ocpui.components.AddFlags.addFlagForm.floatingLabelText.category',
      defaultMessage: 'Category',
    },
    patientName: {
      id: 'ocpui.components.AddFlags.addFlagForm.floatingLabelText.status',
      defaultMessage: 'Patient Name',
    },
    author: {
      id: 'ocpui.components.AddFlags.addFlagForm.floatingLabelText.author',
      defaultMessage: 'Author',
    },
    status: {
      id: 'ocpui.components.AddFlags.addFlagForm.floatingLabelText.status',
      defaultMessage: 'Status',
    },
    code: {
      id: 'ocpui.components.AddFlags.addFlagForm.floatingLabelText.code',
      defaultMessage: 'Note',
    },
    startDate: {
      id: 'ocpui.components.AddFlags.addFlagForm.floatingLabelText.startDate',
      defaultMessage: 'Start Date',
    },
    endDate: {
      id: 'ocpui.components.AddFlags.addFlagForm.floatingLabelText.endDate',
      defaultMessage: 'end Date',
    },
  },
  saveFlagButton: {
    id: 'ocpui.components.AddFlags.saveFlagButton',
    defaultMessage: 'Save',
  },
  cancelButton: {
    id: 'ocpui.components.AddFlags.cancelButton',
    defaultMessage: 'Cancel',
  },
});
