import isEmpty from 'lodash/isEmpty';
import identity from 'lodash/identity';
import { EMPTY_STRING, NEW_LINE_CHARACTER } from 'containers/App/constants';


export function flattenPatientData(patient) {
  return {
    ...patient,
    name: mapToName(patient.name),
    identifier: mapToIdentifiers(patient.identifier),
  };
}

function mapToName(nameArray) {
  let name;
  if (!isEmpty(nameArray)) {
    const [{ firstName, lastName }] = nameArray;
    name = [firstName, lastName].filter(identity).join(' ');
  }
  return name;
}

function mapToIdentifiers(identifiers) {
  const SSN_SYSTEM = '2.16.840.1.113883.4.1';
  const SSN_SYSTEM_DISPLAY = 'SSN';
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

function maskSsn(value) {
  let maskSsnValue = value;
  if (!isEmpty(value)) {
    maskSsnValue = new Array(value.length - 3).join('X') + value.substr(value.length - 4, 4);
  }
  return maskSsnValue;
}
