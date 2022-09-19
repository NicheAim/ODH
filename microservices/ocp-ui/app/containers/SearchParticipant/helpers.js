import { NEW_LINE_CHARACTER } from 'containers/App/constants';
import uniq from 'lodash/uniq';

export function mapSearchParticipantAssociatedOrg(participant) {
  const organizations = participant.practitionerRoles && participant.practitionerRoles
    .map((role) => role.organization)
    .map((organization) => organization.display);
  return uniq(organizations)
    .join(NEW_LINE_CHARACTER);
}
