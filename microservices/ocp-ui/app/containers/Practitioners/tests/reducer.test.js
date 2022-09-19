import { fromJS } from 'immutable';
import practitionersReducer from '../reducer';

describe('practitionersReducer', () => {
  it('returns the initial state', () => {
    expect(practitionersReducer(undefined, {})).toEqual(fromJS({
      loading: false,
      data: null,
      currentPage: 0,
      totalNumberOfPages: 0,
      error: false,
    }));
  });
});
