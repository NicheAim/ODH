import concat from 'lodash/concat';
import union from 'lodash/union';

const NEW_LINE_CHARACTER = '\n';

export function flattenConsentData(consent) {
  return {
    ...consent,
    fromActor: mapToConsentActors(consent.fromOrganizationActors, consent.fromPractitionerActors, consent.fromCareTeams, consent.fromRelatedPersons),
    toActor: mapToConsentActors(consent.toOrganizationActors, consent.toPractitionerActors, consent.toCareTeams, consent.toRelatedPersons),
    period: mapToPeriod(consent.period),
    purpose: mapToConsentPurpose(consent.purpose),
  };
}

function mapToConsentActors(organizationActors, practitionerActors, careTeams, relatedPersons) {
  const organizationDisplays = organizationActors && organizationActors.length > 0 &&
    concat(organizationActors
      .map((actor) => `- ${actor.display}`)
      .join(NEW_LINE_CHARACTER), NEW_LINE_CHARACTER);
  const practitionerDisplays = practitionerActors && practitionerActors.length > 0 &&
    concat(practitionerActors
      .map((actor) => `- ${actor.display}`)
      .join(NEW_LINE_CHARACTER), NEW_LINE_CHARACTER);
  const careTeamDisplays = careTeams && careTeams.length > 0 &&
    concat(careTeams
      .map((actor) => `- ${actor.display}`)
      .join(NEW_LINE_CHARACTER), NEW_LINE_CHARACTER);
  const relatedPersonDisplays = relatedPersons && relatedPersons.length > 0 &&
    concat(relatedPersons
      .map((actor) => `- ${actor.display}`)
      .join(NEW_LINE_CHARACTER), NEW_LINE_CHARACTER);

  return union(organizationDisplays, practitionerDisplays, careTeamDisplays, relatedPersonDisplays);
}

function mapToConsentPurpose(purposes) {
  return (
    (purposes && purposes.length > 0 && purposes
      .map((purpose) => `- ${purpose.display}`)
      .join(NEW_LINE_CHARACTER)));
}

function mapToPeriod(period) {
  return period && `${period.start} - ${period.end}`;
}
