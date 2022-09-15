import concat from 'lodash/concat';
import isEmpty from 'lodash/isEmpty';
import union from 'lodash/union';

import Util from 'utils/Util';
import { SHARE_ALL } from 'components/SelectMedicalInformation/constants';


export function mapResourceName(nameArray) {
  let name = {};
  if (nameArray.length > 0) {
    const fName = nameArray[0];
    const firstName = Util.setEmptyStringWhenUndefined(fName.firstName);
    const lastName = Util.setEmptyStringWhenUndefined(fName.lastName);
    name = `${firstName} ${lastName}`;
  }
  return name;
}

export function initialConsentFormValues(consent, careCoordinatorContext, securityLabels) {
  let formData = null;
  if (isEmpty(consent)) {
    const consentStart = new Date();
    const consentEnd = new Date();
    consentEnd.setFullYear(consentEnd.getFullYear() + 1);
    const purpose = [{
      code: 'TREAT',
      display: 'treatment',
    }];
    if (!isEmpty(careCoordinatorContext)) {
      const practitionerReference = {
        reference: {
          logicalId: careCoordinatorContext.logicalId,
          type: 'Practitioner',
        },
        display: careCoordinatorContext.name,
        identifiers: careCoordinatorContext.identifiers,
      };
      const orgReferences = careCoordinatorContext.organizations.map((organization) => ({
        reference: {
          logicalId: organization.logicalId,
          type: 'Organization',
        },
        display: organization.name,
        identifiers: organization.identifiers,
      }));
      const fromActor = concat(orgReferences, practitionerReference);
      formData = {
        consentType: false,
        consentStart,
        consentEnd,
        purpose,
        consentFromActors: fromActor,
        medicalInformation: securityLabels,
      };
    } else {
      formData = {
        consentType: false,
        consentStart,
        consentEnd,
        purpose,
        shareType: SHARE_ALL,
        medicalInformation: securityLabels,
      };
    }
  } else {
    const consentStart = Util.setEmptyStringWhenUndefined(consent.period.start);
    const consentEnd = Util.setEmptyStringWhenUndefined(consent.period.end);
    if (consent.generalDesignation) {
      formData = {
        consentType: true,
        shareType: SHARE_ALL,
        medicalInformation: securityLabels,
        consentStart: consentStart && new Date(consentStart),
        consentEnd: consentEnd && new Date(consentEnd),
        purpose: consent.purpose,
      };
    } else {
      const fromActor = mapToConsentActors(consent.fromOrganizationActors, consent.fromPractitionerActors);
      const toActor = mapToConsentActors(consent.toOrganizationActors, consent.toPractitionerActors);

      formData = {
        consentType: false,
        shareType: consent.consentMedicalInfoType,
        medicalInformation: consent.medicalInformation,
        consentStart: consentStart && new Date(consentStart),
        consentEnd: consentEnd && new Date(consentEnd),
        purpose: consent.purpose,
        consentFromActors: fromActor,
        consentToActors: toActor,
      };
    }
  }

  return formData;
}

function mapToConsentActors(organizations, practitioners) {
  const organizationActors = organizations.map((org) => mapToReferActor(org));
  const practitionerActors = practitioners.map((pra) => mapToReferActor(pra));
  return union(organizationActors, practitionerActors);
}

function mapToReferActor(actor) {
  return {
    reference: {
      logicalId: actor.id,
      type: actor.careTeamType,
    },
    display: actor.display,
    identifiers: actor.identifiers,
  };
}
