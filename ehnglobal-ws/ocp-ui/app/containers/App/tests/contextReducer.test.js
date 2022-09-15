
import { fromJS } from 'immutable';
import contextReducer from '../contextReducer';

describe('contextReducer', () => {
  it('returns the initial state', () => {
    expect(contextReducer(undefined, {})).toEqual(fromJS({
      user: null,
      organization: null,
      location: null,
      practitioner: null,
      patient: null,
      subscriptionOptions: [],
    }));
  });
});
