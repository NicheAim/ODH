
import {
  getPatientToDos,
} from '../actions';
import {
  GET_PATIENT_TO_DOS,
} from '../constants';

describe('PatientToDos actions', () => {
  describe('Default Action', () => {
    xit('has a type of DEFAULT_ACTION', () => {
      const expected = {
        type: GET_PATIENT_TO_DOS,
        patientId: 0,
        practitionerId: 0,
        definition: '',
      };
      expect(getPatientToDos(0, 0, '')).toEqual(expected);
    });
  });
});
