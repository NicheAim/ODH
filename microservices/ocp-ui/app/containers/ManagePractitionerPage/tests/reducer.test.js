import { fromJS } from 'immutable';
import managePractitionerPageReducer from '../reducer';

describe('managePractitionerPageReducer', () => {
  it('returns the initial state', () => {
    expect(managePractitionerPageReducer(undefined, {})).toEqual(fromJS({
      error: false,
      practitioner: null,
      organizations: {
        loading: false,
        data: [],
        currentPage: 0,
        totalNumberOfPages: 0,
      },
    }));
  });
});
