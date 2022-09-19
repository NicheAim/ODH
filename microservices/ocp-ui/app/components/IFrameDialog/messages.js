import { defineMessages } from 'react-intl';

const messagesIdPrefix = 'ocpui.components.IFrameDialog';

export default defineMessages({
  dialogTitle: {
    id: messagesIdPrefix + '.dialogTitle',
    defaultMessage: 'Dialog',
  },
  cancelButton: {
    id: messagesIdPrefix + '.cancelButton',
    defaultMessage: 'Close',
  },
});
