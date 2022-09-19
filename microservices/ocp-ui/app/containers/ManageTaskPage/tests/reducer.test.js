
import { fromJS } from 'immutable';
import manageTaskPageReducer from '../reducer';

describe('manageTaskPageReducer', () => {
  it('returns the initial state', () => {
    expect(manageTaskPageReducer(undefined, {})).toEqual(fromJS({}));
  });
});
