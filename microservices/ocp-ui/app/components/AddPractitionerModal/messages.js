/*
 * AddPractitionerModal Messages
 *
 * This contains all the text for the AddPractitionerModal component.
 */
import { defineMessages } from 'react-intl';

export default defineMessages({
  title: {
    id: 'ocpui.components.AddPractitionerModal.title',
    defaultMessage: 'New Practitioner/Resource',
  },
  closeButton: {
    id: 'ocpui.components.AddPractitionerModal.closeButton',
    defaultMessage: 'Close',
  },
  checkExistingButton: {
    id: 'ocpui.components.CreatePractitionerForm.checkExistingButton',
    defaultMessage: 'Check Existing',
  },
  modalContentText: {
    id: 'ocpui.components.AddPractitionerModal.modalContentText',
    defaultMessage: 'The user already exists in the system. Please edit it below or continue creating a new practitioner.',
  },
  validation: {
    required: {
      id: 'ocpui.components.CreatePractitionerForm.validation.required',
      defaultMessage: 'Required',
    },
  },
  hintText: {
    firstName: {
      id: 'ocpui.components.CreatePractitionerForm.hintText.firstName',
      defaultMessage: 'First Name',
    },
    lastName: {
      id: 'ocpui.components.CreatePractitionerForm.hintText.lastName',
      defaultMessage: 'Last Name',
    },
    identifierType: {
      id: 'ocpui.components.CreatePractitionerForm.hintText.identifierType',
      defaultMessage: 'Identifier Type',
    },
    identifierValue: {
      id: 'ocpui.components.CreatePractitionerForm.hintText.identifierValue',
      defaultMessage: 'Identifier Value',
    },
  },
  floatingLabelText: {
    firstName: {
      id: 'ocpui.components.CreatePractitionerForm.floatingLabelText.firstName',
      defaultMessage: 'First Name',
    },
    lastName: {
      id: 'ocpui.components.CreatePractitionerForm.floatingLabelText.lastName',
      defaultMessage: 'Last Name',
    },
    identifierType: {
      id: 'ocpui.components.CreatePractitionerForm.floatingLabelText.identifierType',
      defaultMessage: 'Identifier Type',
    },
    identifierValue: {
      id: 'ocpui.components.CreatePractitionerForm.floatingLabelText.identifierValue',
      defaultMessage: 'Identifier Value',
    },
  },
  tableHeaderColumnName: {
    id: 'ocpui.components.PractitionerLookupResult.tableHeaderColumnName',
    defaultMessage: 'Name',
  },
  tableHeaderColumnOrgName: {
    id: 'ocpui.components.PractitionerLookupResult.tableHeaderColumnOrgName',
    defaultMessage: 'Associated Organization(s)',
  },
  tableColumnHeaderRole: {
    id: 'ocpui.components.PractitionerLookupResult.tableColumnHeaderRole',
    defaultMessage: 'Role',
  },
  tableHeaderColumnIdentifier: {
    id: 'ocpui.components.PractitionerLookupResult.tableHeaderColumnIdentifier',
    defaultMessage: 'ID',
  },
  tableColumnHeaderEmail: {
    id: 'ocpui.components.PractitionerLookupResult.tableColumnHeaderEmail',
    defaultMessage: 'Email',
  },
  tableHeaderColumnAction: {
    id: 'ocpui.components.PractitionerLookupResult.tableHeaderColumnAction',
    defaultMessage: 'Action',
  },
  NoExistPractitionerFound: {
    id: 'ocpui.components.PractitionerLookupResult.NoExistPractitionerFound',
    defaultMessage: 'No exist practitioner found in the system. Please continue creating a new practitioner.',
  },
  edit: {
    id: 'ocpui.components.PractitionerLookupResult.edit',
    defaultMessage: 'Edit',
  },
  associateCurrentOrganization: {
    id: 'ocpui.components.PractitionerLookupResult.associateCurrentOrganization',
    defaultMessage: 'Associate current organization',
  },
  createButton: {
    id: 'ocpui.components.PractitionerLookupResult.createButton',
    defaultMessage: 'Create New Record',
  },
});
