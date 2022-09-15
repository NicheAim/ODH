
import { INITIALIZE_ATTEST_CONSENT } from 'containers/AttestConsentPage/constants';
import { initializeAttestConsentPage } from 'containers/AttestConsentPage/actions';

describe('AttestConsentPage actions', () => {
  describe('INITIALIZE ATTEST CONSENT', () => {
    it('has a type of INITIALIZE_ATTEST_CONSENT', () => {
      const expected = {
        type: INITIALIZE_ATTEST_CONSENT,
      };
      expect(initializeAttestConsentPage()).toEqual(expected);
    });
  });
});
