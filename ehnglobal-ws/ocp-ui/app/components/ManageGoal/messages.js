/*
 * ManageGoal Messages
 */
import { defineMessages } from 'react-intl';

export default defineMessages({
  title: {
    id: 'ocpui.components.ManageGoal.title',
    defaultMessage: 'General Information'
  },
  validation: {
    required: {
      id: 'ocpui.components.ManageGoal.manageForm.validation.required',
      defaultMessage: 'Required',
    },
    minStartDate: {
      id: 'ocpui.components.ManageTask.manageForm.validation.minStartDate',
      defaultMessage: 'Task Start Date field must be later than today',
    },
  },
  hintText: {
    description: {
      id: 'ocpui.components.ManageGoal.manageForm.hintText.description',
      defaultMessage: 'Description',
    },
    patientName: {
      id: 'ocpui.components.ManageGoal.manageForm.hintText.patientName',
      defaultMessage: 'Patient Name',
    },
    requester: {
      id: 'ocpui.components.ManageGoal.manageForm.hintText.requester',
      defaultMessage: 'Created By',
    },
    startDate: {
      id: 'ocpui.components.ManageGoal.manageForm.hintText.startDate',
      defaultMessage: 'Start Date',
    },
    dueDate: {
      id: 'ocpui.components.ManageGoal.manageForm.hintText.dueDate',
      defaultMessage: 'Due Date',
    },
  },
  floatingLabelText: {
    selectedCarePlan: {
      id: 'ocpui.components.ManageGoal.manageForm.floatingLabelText.selectedCarePlan',
      defaultMessage: 'Selected Plan Definition',
    },
    achievementStatus: {
      id: 'ocpui.components.ManageGoal.manageForm.floatingLabelText.achievementStatus',
      defaultMessage: 'Achievement Status',
    },
    lifecycleStatus: {
      id: 'ocpui.components.ManageGoal.manageForm.floatingLabelText.lifecycleStatus',
      defaultMessage: 'Status',
    },
    organization: {
      id: 'ocpui.components.ManageGoal.manageForm.floatingLabelText.organization',
      defaultMessage: 'Organization',
    },
    owner: {
      id: 'ocpui.components.ManageGoal.manageForm.floatingLabelText.owner',
      defaultMessage: 'Owner',
    },
  },
});
