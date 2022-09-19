import startCase from 'lodash/startCase';

export function getPrefix(goalType) {
  return `Goals${startCase(goalType)}`
}

export function getNamespace(goalType) {
  return `goals${startCase(goalType)}`
}
