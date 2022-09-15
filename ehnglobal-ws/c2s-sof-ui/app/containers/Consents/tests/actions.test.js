import { INITIALIZE_CONSENTS } from 'containers/Consents/constants';
import { initializeConsents } from 'containers/Consents/actions';

describe('Consents actions', () => {
  describe('INITIALIZE_CONSENTS', () => {
    it('has a type of INITIALIZE_CONSENTS', () => {
      const expected = {
        type: INITIALIZE_CONSENTS,
      };
      expect(initializeConsents()).toEqual(expected);
    });
  });
});
