import find from 'lodash/find';
import filter from 'lodash/filter';
import includes from 'lodash/includes';

import { mapToAddresses, mapToIdentifiers, mapToName, mapToTelecoms } from 'containers/App/helpers';
import {
  BENEFITS_SPECIALIST_ROLE_CODE,
  CARE_COORDINATOR_ROLE_CODE,
  CARE_MANAGER_ROLE_CODE,
  FRONT_OFFICE_ROLE_CODE,
  HEALTH_ASSISTANT_ROLE_CODE,
  OCP_ADMIN_ROLE_CODE,
  ORGANIZATION_ADMIN_ROLE_CODE,
  PATIENT_ROLE_CODE,
  PCP_ROLE_CODE,
} from 'containers/App/constants';

export function flattenPatientData(patient) {
  return {
    ...patient,
    name: mapToName(patient.name),
    identifier: mapToIdentifiers(patient.identifier),
  };
}

export function flattenOrganizationData(organization) {
  return {
    ...organization,
    telecoms: mapToTelecoms(organization.telecoms),
    identifiers: mapToIdentifiers(organization.identifiers),
    addresses: mapToAddresses(organization.addresses),
  };
}

export function mapToRoleObject(userRoles, roleValue) {
  const valueKey = 'code';
  return find(userRoles, [valueKey, roleValue]);
}

/**
 * Filter OCP none-functional roles
 * @param allPractitionerRoles
 * @returns {Array}
 */
export function filteredFunctionalRoles(allPractitionerRoles) {
  return filter(allPractitionerRoles, (p) => includes([
    OCP_ADMIN_ROLE_CODE,
    PATIENT_ROLE_CODE,
    CARE_COORDINATOR_ROLE_CODE,
    CARE_MANAGER_ROLE_CODE,
    ORGANIZATION_ADMIN_ROLE_CODE,
    PCP_ROLE_CODE,
    BENEFITS_SPECIALIST_ROLE_CODE,
    HEALTH_ASSISTANT_ROLE_CODE,
    FRONT_OFFICE_ROLE_CODE,
  ], p.code));
}
