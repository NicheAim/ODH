/**
 * Helpers is a collection of useful common shared functions are used by OCP Domain containers
 *
 */

import isEmpty from 'lodash/isEmpty';
import upperFirst from 'lodash/upperFirst';
import identity from 'lodash/identity';
import { EMPTY_STRING, NEW_LINE_CHARACTER } from 'containers/App/constants';
import { RESOURCE_TYPE } from 'containers/App/contextConstants';
import Util from 'utils/Util';
import split from 'lodash/split';


const SSN_SYSTEM = '2.16.840.1.113883.4.1';
const SSN_SYSTEM_DISPLAY = 'SSN';

/**
 * Mapping Fhir resources
 * @returns {*}
 */
export function isPatientResourceType(resourceType) {
  // RESOURCE_TYPE could be either 'c2s/Context/PATIENT' or 'c2s/Context/PRACTITIONER'
  const profileArray = RESOURCE_TYPE.PATIENT && split(RESOURCE_TYPE.PATIENT, '/', 3);
  return Util.equalsIgnoreCase(resourceType, profileArray[2]);
}

export function mapToName(nameArray) {
  let name;
  if (!isEmpty(nameArray)) {
    const [{ firstName, lastName }] = nameArray;
    name = [firstName, lastName].filter(identity).join(' ');
  }
  return name;
}

export function mapToIdentifiers(identifiers) {
  return identifiers && identifiers.map((identifier) => {
    const system = identifier.systemDisplay !== EMPTY_STRING ? identifier.systemDisplay : EMPTY_STRING;
    const value = identifier.value !== EMPTY_STRING ? identifier.value : EMPTY_STRING;
    if (identifier.system === SSN_SYSTEM || identifier.systemDisplay === SSN_SYSTEM_DISPLAY) {
      const maskSsnValue = maskSsn(value);
      return `${system}: ${maskSsnValue}`;
    }
    return `${system}: ${value}`;
  }).join(NEW_LINE_CHARACTER);
}

export function mapToTelecoms(telecoms) {
  return telecoms && telecoms.map((telecom) => {
    const system = telecom.system !== EMPTY_STRING ? upperFirst(telecom.system) : EMPTY_STRING;
    const value = telecom.value !== EMPTY_STRING ? telecom.value : EMPTY_STRING;
    return `${system}: ${value}`;
  }).join(NEW_LINE_CHARACTER);
}

export function mapToAddresses(addresses) {
  return addresses && addresses
    .map((address) => combineAddress(address))
    .join(NEW_LINE_CHARACTER);
}

export function combineAddress(address) {
  const addressStr = [];
  addressStr.push(address.line1 || '');
  addressStr.push(address.line2 || '');
  addressStr.push(address.city || '');
  addressStr.push(address.stateCode || '');
  addressStr.push(address.postalCode || '');
  addressStr.push(address.countryCode || '');
  return addressStr
    .filter((field) => field !== '')
    .join(', ');
}

function maskSsn(value) {
  let maskSsnValue = value;
  if (!isEmpty(value)) {
    maskSsnValue = new Array(value.length - 3).join('X') + value.substr(value.length - 4, 4);
  }
  return maskSsnValue;
}
