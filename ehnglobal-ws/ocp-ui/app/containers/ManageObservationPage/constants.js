import medicalComplexityCodeSystem from './assets/code-systems/njinck-medical-complexity.json';
import serviceIntegrationLevelCodeSystem from './assets/code-systems/njinck-service-integration-level.json';
import socialComplexityCodeSystem from './assets/code-systems/njinck-social-complexity.json';

export const MEDICAL_COMPLEXITY_CODE_SYSTEM = 'njinck-medical-complexity';
export const SOCIAL_COMPLEXITY_CODE_SYSTEM = 'njinck-social-complexity';
export const SERVICE_INTEGRATION_LEVEL_CODE_SYSTEM = 'njinck-service-integration-level';

const CODE_SYSTEMS = {
  [MEDICAL_COMPLEXITY_CODE_SYSTEM]: medicalComplexityCodeSystem,
  [SOCIAL_COMPLEXITY_CODE_SYSTEM]: socialComplexityCodeSystem,
  [SERVICE_INTEGRATION_LEVEL_CODE_SYSTEM]: serviceIntegrationLevelCodeSystem,
}

export function getCodeSystem(codeSystemKey) {
  return CODE_SYSTEMS[codeSystemKey];
}

export const GET_MEDICAL_COMPLEXITIES = 'ocpui/ManageObservationPage/GET_MEDICAL_COMPLEXITIES';
export const GET_MEDICAL_COMPLEXITIES_SUCCESS = 'ocpui/ManageObservationPage/GET_MEDICAL_COMPLEXITIES_SUCCESS';

export const GET_SOCIAL_COMPLEXITIES = 'ocpui/ManageObservationPage/GET_SOCIAL_COMPLEXITIES';
export const GET_SOCIAL_COMPLEXITIES_SUCCESS = 'ocpui/ManageObservationPage/GET_SOCIAL_COMPLEXITIES_SUCCESS';

export const GET_SERVICE_INTEGRATION_LEVELS = 'ocpui/ManageObservationPage/GET_SERVICE_INTEGRATION_LEVELS';
export const GET_SERVICE_INTEGRATION_LEVELS_SUCCESS = 'ocpui/ManageObservationPage/GET_SERVICE_INTEGRATION_LEVELS_SUCCESS';

export const CREATE_OBSERVATION = 'ocpui/ManageObservationPage/CREATE_OBSERVATION';
export const CREATE_OBSERVATION_SUCCESS = 'ocpui/ManageObservationPage/CREATE_OBSERVATION_SUCCESS';
export const CREATE_OBSERVATION_ERROR = 'ocpui/ManageObservationPage/CREATE_OBSERVATION_ERROR';

export const UPDATE_OBSERVATION = 'ocpui/ManageObservationPage/UPDATE_OBSERVATION';
export const UPDATE_OBSERVATION_SUCCESS = 'ocpui/ManageObservationPage/UPDATE_OBSERVATION_SUCCESS';
export const UPDATE_OBSERVATION_ERROR = 'ocpui/ManageObservationPage/UPDATE_OBSERVATION_ERROR';

export const GET_OBSERVATION = 'ocpui/ManageObservationPage/GET_OBSERVATION';
export const GET_OBSERVATION_SUCCESS = 'ocpui/ManageObservationPage/GET_OBSERVATION_SUCCESS';
export const GET_OBSERVATION_ERROR = 'ocpui/ManageObservationPage/GET_OBSERVATION_ERROR';

export const CLEAR_OBSERVATION = 'ocpui/ManageObservationPage/CLEAR_OBSERVATION';
export const CLEAR_OBSERVATION_SUCCESS = 'ocpui/ManageObservationPage/CLEAR_OBSERVATION_SUCCESS';
