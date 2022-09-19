import find from 'lodash/find';
import isEmpty from 'lodash/isEmpty';
import isUndefined from 'lodash/isUndefined';
import moment from 'moment';
import { mapParticipantName } from '../../utils/CareTeamUtils';
import {
  BASE_CARE_TEAMS_API_URL,
  BASE_EPISODE_OF_CARES_API_URL,
  getEndpoint,
} from '../../utils/endpointService';
import request from '../../utils/request';

const baseEndpoint = getEndpoint(BASE_CARE_TEAMS_API_URL);

export function saveCareTeam(careTeamFormData) {
  if (careTeamFormData.careTeamId) {
    return updateCareTeam(careTeamFormData);
  }
  return createCareTeam(careTeamFormData);
}

export function determineNotificationForSavingCareTeam(careTeamFormData) {
  let action = 'create';
  if (careTeamFormData.careTeamId) {
    action = 'edit';
  }
  return action;
}

export function getCareTeamById(careTeams, careTeamId) {
  if (!isEmpty(careTeams)) {
    return find(careTeams, { id: careTeamId });
  }
  return null;
}

export function getCareTeam(careTeamId) {
  const requestURL = `${baseEndpoint}/${careTeamId}`;
  return request(requestURL);
}

export function mapToEditParticipants(participants) {
  if (!isEmpty(participants)) {
    return participants.map((participant) => ({
      roleCode: participant.roleCode,
      memberId: participant.memberId,
      roleDisplay: participant.roleDisplay,
      memberType: participant.memberType,
      startDate: participant.startDate,
      endDate: participant.endDate,
      name: mapParticipantName(participant),
    }));
  }
  return [];
}

function createCareTeam(careTeamFormData) {
  const requestURL = `${baseEndpoint}`;
  return request(requestURL, {
    method: 'POST',
    body: JSON.stringify(mapToBffCareTeam(careTeamFormData)),
    headers: {
      'Content-Type': 'application/json',
    },
  });
}

function updateCareTeam(careTeamFormData) {
  const careTeamId = careTeamFormData.careTeamId;
  const requestURL = `${baseEndpoint}/${careTeamId}`;
  return request(requestURL, {
    method: 'PUT',
    body: JSON.stringify(mapToBffCareTeam(careTeamFormData)),
    headers: {
      'Content-Type': 'application/json',
    },
  });
}

function mapToBffCareTeam(careTeamData) {
  const {
    careTeamName,
    patientId,
    status,
    startDate,
    endDate,
    participants,
    managingOrganization,
    categoryCode,
    categoryDisplay,
    categorySystem,
    reasonCode,
    reasonDisplay,
    reasonSystem,
    episodeOfCareCode,
  } = careTeamData;

  return {
    name: careTeamName,
    statusCode: !isUndefined(status) && status !== null ? status : 'active',
    subjectId: patientId,
    startDate:
      !isUndefined(startDate) && startDate !== null
        ? moment(startDate).format('MM/DD/YYYY')
        : null,
    endDate:
      !isUndefined(endDate) && endDate !== null
        ? moment(endDate).format('MM/DD/YYYY')
        : null,
    managingOrganization,
    categoryCode,
    categoryDisplay,
    categorySystem,
    reasonCode,
    reasonDisplay,
    reasonSystem,
    episodeOfCareCode,
    participants: mapToBffParticipants(participants),
  };
}

function mapToBffParticipants(participants) {
  if (!isEmpty(participants)) {
    const mappedParticipants = participants.map((participant) => ({
      roleCode: participant.roleCode,
      roleDisplay: participant.roleDisplay,
      roleSystem: participant.roleSystem,
      memberId: participant.memberId,
      memberType: participant.memberType,
      startDate:
        participant.startDate === undefined ||
        participant.startDate === null ||
        participant.startDate === ''
          ? null
          : moment(participant.startDate).format('MM/DD/YYYY'),
      endDate:
        participant.endDate === undefined ||
        participant.endDate === null ||
        participant.endDate === ''
          ? null
          : moment(participant.endDate).format('MM/DD/YYYY'),
    }));
    return mappedParticipants;
  }
  return [];
}

export function getEventTypes({ patientId }) {
  const episodeOfCareBaseEndpoint = getEndpoint(BASE_EPISODE_OF_CARES_API_URL);
  const requestURL = `${episodeOfCareBaseEndpoint}?patient=${patientId}&status=active`;
  return request(requestURL);
}
