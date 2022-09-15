/*
 * PatientHome Messages
 *
 * This contains all the text for the PatientHome component.
 */
import { defineMessages } from 'react-intl';

export default defineMessages({
  consentPanelSummary: {
    id: 'c2s.components.PatientHome.consentPanelSummary',
    defaultMessage: 'Patient\'s Consents',
  },
  patientBanner: {
    identifier: {
      id: 'c2s.components.PatientHome.patientBanner.identifier',
      defaultMessage: 'Identifier',
    },
    birthDate: {
      id: 'c2s.components.PatientHome.patientBanner.birthDate',
      defaultMessage: 'DOB',
    },
    gender: {
      id: 'c2s.components.PatientHome.patientBanner.gender',
      defaultMessage: 'Gender',
    },
    mrn: {
      id: 'c2s.components.PatientHome.patientBanner.mrn',
      defaultMessage: 'MRN',
    },
  },
});
