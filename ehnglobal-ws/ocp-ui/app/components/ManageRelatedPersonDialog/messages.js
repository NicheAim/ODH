/*
 * ManageRelatedPersonDialog Messages
 *
 * This contains all the text for the ManageRelatedPersonDialog component.
 */
import { defineMessages } from 'react-intl';

export default defineMessages({
  manageRelatedPersonDialogTitle: {
    id: 'ocpui.components.ManageRelatedPersonDialog.manageRelatedPersonDialogTitle',
    defaultMessage: 'Manage Related Person in CareTeam',
  },
  cancelButton: {
    id: 'ocpui.components.ManageRelatedPersonDialog.cancelButton',
    defaultMessage: 'Cancel',
  },
  relatedPersonNameHintText: {
    id: 'ocpui.components.SearchRelatedPersonsField.relatedPersonNameHintText',
    defaultMessage: 'Name',
  },
  searchButton: {
    id: 'ocpui.components.SearchRelatedPersonsField.searchButton',
    defaultMessage: 'Search',
  },
  validation: {
    required: {
      id: 'ocpui.components.SearchRelatedPersonsField.validation.required',
      defaultMessage: 'Required',
    },
    minLength: {
      id: 'ocpui.components.SearchRelatedPersonsField.validation.minLength',
      defaultMessage: 'Minimum {minimumLength} characters',
    },
    minStartDate: {
      id: 'ocpui.components.AddRelatedPersonTableRow.validation.minStartDate',
      defaultMessage: 'Start date field must be later than today',
    },
    minEndDate: {
      id: 'ocpui.components.AddRelatedPersonTableRow.validation.minEndDate',
      defaultMessage: 'End date field must be later than Start date field',
    },
  },
  manageRelatedPersonTableHeaderName: {
    id: 'ocpui.components.ManageRelatedPersonTable.manageRelatedPersonTableHeaderName',
    defaultMessage: 'Name',
  },
  manageRelatedPersonTableHeaderRole: {
    id: 'ocpui.components.ManageRelatedPersonTable.manageRelatedPersonTableHeaderRole',
    defaultMessage: 'Role',
  },
  manageRelatedPersonTableHeaderStartDate: {
    id: 'ocpui.components.ManageRelatedPersonTable.manageRelatedPersonTableHeaderStartDate',
    defaultMessage: 'Start Date',
  },
  manageRelatedPersonTableHeaderEndDate: {
    id: 'ocpui.components.ManageRelatedPersonTable.manageRelatedPersonTableHeaderEndDate',
    defaultMessage: 'End Date',
  },
  manageRelatedPersonTableHeaderAction: {
    id: 'ocpui.components.ManageRelatedPersonTable.manageRelatedPersonTableHeaderAction',
    defaultMessage: 'Action',
  },
  removeButton: {
    id: 'ocpui.components.ManageRelatedPersonTable.removeButton',
    defaultMessage: 'Remove',
  },
  noRelatedPersonFoundText: {
    id: 'ocpui.components.ManageRelatedPersonTable.noRelatedPersonFoundText',
    defaultMessage: 'No related person found.',
  },
  alertDialogTitle: {
    id: 'ocpui.components.ManageRelatedPersonTable.alertDialogTitle',
    defaultMessage: 'Remove this related person from care team?',
  },
  okButton: {
    id: 'ocpui.components.ManageRelatedPersonDialog.okButton',
    defaultMessage: 'OK',
  },
  addButton: {
    id: 'ocpui.components.AddRelatedPersonTableRow.addButton',
    defaultMessage: 'Add',
  },
  roleHintText: {
    id: 'ocpui.components.AddRelatedPersonTableRow.roleHintText',
    defaultMessage: 'Role',
  },
  startDateHintText: {
    id: 'ocpui.components.AddRelatedPersonTableRow.startDateHintText',
    defaultMessage: 'Start Date',
  },
  endDateHintText: {
    id: 'ocpui.components.AddRelatedPersonTableRow.endDateHintText',
    defaultMessage: 'End Date',
  },
});
