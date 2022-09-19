import { fromJS } from 'immutable';
import relatedPersonsReducer from '../reducer';

describe('relatedPersonsReducer', () => {
  it('returns the initial state', () => {
    expect(relatedPersonsReducer(undefined, {})).toEqual(fromJS({
      data: {},
      loading: false,
    }));
  });
});
