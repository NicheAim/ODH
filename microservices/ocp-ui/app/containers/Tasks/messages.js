/*
 * Tasks Messages
 *
 * This contains all the text for the Tasks component.
 */
import { defineMessages } from 'react-intl';

export default defineMessages({
  patientNotSelected: {
    id: 'ocpui.containers.Tasks.patientNotSelected',
    defaultMessage: 'No tasks found.',
  },
  tasks: {
    id: 'ocpui.containers.Tasks.header',
    defaultMessage: 'tasks',
  },
  buttonLabelCreateNew: {
    id: 'ocpui.containers.Tasks.buttonLabelCreateNew',
    defaultMessage: 'New Task',
  },
  noTasksFound: {
    id: 'ocpui.containers.Tasks.noTasksFound',
    defaultMessage: 'No tasks found.',
  },
  labelPatientName: {
    id: 'ocpui.containers.Tasks.labelPatientName',
    defaultMessage: 'Patient:',
  },
  includeLabel: {
    id: 'ocpui.containers.Tasks.includeLabel',
    defaultMessage: 'Include: ',
  },
  filterLabel: {
    id: 'ocpui.containers.Tasks.filterLabel',
    defaultMessage: 'Filter'
  }
});
