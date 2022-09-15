/*
 * ConfirmPatientModal Messages
 *
 * This contains all the text for the ConfirmPatientModal component.
 */
import { defineMessages } from 'react-intl';

export default defineMessages({
  continueButton: {
    id: 'ocpui.components.ConfirmPatientModal.continueButton',
    defaultMessage: 'Continue',
  },
  patientWithRepeatedName: {
    id: 'ocpui.components.ConfirmPatientModal.patientWithRepeatedName',
    defaultMessage: 'This name appears multiple times in beneficiary list. Please double check this is the correct beneficiary'
  }
});
