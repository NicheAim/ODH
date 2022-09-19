import { defineMessages } from 'react-intl';

const messagesIdPrefix = 'ocpui.components.RefreshTokenDialog';

export default defineMessages({
  dialogTitle: {
    id: messagesIdPrefix + '.dialogTitle',
    defaultMessage: 'Session status',
  },
  cancelButton: {
    id: messagesIdPrefix + '.cancelButton',
    defaultMessage: 'End session now',
  },
  refreshButton: {
    id: messagesIdPrefix + '.refreshButton',
    defaultMessage: 'Continue session',
  },
});
