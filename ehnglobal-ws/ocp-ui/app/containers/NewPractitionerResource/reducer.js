/*
 *
 * NewPractitionerResource reducer
 *
 */

import { fromJS } from 'immutable';
import isEmpty from 'lodash/isEmpty';
import {
  FIND_PRACTITIONER,
  FIND_PRACTITIONER_ERROR,
  FIND_PRACTITIONER_SUCCESS,
  INITIALIZE_FIND_PRACTITIONER,
} from './constants';


const initialState = fromJS({
  loading: false,
  practitioner: null,
  queryParameters: {
    firstName: null,
    lastName: null,
    identifierType: null,
    identifier: null,
  },
  exists: false,
  error: false,
});

function newPractitionerResourceReducer(state = initialState, action) {
  switch (action.type) {
    case INITIALIZE_FIND_PRACTITIONER:
      return initialState;
    case FIND_PRACTITIONER:
      return state
        .set('loading', true)
        .set('practitioner', null)
        .set('exists', false)
        .set('error', false)
        .setIn(['queryParameters', 'firstName'], action.firstName)
        .setIn(['queryParameters', 'lastName'], action.lastName)
        .setIn(['queryParameters', 'identifierType'], action.identifierType)
        .setIn(['queryParameters', 'identifier'], action.identifier);
    case FIND_PRACTITIONER_SUCCESS:
      return state
        .set('loading', false)
        .set('exists', !isEmpty(action.practitioner))
        .set('practitioner', fromJS(action.practitioner));
    case FIND_PRACTITIONER_ERROR:
      return state
        .set('loading', false)
        .set('exists', false)
        .set('error', action.error);
    default:
      return state;
  }
}

export default newPractitionerResourceReducer;
