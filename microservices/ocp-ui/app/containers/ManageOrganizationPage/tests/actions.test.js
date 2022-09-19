import { createOrganization } from '../actions';
import { CREATE_ORGANIZATION } from '../constants';

describe('ManageOrganizationPage actions', () => {
  describe('CREATE_ORGANIZATION Action', () => {
    it('has a type of CREATE_ORGANIZATION', () => {
      const name = 'name';
      const organization = { name };
      const callback = jest.fn();
      const expected = {
        type: CREATE_ORGANIZATION,
        organization,
        callback,
      };
      expect(createOrganization(organization, callback)).toEqual(expected);
    });
  });
});
