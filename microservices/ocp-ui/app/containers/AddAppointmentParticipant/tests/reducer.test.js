import { fromJS } from 'immutable';
import addAppointmentParticipantReducer from '../reducer';

describe('addAppointmentParticipantReducer', () => {
  it('returns the initial state', () => {
    expect(addAppointmentParticipantReducer(undefined, {})).toEqual(fromJS({
      healthcareServices: null,
      locations: null,
      practitioners: null,
      searchParticipants: {
        loading: false,
        outsideParticipants: null,
        error: false,
      },
    }));
  });
});
