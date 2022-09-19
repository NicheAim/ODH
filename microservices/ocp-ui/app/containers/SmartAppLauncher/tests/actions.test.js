import { createLaunch } from '../actions';
import { CREATE_LAUNCH } from '../constants';

describe('SmartAppLauncher actions', () => {
  describe('createLaunch Action', () => {
    it('has a type of CREATE_LAUNCH', () => {
      const expected = {
        type: CREATE_LAUNCH,
      };
      expect(createLaunch()).toEqual(expected);
    });
  });
});
