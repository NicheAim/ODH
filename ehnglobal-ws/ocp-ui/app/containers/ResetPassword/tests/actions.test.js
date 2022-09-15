import { resetPassword } from '../actions';
import { RESET_PASSWORD } from '../constants';

describe('ResetPassword actions', () => {
  describe('Reset Password Action', () => {
    it('has a type of RESET_PASSWORD', () => {
      const expected = {
        type: RESET_PASSWORD,
      };
      expect(resetPassword()).toEqual(expected);
    });
  });
});
