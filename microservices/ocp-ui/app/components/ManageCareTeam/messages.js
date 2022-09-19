/*
 * ManageCareTeam Messages
 *
 * This contains all the text for the ManageCareTeam component.
 */
import { defineMessages } from 'react-intl';

export default defineMessages({
  title: {
    id: 'ocpui.components.ManageCareTeam.title',
    defaultMessage: 'General Information',
  },
  participantTitle: {
    id: 'ocpui.components.ManageCareTeam.participantTitle',
    defaultMessage: 'Participant',
  },
  addParticipantBtnLabel: {
    id: 'ocpui.components.ManageCareTeam.manageForm.addParticipantBtnLabel',
    defaultMessage: 'Add Participant',
  },
  removeParticipantBtnLabel: {
    id: 'ocpui.components.ManageCareTeam.manageForm.removeParticipantBtnLabel',
    defaultMessage: 'Remove',
  },
  participantTableHeaderName: {
    id: 'ocpui.components.ManageCareTeam.manageForm.participantTableHeaderName',
    defaultMessage: 'Name',
  },
  participantTableHeaderType: {
    id: 'ocpui.components.ManageCareTeam.manageForm.participantTableHeaderType',
    defaultMessage: 'Type',
  },
  participantTableHeaderRole: {
    id: 'ocpui.components.ManageCareTeam.manageForm.participantTableHeaderRole',
    defaultMessage: 'Role',
  },
  participantTableHeaderStartDate: {
    id: 'ocpui.components.ManageCareTeam.manageForm.participantTableHeaderStartDate',
    defaultMessage: 'Start Date',
  },
  participantTableHeaderEndDate: {
    id: 'ocpui.components.ManageCareTeam.manageForm.participantTableHeaderEndDate',
    defaultMessage: 'End Date',
  },
  participantTableHeaderAction: {
    id: 'ocpui.components.ManageCareTeam.manageForm.participantTableHeaderAction',
    defaultMessage: 'Action',
  },
  noParticipantAdded: {
    id: 'ocpui.components.ManageCareTeam.manageForm.noParticipantAdded',
    defaultMessage: 'No participant added',
  },
  labelPatientName: {
    id: 'ocpui.components.ManageCareTeam.manageForm.labelPatientName',
    defaultMessage: 'Patient:',
  },
  validation: {
    minLength: {
      id: 'ocpui.components.ManageCareTeam.manageForm.validation.minLength',
      defaultMessage: 'Minimum {minimumLength} characters',
    },
    required: {
      id: 'ocpui.components.ManageCareTeam.manageForm.validation.required',
      defaultMessage: 'Required',
    },
    invalid: {
      id: 'ocpui.components.ManageCareTeam.manageForm.validation.invalid',
      defaultMessage: 'Invalid value',
    },
    minStartDate: {
      id: 'ocpui.components.ManageCareTeam.manageForm.validation.minStartDate',
      defaultMessage: 'Start date field must be later than today',
    },
    minEndDate: {
      id: 'ocpui.components.ManageCareTeam.manageForm.validation.minEndDate',
      defaultMessage: 'End date field must be later than Start date field',
    },
    checkParticipants: {
      id: 'ocpui.components.ManageCareTeam.manageForm.validation.checkParticipants',
      defaultMessage: 'At least one participant must be selected',
    },
  },
  hintText: {
    careTeamName: {
      id: 'ocpui.components.ManageCareTeam.manageForm.hintText.careTeamName',
      defaultMessage: 'Care Team Name',
    },
    category: {
      id: 'ocpui.components.ManageCareTeam.manageForm.hintText.category',
      defaultMessage: 'Category',
    },
    status: {
      id: 'ocpui.components.ManageCareTeam.manageForm.hintText.status',
      defaultMessage: 'Status',
    },
    episodeOfCare: {
      id: 'ocpui.components.ManageCareTeam.manageForm.hintText.episodeOfCare',
      defaultMessage: 'Episode Of Care',
    },
    reason: {
      id: 'ocpui.components.ManageCareTeam.manageForm.hintText.reason',
      defaultMessage: 'Reason',
    },
    startDate: {
      id: 'ocpui.components.ManageCareTeam.manageForm.hintText.startDate',
      defaultMessage: 'Start Date',
    },
    endDate: {
      id: 'ocpui.components.ManageCareTeam.manageForm.hintText.endDate',
      defaultMessage: 'End Date',
    },
  },
  floatingLabelText: {
    careTeamName: {
      id: 'ocpui.components.ManageCareTeam.manageForm.floatingLabelText.careTeamName',
      defaultMessage: 'Care Team Name',
    },
    category: {
      id: 'ocpui.components.ManageCareTeam.manageForm.floatingLabelText.category',
      defaultMessage: 'Category',
    },
    status: {
      id: 'ocpui.components.ManageCareTeam.manageForm.floatingLabelText.status',
      defaultMessage: 'Status',
    },
    episodeOfCare: {
      id: 'ocpui.components.ManageCareTeam.manageForm.floatingLabelText.episodeOfCare',
      defaultMessage: 'Episode Of Care',
    },
    reason: {
      id: 'ocpui.components.ManageCareTeam.manageForm.floatingLabelText.reason',
      defaultMessage: 'Reason',
    },
    startDate: {
      id: 'ocpui.components.ManageCareTeam.manageForm.floatingLabelText.startDate',
      defaultMessage: 'Start Date',
    },
    endDate: {
      id: 'ocpui.components.ManageCareTeam.manageForm.floatingLabelText.endDate',
      defaultMessage: 'End Date',
    },
  },
});
