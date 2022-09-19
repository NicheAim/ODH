/*
 * ManagePatient Messages
 *
 * This contains all the text for the ManagePatient component.
 */
import { defineMessages } from 'react-intl';

export default defineMessages({
  title: {
    id: 'ocpui.components.ManagePatient.manageForm.title',
    defaultMessage: 'General Information',
  },
  validation: {
    minLength: {
      id: 'ocpui.components.ManagePatient.manageForm.validation.minLength',
      defaultMessage: 'Minimum {minimumLength} characters',
    },
    exactLength: {
      id: 'ocpui.components.ManagePatient.manageForm.validation.exactLength',
      defaultMessage: 'Exactly {exactLength} characters',
    },
    numericCharacters: {
      id: 'ocpui.components.ManagePatient.manageForm.validation.numericCharacters',
      defaultMessage: 'Only numeric characters',
    },
    required: {
      id: 'ocpui.components.ManagePatient.manageForm.validation.required',
      defaultMessage: 'Required',
    },
    invalid: {
      id: 'ocpui.components.ManagePatient.manageForm.validation.invalid',
      defaultMessage: 'Invalid value',
    },
    emailContact: {
      id: 'ocpui.components.ManagePatient.manageForm.validation.emailContact',
      defaultMessage: 'Must have at least one email contact.',
    },
    phoneContact: {
      id: 'ocpui.components.ManagePatient.manageForm.validation.phoneContact',
      defaultMessage: 'Must have at least one phone contact.',
    },
    addressRequired: {
      id: 'ocpui.components.ManagePatient.manageForm.validation.addressRequired',
      defaultMessage: 'Must have at least one address.',
    },
    noEpisodeOfCares: {
      id: 'ocpui.components.ManagePatient.manageForm.validation.noEpisodeOfCares',
      defaultMessage: 'Must have at least one episode of care.',
    },
    emergencyContact: {
      id: 'ocpui.components.ManagePatient.manageForm.validation.emergencyContact',
      defaultMessage: 'Must have at least two emergency contacts.',
    },
  },
  hintText: {
    firstName: {
      id: 'ocpui.components.ManagePatient.manageForm.hintText.firstName',
      defaultMessage: 'First Name',
    },
    middleName: {
      id: 'ocpui.components.ManagePatient.manageForm.hintText.middleName',
      defaultMessage: 'Middle Name',
    },
    lastName: {
      id: 'ocpui.components.ManagePatient.manageForm.hintText.lastName',
      defaultMessage: 'Last Name',
    },
    dob: {
      id: 'ocpui.components.ManagePatient.manageForm.floatingLabelText.dob',
      defaultMessage: 'Date of Birth',
    },
    gender: {
      id: 'ocpui.components.ManagePatient.manageForm.hintText.gender',
      defaultMessage: 'Gender',
    },
    language: {
      id: 'ocpui.components.ManagePatient.manageForm.floatingLabelText.language',
      defaultMessage: 'Language',
    },
    race: {
      id: 'ocpui.components.ManagePatient.manageForm.floatingLabelText.race',
      defaultMessage: 'Race',
    },
    ethnicity: {
      id: 'ocpui.components.ManagePatient.manageForm.floatingLabelText.ethnicity',
      defaultMessage: 'Ethnicity',
    },
    birthSex: {
      id: 'ocpui.components.ManagePatient.manageForm.floatingLabelText.birthSex',
      defaultMessage: 'Birth Sex',
    },
    identifierType: {
      id: 'ocpui.components.ManagePatient.manageForm.hintText.identifierType',
      defaultMessage: 'Identifier Type',
    },
    identifierValue: {
      id: 'ocpui.components.ManagePatient.manageForm.hintText.identifierValue',
      defaultMessage: 'Identifier Value',
    },
    careManager: {
      id: 'ocpui.components.ManagePatient.manageForm.hintText.careManager',
      defaultMessage: 'Care Manager',
    },
    organization: {
      id: 'ocpui.components.ManagePatient.manageForm.hintText.organization',
      defaultMessage: 'Organization',
    },
  },
  floatingLabelText: {
    firstName: {
      id: 'ocpui.components.ManagePatient.manageForm.floatingLabelText.firstName',
      defaultMessage: 'First Name',
    },
    middleName: {
      id: 'ocpui.components.ManagePatient.manageForm.floatingLabelText.middleName',
      defaultMessage: 'Middle Name',
    },
    lastName: {
      id: 'ocpui.components.ManagePatient.manageForm.floatingLabelText.lastName',
      defaultMessage: 'Last Name',
    },
    dob: {
      id: 'ocpui.components.ManagePatient.manageForm.floatingLabelText.dob',
      defaultMessage: 'Date of Birth',
    },
    gender: {
      id: 'ocpui.components.ManagePatient.manageForm.floatingLabelText.gender',
      defaultMessage: 'Gender',
    },
    language: {
      id: 'ocpui.components.ManagePatient.manageForm.floatingLabelText.language',
      defaultMessage: 'Language',
    },
    race: {
      id: 'ocpui.components.ManagePatient.manageForm.floatingLabelText.race',
      defaultMessage: 'Race',
    },
    ethnicity: {
      id: 'ocpui.components.ManagePatient.manageForm.floatingLabelText.ethnicity',
      defaultMessage: 'Ethnicity',
    },
    birthSex: {
      id: 'ocpui.components.ManagePatient.manageForm.floatingLabelText.birthSex',
      defaultMessage: 'Birth Sex',
    },
    identifierType: {
      id: 'ocpui.components.ManagePatient.manageForm.floatingLabelText.identifierType',
      defaultMessage: 'Identifier Type',
    },
    identifierValue: {
      id: 'ocpui.components.ManagePatient.manageForm.floatingLabelText.identifierValue',
      defaultMessage: 'Identifier Value',
    },
    careManager: {
      id: 'ocpui.components.ManagePatient.manageForm.floatingLabelText.careManager',
      defaultMessage: 'Care Manager',
    },
    organization: {
      id: 'ocpui.components.ManagePatient.manageForm.floatingLabelText.organization',
      defaultMessage: 'Organization',
    },
    eligible: {
      id: 'ocpui.components.ManagePatient.manageForm.floatingLabelText.eligible',
      defaultMessage: 'Eligible',
    },
  },
});
