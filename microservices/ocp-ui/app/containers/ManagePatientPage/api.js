import { CARE_MANAGER_ROLE } from 'containers/App/constants';
import moment from 'moment';
import {
  BASE_PATIENTS_API_URL,
  BASE_PRACTITIONERS_API_URL,
  BASE_RELATED_PERSONS_API_URL,
  getEndpoint,
} from 'utils/endpointService';
import queryString from 'utils/queryString';
import request from 'utils/request';
import Util from 'utils/Util';
import { env_vars} from "../../../env";

const SSN_SYSTEM = 'http://hl7.org/fhir/sid/us-ssn';
const SSN_SYSTEM_DISPLAY = 'SSN';

const MEDICAID_SYSTEM =
  env_vars.REACT_APP_PATIENT_IDENTIFIER_MEDICAID_ID_SYSTEM;
const MEDICAID_DISPLAY =
  env_vars.REACT_APP_PATIENT_IDENTIFIER_MEDICAID_ID_SYSTEM;

const baseEndpoint = getEndpoint(BASE_PATIENTS_API_URL);

export function postPatient(patientFormData) {
  const requestURL = `${baseEndpoint}`;
  return request(requestURL, {
    method: 'POST',
    body: JSON.stringify(mapToBackendPatient(patientFormData)),
    headers: {
      'Content-Type': 'application/json',
    },
  });
}

export function putPatient(patientFormData) {
  const requestURL = `${baseEndpoint}`;
  return request(requestURL, {
    method: 'PUT',
    body: JSON.stringify(mapToBackendPatient(patientFormData)),
    headers: {
      'Content-Type': 'application/json',
    },
  });
}

export function getPatient(patientId) {
  const requestURL = `${baseEndpoint}/${patientId}`;
  return request(requestURL);
}

export function getRelatedPersonsUrl(patientId) {
  const getRelatedPersonsEndpoint = getEndpoint(BASE_RELATED_PERSONS_API_URL);
  return `${getRelatedPersonsEndpoint}/search/?patientId=${patientId}`;
}

export function getPractitioners({ organizationId }) {
  const practitionerEndpoint = getEndpoint(BASE_PRACTITIONERS_API_URL);
  const params = queryString({
    organization: organizationId,
    role: CARE_MANAGER_ROLE,
  });
  const requestURL = `${practitionerEndpoint}/practitioner-references${params}`;
  return request(requestURL);
}

function mapToBackendPatient(patientFormData) {
  const {
    id,
    firstName,
    lastName,
    birthDate,
    genderCode,
    identifierType,
    identifierValue,
    identifierType2,
    identifierValue2,
    language,
    race,
    ethnicity,
    birthSex,
    addresses,
    telecoms,
    flags,
    organizationId,
    practitionerId,
    coverages,
    episodeOfCares,
    mrn,
    active,
    emergencyContacts,
  } = patientFormData;

  const identifier = [
    {
      system: identifierType,
      value: identifierValue,
    },
    {
      system: identifierType2,
      value: identifierValue2,
    },
  ];
  const name = [
    {
      firstName,
      lastName,
    },
  ];
  const mappedFlags =
    flags !== undefined && flags !== null
      ? mapToBackendFlags(flags)
      : undefined;

  const emergencyContactsMapped = emergencyContacts.map((item) => {
    const mappedItem = {
      ...item,
      birthDate: moment(item.birthDate).format('MM/DD/YYYY'),
      startDate: moment(item.startDate).format('MM/DD/YYYY'),
      endDate: moment(item.endDate).format('MM/DD/YYYY'),
    };

    return mappedItem;
  });

  console.log('emergencyContacts', emergencyContacts);

  console.log('emergencyContactsMapped', emergencyContactsMapped);

  return {
    id,
    identifier,
    name,
    telecoms,
    addresses,
    birthDate: Util.formatDate(birthDate),
    genderCode,
    language,
    race,
    ethnicity,
    birthSex,
    flags: mappedFlags,
    active: true,
    organizationId,
    practitionerId,
    coverages,
    episodeOfCares:
      episodeOfCares && mapToBackendEpisodeOfCares(episodeOfCares),
    mrn,
    active,
    emergencyContacts: emergencyContactsMapped,
    // emergencyContacts,
  };
}

function mapToBackendFlags(flags) {
  return flags.map((flag) => {
    const { status, category, logicalId, code, flagStart, flagEnd, author } =
      flag;
    const authorRef =
      author && author.id && author.display
        ? {
          reference: `Practitioner/${author.id}`,
          display: author.display,
        }
        : author;
    return {
      status,
      category,
      logicalId,
      code,
      period: {
        start: flagStart && Util.formatDate(flagStart),
        end: flagEnd && Util.formatDate(flagEnd),
      },
      author: authorRef,
    };
  });
}

function mapToBackendEpisodeOfCares(episodeOfCares) {
  return episodeOfCares.map((episodeOfCare) => {
    const { startDate, endDate } = episodeOfCare;
    return {
      ...episodeOfCare,
      startDate: startDate.toLocaleDateString(),
      endDate: endDate.toLocaleDateString(),
    };
  });
}

export function mapToFrontendPatientForm(patientData) {
  const {
    id,
    identifier,
    name,
    telecoms,
    addresses,
    birthDate,
    genderCode,
    language,
    race,
    ethnicity,
    birthSex,
    flags,
    episodeOfCares,
    coverages,
    mrn,
    active,
  } = patientData;
  const identifiers_filtered = identifier.filter((identifier) => {
    return identifier.system === SSN_SYSTEM || identifier.system  === MEDICAID_SYSTEM;
  });
  const identifierType = identifiers_filtered && identifiers_filtered[0] && identifiers_filtered[0].system;
  const identifierValue = identifiers_filtered && identifiers_filtered[0] && identifiers_filtered[0].value;
  const identifierType2 = identifiers_filtered && identifiers_filtered[1] && identifiers_filtered[1].system;
  const identifierValue2 = identifiers_filtered && identifiers_filtered[1] && identifiers_filtered[1].value;
  const firstName = name[0].firstName;
  const lastName = name[0].lastName;
  const dob =
    birthDate !== undefined && birthDate !== null ? new Date(birthDate) : null;
  const gender =
    genderCode !== undefined && genderCode !== null
      ? genderCode.toLowerCase()
      : null;
  const mappedFlags = flags && mapToFrontendFlags(flags);
  const mappedEpisodeOfCares =
    episodeOfCares && mapToFrontendEpisodeOfCares(episodeOfCares);
  return {
    id,
    firstName,
    lastName,
    birthDate: dob,
    genderCode: gender,
    identifierType,
    identifierValue,
    identifierType2,
    identifierValue2,
    language,
    race,
    ethnicity,
    birthSex,
    addresses,
    telecoms,
    episodeOfCares: mappedEpisodeOfCares,
    coverages,
    flags: mappedFlags,
    mrn,
    active,
  };
}

function mapToFrontendFlags(flags) {
  return flags.map((flag) => {
    const { status, category, logicalId, code, period, author } = flag;
    return {
      status,
      category,
      logicalId,
      code,
      flagStart: period.start && new Date(period.start),
      flagEnd: period.end && new Date(period.end),
      author,
    };
  });
}

function mapToFrontendEpisodeOfCares(episodeOfCares) {
  return episodeOfCares.map((episodeOfCare) => {
    const { startDate, endDate } = episodeOfCare;
    return {
      ...episodeOfCare,
      startDate: new Date(startDate),
      endDate: new Date(endDate),
    };
  });
}
