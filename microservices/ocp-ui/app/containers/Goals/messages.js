/*
 * Messages
 *
 * This contains all the text for the component.
 */
import { defineMessages } from 'react-intl';

const prefixMessagesId = 'ocpui.containers.GoalsMedical';

export default defineMessages({
  tasks: {
    id: prefixMessagesId + '.header',
    defaultMessage: 'Attachments',
  },
  buttonLabelCreateNew: {
    id: prefixMessagesId + '.buttonLabelCreateNew',
    defaultMessage: 'Add Goal',
  },
});
