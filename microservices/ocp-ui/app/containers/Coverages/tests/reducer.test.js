
import { fromJS } from 'immutable';
import coveragesReducer from '../reducer';

describe('coveragesReducer', () => {
  xit('returns the initial state', () => {
    expect(coveragesReducer(undefined, {})).toEqual(fromJS({}));
  });
});
