/*
 * TaskTable Messages
 *
 * This contains all the text for the TaskTable component.
 */
import { defineMessages } from 'react-intl';

const idPrefix = 'ocpui.components.AttachmentsTable';

export default defineMessages({
  columnHeaderContentType: {
    id: idPrefix + '.columnHeaderContentType',
    defaultMessage: 'Content Type',
  },
  columnHeaderTitle: {
    id: idPrefix + '.columnHeaderTitle',
    defaultMessage: 'Title',
  },
  columnHeaderCreation: {
    id: idPrefix + '.columnHeaderCreation',
    defaultMessage: 'Creation',
  },
});
