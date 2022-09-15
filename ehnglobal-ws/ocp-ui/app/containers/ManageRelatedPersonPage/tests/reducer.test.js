import { fromJS } from 'immutable';
import manageRelatedPersonPageReducer from '../reducer';

describe('manageRelatedPersonPageReducer', () => {
  it('returns the initial state', () => {
    expect(manageRelatedPersonPageReducer(undefined, {})).toEqual(fromJS({
      error: false,
      relatedPerson: null,
    }));
  });
});
