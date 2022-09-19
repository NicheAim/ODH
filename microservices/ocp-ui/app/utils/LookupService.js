import { select } from 'redux-saga/effects';
import { makeSelectLookups } from '../containers/App/lookupSelectors';

function* isLookupTypeInStore(lookupType) {
  const dataFromStore = yield select(makeSelectLookups(lookupType));
  if (dataFromStore && dataFromStore.length > 0) {
    return true;
  }
  return false;
}

export function* getLookupTypesNotInStore(action) {
  const lookupTypesNotInStore = [];
  let i = 0;
  while (i < action.lookupTypes.length) {
    const lookupType = action.lookupTypes[i];
    if (!(yield isLookupTypeInStore(lookupType))) {
      lookupTypesNotInStore.push(lookupType);
    }
    i += 1;
  }
  return lookupTypesNotInStore;
}
