
import { fromJS } from 'immutable';
import practitionerToDosReducer from '../reducer';

describe('practitionerToDosReducer', () => {
  xit('returns the initial state', () => {
    expect(practitionerToDosReducer(undefined, {})).toEqual(fromJS({
      data: [],
      loading: false,
    }));
  });
});
