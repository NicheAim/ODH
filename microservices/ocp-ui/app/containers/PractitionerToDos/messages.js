/*
 * PractitionerToDos Messages
 *
 * This contains all the text for the PractitionerToDos component.
 */
import { defineMessages } from 'react-intl';

export default defineMessages({
  noToDoError: {
    id: 'ocpui.containers.PractitionerToDos.noToDoError',
    defaultMessage: 'Error in getting To Do.',
  },
  noTaskReferenceError: {
    id: 'ocpui.containers.PractitionerToDos.noTaskReferenceError',
    defaultMessage: 'Error in getting To Do Task reference.',
  },
  noToDosFound: {
    id: 'ocpui.containers.PractitionerToDos.noToDosFound',
    defaultMessage: 'No to-dos found.',
  },
  selectLabelDateRange: {
    id: 'ocpui.containers.PractitionerToDos.selectLabelDateRange',
    defaultMessage: 'Select a date range to filter',
  },
});
