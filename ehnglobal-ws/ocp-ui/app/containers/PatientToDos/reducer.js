/*
 *
 * PatientToDos reducer
 *
 */

import { fromJS } from 'immutable';
import {
  CANCEL_TO_DO,
  GET_FILTER_TO_DO_SUCCESS,
  CANCEL_TO_DO_SUCCESS,
  GET_PATIENT_TO_DO_MAIN_TASK_ERROR,
  GET_PATIENT_TO_DO_MAIN_TASK_SUCCESS,
  GET_PATIENT_TO_DOS,
  GET_PATIENT_TO_DOS_ERROR,
  GET_PATIENT_TO_DOS_SUCCESS, GET_FILTER_TO_DO, GET_FILTER_TO_DO_ERROR, GET_TO_DO_RELATED_COMMUNICATIONS_SUCCESS,
  GET_TO_DO_RELATED_COMMUNICATIONS_ERROR, GET_TO_DO_RELATED_COMMUNICATIONS,
} from 'containers/PatientToDos/constants';
import Utils from 'utils/Util';

const initialState = fromJS({
  data: [],
  toDoMainTask: [],
  loading: false,
  communicationLoading: false,
  communicationError: false,
  communications: null,
});

function patientToDosReducer(state = initialState, action) {
  switch (action.type) {
    case GET_PATIENT_TO_DOS:
      return state.set('loading', true);
    case GET_PATIENT_TO_DOS_SUCCESS:
      return state
        .set('error', false)
        .set('loading', false)
        .set('data', fromJS((action.toDos) || []));
    case CANCEL_TO_DO:
      return state
        .set('error', false)
        .set('loading', true);
    case CANCEL_TO_DO_SUCCESS: {
      const toDosAsArray = Utils.getFromState(state, 'data');
      const filterToDos = toDosAsArray.filter((toDo) => toDo.logicalId !== action.toDoLogicalId);
      return state
        .set('error', false)
        .set('loading', false)
        .set('data', fromJS((filterToDos) || []));
    }
    case GET_PATIENT_TO_DO_MAIN_TASK_SUCCESS:
      return state
        .set('error', false)
        .set('loading', false)
        .set('toDoMainTask', fromJS((action.toDoMainTask) || []));
    case GET_FILTER_TO_DO:
      return state
        .set('error', false)
        .set('loading', true);
    case GET_FILTER_TO_DO_SUCCESS:
      return state
        .set('error', false)
        .set('loading', false)
        .set('data', fromJS((action.toDos) || []));
    case GET_FILTER_TO_DO_ERROR:
      return state
        .set('error', true)
        .set('loading', false);
    case GET_PATIENT_TO_DO_MAIN_TASK_ERROR:
      return state
        .set('error', true)
        .set('loading', false);
    case GET_PATIENT_TO_DOS_ERROR:
      return state
        .set('error', true)
        .set('loading', false);
    case GET_TO_DO_RELATED_COMMUNICATIONS:
      return state.set('communicationLoading', true);
    case GET_TO_DO_RELATED_COMMUNICATIONS_SUCCESS:
      return state
        .set('communicationError', false)
        .set('communicationLoading', false)
        .set('communications', fromJS((action.communications) || {}));
    case GET_TO_DO_RELATED_COMMUNICATIONS_ERROR:
      return state
        .set('communicationError', action.error)
        .set('communicationLoading', false);
    default:
      return state;
  }
}

export default patientToDosReducer;
