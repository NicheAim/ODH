import { fromJS } from 'immutable';
import manageActivityDefinitionPageReducer from '../reducer';

describe('manageActivityDefinitionPageReducer', () => {
  it('returns the initial state', () => {
    expect(manageActivityDefinitionPageReducer(undefined, {})).toEqual(fromJS({ activityDefinition: null }));
  });
});
