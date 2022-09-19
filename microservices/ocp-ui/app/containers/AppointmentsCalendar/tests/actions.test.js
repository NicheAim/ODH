
import {
  getAppointments,
} from '../actions';
import {
  GET_APPOINTMENTS,
} from '../constants';

describe('AppointmentsCalendar actions', () => {
  describe('GET_APPOINTMENTS', () => {
    it('has a type of GET_APPOINTMENTS', () => {
      const expected = {
        type: GET_APPOINTMENTS,
      };
      expect(getAppointments()).toEqual(expected);
    });
  });
});
