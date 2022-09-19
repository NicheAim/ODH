/*
 *
 * ManageConditionPage reducer
 *
 */
import moment from 'moment';
import isUndefined from 'lodash/isUndefined';
import { fromJS } from 'immutable';
import {
  GET_CONDITION_ERROR,
  GET_CONDITION_SUCCESS,
  SAVE_CONDITION_ERROR,
} from './constants';

const initialState = fromJS({
  error: false,
  condition: null,
});

function manageRelatedPersonPageReducer(state = initialState, action) {
  switch (action.type) {
    case GET_CONDITION_SUCCESS:
      console.log('GET_CONDITION_SUCCESS');
      console.log(action);
      const condition = {
        ...action.condition,
        recordedDate: !isUndefined(action.condition.recordedDate)
          ? moment(action.condition.recordedDate, 'DD/MM/YYYY')
          : null,
        conditionId: action.condition.conditionid,
      };
      console.log('formattedCondition');
      console.log(condition);
      return state.set('condition', condition);
    case GET_CONDITION_ERROR:
      return state.set('error', action.error);
    case SAVE_CONDITION_ERROR:
      return state.set('error', action.error);
    default:
      return state;
  }
}

export default manageRelatedPersonPageReducer;
