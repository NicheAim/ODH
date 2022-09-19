import uniq from 'lodash/uniq';
import { NEW_LINE_CHARACTER } from 'containers/App/constants';
import Util from 'utils/Util';

export function mapToOrganizationName(practitionerRoles) {
  const organizations = practitionerRoles && practitionerRoles
    .map((role) => role.organization)
    .map((organization) => organization.display);
  return uniq(organizations)
    .join(NEW_LINE_CHARACTER);
}

export function mapToOrganizationNameWithRole(practitionerRoles) {
  const organizations = practitionerRoles && practitionerRoles
    .map((role) => role.organization.display.concat('/').concat(role.uaaRoleDisplayName === null ? 'Unassigned' : Util.deCamelize(role.uaaRoleDisplayName.split('.').pop())));
  return uniq(organizations)
    .join(NEW_LINE_CHARACTER);
}

export function getRoleByOrganization(practitionerRoles, organization) {
  const organizations = practitionerRoles && practitionerRoles
    .filter((role) => role.organization.reference.split('/').pop() === organization)
    .map((role) => role.uaaRoleDisplayName === null ? 'Unassigned' : Util.deCamelize(role.uaaRoleDisplayName.split('.').pop()));
  return uniq(organizations)
    .join(NEW_LINE_CHARACTER);
}
