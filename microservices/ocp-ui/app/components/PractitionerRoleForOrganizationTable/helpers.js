import { mapToAddresses, mapToIdentifiers } from 'containers/App/helpers';

export function flattenOrganization(organization) {
  const { identifiers, addresses, active } = organization;
  return {
    ...organization,
    addresses: mapToAddresses(addresses),
    identifiers: mapToIdentifiers(identifiers),
    active: mapToStatus(active),
  };
}

function mapToStatus(active) {
  return active ? 'Active' : 'Inactive';
}
