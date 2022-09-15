/**
 * Helpers is a collection of useful common shared functions are used by OCP Domain containers
 *
 */
import {
  ADMIN_WORKSPACE,
  BENEFITS_SPECIALIST_ROLE_CODE,
  CARE_COORDINATOR_ROLE_CODE,
  CARE_MANAGER_ROLE_CODE,
  EMPTY_STRING,
  FRONT_OFFICE_ROLE_CODE,
  HEALTH_ASSISTANT_ROLE_CODE,
  NEW_LINE_CHARACTER,
  OCP_ADMIN_ROLE_CODE,
  ORGANIZATION_ADMIN_ROLE_CODE,
  PATIENT_ROLE_CODE,
  PATIENT_WORKSPACE,
  PCP_ROLE_CODE,
  PRACTITIONER_WORKSPACE,
} from 'containers/App/constants';
import identity from 'lodash/identity';
import isEmpty from 'lodash/isEmpty';
import upperFirst from 'lodash/upperFirst';
import { EMAIL_SYSTEM, PHONE_SYSTEM } from 'utils/constants';
import Util from 'utils/Util';
import { env_vars } from '../../../env';

const SSN_SYSTEM = '2.16.840.1.113883.4.1';
const SSN_SYSTEM_DISPLAY = 'SSN';

const MEDICAID_SYSTEM =
  env_vars.REACT_APP_PATIENT_IDENTIFIER_MEDICAID_ID_SYSTEM;
const MEDICAID_DISPLAY =
  env_vars.REACT_APP_PATIENT_IDENTIFIER_MEDICAID_ID_SYSTEM;

/**
 * Mapping Fhir resources
 * @returns {*}
 */

export function mapToName(nameArray) {
  let name;
  if (!isEmpty(nameArray)) {
    const [{ firstName, lastName }] = nameArray;
    name = [firstName, lastName].filter(identity).join(' ');
  }
  return name;
}

export function mapToIdentifiers(identifiers) {
  return (
    identifiers &&
    identifiers
      .map((identifier) => {
        const system =
          identifier.systemDisplay !== EMPTY_STRING
            ? identifier.systemDisplay
            : EMPTY_STRING;
        const value =
          identifier.value !== null && identifier.value !== EMPTY_STRING
            ? identifier.value
            : EMPTY_STRING;
        if (
          identifier.system === MEDICAID_SYSTEM ||
          identifier.systemDisplay === MEDICAID_DISPLAY
        ) {
          return `Medicaid ID: ${value}`;
        }
        if (system.indexOf('http') === 0) return `Identifier: ${value}`;
        return `${system}: ${value}`;
      })
      .join(NEW_LINE_CHARACTER)
  );
}

export function mapToTelecoms(telecoms) {
  return (
    telecoms &&
    telecoms
      .map((telecom) => {
        const system =
          telecom.system !== EMPTY_STRING
            ? upperFirst(telecom.system)
            : EMPTY_STRING;
        const value =
          telecom.value !== EMPTY_STRING ? telecom.value : EMPTY_STRING;
        return `${system}: ${value}`;
      })
      .join(NEW_LINE_CHARACTER)
  );
}

export function mapToPhone(telecoms) {
  return (
    telecoms &&
    telecoms
      .filter((telecom) => Util.equalsIgnoreCase(telecom.system, PHONE_SYSTEM))
      .map((telecom) => telecom.value)
      .join(NEW_LINE_CHARACTER)
  );
}

export function mapToEmail(telecoms) {
  return (
    telecoms &&
    telecoms
      .filter((telecom) => Util.equalsIgnoreCase(telecom.system, EMAIL_SYSTEM))
      .map((telecom) => telecom.value)
      .join(NEW_LINE_CHARACTER)
  );
}

export function mapToAddresses(addresses) {
  return (
    addresses &&
    addresses.map((address) => combineAddress(address)).join(NEW_LINE_CHARACTER)
  );
}

