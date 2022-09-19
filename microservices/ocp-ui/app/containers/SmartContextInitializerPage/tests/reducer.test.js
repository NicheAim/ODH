
import { fromJS } from 'immutable';
import smartContextInitializerPageReducer from '../reducer';

// TODO: add unit tests
xdescribe('smartContextInitializerPageReducer', () => {
  it('returns the initial state', () => {
    expect(smartContextInitializerPageReducer(undefined, {})).toEqual(fromJS({}));
  });
});
