import { mapToAddresses, mapToIdentifiers, mapToName, mapToTelecoms } from 'containers/App/helpers';
import upperFirst from 'lodash/upperFirst';

export function flattenPatientData(patient) {
  return {
    ...patient,
    name: mapToName(patient.name),
    identifier: mapToIdentifiers(patient.identifier),
    addresses: mapToAddresses(patient.addresses),
    telecoms: mapToTelecoms(patient.telecoms),
    genderCode: upperFirst(patient.genderCode),
  };
}
