import { fromJS } from 'immutable';
import manageCareTeamPageReducer from '../reducer';

describe('manageCareTeamPageReducer', () => {
  it('returns the initial state', () => {
    expect(manageCareTeamPageReducer(undefined, {})).toEqual(fromJS({ patient: null, careTeam: null, eventTypes: [] }));
  });
});
