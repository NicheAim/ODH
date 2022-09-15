import { fromJS } from 'immutable';
import manageLocationPageReducer from '../reducer';

describe('manageLocationPageReducer', () => {
  it('returns the initial state', () => {
    expect(manageLocationPageReducer(undefined, {})).toEqual(fromJS({
      error: false,
      location: null,
    }));
  });
});
