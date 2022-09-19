
import { fromJS } from 'immutable';
import searchRecipientReducer from '../reducer';

xdescribe('searchRecipientReducer', () => {
  it('returns the initial state', () => {
    expect(searchRecipientReducer(undefined, {})).toEqual(fromJS({}));
  });
});
