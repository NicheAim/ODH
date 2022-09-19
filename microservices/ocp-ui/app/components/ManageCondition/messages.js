/*
 * ManageCondition Messages
 *
 * This contains all the text for the ManageCondition component.
 */
import { defineMessages } from 'react-intl';

export default defineMessages({
  title: {
    id: 'ocpui.components.ManageCondition.manageForm.title',
    defaultMessage: 'General Information',
  },
  patientLabel: {
    id: 'ocpui.components.ManageCondition.manageForm.patientLabel',
    defaultMessage: 'Patient:',
  },
  active: {
    id: 'ocpui.components.ManageCondition.manageForm.active',
    defaultMessage: 'Active',
  },
  validation: {
    minLength: {
      id: 'ocpui.components.ManageCondition.manageForm.validation.minLength',
      defaultMessage: 'Minimum {minimumLength} characters',
    },
    required: {
      id: 'ocpui.components.ManageCondition.manageForm.validation.required',
      defaultMessage: 'Required',
    },
    invalid: {
      id: 'ocpui.components.ManageCondition.manageForm.validation.invalid',
      defaultMessage: 'Invalid value',
    },
    minStartDate: {
      id: 'ocpui.components.ManageCondition.manageForm.validation.minStartDate',
      defaultMessage: 'Start date field must be later than today',
    },
    minEndDate: {
      id: 'ocpui.components.ManageCondition.manageForm.validation.minEndDate',
      defaultMessage: 'End date field must be later than Start date field',
    },
    emailContact: {
      id: 'ocpui.components.ManageCondition.manageForm.validation.emailContact',
      defaultMessage: 'Must have at least one email contact.',
    },
    phoneContact: {
      id: 'ocpui.components.ManageCondition.manageForm.validation.phoneContact',
      defaultMessage: 'Must have at least one phone contact.',
    },
  },
  hintText: {
    firstName: {
      id: 'ocpui.components.ManageCondition.manageForm.hintText.firstName',
      defaultMessage: 'First Name',
    },
    middleName: {
      id: 'ocpui.components.ManageCondition.manageForm.hintText.middleName',
      defaultMessage: 'Middle Name',
    },
    lastName: {
      id: 'ocpui.components.ManageCondition.manageForm.hintText.lastName',
      defaultMessage: 'Last Name',
    },
    dob: {
      id: 'ocpui.components.ManageCondition.manageForm.floatingLabelText.dob',
      defaultMessage: 'Date of Birth',
    },
    gender: {
      id: 'ocpui.components.ManageCondition.manageForm.hintText.gender',
      defaultMessage: 'Gender',
    },
    birthSex: {
      id: 'ocpui.components.ManageCondition.manageForm.floatingLabelText.birthSex',
      defaultMessage: 'Birth Sex',
    },
    identifierType: {
      id: 'ocpui.components.ManageCondition.manageForm.hintText.identifierType',
      defaultMessage: 'Identifier Type',
    },
    identifierValue: {
      id: 'ocpui.components.ManageCondition.manageForm.hintText.identifierValue',
      defaultMessage: 'Identifier Value',
    },
    startDate: {
      id: 'ocpui.components.ManageCondition.manageForm.hintText.startDate',
      defaultMessage: 'Start Date',
    },
    recordedDate: {
      id: 'ocpui.components.ManageCondition.manageForm.hintText.recordedDate',
      defaultMessage: 'Recorded Date',
    },
    conditionCode: {
      id: 'ocpui.components.ManageCondition.manageForm.hintText.firstName',
      defaultMessage: 'Condition',
    },
    diagnosisPriorityCode: {
      id: 'ocpui.components.ManageCondition.manageForm.hintText.diagnosisPriorityCode',
      defaultMessage: 'Diagnosis Priority',
    },
  },
  floatingLabelText: {
    firstName: {
      id: 'ocpui.components.ManageCondition.manageForm.floatingLabelText.firstName',
      defaultMessage: 'First Name',
    },
    middleName: {
      id: 'ocpui.components.ManageCondition.manageForm.floatingLabelText.middleName',
      defaultMessage: 'Middle Name',
    },
    lastName: {
      id: 'ocpui.components.ManageCondition.manageForm.floatingLabelText.lastName',
      defaultMessage: 'Last Name',
    },
    dob: {
      id: 'ocpui.components.ManageCondition.manageForm.floatingLabelText.dob',
      defaultMessage: 'Date of Birth',
    },
    gender: {
      id: 'ocpui.components.ManageCondition.manageForm.floatingLabelText.gender',
      defaultMessage: 'Gender',
    },
    birthSex: {
      id: 'ocpui.components.ManageCondition.manageForm.floatingLabelText.birthSex',
      defaultMessage: 'Birth Sex',
    },
    identifierType: {
      id: 'ocpui.components.ManageCondition.manageForm.floatingLabelText.identifierType',
      defaultMessage: 'Identifier Type',
    },
    identifierValue: {
      id: 'ocpui.components.ManageCondition.manageForm.floatingLabelText.identifierValue',
      defaultMessage: 'Identifier Value',
    },
    startDate: {
      id: 'ocpui.components.ManageCondition.manageForm.floatingLabelText.startDate',
      defaultMessage: 'Start Date',
    },
    recordedDate: {
      id: 'ocpui.components.ManageCondition.manageForm.floatingLabelText.recordedDate',
      defaultMessage: 'Recorded Date',
    },
    relationshipType: {
      id: 'ocpui.components.ManageCondition.manageForm.floatingLabelText.relationshipType',
      defaultMessage: 'Relationship Type',
    },
    conditionCode: {
      id: 'ocpui.components.ManageCondition.manageForm.floatingLabelText.ConditionCode',
      defaultMessage: 'Condition Code',
    },
    diagnosisPriorityCode: {
      id: 'ocpui.components.ManageCondition.manageForm.floatingLabelText.diagnosisPriorityCode',
      defaultMessage: 'Diagnosis Priority',
    },
  },
});
