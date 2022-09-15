/*
 * TaskTable Messages
 *
 * This contains all the text for the TaskTable component.
 */
import { defineMessages } from 'react-intl';

const idPrefix = 'ocpui.components.ObservationsTable';

export default defineMessages({
  columnHeaderCode: {
    id: idPrefix + '.columnHeaderCode',
    defaultMessage: 'Code',
  },
  columnHeaderStatus: {
    id: idPrefix + '.columnHeaderStatus',
    defaultMessage: 'Status',
  },
  columnHeaderValue: {
    id: idPrefix + '.columnHeaderValue',
    defaultMessage: 'Value',
  },
  columnHeaderIssued: {
    id: idPrefix + '.columnHeaderIssued',
    defaultMessage: 'Issued',
  },
  columnHeaderAction: {
    id: idPrefix + '.columnHeaderAction',
    defaultMessage: 'Action',
  },
  editObservation: {
    id: idPrefix + '.edit',
    defaultMessage: 'Edit',
  },
});
