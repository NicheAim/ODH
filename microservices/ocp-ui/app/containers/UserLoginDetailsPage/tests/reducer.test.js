import { fromJS } from 'immutable';
import userLoginDetailsPageReducer from '../reducer';

describe('userLoginDetailsPageReducer', () => {
  it('returns the initial state', () => {
    expect(userLoginDetailsPageReducer(undefined, {})).toEqual(fromJS({
      loading: false,
      data: null,
    }));
  });
});
