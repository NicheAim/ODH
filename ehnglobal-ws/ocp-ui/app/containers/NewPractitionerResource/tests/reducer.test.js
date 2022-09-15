import { fromJS } from 'immutable';
import newPractitionerResourceReducer from '../reducer';

describe('newPractitionerResourceReducer', () => {
  it('returns the initial state', () => {
    expect(newPractitionerResourceReducer(undefined, {})).toEqual(fromJS({
      loading: false,
      practitioner: null,
      queryParameters: {
        firstName: null,
        lastName: null,
        identifierType: null,
        identifier: null,
      },
      exists: false,
      error: false,
    }));
  });
});
