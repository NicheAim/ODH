
import {
  getPractitionerToDos,
} from 'containers/PractitionerToDos/actions';
import {
  GET_PRACTITIONER_TO_DOS,
} from 'containers/PractitionerToDos/constants';

describe('PractitionerToDos actions', () => {
  describe('Default Action', () => {
    xit('has a type of DEFAULT_ACTION', () => {
      const expected = {
        type: GET_PRACTITIONER_TO_DOS,
        practitionerId: 0,
        definition: '',
      };
      expect(getPractitionerToDos(0, '')).toEqual(expected);
    });
  });
});
