import { mapToAddresses, mapToIdentifiers, mapToName, mapToPhone, mapToTelecoms } from 'containers/App/helpers';

export function flattenPatientData(patient) {
  return {
    ...patient,
    name: mapToName(patient.name),
    identifier: mapToIdentifiers(patient.identifier),
    addresses: mapToAddresses(patient.addresses),
    phones: mapToPhone(patient.telecoms),
    telecoms: mapToTelecoms(patient.telecoms),
  };
}
