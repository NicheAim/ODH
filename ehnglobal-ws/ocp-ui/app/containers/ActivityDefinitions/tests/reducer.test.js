import { fromJS } from 'immutable';
import activityDefinitionsReducer from '../reducer';

describe('activityDefinitionsReducer', () => {
  it('returns the initial state', () => {
    expect(activityDefinitionsReducer(undefined, {})).toEqual(fromJS({
      listActivityDefinitions: {
        data: [],
        currentPage: 0,
        totalNumberOfPages: 0,
        error: false,
      },
    }));
  });
});
