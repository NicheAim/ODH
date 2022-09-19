/*
 * ManagePractitioner Messages
 *
 * This contains all the text for the ManagePractitioner component.
 */
import { defineMessages } from 'react-intl';

export default defineMessages({
  title: {
    id: 'ocpui.components.ManagePractitioner.manageForm.title',
    defaultMessage: 'General Information',
  },
  validation: {
    minLength: {
      id: 'ocpui.components.ManagePractitioner.manageForm.validation.minLength',
      defaultMessage: 'Minimum {minimumLength} characters',
    },
    required: {
      id: 'ocpui.components.ManagePractitioner.manageForm.validation.required',
      defaultMessage: 'Required',
    },
    postalCode: {
      id: 'ocpui.components.ManagePractitioner.manageForm.validation.postalCode',
      defaultMessage: 'Must be with formats: 12345 or 12345-6789',
    },
    invalid: {
      id: 'ocpui.components.ManagePractitioner.manageForm.validation.invalid',
      defaultMessage: 'Invalid value',
    },
    minLengthAssociateOrganization: {
      id: 'ocpui.components.ManagePractitioner.manageForm.validation.minLengthAssociateOrganization',
      defaultMessage: 'Minimum {minimumOrganization} associate organization required',
    },
    emailContact: {
      id: 'ocpui.components.ManagePractitioner.manageForm.validation.emailContact',
      defaultMessage: 'Must have at least one email contact.',
    },
    phoneContact: {
      id: 'ocpui.components.ManagePractitioner.manageForm.validation.phoneContact',
      defaultMessage: 'Must have at least one telephone contact.',
    },
  },
  hintText: {
    firstName: {
      id: 'ocpui.components.ManagePractitioner.manageForm.hintText.firstName',
      defaultMessage: 'First Name',
    },
    middleName: {
      id: 'ocpui.components.ManagePractitioner.manageForm.hintText.middleName',
      defaultMessage: 'Middle Name',
    },
    lastName: {
      id: 'ocpui.components.ManagePractitioner.manageForm.hintText.lastName',
      defaultMessage: 'Last Name',
    },
    roleType: {
      id: 'ocpui.components.ManagePractitioner.manageForm.hintText.roleType',
      defaultMessage: 'Role Type',
    },
    specialty: {
      id: 'ocpui.components.ManagePractitioner.manageForm.hintText.specialty',
      defaultMessage: 'Specialty',
    },
    active: {
      id: 'ocpui.components.ManagePractitioner.manageForm.floatingLabelText.active',
      defaultMessage: 'Active',
    },
    identifierType: {
      id: 'ocpui.components.ManagePractitioner.manageForm.hintText.identifierType',
      defaultMessage: 'Identifier Type',
    },
    identifierValue: {
      id: 'ocpui.components.ManagePractitioner.manageForm.hintText.identifierValue',
      defaultMessage: 'Identifier Value',
    },
  },
  floatingLabelText: {
    firstName: {
      id: 'ocpui.components.ManagePractitioner.manageForm.floatingLabelText.firstName',
      defaultMessage: 'First Name',
    },
    middleName: {
      id: 'ocpui.components.ManagePractitioner.manageForm.floatingLabelText.middleName',
      defaultMessage: 'Middle Name',
    },
    lastName: {
      id: 'ocpui.components.ManagePractitioner.manageForm.floatingLabelText.lastName',
      defaultMessage: 'Last Name',
    },
    roleType: {
      id: 'ocpui.components.ManagePractitioner.manageForm.floatingLabelText.roleType',
      defaultMessage: 'Role Type',
    },
    active: {
      id: 'ocpui.components.ManagePractitioner.manageForm.floatingLabelText.active',
      defaultMessage: 'Active',
    },
    identifierType: {
      id: 'ocpui.components.ManagePractitioner.manageForm.floatingLabelText.identifierType',
      defaultMessage: 'Identifier Type',
    },
    identifierValue: {
      id: 'ocpui.components.ManagePractitioner.manageForm.floatingLabelText.identifierValue',
      defaultMessage: 'Identifier Value',
    },
  },
  associateOrganizations: {
    subtitle: {
      id: 'ocpui.components.ManagePractitioner.manageForm.associateOrganizations.subtitle',
      defaultMessage: 'Associate Organizations',
    },
    addButtonLabel: {
      id: 'ocpui.components.ManagePractitioner.manageForm.associateOrganizations.addButtonLabel',
      defaultMessage: 'Add Organization',
    },
    tableColumnName: {
      id: 'ocpui.components.ManagePractitioner.manageForm.associateOrganizations.tableColumnName',
      defaultMessage: 'Name',
    },
    tableColumnCode: {
      id: 'ocpui.components.ManagePractitioner.manageForm.associateOrganizations.tableColumnCode',
      defaultMessage: 'Role',
    },
    tableColumnSpecialty: {
      id: 'ocpui.components.ManagePractitioner.manageForm.associateOrganizations.tableColumnSpecialty',
      defaultMessage: 'Specialty',
    },
    tableColumnActive: {
      id: 'ocpui.components.ManagePractitioner.manageForm.associateOrganizations.tableColumnActive',
      defaultMessage: 'Active',
    },
    tableColumnAction: {
      id: 'ocpui.components.ManagePractitioner.manageForm.associateOrganizations.tableColumnAction',
      defaultMessage: 'Action',
    },
    tableActionRemove: {
      id: 'ocpui.components.ManagePractitioner.manageForm.associateOrganizations.tableActionRemove',
      defaultMessage: 'Remove',
    },
  },
});
