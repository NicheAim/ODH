/*
 * ManageRelatedPerson Messages
 *
 * This contains all the text for the ManageRelatedPerson component.
 */
import { defineMessages } from 'react-intl';

export default defineMessages({
  title: {
    id: 'ocpui.components.ManageRelatedPerson.manageForm.title',
    defaultMessage: 'General Information',
  },
  patientLabel: {
    id: 'ocpui.components.ManageRelatedPerson.manageForm.patientLabel',
    defaultMessage: 'Patient:',
  },
  active: {
    id: 'ocpui.components.ManageRelatedPerson.manageForm.active',
    defaultMessage: 'Active',
  },
  validation: {
    minLength: {
      id: 'ocpui.components.ManageRelatedPerson.manageForm.validation.minLength',
      defaultMessage: 'Minimum {minimumLength} characters',
    },
    required: {
      id: 'ocpui.components.ManageRelatedPerson.manageForm.validation.required',
      defaultMessage: 'Required',
    },
    invalid: {
      id: 'ocpui.components.ManageRelatedPerson.manageForm.validation.invalid',
      defaultMessage: 'Invalid value',
    },
    minStartDate: {
      id: 'ocpui.components.ManageRelatedPerson.manageForm.validation.minStartDate',
      defaultMessage: 'Start date field must be later than today',
    },
    minEndDate: {
      id: 'ocpui.components.ManageRelatedPerson.manageForm.validation.minEndDate',
      defaultMessage: 'End date field must be later than Start date field',
    },
    emailContact: {
      id: 'ocpui.components.ManageRelatedPerson.manageForm.validation.emailContact',
      defaultMessage: 'Must have at least one email contact.',
    },
    phoneContact: {
      id: 'ocpui.components.ManageRelatedPerson.manageForm.validation.phoneContact',
      defaultMessage: 'Must have at least one phone contact.',
    },
  },
  hintText: {
    firstName: {
      id: 'ocpui.components.ManageRelatedPerson.manageForm.hintText.firstName',
      defaultMessage: 'First Name',
    },
    middleName: {
      id: 'ocpui.components.ManageRelatedPerson.manageForm.hintText.middleName',
      defaultMessage: 'Middle Name',
    },
    lastName: {
      id: 'ocpui.components.ManageRelatedPerson.manageForm.hintText.lastName',
      defaultMessage: 'Last Name',
    },
    dob: {
      id: 'ocpui.components.ManageRelatedPerson.manageForm.floatingLabelText.dob',
      defaultMessage: 'Date of Birth',
    },
    gender: {
      id: 'ocpui.components.ManageRelatedPerson.manageForm.hintText.gender',
      defaultMessage: 'Gender',
    },
    birthSex: {
      id: 'ocpui.components.ManageRelatedPerson.manageForm.floatingLabelText.birthSex',
      defaultMessage: 'Birth Sex',
    },
    identifierType: {
      id: 'ocpui.components.ManageRelatedPerson.manageForm.hintText.identifierType',
      defaultMessage: 'Identifier Type',
    },
    identifierValue: {
      id: 'ocpui.components.ManageRelatedPerson.manageForm.hintText.identifierValue',
      defaultMessage: 'Identifier Value',
    },
    startDate: {
      id: 'ocpui.components.ManageRelatedPerson.manageForm.hintText.startDate',
      defaultMessage: 'Start Date',
    },
    endDate: {
      id: 'ocpui.components.ManageRelatedPerson.manageForm.hintText.endDate',
      defaultMessage: 'End Date',
    },
  },
  floatingLabelText: {
    firstName: {
      id: 'ocpui.components.ManageRelatedPerson.manageForm.floatingLabelText.firstName',
      defaultMessage: 'First Name',
    },
    middleName: {
      id: 'ocpui.components.ManageRelatedPerson.manageForm.floatingLabelText.middleName',
      defaultMessage: 'Middle Name',
    },
    lastName: {
      id: 'ocpui.components.ManageRelatedPerson.manageForm.floatingLabelText.lastName',
      defaultMessage: 'Last Name',
    },
    dob: {
      id: 'ocpui.components.ManageRelatedPerson.manageForm.floatingLabelText.dob',
      defaultMessage: 'Date of Birth',
    },
    gender: {
      id: 'ocpui.components.ManageRelatedPerson.manageForm.floatingLabelText.gender',
      defaultMessage: 'Gender',
    },
    birthSex: {
      id: 'ocpui.components.ManageRelatedPerson.manageForm.floatingLabelText.birthSex',
      defaultMessage: 'Birth Sex',
    },
    identifierType: {
      id: 'ocpui.components.ManageRelatedPerson.manageForm.floatingLabelText.identifierType',
      defaultMessage: 'Identifier Type',
    },
    identifierValue: {
      id: 'ocpui.components.ManageRelatedPerson.manageForm.floatingLabelText.identifierValue',
      defaultMessage: 'Identifier Value',
    },
    startDate: {
      id: 'ocpui.components.ManageRelatedPerson.manageForm.floatingLabelText.startDate',
      defaultMessage: 'Start Date',
    },
    endDate: {
      id: 'ocpui.components.ManageRelatedPerson.manageForm.floatingLabelText.endDate',
      defaultMessage: 'End Date',
    },
    relationshipType: {
      id: 'ocpui.components.ManageRelatedPerson.manageForm.floatingLabelText.relationshipType',
      defaultMessage: 'Relationship Type',
    },
  },
});
