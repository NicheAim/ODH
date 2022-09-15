/*
 * PractitionerTasks Messages
 *
 * This contains all the text for the PractitionerTasks component.
 */
import { defineMessages } from 'react-intl';

export default defineMessages({
  noTaskError: {
    id: 'ocpui.containers.PractitionerTasks.noTaskError',
    defaultMessage: 'Error in getting Task.',
  },
  noTaskReferenceError: {
    id: 'ocpui.containers.PractitionerTasks.noTaskReferenceError',
    defaultMessage: 'Error in getting Task reference.',
  },
  noTasksFound: {
    id: 'ocpui.containers.PractitionerTasks.noTasksFound',
    defaultMessage: 'No tasks found.',
  },
  selectLabelDateRange: {
    id: 'ocpui.containers.PractitionerTasks.selectLabelDateRange',
    defaultMessage: 'Select a date range to filter',
  },
});
