
import { fromJS } from 'immutable';
import revokeConsentPageReducer from '../reducer';

xdescribe('revokeConsentPageReducer', () => {
  it('returns the initial state', () => {
    expect(revokeConsentPageReducer(undefined, {})).toEqual(fromJS({}));
  });
});
