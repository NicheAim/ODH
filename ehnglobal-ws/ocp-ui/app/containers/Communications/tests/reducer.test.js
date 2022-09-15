
import { fromJS } from 'immutable';
import communicationReducer from '../reducer';

xdescribe('communicationsReducer', () => {
  it('returns the initial state', () => {
    expect(communicationReducer(undefined, {})).toEqual(fromJS({}));
  });
});
