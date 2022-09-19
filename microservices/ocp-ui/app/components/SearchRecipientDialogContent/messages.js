/*
 * SearchRecipientDialogContent Messages
 *
 * This contains all the text for the SearchRecipientDialogContent component.
 */
import { defineMessages } from 'react-intl';

export default defineMessages({
  searchButtonTooltip: {
    id: 'ocpui.components.SearchRecipient.searchButtonTooltip',
    defaultMessage: 'Search',
  },
  recipientTableHeaderName: {
    id: 'ocpui.components.SearchRecipient.recipientTableHeaderName',
    defaultMessage: 'Name',
  },
  recipientTableHeaderRole: {
    id: 'ocpui.components.SearchRecipient.recipientTableHeaderRole',
    defaultMessage: 'Role',
  },
  noRecipientRecord: {
    id: 'ocpui.components.SearchRecipient.noRecipientRecord',
    defaultMessage: 'No Recipient found.',
  },
  hintText: {
    practitionerName: {
      id: 'ocpui.components.SearchRecipient.hintText.practitionerName',
      defaultMessage: 'Name',
    },
  },
  floatingLabelText: {
    practitionerName: {
      id: 'ocpui.components.SearchRecipient.floatingLabelText.practitionerName',
      defaultMessage: 'Name',
    },
    practitionerMember: {
      id: 'ocpui.components.SearchRecipient.floatingLabelText.practitionerMember',
      defaultMessage: 'Member Type',
    },
  },
});
