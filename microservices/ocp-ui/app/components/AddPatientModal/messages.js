/*
 * AddPatientModal Messages
 *
 * This contains all the text for the AddPatientModal component.
 */
import { defineMessages } from 'react-intl';

export default defineMessages({
  title: {
    id: 'ocpui.components.AddPatientModal.title',
    defaultMessage: 'New Client',
  },
  closeButton: {
    id: 'ocpui.components.AddPatientModal.closeButton',
    defaultMessage: 'Close',
  },
  checkExistingButton: {
    id: 'ocpui.components.CreatePatientForm.checkExistingButton',
    defaultMessage: 'Check Existing',
  },
  modalContentText: {
    id: 'ocpui.components.AddPatientModal.modalContentText',
    defaultMessage: 'The user already exists in the system. Please edit it below or continue creating a new patient.',
  },
  validation: {
    required: {
      id: 'ocpui.components.CreatePatientForm.validation.required',
      defaultMessage: 'Required',
    },
  },
  hintText: {
    firstName: {
      id: 'ocpui.components.CreatePatientForm.hintText.firstName',
      defaultMessage: 'First Name',
    },
    lastName: {
      id: 'ocpui.components.CreatePatientForm.hintText.lastName',
      defaultMessage: 'Last Name',
    },
    dob: {
      id: 'ocpui.components.CreatePatientForm.hintText.dob',
      defaultMessage: 'Date of Birth',
    },
  },
  floatingLabelText: {
    firstName: {
      id: 'ocpui.components.CreatePatientForm.floatingLabelText.firstName',
      defaultMessage: 'First Name',
    },
    lastName: {
      id: 'ocpui.components.CreatePatientForm.floatingLabelText.lastName',
      defaultMessage: 'Last Name',
    },
    dob: {
      id: 'ocpui.components.CreatePatientForm.floatingLabelText.dob',
      defaultMessage: 'Date of Birth',
    },
  },
  tableHeaderColumnName: {
    id: 'ocpui.components.PatientLookupResult.tableHeaderColumnName',
    defaultMessage: 'Name',
  },
  tableHeaderColumnOrgName: {
    id: 'ocpui.components.PatientLookupResult.tableHeaderColumnOrgName',
    defaultMessage: 'Associated Organization(s)',
  },
  tableColumnHeaderRole: {
    id: 'ocpui.components.PatientLookupResult.tableColumnHeaderRole',
    defaultMessage: 'Role',
  },
  tableHeaderColumnIdentifier: {
    id: 'ocpui.components.PatientLookupResult.tableHeaderColumnIdentifier',
    defaultMessage: 'ID',
  },
  tableColumnHeaderEmail: {
    id: 'ocpui.components.PatientLookupResult.tableColumnHeaderEmail',
    defaultMessage: 'Email',
  },
  tableHeaderColumnAction: {
    id: 'ocpui.components.PatientLookupResult.tableHeaderColumnAction',
    defaultMessage: 'Action',
  },
  NoExistPatientFound: {
    id: 'ocpui.components.PatientLookupResult.NoExistPatientFound',
    defaultMessage: 'No Matching Client Found. Please continue creating a new client.',
  },
  ExistMintPatientFound: {
    id: 'ocpui.components.PatientLookupResult.ExistMintPatientFound',
    defaultMessage: 'Client Found in the PG County PHIN but not in PreventionLink System. Please continue creating a new client.',
  },
  ExistPatientFound: {
    id: 'ocpui.components.PatientLookupResult.ExistPatientFound',
    defaultMessage: 'Client Found in the PG County PHIN and in organization other than yours. Please create new record for your organization.',
  },
  ExistOrgPatientFound: {
    id: 'ocpui.components.PatientLookupResult.ExistOrgPatientFound',
    defaultMessage: 'Client Found in the PG County PHIN and in your organization. Please click button to review client detail.',
  },
  edit: {
    id: 'ocpui.components.PatientLookupResult.edit',
    defaultMessage: 'Edit',
  },
  associateCurrentOrganization: {
    id: 'ocpui.components.PatientLookupResult.associateCurrentOrganization',
    defaultMessage: 'Associate current organization',
  },
  createButton: {
    id: 'ocpui.components.PatientLookupResult.createButton',
    defaultMessage: 'Create New Record',
  },
  createCareTeamButton: {
    id: 'ocpui.components.PatientLookupResult.createCareTeamButton',
    defaultMessage: 'Create Care Team',
  },
  viewPatientButton: {
    id: 'ocpui.components.PatientLookupResult.viewPatientButton',
    defaultMessage: 'View Client Detail',
  },
});
