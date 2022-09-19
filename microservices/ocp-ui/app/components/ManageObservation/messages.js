/*
 * ManageObservation Messages
 */
import { defineMessages } from 'react-intl';

export default defineMessages({
  title: {
    id: 'ocpui.components.ManageObservation.title',
    defaultMessage: 'General Information'
  },
  validation: {
    required: {
      id: 'ocpui.components.ManageObservation.manageForm.validation.required',
      defaultMessage: 'Required',
    },
    minIssuedDate: {
      id: 'ocpui.components.ManageObservation.manageForm.validation.minIssuedDate',
      defaultMessage: 'The Issued Date cannot be earlier than today',
    },
  },
  hintText: {
    issued: {
      id: 'ocpui.components.ManageObservation.manageForm.hintText.issued',
      defaultMessage: 'Issued On',
    },
    status: {
      id: 'ocpui.components.ManageObservation.manageForm.hintText.status',
      defaultMessage: 'Status',
    },
    code: {
      id: 'ocpui.components.ManageObservation.manageForm.hintText.code',
      defaultMessage: 'Code',
    },
    value: {
      id: 'ocpui.components.ManageObservation.manageForm.hintText.value',
      defaultMessage: 'Value',
    },
  },
  floatingLabelText: {
    patientName: {
      id: 'ocpui.components.ManageObservation.manageForm.hintText.patientName',
      defaultMessage: 'Patient Name',
    },
    organization: {
      id: 'ocpui.components.ManageObservation.manageForm.floatingLabelText.organization',
      defaultMessage: 'Organization',
    },
    requester: {
      id: 'ocpui.components.ManageObservation.manageForm.hintText.requester',
      defaultMessage: 'Created By',
    },
  },
});
