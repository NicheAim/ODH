import { getActivityDefinitionsInOrganization } from '../actions';
import { GET_ACTIVITY_DEFINITIONS_IN_ORGANIZATION } from '../constants';

describe('ActivityDefinitions actions', () => {
  describe('Default Action', () => {
    it('has a type of GET_ACTIVITY_DEFINITIONS_IN_ORGANIZATION', () => {
      const expected = {
        type: GET_ACTIVITY_DEFINITIONS_IN_ORGANIZATION,
      };
      expect(getActivityDefinitionsInOrganization()).toEqual(expected);
    });
  });
});
