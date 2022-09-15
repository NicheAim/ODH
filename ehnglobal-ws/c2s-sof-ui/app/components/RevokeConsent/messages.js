/*
 * RevokeConsent Messages
 *
 * This contains all the text for the RevokeConsent component.
 */
import { defineMessages } from 'react-intl';

export default defineMessages({
  header: {
    id: 'ocpui.containers.RevokeConsent.header',
    defaultMessage: 'Revocation of Consent to Share My Health Information',
  },
  subtitle: {
    consentTerm: {
      id: 'ocpui.components.RevokeConsent.subtitle.consentTerm',
      defaultMessage: 'CONSENT TERMS:',
    },
  },
  label: {
    consentRef: {
      id: 'ocpui.components.RevokeConsent.label.consentRef',
      defaultMessage: 'Consent Reference Number: ',
    },
    patientName: {
      id: 'ocpui.components.RevokeConsent.label.patientName',
      defaultMessage: 'Patient Name: ',
    },
    patientDob: {
      id: 'ocpui.components.RevokeConsent.label.patientDob',
      defaultMessage: 'Patient DOB: ',
    },
    effectiveDate: {
      id: 'ocpui.components.RevokeConsent.label.effectiveDate',
      defaultMessage: 'Effective Date:',
    },
    expirationDate: {
      id: 'ocpui.components.RevokeConsent.label.expirationDate',
      defaultMessage: 'Expiration Date:',
    },
  },
  revokeTerm: {
    id: 'ocpui.components.RevokeConsent.attestTerm',
    defaultMessage: '<br/>I have previously signed a patient consent form allowing my providers to access my electronic health records through the Consent2Share system and now want to withdraw that consent. If I sign this form as the Patient\'s Legal' +
    ' Representative, I understand that all references in this form to "me" or "my" refer to the Patient.' +
    '<br/>' +
    '<br/>' +
    'By withdrawing my Consent, I understand that:\n' +
    '</br /> <ol>' +
    ' <li>I Deny Consent for all Participants to access my electronic health information through Consent2Share for any purpose, EXCEPT in a medical emergency.</li>' +
    ' <li>Health care provider and health insurers that I am enrolled with will no longer be able to access health information about me through Consent2Share, except in an emergency.</li>' +
    ' <li>The Withdrawal of Consent will not affect the exchange of my health information while my Consent was in effect.</li>' +
    ' <li>No Consent2Share participating provider will deny me medical care and my insurance eligibility will not be affected based on my Withdrawal of Consent.</li>' +
    ' <li>If I wish to reinstate Consent, I may do so by signing and completing a new Patient Consent form and returning it to a participating provider or payer.</li>' +
    ' <li>Revoking my Consent does not prevent my health care provider from submitting claims to my health insurer for reimbursement for services rendered to me in reliance on the Consent while it was in effect.</li>' +
    ' <li>I understand that I will get a copy of this form after I sign it.</li>' +
    '</ol>',
  },
  agreementTerm: {
    id: 'ocpui.components.RevokeConsent.agreementTerm',
    defaultMessage: 'I, <strong>{patientName}</strong>, hereby accept and understand the terms of this consent.',
  },
  completeButton: {
    id: 'ocpui.components.RevokeConsent.completeButton',
    defaultMessage: 'Complete',
  },
});
