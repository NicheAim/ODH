/*
 * ManageClient Messages
 *
 * This contains all the text for the ManageClient component.
 */
import { defineMessages } from 'react-intl';

export default defineMessages({
  addClient: {
    id: 'ocpui.components.ManageClient.addClient',
    defaultMessage: 'Register New App',
  },
  saveButton: {
    id: 'ocpui.components.ManageClient.saveButton',
    defaultMessage: 'Save',
  },
  cancelButton: {
    id: 'ocpui.components.ManageClient.cancelButton',
    defaultMessage: 'Cancel',
  },
  dialogHeader: {
    id: 'ocpui.components.ManageClient.dialogHeader',
    defaultMessage: 'Register App on OCP SMART on FHIR Platform',
  },
  hintText: {
    clientId: {
      id: 'ocpui.components.ManageClient.ManageClientForm.hintText.clientId',
      defaultMessage: 'Client ID',
    },
    clientType: {
      id: 'ocpui.components.ManageClient.ManageClientForm.hintText.clientType',
      defaultMessage: 'Client Type',
    },
    name: {
      id: 'ocpui.components.ManageClient.ManageClientForm.hintText.name',
      defaultMessage: 'App Name',
    },
    redirectUri: {
      id: 'ocpui.components.ManageClient.ManageClientForm.hintText.redirectUri',
      defaultMessage: 'App Redirect URIs  (Comma separated list)',
    },
    clientSecret: {
      id: 'ocpui.components.ManageClient.ManageClientForm.hintText.clientSecret',
      defaultMessage: 'Client Secret',
    },
    appLaunchUrl: {
      id: 'ocpui.components.ManageClient.ManageClientForm.hintText.appLaunchUrl',
      defaultMessage: 'App Launch URI',
    },
    scopes: {
      id: 'ocpui.components.ManageClient.ManageClientForm.hintText.scopes',
      defaultMessage: 'Scopes (Comma separated list)',
    },
  },
  floatingLabelText: {
    clientType: {
      id: 'ocpui.components.ManageClient.ManageClientForm.hintText.clientType',
      defaultMessage: 'Client Type',
    },
    clientId: {
      id: 'ocpui.components.ManageClient.ManageClientForm.floatingLabelText.clientId',
      defaultMessage: 'Client ID',
    },
    name: {
      id: 'ocpui.components.ManageClient.ManageClientForm.floatingLabelText.name',
      defaultMessage: 'App Name',
    },
    redirectUri: {
      id: 'ocpui.components.ManageClient.ManageClientForm.floatingLabelText.redirectUri',
      defaultMessage: 'App Redirect URIs (Comma separated list)',
    },
    clientSecret: {
      id: 'ocpui.components.ManageClient.ManageClientForm.floatingLabelText.clientSecret',
      defaultMessage: 'Client Secret',
    },
    appLaunchUrl: {
      id: 'ocpui.components.ManageClient.ManageClientForm.floatingLabelText.appLaunchUrl',
      defaultMessage: 'App Launch URI',
    },
    scopes: {
      id: 'ocpui.components.ManageClient.ManageClientForm.floatingLabelText.scopes',
      defaultMessage: 'Scopes (Comma separated list)',
    },
  },
  validation: {
    required: {
      id: 'ocpui.components.ManageClient.ManageClientForm.validation.required',
      defaultMessage: 'Required',
    },
    imageFormat: {
      id: 'ocpui.components.ManageClient.ManageClientForm.validation.imageFormat',
      defaultMessage: 'Only gif|jpg|jpeg|tiff|png format be accepted',
    },
    imageSize: {
      id: 'ocpui.components.ManageClient.ManageClientForm.validation.imageSize',
      defaultMessage: 'Image size must be less than {imageSize}kb',
    },
  },
});
