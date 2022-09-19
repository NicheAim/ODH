import { fromJS } from 'immutable';
import searchParticipantReducer from '../reducer';

describe('searchParticipantReducer', () => {
  it('returns the initial state', () => {
    expect(searchParticipantReducer(undefined, {})).toEqual(fromJS({
      searchParticipantResult: [],
      selectedParticipants: [],
    }));
  });
});
