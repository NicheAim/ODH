import { searchRelatedPersonsSuccess } from '../actions';
import { SEARCH_RELATED_PERSONS_SUCCESS } from '../constants';

describe('ManageRelatedPersonModal actions', () => {
  describe('Search Action', () => {
    it('has a type of SEARCH_RELATED_PERSONS_SUCCESS', () => {
      const expected = {
        type: SEARCH_RELATED_PERSONS_SUCCESS,
      };
      expect(searchRelatedPersonsSuccess()).toEqual(expected);
    });
  });
});
