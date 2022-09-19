/*
 * CareTeamTable Messages
 *
 * This contains all the text for the CareTeamTable component.
 */
import { defineMessages } from 'react-intl';

const messageIdPrefix = messageIdPrefix + '';

export default defineMessages({
  columnHeaderName: {
    id: messageIdPrefix + 'columnHeaderName',
    defaultMessage: 'Name',
  },
  columnHeaderStatus: {
    id: messageIdPrefix + 'columnHeaderStatus',
    defaultMessage: 'Status',
  },
  columnHeaderAction: {
    id: messageIdPrefix + 'columnHeaderAction',
    defaultMessage: 'Action',
  },
  columnHeaderCategories: {
    id: messageIdPrefix + 'columnHeaderCategories',
    defaultMessage: 'Categories',
  },
  columnHeaderParticipantsAndRoles: {
    id: messageIdPrefix + 'columnHeaderCategories',
    defaultMessage: 'Participant / Role',
  },
  columnHeaderStartDate: {
    id: messageIdPrefix + 'columnHeaderStartDate',
    defaultMessage: 'Start Date',
  },
  columnHeaderEndDate: {
    id: messageIdPrefix + 'columnHeaderEndDate',
    defaultMessage: 'End Date',
  },
  columnHeaderTelecom: {
    id: messageIdPrefix + 'columnHeaderTelecom',
    defaultMessage: 'Telecom',
  },
  columnHeaderReason: {
    id: messageIdPrefix + 'columnHeaderReason',
    defaultMessage: 'Reason',
  },
  menuItemEdit: {
    id: messageIdPrefix + 'menuItemEdit',
    defaultMessage: 'Edit',
  },
  menuItemManageRelatedPerson: {
    id: messageIdPrefix + 'menuItemManageRelatedPerson',
    defaultMessage: 'Manage Related Person',
  },
  manageRelatedPersonDialogTitle: {
    id: messageIdPrefix + 'manageRelatedPersonDialogTitle',
    defaultMessage: 'Manage Related Person',
  },
  cancelButton: {
    id: messageIdPrefix + 'cancelButton',
    defaultMessage: 'Cancel',
  },
  expansionRowDetails: {
    name: {
      id: messageIdPrefix + 'name',
      defaultMessage: 'Name',
    },
    category: {
      id: messageIdPrefix + 'category',
      defaultMessage: 'Category',
    },
    reason: {
      id: messageIdPrefix + 'reason',
      defaultMessage: 'Reason',
    },
    status: {
      id: messageIdPrefix + 'status',
      defaultMessage: 'Status',
    },
    startDate: {
      id: messageIdPrefix + 'startDate',
      defaultMessage: 'Start Date',
    },
    endDate: {
      id: messageIdPrefix + 'endDate',
      defaultMessage: 'End Date',
    },
    participants: {
      id: messageIdPrefix + 'participants',
      defaultMessage: 'Participants:',
    },
    participantType: {
      id: messageIdPrefix + 'participantType',
      defaultMessage: 'Type',
    },
    role: {
      id: messageIdPrefix + 'role',
      defaultMessage: 'Role',
    },
    noParticipantAdded: {
      id: messageIdPrefix + 'noParticipantAdded',
      defaultMessage: 'No participant added',
    },
  },
});
