import { fromJS } from 'immutable';
import patientsReducer from '../reducer';

describe('patientsReducer', () => {
  it('returns the initial state', () => {
    expect(patientsReducer(undefined, {})).toEqual(fromJS({
      loading: false,
      error: false,
      searchPatients: {
        result: false,
        totalPages: 0,
        currentPageSize: 0,
        currentPage: 0,
      },
    }));
  });
});
