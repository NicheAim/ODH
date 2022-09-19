import { getLocationReferences } from '../actions';
import { GET_LOCATION_REFERENCES } from '../constants';

describe('AddAppointmentParticipant actions', () => {
  describe('Get Location References Action', () => {
    it('has a type of GET_LOCATION_REFERENCES', () => {
      const expected = {
        type: GET_LOCATION_REFERENCES,
      };
      expect(getLocationReferences()).toEqual(expected);
    });
  });
});
