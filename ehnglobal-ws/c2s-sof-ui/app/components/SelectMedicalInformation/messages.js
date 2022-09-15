/*
 * SelectMedicalInformation Messages
 *
 * This contains all the text for the SelectMedicalInformation component.
 */
import { defineMessages } from 'react-intl';

export default defineMessages({
  medicalInfoTitle: {
    id: 'c2s.components.SelectMedicalInformation.medicalInfoTitle',
    defaultMessage: 'Select how you would like to share your medical record.',
  },
  shareAll: {
    id: 'c2s.components.SelectMedicalInformation.shareAll',
    defaultMessage: '<strong>SHARE</strong> my medical record <strong>WITHOUT ANY EXCEPTION</strong> of medical information categories',
  },
  shareSpecific: {
    id: 'c2s.components.SelectMedicalInformation.shareSpecific',
    defaultMessage: '<strong>SHARE</strong> my medical record <strong>WITH EXCEPTION</strong> of specific medical information categories',
  },
  medicalInfoDialogTitle: {
    id: 'c2s.components.SelectMedicalInformation.medicalInfoDialogTitle',
    defaultMessage: 'Privacy Settings',
  },
  medicalInfoDialogSubtitle: {
    id: 'c2s.components.SelectMedicalInformation.medicalInfoDialogSubtitle',
    defaultMessage: 'Please select the medical record that you want to share',
  },
  okButton: {
    id: 'c2s.components.SelectMedicalInformation.okButton',
    defaultMessage: 'OK',
  },
});
