import queryString from 'utils/queryString';
import request from 'utils/request';
import { BASE_CONSENTS_API_URL, getEndpoint } from 'utils/endpointService';
import { DEFAULT_PAGE_SIZE } from 'containers/App/constants';
import isEmpty from 'lodash/isEmpty';
import { lowerCase, merge, omit, upperFirst } from 'lodash';


export function getConsents(query) {
  const baseEndpoint = getEndpoint(BASE_CONSENTS_API_URL);
  const params = queryString({ pageSize: DEFAULT_PAGE_SIZE, ...query });
  const requestURL = `${baseEndpoint}${params}`;
  return request(requestURL);
}

export function getErrorDetail(error) {
  let errorDetail = error.message;
  if (error && error.message === 'Failed to fetch') {
    errorDetail = ' Server is offline.';
  } else if (error && error.response && error.response.status === 500) {
    errorDetail = ' Unknown server error.';
  }
  return errorDetail;
}
export function getConsent(consentId) {
  const requestURL = `${getEndpoint(BASE_CONSENTS_API_URL)}/${consentId}`;
  return request(requestURL);
}

export function getConsentByIdFromStore(consents, logicalId) {
  if (!isEmpty(consents)) {
    return find(consents, { logicalId });
  }
  return null;
}

export function deleteConsent(consent) {
  const baseEndpoint = getEndpoint(BASE_CONSENTS_API_URL);
  const requestURL = `${baseEndpoint}/${consent.logicalId}`;
  return request(requestURL, {
    method: 'PUT',
    body: JSON.stringify(mapToBffConsentDto(consent)),
    headers: {
      'Content-Type': 'application/json',
    },
  });
}
export function mapToBffConsentDto(consent) {
  // If generalDesignation is true, create general consent
  if (!consent.generalDesignation) {
    const fromActor = mapToConsentActors(consent.fromOrganizationActors, consent.fromPractitionerActors);
    const toActor = mapToConsentActors(consent.toOrganizationActors, consent.toPractitionerActors);
    merge(consent, { fromActor });
    merge(consent, { toActor });
  }
  const status = 'entered-in-error';
  merge(consent, { status });
  const delConsent = omit(consent, ['fromOrganizationActors', 'toOrganizationActors', 'fromRelatedPersons', 'fromPractitionerActors', 'toPractitionerActors', 'toRelatedPersons', 'toCareTeams']);

  return delConsent;
}

function mapToConsentActors(organizationActors, practitionercActors) {
  const actorDtos = [];
  if (organizationActors && organizationActors.length > 0) {
    actorDtos.push(
      (organizationActors && organizationActors.length > 0 && organizationActors
        .flatMap(
          (actor) => (actorDto(actor)))));
  }
  if (practitionercActors && practitionercActors.length > 0) {
    actorDtos.push(
      (practitionercActors && practitionercActors.length > 0 && practitionercActors
        .flatMap(
          (actor) => (actorDto(actor)))));
  }
  const flattened = [].concat(...actorDtos);
  return flattened;
}

function actorDto(actor) {
  return {
    reference: `${upperFirst(lowerCase(actor.careTeamType))}/${actor.id}`,
    display: actor.display,
  };
}
