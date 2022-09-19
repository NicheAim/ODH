/*
 *
 * CareTeams reducer
 *
 */

import { fromJS } from 'immutable';
import { GET_CARE_TEAMS, GET_CARE_TEAMS_ERROR, GET_CARE_TEAMS_SUCCESS, INITIALIZE_CARE_TEAMS } from './constants';

const initialState = fromJS({
  loading: false,
  data: null,
  pageNumber: null,
  statusList: [],
});

function careTeamsReducer(state = initialState, action) {
  switch (action.type) {
    case INITIALIZE_CARE_TEAMS:
      return initialState;
    case GET_CARE_TEAMS:
      return state
        .set('loading', true)
        .set('data', null)
        .set('pageNumber', fromJS(action.pageNumber || null))
        .set('statusList', fromJS(action.statusList));
    case GET_CARE_TEAMS_SUCCESS:
      return state
        .set('loading', false)
        .set('data', fromJS(action.careTeamsPage || {}));
    case GET_CARE_TEAMS_ERROR:
      return state.set('loading', false);
    default:
      return state;
  }
}

export default careTeamsReducer;
