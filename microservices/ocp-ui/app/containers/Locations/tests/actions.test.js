
import {
  getFilteredLocations,
} from '../actions';
import {
  GET_FILTERED_LOCATIONS,
} from '../constants';

describe('Locations actions', () => {
  describe('Default Action', () => {
    it('has a type of DEFAULT_ACTION', () => {
      const expected = {
        type: GET_FILTERED_LOCATIONS,
      };
      expect(getFilteredLocations()).toEqual(expected);
    });
  });
});
