import { env_vars } from '../../../env';

export const TEXT_MIN_LENGTH = 3;
export const SSN_EXACT_LENGTH = 9;
export const MEDICAID_ID_EXACT_LENGTH = 12;
export const EMAIL = 'email';
export const PHONE = 'phone';
export const IDENTIFIER_TYPE_MEDICA_ID = env_vars.REACT_APP_PATIENT_IDENTIFIER_MEDICAID_ID_SYSTEM;
export const IDENTIFIER_TYPE_SSN = 'http://hl7.org/fhir/sid/us-ssn';