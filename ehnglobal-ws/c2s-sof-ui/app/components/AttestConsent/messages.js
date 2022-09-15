/*
 * AttestConsent Messages
 *
 * This contains all the text for the AttestConsent component.
 */
import { defineMessages } from 'react-intl';

export default defineMessages({
  header: {
    id: 'c2s.containers.AttestConsent.header',
    defaultMessage: 'Consent to Share My Medical Record',
  },
  subtitle: {
    consentActorsGroup: {
      id: 'c2s.components.AttestConsent.subtitle.consentActorsGroup',
      defaultMessage: 'AUTHORIZATION TO DISCLOSE:',
    },
    purposeOfUseGroup: {
      id: 'c2s.components.AttestConsent.subtitle.purposeOfUseGroup',
      defaultMessage: 'HEALTH INFORMATION TO BE DISCLOSED:',
    },
    consentTerm: {
      id: 'c2s.components.AttestConsent.subtitle.consentTerm',
      defaultMessage: 'CONSENT TERMS:',
    },
  },
  label: {
    patientName: {
      id: 'c2s.components.AttestConsent.label.patientName',
      defaultMessage: 'Patient Name: ',
    },
    patientDob: {
      id: 'c2s.components.AttestConsent.label.patientDob',
      defaultMessage: 'Patient DOB: ',
    },
    authorizes: {
      id: 'c2s.components.AttestConsent.label.authorizes',
      defaultMessage: 'Authorizes:',
    },
    discloses: {
      id: 'c2s.components.AttestConsent.label.discloses',
      defaultMessage: 'To disclose to:',
    },
    purposes: {
      id: 'c2s.components.AttestConsent.label.purposes',
      defaultMessage: 'To SHARE for the following purpose(s):',
    },
    effectiveDate: {
      id: 'c2s.components.AttestConsent.label.effectiveDate',
      defaultMessage: 'Effective Date:',
    },
    expirationDate: {
      id: 'c2s.components.AttestConsent.label.expirationDate',
      defaultMessage: 'Expiration Date:',
    },
  },
  attestTerm: {
    id: 'c2s.components.AttestConsent.attestTerm',
    defaultMessage: 'I, <strong>{patientName}</strong>, understand that my records are protected under the federal regulations governing Confidentiality of Alcohol and Drug Abuse Patient Records, 42 CFR part 2, and cannot be disclosed without my written permission or as otherwise permitted by 42 CFR part 2. I also understand that I may revoke this consent at any time except to the extent that action has been taken in reliance on it, and that any event this consent expires automatically as follows:',
  },
  agreementTerm: {
    id: 'c2s.components.AttestConsent.agreementTerm',
    defaultMessage: 'I, <strong>{patientName}</strong>, hereby accept and understand the terms of this consent.',
  },
  agreementTermOnBehalfOfPatient: {
    id: 'c2s.components.AttestConsent.agreementTerm',
    defaultMessage: 'I, <strong>{careCoordinatorName}</strong> on behalf of <strong>{patientName}</strong>, hereby accept and understand the terms of this consent.',
  },
  completeButton: {
    id: 'ocpui.components.AttestConsent.completeButton',
    defaultMessage: 'Complete',
  },
});
