import { EMPTY_STRING } from './constants';

export function getSuggestionsFromValueSetConcepts(concepts) {
  return concepts.map(status => ({
    value: status.code,
    label: status.display,
  }))
}

export function getResourceName(resource) {
  if (resource === undefined || resource === null) {
    return EMPTY_STRING;
  }
  const names = resource.name;
  return names && names
    .map((name) => {
      const firstName = name.firstName !== EMPTY_STRING ? name.firstName : EMPTY_STRING;
      const lastName = name.lastName !== EMPTY_STRING ? name.lastName : EMPTY_STRING;
      return `${firstName} ${lastName}`;
    })
    .join(', ');
}

