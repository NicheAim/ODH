import { findPractitioner } from '../actions';
import { FIND_PRACTITIONER } from '../constants';

describe('NewPractitionerResource actions', () => {
  describe('Find Practitioner Action', () => {
    it('has a type of FIND_PRACTITIONER', () => {
      const expected = {
        type: FIND_PRACTITIONER,
      };
      expect(findPractitioner()).toEqual(expected);
    });
  });
});
