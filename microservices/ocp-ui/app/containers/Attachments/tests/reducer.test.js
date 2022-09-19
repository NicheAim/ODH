import { fromJS } from 'immutable';
import tasksReducer from '../reducer';

describe('tasksReducer', () => {
  it('returns the initial state', () => {
    expect(tasksReducer(undefined, {})).toEqual(fromJS({
      loading: false,
      data: {},
    }));
  });
});
