import { NEW_LINE_CHARACTER } from 'containers/App/constants';
import { mapToTelecoms } from 'containers/App/helpers';

export function flattenHealthcareServiceData(healthcareService) {
  return {
    ...healthcareService,
    category: healthcareService.category && healthcareService.category.display,
    programName: mapToProgramName(healthcareService.programName),
    type: mapToValueSetDisplay(healthcareService.type),
    specialty: mapToValueSetDisplay(healthcareService.specialty),
    referralMethod: mapToValueSetDisplay(healthcareService.referralMethod),
    telecom: mapToTelecoms(healthcareService.telecom),
  };
}

function mapToProgramName(programNames) {
  return programNames && programNames
    .map((programName) => programName)
    .join(NEW_LINE_CHARACTER);
}

function mapToValueSetDisplay(valueSets) {
  return valueSets && valueSets
    .map((valueSet) => valueSet.display)
    .join(NEW_LINE_CHARACTER);
}
