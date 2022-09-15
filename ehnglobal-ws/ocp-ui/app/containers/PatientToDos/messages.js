/*
 * PatientToDos Messages
 *
 * This contains all the text for the PatientToDos component.
 */
import { defineMessages } from 'react-intl';

export default defineMessages({
  noToDoError: {
    id: 'ocpui.containers.PatientToDos.noToDoError',
    defaultMessage: 'Error in getting To Do.',
  },
  noTaskReferenceError: {
    id: 'ocpui.containers.PatientToDos.noTaskReferenceError',
    defaultMessage: 'Error in getting To Do Task reference.',
  },
  buttonLabelCreateNew: {
    id: 'ocpui.containers.PatientToDos.buttonLabelCreateNew',
    defaultMessage: 'New To Do',
  },
  noToDosFound: {
    id: 'ocpui.containers.PatientToDos.noToDosFound',
    defaultMessage: 'No to-dos found.',
  },
  selectLabelDateRange: {
    id: 'ocpui.containers.PatientToDos.selectLabelDateRange',
    defaultMessage: 'Select a date range to filter',
  },
  cancelToDoSuccess: {
    id: 'ocpui.containers.PatientToDos.cancelToDoSuccess',
    defaultMessage: 'Success in cancelling To Do.',
  },
  cancelToDoError: {
    id: 'ocpui.containers.PatientToDos.cancelToDoError',
    defaultMessage: 'Error in cancelling To Do',
  },
  dialog: {
    buttonLabelClose: {
      id: 'ocpui.containers.PatientToDos.buttonLabelClose',
      defaultMessage: 'Close',
    },
    buttonLabelCancelTodo: {
      id: 'ocpui.containers.PatientToDos.buttonLabelCancelTodo',
      defaultMessage: 'Cancel To Do',
    },
    title: {
      id: 'ocpui.containers.PatientToDos.title',
      defaultMessage: 'Cancel To Do',
    },
    confirmCancellationMessage: {
      id: 'ocpui.containers.PatientToDos.confirmCancellationMessage',
      defaultMessage: 'Are you sure you want to cancel this To Do?',
    },
  },
});
