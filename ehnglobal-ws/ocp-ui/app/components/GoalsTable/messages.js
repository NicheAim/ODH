/*
 * TaskTable Messages
 *
 * This contains all the text for the TaskTable component.
 */
import { defineMessages } from 'react-intl';

const prefixMessagesId = 'ocpui.components.GoalsTable';

export default defineMessages({
  columnHeaderStatus: {
    id: prefixMessagesId + '.columnHeaderStatus',
    defaultMessage: 'Status',
  },
  columnHeaderAction: {
    id: 'ocpui.components.TaskTable.columnHeaderAction',
    defaultMessage: 'Action',
  },
  editGoal: {
    id: prefixMessagesId + '.editgoal',
    defaultMessage: 'Edit',
  },
  columnHeaderTitle: {
    id: prefixMessagesId + '.columnHeaderTitle',
    defaultMessage: 'Goal',
  },
  columnHeaderDueDate: {
    id: prefixMessagesId + '.columnHeaderDueDate',
    defaultMessage: 'End Date',
  },
  columnHeaderTaskTitle: {
    id: prefixMessagesId + '.columnHeaderTaskTitle',
    defaultMessage: 'Task',
  },
  expansionRowDetails: {
    noRecords: {
      id: prefixMessagesId + '.noRecords',
      defaultMessage: 'No tasks added',
    },
  },
});
