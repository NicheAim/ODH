import { fromJS } from 'immutable';
import manageHealthcareServicePageReducer from '../reducer';

describe('manageHealthcareServicePageReducer', () => {
  it('returns the initial state', () => {
    expect(manageHealthcareServicePageReducer(undefined, {})).toEqual(fromJS({
      error: false,
      healthcareService: null,
    }));
  });
});
