import { initializePermissionAssignment } from '../actions';
import { INITIALIZE_PERMISSION_ASSIGNMENT } from '../constants';

describe('ManageUsers actions', () => {
  describe('Initialize Permission Assignment Action', () => {
    it('has a type of INITIALIZE_PERMISSION_ASSIGNMENT', () => {
      const expected = {
        type: INITIALIZE_PERMISSION_ASSIGNMENT,
      };
      expect(initializePermissionAssignment()).toEqual(expected);
    });
  });
});
