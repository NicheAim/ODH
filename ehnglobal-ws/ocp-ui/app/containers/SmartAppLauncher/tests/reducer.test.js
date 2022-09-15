import { fromJS } from 'immutable';
import smartAppLauncherReducer from '../reducer';

describe('smartAppLauncherReducer', () => {
  it('returns the initial state', () => {
    expect(smartAppLauncherReducer(undefined, {})).toEqual(fromJS({
      clients: [],
      appShortcuts: {},
    }));
  });
});
