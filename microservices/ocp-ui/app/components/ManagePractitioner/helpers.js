import isEmpty from 'lodash/isEmpty';
import merge from 'lodash/merge';
import omit from 'lodash/omit';
import head from 'lodash/head';
import Util from 'utils/Util';

export function initialFormDataBasedOnRole(practitioner, initialNewPractitionerValue, isOcpAdmin) {
  let formData = null;
  if (isEmpty(practitioner) && initialNewPractitionerValue) {
    const { firstName, lastName, identifierType, identifier } = initialNewPractitionerValue;
    formData = { firstName, lastName, identifierType, identifierValue: identifier };
  }

  if (!isEmpty(practitioner)) {
    formData = merge(mapPractitionerToFirstIdentifier(practitioner), mapPractitionerToFirstName(practitioner),
      mapPractitionerToAddresses(practitioner), mapPractitionerToTelecoms(practitioner),
      mapPractitionerRoleFormData(practitioner, isOcpAdmin));
  }
  return Util.pickByIdentity(formData);
}

export function mapFormDataBasedOnRole(formValues, organization, isOcpAdmin) {
  if (isOcpAdmin) {
    return formValues;
  }
  const { roleCode, specialty } = formValues;
  const practitionerRoles = Array.of({
    organization: { reference: `Organization/${organization.logicalId}`, display: `${organization.name}` },
    code: roleCode,
    specialty,
    active: true,
  });
  return {
    ...omit(formValues, ['roleCode', 'specialty']),
    practitionerRoles,
  };
}

function mapPractitionerToFirstIdentifier(practitioner) {
  let identifier = {};
  if (practitioner.identifiers.length > 0) {
    const firstIdentifier = practitioner.identifiers[0];
    identifier = {
      identifierType: Util.setEmptyStringWhenUndefined(firstIdentifier.system),
      identifierValue: Util.setEmptyStringWhenUndefined(firstIdentifier.value),
    };
  }
  return identifier;
}

function mapPractitionerToFirstName(practitioner) {
  let name = {};
  if (practitioner.name.length > 0) {
    const fName = practitioner.name[0];
    name = {
      firstName: Util.setEmptyStringWhenUndefined(fName.firstName),
      lastName: Util.setEmptyStringWhenUndefined(fName.lastName),
    };
  }
  return name;
}

function mapPractitionerToAddresses(practitioner) {
  return {
    addresses: practitioner.addresses,
  };
}

function mapPractitionerToTelecoms(practitioner) {
  return {
    telecoms: practitioner.telecoms,
  };
}

function mapPractitionerRoleFormData(practitioner, isOcpAdmin) {
  if (isOcpAdmin) {
    return mapToOcpAdminPractitionerRoleFormData(practitioner);
  }
  return mapToOrgAdminPractitionerRoleFormData(practitioner);
}

function mapToOcpAdminPractitionerRoleFormData(practitioner) {
  const practitionerRoles = [];
  if (practitioner.practitionerRoles.length > 0) {
    practitioner.practitionerRoles.map((practitionerRole) => {
      const code = practitionerRole.code.length > 0 && practitionerRole.code[0].code;
      const specialty = practitionerRole.specialty.length > 0 && practitionerRole.specialty[0].code;
      return practitionerRoles.push({
        organization: practitionerRole.organization,
        specialty,
        code,
        active: practitionerRole.active,
        logicalId: practitionerRole.logicalId,
      });
    });
  }
  return { practitionerRoles };
}

function mapToOrgAdminPractitionerRoleFormData(practitioner) {
  const orgAdminPractitionerRole = head(practitioner.practitionerRoles);
  const firstRoleCode = head(orgAdminPractitionerRole.code);
  const firstSpecialty = head(orgAdminPractitionerRole.specialty);
  return {
    roleCode: firstRoleCode.code,
    specialty: firstSpecialty.code,
  };
}
