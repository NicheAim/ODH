import { fromJS } from 'immutable';
import changePasswordReducer from '../reducer';

describe('changePasswordReducer', () => {
  it('returns the initial state', () => {
    expect(changePasswordReducer(undefined, {})).toEqual(fromJS({ error: null }));
  });
});
