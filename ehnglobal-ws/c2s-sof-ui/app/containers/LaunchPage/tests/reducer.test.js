
import { fromJS } from 'immutable';
import launchPageReducer from '../reducer';

describe('launchPageReducer', () => {
  it('returns the initial state', () => {
    expect(launchPageReducer(undefined, {})).toEqual(fromJS({
      iss: null,
      launch: null,
      state: null,
      metadata: {},
    }));
  });
});
