import { fromJS } from 'immutable';
import manageUsersReducer from '../reducer';

describe('manageUsersReducer', () => {
  it('returns the initial state', () => {
    expect(manageUsersReducer(undefined, {})).toEqual(fromJS({
      loading: false,
      error: false,
      users: [],
      groups: [],
    }));
  });
});
