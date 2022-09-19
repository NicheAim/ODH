import { changePassword } from '../actions';
import { CHANGE_PASSWORD } from '../constants';

describe('ChangePassword actions', () => {
  describe('changePassword Action', () => {
    it('has a type of CHANGE_PASSWORD', () => {
      const expected = {
        type: CHANGE_PASSWORD,
      };
      expect(changePassword()).toEqual(expected);
    });
  });
});
