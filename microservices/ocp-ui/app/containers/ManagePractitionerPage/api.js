import find from 'lodash/find';

import request from 'utils/request';
import { BASE_PRACTITIONERS_API_URL, getEndpoint } from 'utils/endpointService';

const baseEndpoint = getEndpoint(BASE_PRACTITIONERS_API_URL);

export function savePractitioner(practitionerFormData, roleLookup, specialtyLookup) {
  if (practitionerFormData.logicalId) {
    return updatePractitioner(practitionerFormData.logicalId, practitionerFormData, roleLookup, specialtyLookup);
  }
  return createPractitioner(practitionerFormData, roleLookup, specialtyLookup);
}

export function getPractitioner(logicalId) {
  const requestURL = `${baseEndpoint}/${logicalId}`;
  return request(requestURL);
}

export function getNotificationAction(practitionerFormData) {
  let action = 'create';
  if (practitionerFormData.logicalId) {
    action = 'edit';
  }
  return action;
}

function createPractitioner(practitionerFormData, roleLookup, specialtyLookup) {
  const requestURL = `${baseEndpoint}`;
  return request(requestURL, {
    method: 'POST',
    body: JSON.stringify(mapToBffPractitioner(practitionerFormData, roleLookup, specialtyLookup)),
    headers: {
      'Content-Type': 'application/json',
    },
  });
}

function updatePractitioner(logicalId, practitionerFormData, roleLookup, specialtyLookup) {
  const requestURL = `${baseEndpoint}/${logicalId}`;
  return request(requestURL, {
    method: 'PUT',
    body: JSON.stringify(mapToBffPractitioner(practitionerFormData, roleLookup, specialtyLookup)),
    headers: {
      'Content-Type': 'application/json',
    },
  });
}

function mapToBffPractitioner(practitionerData, roleLookup, specialtyLookup) {
  const {
    firstName, lastName, identifierType, identifierValue, addresses, telecoms, practitionerRoles,
  } = practitionerData;

  const identifiers = [{
    system: identifierType,
    value: identifierValue,
  }];
  const name = [{
    firstName,
    lastName,
  }];

  const selectedPractitionerRole = practitionerRoles.map((pr) => {
    const { organization, code, specialty, active, logicalId } = pr;
    const selectedCode = [];
    selectedCode.push(find(roleLookup, { code }));
    const selectedSpecialty = [];
    selectedSpecialty.push(find(specialtyLookup, { code: specialty }));
    return ({
      organization,
      code: selectedCode,
      specialty: selectedSpecialty,
      active,
      logicalId,
    });
  });

  return { identifiers, name, telecoms, addresses, practitionerRoles: selectedPractitionerRole };
}

export function getErrorDetail(error) {
  let errorDetail = error.message;
  if (error && error.response && error.response.status === 404) {
    errorDetail = 'No Organizations Found';
  } else if (error && error.message === 'Failed to fetch') {
    errorDetail = ' Server is offline.';
  } else if (error && error.response && error.response.status === 500) {
    errorDetail = ' Unknown server error.';
  }
  return errorDetail;
}
