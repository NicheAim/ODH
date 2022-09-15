import request from 'utils/request';
import Util from 'utils/Util';
import { BASE_ACTIVITY_DEFINITIONS_API_URL, BASE_ORGANIZATIONS_API_URL, getEndpoint } from 'utils/endpointService';
import moment from 'moment';

const baseEndpoint = getEndpoint(BASE_ORGANIZATIONS_API_URL);

export function getActivityDefinition(activityDefinitionId) {
  const requestURL = `${getEndpoint(BASE_ACTIVITY_DEFINITIONS_API_URL)}/${activityDefinitionId}`;
  return request(requestURL);
}

export function saveActivityDefinition(activityDefinitionFormData, organizationId) {
  if (activityDefinitionFormData.activityDefinitionId) {
    return updateActivityDefinition(activityDefinitionFormData, organizationId);
  }
  return createActivityDefinition(activityDefinitionFormData, organizationId);
}

export function determineNotificationForSavingActivityDefinition(activityDefinitionFormData) {
  let action = 'create';
  if (activityDefinitionFormData.activityDefinitionId) {
    action = 'edit';
  }
  return action;
}

function createActivityDefinition(activityDefinitionFormData, organizationId) {
  const url = `${baseEndpoint}/${organizationId}/activity-definitions`;
  console.log("createActivityDefinition")
  console.log("formData:")
  console.log(activityDefinitionFormData)
  console.log("mappedFormData:")
  console.log(mapToBffActivityDefinition(activityDefinitionFormData))
  return request(url, {
    method: 'POST',
    body: JSON.stringify(mapToBffActivityDefinition(activityDefinitionFormData)),
    headers: {
      'Content-Type': 'application/json',
    },

  });
}

function updateActivityDefinition(activityDefinitionFormData, organizationId) {
  const activityDefinitionId = activityDefinitionFormData.activityDefinitionId;
  const url = `${baseEndpoint}/${organizationId}/activity-definitions/${activityDefinitionId}`;
  return request(url, {
    method: 'PUT',
    body: JSON.stringify(mapToBffActivityDefinition(activityDefinitionFormData)),
    headers: {
      'Content-Type': 'application/json',
    },
  });
}

export function getErrorDetail(err) {
  let errorDetail = '';
  if (err && err.message === 'Failed to fetch') {
    errorDetail = ' Server is offline.';
  } else if (err && err.response && err.response.status === 409) {
    errorDetail = ' Duplicate Entry:: Same Category and Type already exists.';
  } else if (err && err.response && err.response.status === 500) {
    errorDetail = ' Unknown server error.';
  }
  return errorDetail;
}

function mapToBffActivityDefinition(activityDefinitionFormData) {
  const {
    version, name, title, description, effectiveStart, effectiveEnd, duration, frequency,
    status, topic, kind, actionParticipantType, actionParticipantRole, relatedArtifact,
  } = activityDefinitionFormData;
  const effectivePeriod = {
    start:
    effectiveStart === undefined || effectiveStart === null
          ? null
          : moment(effectiveStart).format('MM/DD/YYYY'),
    end:
    effectiveEnd === undefined || effectiveEnd === null
        ? null
        : moment(effectiveEnd).format('MM/DD/YYYY'),
    // start: Util.formatDate(effectiveStart),
    // end: Util.formatDate(effectiveEnd),
  };
  const timing = {
    durationMax: duration,
    frequency,
  };
  return {
    version,
    name,
    title,
    description,
    effectivePeriod,
    timing,
    status,
    topic,
    actionParticipantType,
    actionParticipantRole,
    kind,
    relatedArtifact,
  };
}
