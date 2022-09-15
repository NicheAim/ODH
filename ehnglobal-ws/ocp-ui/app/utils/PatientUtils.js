import { EMPTY_STRING } from 'containers/App/constants';
import { PHONE_SYSTEM } from 'utils/constants';

export function mapToPatientName(patient) {
  return patient && patient.name && patient.name
    .map((name) => {
      const firstName = name.firstName !== EMPTY_STRING ? name.firstName : EMPTY_STRING;
      const lastName = name.lastName !== EMPTY_STRING ? name.lastName : EMPTY_STRING;
      return `${firstName} ${lastName}`;
    })
    .join(', ');
}

export function mapToPatientPhone(patient) {
  const telecoms = patient.telecoms;
  return telecoms && telecoms
    .filter((telecom) => telecom.system === PHONE_SYSTEM)
    .map((telecom) => telecom.value)
    .join(', ');
}

export function mapToPatientAddress(patient) {
  const addresses = patient.address;
  return addresses && addresses
    .map((address) => combineAddress(address))
    .pop();
}

export function combineAddress(address) {
  const addressStr = [];
  addressStr.push(address.line1 || '');
  addressStr.push(address.line2 || '');
  addressStr.push(address.city || '');
  addressStr.push(address.postalCode || '');
  addressStr.push(address.stateCode || '');
  addressStr.push(address.countryCode || '');
  return addressStr.filter((field) => field !== '').join(', ');
}

export function getPatientName(name) {
  return (name && name.firstName && name.lastName) ? name.firstName.concat(' ').concat(name.lastName) : '';
}
