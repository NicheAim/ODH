import { fromJS } from 'immutable';
import organizationsReducer from '../reducer';

describe('organizationsReducer', () => {
  it('returns the initial state', () => {
    expect(organizationsReducer(undefined, {})).toEqual(fromJS({
      loading: false,
      data: [],
      currentPage: 0,
      totalNumberOfPages: 0,
    }));
  });
});
