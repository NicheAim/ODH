/*
 * ManageActivityDefinition Messages
 *
 * This contains all the text for the ManageActivityDefinition component.
 */
import { defineMessages } from 'react-intl';

export default defineMessages({
  title: {
    id: 'ocpui.components.ManageActivityDefinition.title',
    defaultMessage: 'General Information',
  },
  organizationNameLabel: {
    id: 'app.containers.ManageActivityDefinition.organizationNameLabel',
    defaultMessage: 'Organization Name',
  },
  lastPublishDateLabel: {
    id: 'ocpui.components.ManageActivityDefinition.lastPublishDateLabel',
    defaultMessage: 'Last Publish Date:',
  },
  activityParticipantSubtitle: {
    id: 'ocpui.components.ManageActivityDefinition.activityParticipantSubtitle',
    defaultMessage: 'Activity Participant',
  },
  setOccurrenceSubtitle: {
    id: 'ocpui.components.ManageActivityDefinition.setOccurrenceSubtitle',
    defaultMessage: 'Set Occurrence',
  },
  validation: {
    minLength: {
      id: 'ocpui.components.ManageActivityDefinition.manageForm.validation.minLength',
      defaultMessage: 'Minimum {minimumLength} characters',
    },
    required: {
      id: 'ocpui.components.ManageActivityDefinition.manageForm.validation.required',
      defaultMessage: 'Required',
    },
    requiredRelatedArtifacts: {
      id: 'ocpui.components.ManageActivityDefinition.manageForm.validation.requiredRelatedArtifacts',
      defaultMessage: 'Must have related artifacts',
    },
    minLengthdRelatedArtifacts: {
      id: 'ocpui.components.ManageActivityDefinition.manageForm.validation.minLengthdRelatedArtifacts',
      defaultMessage: 'Minimum of 1 related artifacts',
    },
    invalid: {
      id: 'ocpui.components.ManageActivityDefinition.manageForm.validation.invalid',
      defaultMessage: 'Invalid value',
    },
    minStartDate: {
      id: 'ocpui.components.ManageActivityDefinition.manageForm.validation.minStartDate',
      defaultMessage: 'Effective Start date field must be later than today',
    },
    minEndDate: {
      id: 'ocpui.components.ManageActivityDefinition.manageForm.validation.minEndDate',
      defaultMessage: 'Effective End date field must be later than Effective Start date field',
    },
  },
  hintText: {
    version: {
      id: 'ocpui.components.ManageActivityDefinition.manageForm.hintText.version',
      defaultMessage: 'Version',
    },
    systemName: {
      id: 'ocpui.components.ManageActivityDefinition.manageForm.hintText.systemName',
      defaultMessage: 'System Name',
    },
    displayName: {
      id: 'ocpui.components.ManageActivityDefinition.manageForm.hintText.displayName',
      defaultMessage: 'Display Name',
    },
    description: {
      id: 'ocpui.components.ManageActivityDefinition.manageForm.hintText.description',
      defaultMessage: 'Description',
    },
    duration: {
      id: 'ocpui.components.ManageActivityDefinition.manageForm.hintText.duration',
      defaultMessage: 'Duration #Days',
    },
    frequency: {
      id: 'ocpui.components.ManageActivityDefinition.manageForm.hintText.frequency',
      defaultMessage: 'Frequency #Times',
    },
    effectiveStart: {
      id: 'ocpui.components.ManageActivityDefinition.manageForm.hintText.effectiveStart',
      defaultMessage: 'Effective Period Start Date',
    },
    effectiveEnd: {
      id: 'ocpui.components.ManageActivityDefinition.manageForm.hintText.effectiveEnd',
      defaultMessage: 'Effective Period End Date',
    },
    status: {
      id: 'ocpui.components.ManageActivityDefinition.manageForm.hintText.status',
      defaultMessage: 'Status',
    },
    topic: {
      id: 'ocpui.components.ManageActivityDefinition.manageForm.hintText.topic',
      defaultMessage: 'Topic',
    },
    resourceType: {
      id: 'ocpui.components.ManageActivityDefinition.manageForm.hintText.resourceType',
      defaultMessage: 'Resource Type',
    },
    participantType: {
      id: 'ocpui.components.ManageActivityDefinition.manageForm.hintText.participantType',
      defaultMessage: 'Type',
    },
    participantRole: {
      id: 'ocpui.components.ManageActivityDefinition.manageForm.hintText.participantRole',
      defaultMessage: 'Role',
    },
  },
  floatingLabelText: {
    version: {
      id: 'ocpui.components.ManageActivityDefinition.manageForm.floatingLabelText.version',
      defaultMessage: 'Version',
    },
    systemName: {
      id: 'ocpui.components.ManageActivityDefinition.manageForm.floatingLabelText.systemName',
      defaultMessage: 'System Name',
    },
    displayName: {
      id: 'ocpui.components.ManageActivityDefinition.manageForm.floatingLabelText.displayName',
      defaultMessage: 'Display Name',
    },
    description: {
      id: 'ocpui.components.ManageActivityDefinition.manageForm.floatingLabelText.description',
      defaultMessage: 'Description',
    },
    duration: {
      id: 'ocpui.components.ManageActivityDefinition.manageForm.floatingLabelText.duration',
      defaultMessage: 'Duration',
    },
    frequency: {
      id: 'ocpui.components.ManageActivityDefinition.manageForm.floatingLabelText.frequency',
      defaultMessage: 'Frequency',
    },
    effectiveStart: {
      id: 'ocpui.components.ManageActivityDefinition.manageForm.floatingLabelText.effectiveStart',
      defaultMessage: 'Effective Period Start Date',
    },
    effectiveEnd: {
      id: 'ocpui.components.ManageActivityDefinition.manageForm.floatingLabelText.effectiveEnd',
      defaultMessage: 'Effective Period End Date',
    },
    status: {
      id: 'ocpui.components.ManageActivityDefinition.manageForm.floatingLabelText.status',
      defaultMessage: 'Status',
    },
    topic: {
      id: 'ocpui.components.ManageActivityDefinition.manageForm.floatingLabelText.topic',
      defaultMessage: 'Topic',
    },
    resourceType: {
      id: 'ocpui.components.ManageActivityDefinition.manageForm.floatingLabelText.resourceType',
      defaultMessage: 'ResourceType',
    },
    participantType: {
      id: 'ocpui.components.ManageActivityDefinition.manageForm.floatingLabelText.participantType',
      defaultMessage: 'Type',
    },
    participantRole: {
      id: 'ocpui.components.ManageActivityDefinition.manageForm.floatingLabelText.participantRole',
      defaultMessage: 'Role',
    },
  },
});
