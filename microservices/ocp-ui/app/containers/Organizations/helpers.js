import { mapToAddresses, mapToIdentifiers, mapToTelecoms } from 'containers/App/helpers';

export function flattenOrganizationData(organization) {
  return {
    ...organization,
    telecoms: mapToTelecoms(organization.telecoms),
    identifiers: mapToIdentifiers(organization.identifiers),
    addresses: mapToAddresses(organization.addresses),
  };
}