export function combineAddress(address) {
  const { line1, line2, city, stateCode, postalCode, countryCode } = address;
  const firstLineAddress = [line1, line2].filter(identity).join(', ');
  const secondLineAddress = [city, stateCode, postalCode, countryCode]
    .filter(identity)
    .join(', ');
  return [firstLineAddress, secondLineAddress]
    .filter(identity)
    .join(NEW_LINE_CHARACTER);
}

export function getLinkUrlByRole(role) {
  let linkUrl;
  switch (role) {
    case OCP_ADMIN_ROLE_CODE:
      linkUrl = ADMIN_WORKSPACE;
      break;
    case PATIENT_ROLE_CODE:
      linkUrl = PATIENT_WORKSPACE;
      break;
    default:
      linkUrl = PRACTITIONER_WORKSPACE;
  }
  return linkUrl;
}

export function getPractitionerIdByRole(user) {
  let practitionerId;
  if (
    user &&
    user.role &&
    user.role !== OCP_ADMIN_ROLE_CODE &&
    user.fhirResource
  ) {
    practitionerId = user ? user.fhirResource.logicalId : null;
  }
  return practitionerId;
}

export function getRoleByScope(scope) {
  let role;
  switch (scope.split('.').pop(-1)) {
    case 'ocpAdmin':
      role = OCP_ADMIN_ROLE_CODE;
      break;
    case 'patient':
      role = PATIENT_ROLE_CODE;
      break;
    case 'careCoordinator':
      role = CARE_COORDINATOR_ROLE_CODE;
      break;
    case 'careManager':
      role = CARE_MANAGER_ROLE_CODE;
      break;
    case 'organizationAdministrator':
      role = ORGANIZATION_ADMIN_ROLE_CODE;
      break;
    case 'primaryCareProvider':
      role = PCP_ROLE_CODE;
      break;
    case 'benefitsSpecialist':
      role = BENEFITS_SPECIALIST_ROLE_CODE;
      break;
    case 'healthAssistant':
      role = HEALTH_ASSISTANT_ROLE_CODE;
      break;
    case 'frontOfficeReceptionist':
      role = FRONT_OFFICE_ROLE_CODE;
      break;
    default:
      role = null;
  }
  return role;
}

export function maskSsn(value) {
  let maskSsnValue = value;
  if (!isEmpty(value)) {
    maskSsnValue =
      new Array(value.length - 3).join('X') + value.substr(value.length - 4, 4);
  }
  return maskSsnValue;
}

export function isAdminWorkspace(pathname) {
  return pathname && pathname === ADMIN_WORKSPACE;
}

export function composePatientReference(patient) {
  return {
    reference: `Patient/${patient.id}`,
    display: getPatientFullName(patient),
  };
}

export function getPatientFullName(patient) {
  const { name } = patient;
  let fullName = '';
  if (name && name.length > 0) {
    fullName = `${name[0].firstName} ${name[0].lastName}`;
  } else if (patient && patient.firstName && patient.lastName) {
    const { firstName, lastName } = patient;
    fullName = firstName.concat(' ').concat(lastName);
  }
  return fullName;
}

export function getErrorDetail(error) {
  let errorDetail = error.message;
  if (error && error.message === 'Failed to fetch') {
    errorDetail = ' Server is offline.';
  } else if (error && error.response && error.response.status === 500) {
    errorDetail = ' Unknown server error.';
  }
  return errorDetail;
}

export function flattenLocationData(location) {
  return {
    ...location,
    telecoms: mapToTelecoms(location.telecoms),
    address: combineAddress(location.address),
    identifiers: mapToIdentifiers(location.identifiers),
  };
}

export function getLogicalIdFromReference(reference) {
  const referenceArray = reference && reference.split('/');
  const logicalId =
    referenceArray && referenceArray.length > 0 && referenceArray[1];
  return logicalId;
}

export function getReferenceTypeFromReference(reference) {
  const referenceArray = reference && reference.split('/');
  const referenceType =
    referenceArray && referenceArray.length > 0 && referenceArray[0];
  return referenceType;
}
