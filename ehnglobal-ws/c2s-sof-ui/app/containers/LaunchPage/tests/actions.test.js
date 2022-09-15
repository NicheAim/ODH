import { getMetadata } from '../actions';
import { GET_METADATA } from '../constants';

describe('LaunchPage actions', () => {
  describe('getMetadata Action', () => {
    it('has a type of GET_METADATA', () => {
      const iss = 'iss';
      const launch = 'launch';
      const expected = {
        type: GET_METADATA,
        iss,
        launch,
      };
      expect(getMetadata(iss, launch)).toEqual(expected);
    });
  });
});
