import has from 'lodash/has';

export const getConditionText = (conditionPatient) => {
  if (has(conditionPatient, 'display')) {
    if (has(conditionPatient, 'code')) {
      return `${conditionPatient.display} (${conditionPatient.code})`;
    }
    return conditionPatient.display;
  }
  return '';
};
