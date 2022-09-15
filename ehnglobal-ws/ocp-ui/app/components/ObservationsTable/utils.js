import get from 'lodash/get';
import {
  getMedicalComplexities,
  getSocialComplexities,
  getServiceIntegrationLevels,
} from 'containers/ManageObservationPage/api';

const CODE_SYSTEMS = {
  'njinck-medical-complexity': {
    label: 'Medical Complexity',
    contents: getMedicalComplexities(),
  },
  'njinck-social-complexity': {
    label: 'Social Complexity',
    contents: getSocialComplexities(),
  },
  'njinck-service-integration-level': {
    label: 'Service Integration Level',
    contents: getServiceIntegrationLevels(),
  },
}

function getConceptDisplay(observation, value) {
  const codeCodingDisplay = get(observation, 'code.coding[0].display');
  const codeSystem = CODE_SYSTEMS[codeCodingDisplay];
  const concept = (get(codeSystem, 'contents.concept') || [])
    .find(concept => concept.code === String(value))
  ;
  return get(concept, 'display') || 'No catalog value';
}

export function getObservationValueDisplay(observation) {
  const valueInteger = get(observation, 'valueInteger');
  if (valueInteger) {
    return `${valueInteger} - (${getConceptDisplay(observation, valueInteger)})`;
  }
  else {
    const valueCoding = get(observation, 'valueCodeableConcept.coding[0]')
    const valueCodingCode = get(valueCoding, 'code');
    const valueCodingDisplay = get(valueCoding, 'display');
    const conceptDisplay = getConceptDisplay(observation, valueCodingCode);
    if (valueCodingCode && conceptDisplay) {
      return `${valueCodingCode} - (${conceptDisplay})`;
    }
    return conceptDisplay || valueCodingDisplay || valueCodingCode;
  }
}
