/*
 *
 * Consents reducer
 *
 */

import { fromJS } from 'immutable';

import { GET_CONSENTS, GET_CONSENTS_ERROR, GET_CONSENTS_SUCCESS, INITIALIZE_CONSENTS } from './constants';

const initialState = fromJS({
  loading: false,
  data: [],
  currentPage: 0,
  totalNumberOfPages: 0,
});

function consentsReducer(state = initialState, action) {
  switch (action.type) {
    case INITIALIZE_CONSENTS:
      return initialState;
    case GET_CONSENTS:
      return state
        .set('loading', true);
    case GET_CONSENTS_SUCCESS:
      return state
        .set('loading', false)
        .set('data', fromJS(action.consents.elements))
        .set('totalNumberOfPages', action.consents.totalNumberOfPages)
        .set('totalElements', action.consents.totalElements)
        .set('currentPageSize', action.consents.currentPageSize)
        .set('currentPage', action.consents.currentPage);
    case GET_CONSENTS_ERROR:
      return state
        .set('loading', false)
        .set('data', fromJS([]))
        .set('error', action.error);
    default:
      return state;
  }
}

export default consentsReducer;
