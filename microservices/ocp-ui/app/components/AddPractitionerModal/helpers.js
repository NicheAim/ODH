import { mapToEmail, mapToIdentifiers, mapToName } from 'containers/App/helpers';
import { NEW_LINE_CHARACTER } from 'containers/App/constants';
import isEmpty from 'lodash/isEmpty';
import uniq from 'lodash/uniq';

export function flattenPractitioner(practitioner) {
  let flattenedPractitioner = null;
  if (!isEmpty(practitioner)) {
    const { name, practitionerRoles, identifiers, telecoms } = practitioner;
    flattenedPractitioner = {
      name: mapToName(name),
      orgName: mapToOrganizationName(practitionerRoles),
      roles: mapToRoles(practitionerRoles),
      identifiers: mapToIdentifiers(identifiers),
      email: mapToEmail(telecoms),
    };
  }
  return flattenedPractitioner;
}

function mapToOrganizationName(practitionerRoles) {
  const organizations = practitionerRoles && practitionerRoles
    .map((role) => role.organization)
    .map((organization) => organization.display);
  return uniq(organizations)
    .join(NEW_LINE_CHARACTER);
}

function mapToRoles(practitionerRoles) {
  const roles = practitionerRoles && practitionerRoles
    .map((role) => role.code)
    .pop();
  return roles && roles
    .map((roleCode) => roleCode.display)
    .join(NEW_LINE_CHARACTER);
}
