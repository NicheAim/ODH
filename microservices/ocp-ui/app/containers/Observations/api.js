import request from 'utils/request';
import _ from 'lodash';

import {
  BASE_OBSERVATION_PATIENT_REFERENCE,
  getEndpoint,
}
from 'utils/endpointService';

export function getObservations(patientId) {
  const baseEndpoint = getEndpoint(BASE_OBSERVATION_PATIENT_REFERENCE);
  const requestURL = `${baseEndpoint}/patient-reference?patient=${patientId}`;
  return request(requestURL);
}
