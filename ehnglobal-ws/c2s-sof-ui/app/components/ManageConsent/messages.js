/*
 * ManageConsent Messages
 *
 * This contains all the text for the ManageConsent component.
 */
import { defineMessages } from 'react-intl';

export default defineMessages({
  selectActorsTitle: {
    id: 'c2s.components.ManageConsent.selectActorsTitle',
    defaultMessage: 'Selected Care Teams',
  },
  consentType: {
    id: 'c2s.components.ManageConsent.consentType',
    defaultMessage: 'Make available to my entire care team',
  },
  medicalInformationTitle: {
    id: 'c2s.components.ManageConsent.medicalInformationTitle',
    defaultMessage: 'Medical Record',
  },
  purposeOfUseTitle: {
    id: 'c2s.components.ManageConsent.purposeOfUseTitle',
    defaultMessage: 'Purpose Of Use',
  },
  consentTermTitle: {
    id: 'c2s.components.ManageConsent.consentTermTitle',
    defaultMessage: 'Consent Terms',
  },
  consentTermSubtitle: {
    id: 'c2s.components.ManageConsent.consentTermSubtitle',
    defaultMessage: 'Enter a start and end date during which your medical records will be shared.',
  },
  validation: {
    minMedicalInfo: {
      id: 'c2s.components.ManageConsent.manageForm.validation.minMedicalInfo',
      defaultMessage: 'Consent must have at least ONE medical information category',
    },
    minPurpose: {
      id: 'c2s.components.ManageConsent.manageForm.validation.minPurpose',
      defaultMessage: 'Consent must have at least ONE purpose of use',
    },
    minFromActors: {
      id: 'c2s.components.ManageConsent.manageForm.validation.minFromActors',
      defaultMessage: 'Consent must have at least ONE Organization/Practitioner to authorize',
    },
    minToActors: {
      id: 'c2s.components.ManageConsent.manageForm.validation.minToActors',
      defaultMessage: 'Consent must have at least ONE Organization/Practitioner to disclose',
    },
    required: {
      id: 'c2s.components.ManageConsent.manageForm.validation.required',
      defaultMessage: 'Required',
    },
    invalid: {
      id: 'c2s.components.ManageConsent.manageForm.validation.invalid',
      defaultMessage: 'Invalid value',
    },
    minStartDate: {
      id: 'c2s.components.ManageConsent.manageForm.validation.minStartDate',
      defaultMessage: 'Consent Start date field must be later than today',
    },
    minEndDate: {
      id: 'c2s.components.ManageConsent.manageForm.validation.minEndDate',
      defaultMessage: 'Consent End date field must be later than Consent Start date field',
    },
  },
  hintText: {
    consentStart: {
      id: 'c2s.components.ManageConsent.manageForm.hintText.consentStart',
      defaultMessage: 'Consent Start Date',
    },
    consentEnd: {
      id: 'c2s.components.ManageConsent.manageForm.hintText.consentEnd',
      defaultMessage: 'Consent End Date',
    },
  },
  floatingLabelText: {
    consentStart: {
      id: 'c2s.components.ManageConsent.manageForm.floatingLabelText.consentStart',
      defaultMessage: 'Consent Start Date',
    },
    consentEnd: {
      id: 'c2s.components.ManageConsent.manageForm.floatingLabelText.consentEnd',
      defaultMessage: 'Consent End Date',
    },
  },
});
