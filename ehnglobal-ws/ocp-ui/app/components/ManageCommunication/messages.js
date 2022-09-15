/*
 * ManageCommunication Messages
 *
 * This contains all the text for the ManageCommunication component.
 */
import { defineMessages } from 'react-intl';

export default defineMessages({
  header: {
    id: 'ocpui.components.ManageCommunication.header',
    defaultMessage: 'This is the ManageCommunication component !',
  },
  recipientTableHeaderName: {
    id: 'ocpui.components.ManageCommunication.recipientTableHeaderName',
    defaultMessage: 'Name',
  },
  recipientTableHeaderRole: {
    id: 'ocpui.components.ManageCommunication.recipientTableHeaderRole',
    defaultMessage: 'Role',
  },
  recipientTableHeaderAction: {
    id: 'ocpui.components.ManageCommunication.recipientTableHeaderAction',
    defaultMessage: 'Action',
  },
  form: {
    floatingLabelText: {
      sent: {
        id: 'ocpui.containers.ManageCommunication.form.sent',
        defaultMessage: 'Time Sent',
      },
      creator: {
        id: 'ocpui.containers.ManageCommunication.form.creator',
        defaultMessage: 'Creator',
      },
      recipient: {
        id: 'ocpui.containers.ManageCommunication.form.recipient',
        defaultMessage: 'Recipient',
      },
      status: {
        id: 'ocpui.containers.ManageCommunication.form.status',
        defaultMessage: 'Status',
      },
      context: {
        id: 'ocpui.containers.ManageCommunication.form.context',
        defaultMessage: 'Episode Of Care',
      },
      notDone: {
        id: 'ocpui.containers.ManageCommunication.form.notDone',
        defaultMessage: 'Communication did not occur',
      },
      topic: {
        id: 'ocpui.containers.ManageCommunication.form.topic',
        defaultMessage: 'Topic',
      },
      notDoneReason: {
        id: 'ocpui.containers.ManageCommunication.form.notDoneReason',
        defaultMessage: 'Reason why communication did not occur',
      },
      category: {
        id: 'ocpui.containers.ManageCommunication.form.category',
        defaultMessage: 'Category',
      },
      medium: {
        id: 'ocpui.containers.ManageCommunication.form.medium',
        defaultMessage: 'Contact Method',
      },
      subject: {
        id: 'ocpui.containers.ManageCommunication.form.subject',
        defaultMessage: 'Subject',
      },
      payloadContent: {
        id: 'ocpui.containers.ManageCommunication.form.payloadContent',
        defaultMessage: 'Message Content',
      },
      note: {
        id: 'ocpui.containers.ManageCommunication.form.note',
        defaultMessage: 'Note',
      },
      duration: {
        id: 'ocpui.containers.ManageCommunication.form.duration',
        defaultMessage: 'Duration',
      },
    },
    addRecipient: {
      id: 'ocpui.containers.ManageCommunication.form.addRecipient',
      defaultMessage: 'Add Recipient',
    },
    removeRecipient: {
      id: 'ocpui.containers.ManageCommunication.form.removeRecipient',
      defaultMessage: 'Remove',
    },
    saveButton: {
      id: 'ocpui.containers.ManageCommunication.form.saveButton',
      defaultMessage: 'Save',
    },
    savingButton: {
      id: 'ocpui.containers.ManageCommunication.form.savingButton',
      defaultMessage: 'Saving...',
    },
    cancelButton: {
      id: 'ocpui.containers.ManageCommunication.form.cancelButton',
      defaultMessage: 'Cancel',
    },
  },
  validation: {
    minLength: {
      id: 'ocpui.components.ManageCommunication.manageForm.validation.minLength',
      defaultMessage: 'Minimum {minimumLength} characters',
    },
    textAreaMaxLength: {
      id: 'ocpui.components.ManageCommunication.manageForm.validation.textAreaMaxLength',
      defaultMessage: 'Maximum {textAreaMaxLength} characters',
    },
    textAreaMinLength: {
      id: 'ocpui.components.ManageCommunication.manageForm.validation.textAreaMinLength',
      defaultMessage: 'Minimum {textAreaMinLength} characters',
    },
    required: {
      id: 'ocpui.components.ManageCommunication.manageForm.validation.required',
      defaultMessage: 'Required',
    },
    invalid: {
      id: 'ocpui.components.ManageCommunication.manageForm.validation.invalid',
      defaultMessage: 'Invalid value',
    },
    minStartDate: {
      id: 'ocpui.components.ManageCommunication.manageForm.validation.minStartDate',
      defaultMessage: 'Sent date field must be later than today',
    },
    noRecipients: {
      id: 'ocpui.components.ManageCareTeam.manageForm.validation.noRecipients',
      defaultMessage: 'At least one Recipient must be selected',
    },
  },
});
