/*
 *
 * Tasks reducer
 *
 */

import { fromJS } from 'immutable';
import find from 'lodash/find';
import { actionTypes } from './actions';

const initialState = fromJS({
  loading: false,
  data: {},
  statusList: [],
  communicationLoading: false,
  communicationError: false,
  communications: null,
});

function tasksReducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.INITIALIZE_TASKS:
      return initialState;
    case actionTypes.GET_TASKS:
      // console.log('GET_TASKS action:')
      // console.log(action)
      return state
        .set('loading', true)
        .set('practitionerId', action.practitionerId)
        .set('patientId', action.patientId)
        .set('statusList', fromJS(action.statusList))
        .set('definition', action.definition)
        .set('data', fromJS({}));
    case actionTypes.GET_TASKS_SUCCESS:
      return state
        .set('loading', false)
        .set('data', fromJS(action.tasksPage || {}));
    case actionTypes.GET_TASKS_ERROR:
      return state.set('loading', false).set('error', action.error);
    case actionTypes.CANCEL_TASK_SUCCESS: {
      const data = state.get('data').toJS();
      find(data.elements, { logicalId: action.id }).status = {
        code: 'cancelled',
        display: 'Cancelled',
      };
      return state.set('data', fromJS(data));
    }
    case actionTypes.GET_TASK_RELATED_COMMUNICATIONS:
      return state.set('communicationLoading', true);
    case actionTypes.GET_TASK_RELATED_COMMUNICATIONS_SUCCESS:
      return state
        .set('communicationError', false)
        .set('communicationLoading', false)
        .set('communications', fromJS(action.communications || {}));
    case actionTypes.GET_TASK_RELATED_COMMUNICATIONS_ERROR:
      return state
        .set('communicationError', action.error)
        .set('communicationLoading', false);
    default:
      return state;
  }
}

export default tasksReducer;
