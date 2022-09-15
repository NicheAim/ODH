import { mapToAddresses, mapToIdentifiers, mapToName, mapToTelecoms } from 'containers/App/helpers';

export function flattenPractitionerData(practitioner) {
  return {
    ...practitioner,
    identifiers: mapToIdentifiers(practitioner.identifiers),
    name: mapToName(practitioner.name),
    addresses: mapToAddresses(practitioner.addresses),
    telecoms: mapToTelecoms(practitioner.telecoms),
  };
}
