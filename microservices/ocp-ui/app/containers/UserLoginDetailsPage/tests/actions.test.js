import { getUserLoginDetails } from '../actions';
import { GET_USER_LOGIN_DETAILS } from '../constants';

describe('UserLoginDetailsPage actions', () => {
  describe('getUserLoginDetails Action', () => {
    it('has a type of GET_USER_LOGIN_DETAILS', () => {
      const expected = {
        type: GET_USER_LOGIN_DETAILS,
      };
      expect(getUserLoginDetails()).toEqual(expected);
    });
  });
});
