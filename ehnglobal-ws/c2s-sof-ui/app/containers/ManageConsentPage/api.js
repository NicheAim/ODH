import request from 'utils/request';
import Util from 'utils/Util';
import { BASE_CONSENTS_API_URL, getEndpoint } from 'utils/endpointService';
import { mapToName } from 'containers/App/helpers';
import { upperFirst, lowerCase } from 'lodash';

export function getConsent(consentId) {
  const requestURL = `${getEndpoint(BASE_CONSENTS_API_URL)}/${consentId}`;
  return request(requestURL);
}

export function saveConsent(consentFormData, patient) {
  if (consentFormData.logicalId) {
    return updateConsent(consentFormData.logicalId, consentFormData, patient);
  }
  return createConsent(consentFormData, patient);
}

export function getErrorDetail(err) {
  let errorDetail = '';
  if (err && err.message === 'Failed to fetch') {
    errorDetail = ' Server is offline.';
  } else if (err && err.response && err.response.status === 409) {
    errorDetail = ' Duplicate Entry:: Consent already exists.';
  } else if (err && err.response && err.response.status === 412) {
    errorDetail = 'Precondition Failed:: No care team members.';
  } else if (err && err.response && err.response.status === 500) {
    errorDetail = ' Unknown server error.';
  }
  return errorDetail;
}

function createConsent(consentFormData, patient) {
  const baseEndpoint = getEndpoint(BASE_CONSENTS_API_URL);
  const requestURL = `${baseEndpoint}`;
  return request(requestURL, {
    method: 'POST',
    body: JSON.stringify(mapToBffConsentDto(consentFormData, patient)),
    headers: {
      'Content-Type': 'application/json',
    },
  });
}

function updateConsent(logicalId, consentFormData, patient) {
  const baseEndpoint = getEndpoint(BASE_CONSENTS_API_URL);
  const requestURL = `${baseEndpoint}/${logicalId}`;
  return request(requestURL, {
    method: 'PUT',
    body: JSON.stringify(mapToBffConsentDto(consentFormData, patient)),
    headers: {
      'Content-Type': 'application/json',
    },
  });
}


function mapToBffConsentDto(consentFormData, patient) {
  const status = 'draft';
  const {
    consentFromActors, consentToActors, medicalInformation, purpose, consentStart, consentEnd, consentType,
  } = consentFormData;

  const patientReference = {
    reference: `Patient/${patient.id}`,
    display: mapToName(patient.name),
  };

  const period = {
    start: Util.formatDate(consentStart),
    end: Util.formatDate(consentEnd),
  };

  let consentData;
  // If generalDesignation is true, create general consent
  if (consentType) {
    consentData = {
      status,
      period,
      generalDesignation: consentType,
      patient: patientReference,
      purpose,
    };
  } else {
    const fromActor = consentFromActors
      .map((actor) => actorDto(actor));

    const toActor = consentToActors
      .map((actor) => actorDto(actor));
    consentData = {
      status,
      period,
      generalDesignation: consentType,
      patient: patientReference,
      fromActor,
      toActor,
      medicalInformation,
      purpose,
    };
  }
  return consentData;
}

function actorDto(actor) {
  return {
    reference: `${upperFirst(lowerCase(actor.reference.type))}/${actor.reference.logicalId}`,
    display: actor.display,
  };
}
