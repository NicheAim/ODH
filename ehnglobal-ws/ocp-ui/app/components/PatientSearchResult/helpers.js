import isEmpty from 'lodash/isEmpty';
import { env_vars } from '../../../env';
import {
  EMPTY_STRING,
  NEW_LINE_CHARACTER,
} from '../../containers/App/constants';

const SSN_SYSTEM = 'http://hl7.org/fhir/sid/us-ssn';
const SSN_SYSTEM_DISPLAY = 'SSN';

const MEDICAID_SYSTEM =
  env_vars.REACT_APP_PATIENT_IDENTIFIER_MEDICAID_ID_SYSTEM;
const MEDICAID_DISPLAY =
  env_vars.REACT_APP_PATIENT_IDENTIFIER_MEDICAID_ID_SYSTEM;

export function mapToPatientUaaAssignment(patient) {
  const { organizations } = patient;
  if (organizations !== undefined && organizations !== null) {
    if (isEmpty(patient.uaaId)) {
      return `${organizations[0].display}/Unassigned`;
    }
    return `${organizations[0].display}/Assigned`;
  }
}

export function defineTableColumns(isExpanded, manageUserEnabled) {
  const defaultExpandedTableColumns =
    '.3fr .6fr repeat(3, 1fr) .5fr .5fr .5fr .5fr .8fr';
  const defaultSummarizedTableColumns = '.3fr .6fr 1fr .6fr .5fr';
  const manageUserTableColumns =
    '.3fr .6fr repeat(4, 1fr) .5fr .5fr .5fr .5fr .8fr';
  const manageUserSummarizedTableColumns = '.3fr .6fr repeat(2, 1fr).5fr 0.5fr';
  let tableColumns = defaultSummarizedTableColumns;
  if (isExpanded && manageUserEnabled) {
    tableColumns = manageUserTableColumns;
  } else if (manageUserEnabled) {
    tableColumns = manageUserSummarizedTableColumns;
  } else if (isExpanded) {
    tableColumns = defaultExpandedTableColumns;
  }
  return tableColumns;
}

export function mapToIdentifiersSSNMedicaid(identifiers) {
  const _identifiers =
    identifiers &&
    identifiers.map((identifier) => {
      const system =
        identifier.systemDisplay !== EMPTY_STRING
          ? identifier.systemDisplay
          : EMPTY_STRING;
      const value =
        identifier.value !== null && identifier.value !== EMPTY_STRING
          ? identifier.value
          : EMPTY_STRING;

      if (
        identifier.system === MEDICAID_SYSTEM ||
        identifier.systemDisplay === MEDICAID_DISPLAY
      ) {
        return `Medicaid ID: ${value}`;
      } else if (
        identifier.system === SSN_SYSTEM ||
        identifier.systemDisplay === SSN_SYSTEM_DISPLAY
      ) {
        return `${system}: ${value}`;
      }
    });

  return _identifiers.join(NEW_LINE_CHARACTER);
}
