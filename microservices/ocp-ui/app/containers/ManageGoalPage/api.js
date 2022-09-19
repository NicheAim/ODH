import {
  getCodeSystem,
  GOAL_CATEGORY_CODE_SYSTEM,
  GOAL_STATUS_CODE_SYSTEM,
  GOAL_ACHIEVEMENT_CODE_SYSTEM,
} from './constants';
import request from 'utils/request';
import {
  BASE_PLAN_DEFINITIONS_API_URL,
  BASE_PRACTITIONERS_API_URL,
  BASE_GOALS_API_URL,
  getEndpoint,
} from 'utils/endpointService';

function getCodeSystemConcepts(codeSystemKey) {
  const codeSystem = getCodeSystem(codeSystemKey);
  return codeSystem.concept.reduce(
    (concepts, concept) => {
      concepts.push({ ...concept, concept: undefined });
      if (concept.concept) {
        concepts.push(...concept.concept);
      }
      return concepts;
    },
    []
  );
}

export function getGoalCategories() {
  return getCodeSystemConcepts(GOAL_CATEGORY_CODE_SYSTEM);
}

export function getGoalStatuses() {
  return getCodeSystemConcepts(GOAL_STATUS_CODE_SYSTEM);
}

export function getGoalAchievementStatuses() {
  return getCodeSystemConcepts(GOAL_ACHIEVEMENT_CODE_SYSTEM);
}

export function getPlanDefinitions() {
  const baseEndpoint = getEndpoint(BASE_PLAN_DEFINITIONS_API_URL);
  return request(baseEndpoint);
}

export function getPractitioners({ organizationId }) {
  const baseEndpoint = getEndpoint(BASE_PRACTITIONERS_API_URL);
  const requestURL = `${baseEndpoint}/practitioner-references?organization=${organizationId}`;
  return request(requestURL);
}

export function createGoal (goalFormData, fhirGoal) {
  const { planId, owner } = goalFormData;
  const baseEndpoint = getEndpoint(BASE_GOALS_API_URL);
  const requestURL = `${baseEndpoint}?planid=${planId}&practitionerid=${owner}`;
  return request(requestURL, {
    method: 'POST',
    body: JSON.stringify(fhirGoal),
    headers: {
      'Content-Type': 'application/json',
    }
  })
}

export function updateGoal (fhirGoal) {
  return request(getEndpoint(BASE_GOALS_API_URL), {
    method: 'PUT',
    body: JSON.stringify(fhirGoal),
    headers: {
      'Content-Type': 'application/json',
    }
  })
}

export function getGoal(id) {
  const baseEndpoint = getEndpoint(BASE_GOALS_API_URL);
  const requestURL = `${baseEndpoint}/${id}`;
  return request(requestURL);
}
