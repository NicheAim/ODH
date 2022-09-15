/*
 * ManageOrganization Messages
 *
 * This contains all the text for the ManageOrganization component.
 */
import { defineMessages } from 'react-intl';

export default defineMessages({
  header: {
    id: 'ocpui.components.ManageOrganization.header',
    defaultMessage: 'This is the ManageOrganization component !',
  },
  subtitle: {
    id: 'ocpui.components.ManageOrganization.subtitle',
    defaultMessage: 'General Information',
  },
  form: {
    name: {
      id: 'ocpui.components.ManageOrganization.form.name',
      defaultMessage: 'Organization Name',
    },
    identifierSystem: {
      id: 'ocpui.components.ManageOrganization.form.identifierSystem',
      defaultMessage: 'ID',
    },
    identifierValue: {
      id: 'ocpui.components.ManageOrganization.form.identifierValue',
      defaultMessage: 'Please enter ID #',
    },
    status: {
      id: 'ocpui.components.ManageOrganization.form.status',
      defaultMessage: 'Status',
    },
    saveButton: {
      id: 'ocpui.components.ManageOrganization.form.saveButton',
      defaultMessage: 'Save',
    },
    savingButton: {
      id: 'ocpui.components.ManageOrganization.form.savingButton',
      defaultMessage: 'Saving...',
    },
    cancelButton: {
      id: 'ocpui.components.ManageOrganization.form.cancelButton',
      defaultMessage: 'Cancel',
    },
  },
  validation: {
    required: {
      id: 'ocpui.components.ManageOrganization.validation.required',
      defaultMessage: 'Required',
    },
    minAddresses: {
      id: 'ocpui.components.ManageOrganization.validation.minAddresses',
      defaultMessage: 'Organization must have {minimumNumberOfAddresses} address',
    },
    minTelecoms: {
      id: 'ocpui.components.ManageOrganization.validation.minTelecoms',
      defaultMessage: 'Organization must have {minimumNumberOfAddresses} contact',
    },
  },
});
