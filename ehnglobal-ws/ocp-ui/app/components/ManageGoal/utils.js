import { EMPTY_STRING } from './constants';
import isString from 'lodash/isString';
import isEmpty from 'lodash/isEmpty';
import _ from 'lodash';

export function getSuggestionsFromValueSetConcepts(concepts) {
  return concepts.map(status => ({
    value: status.code,
    label: status.display,
  }));
}

function getIdFromReference(reference) {
  if (!isString(reference)) {
    return reference;
  }
  const ref = reference.trim();
  if (isEmpty(reference)) {
    return reference;
  }
  const slashPos = reference.indexOf('/');
  if (slashPos < reference.length - 1) {
    return ref.substring(slashPos + 1);
  }
  return reference;
}

export function getSuggestionsFromPractitioners(practitioners) {
  return _
    .chain(practitioners)
    .map(({ reference, display }) => ({
      value: getIdFromReference(reference),
      label: _.startCase(display),
    }))
    .sortBy('label')
    .value()
  ;
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

