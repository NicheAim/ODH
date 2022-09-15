import { fromJS } from 'immutable';
import managePatientPageReducer from '../reducer';

describe('managePatientPageReducer', () => {
  it('returns the initial state', () => {
    expect(managePatientPageReducer(undefined, {})).toEqual(fromJS({
      error: false,
      patientFormData: {},
    }));
  });
});
