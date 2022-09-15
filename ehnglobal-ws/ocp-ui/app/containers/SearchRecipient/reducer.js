/*
 *
 * SearchRecipient reducer
 *
 */

import { fromJS } from 'immutable';
import {
  ADD_RECIPIENT,
  GET_RECIPIENTS_ERROR, GET_RECIPIENTS_SUCCESS, INITIALIZE_SEARCH_RECIPIENTS,
  INITIALIZE_SEARCH_RECIPIENT_RESULT, REMOVE_RECIPIENT, SET_SELECT_RECIPIENT_STATUS, INITIALIZE_LIST_OF_RECIPIENTS,
  SET_SELECTED_RECIPIENTS,
} from 'containers/SearchRecipient/constants';
import Utils from 'utils/Util';

const initialState = fromJS({
  recipients: [],
  selectedRecipients: [],
});

function searchRecipientReducer(state = initialState, action) {
  switch (action.type) {
    case INITIALIZE_SEARCH_RECIPIENTS:
      return state
        .set('recipients', fromJS([]))
        .set('selectedRecipients', fromJS([]));
    case INITIALIZE_LIST_OF_RECIPIENTS:
      return state
        .set('recipients', fromJS([]));
    case SET_SELECTED_RECIPIENTS:
      return state
        .set('selectedRecipients', fromJS(action.selectedRecipients));
    case GET_RECIPIENTS_SUCCESS: {
      const selectedRecipientsAsArray = Utils.getFromState(state, 'selectedRecipients');
      const recipients = action.recipients;
      if (selectedRecipientsAsArray.length > 0) {
        for (let j = 0; j < recipients.length; j += 1) {
          recipients[j].checked = false;
        }

        for (let i = 0; i < selectedRecipientsAsArray.length; i += 1) {
          for (let j = 0; j < recipients.length; j += 1) {
            if (recipients[j].reference === selectedRecipientsAsArray[i].reference) {
              recipients[j].checked = true;
            }
          }
        }
      }
      return state.set('recipients', fromJS((recipients) || []));
    }
    case INITIALIZE_SEARCH_RECIPIENT_RESULT:
      return state
        .set('recipients', fromJS([]));
    case ADD_RECIPIENT: {
      const recipientsAsArray = Utils.getFromState(state, 'recipients');
      const selectedRecipients = [];
      recipientsAsArray.forEach((recipient) => {
        if (recipient.checked) {
          selectedRecipients.push({ reference: recipient.reference, display: recipient.display });
        }
      });
      return state.set('selectedRecipients', fromJS((selectedRecipients) || []));
    }
    case REMOVE_RECIPIENT: {
      const selectedRecipientsAsArray = Utils.getFromState(state, 'selectedRecipients');
      const newSelectedRecipients = [];
      selectedRecipientsAsArray.forEach((recipient) => {
        if (recipient.reference !== action.recipientReference) {
          newSelectedRecipients.push(recipient);
        }
      });
      const recipientsAsArray = Utils.getFromState(state, 'recipients');
      for (let i = 0; i < recipientsAsArray.length; i += 1) {
        if (recipientsAsArray[i].reference === action.recipientReference) {
          recipientsAsArray[i].checked = false;
        }
      }
      return state
        .set('recipients', fromJS((recipientsAsArray) || []))
        .set('selectedRecipients', fromJS((newSelectedRecipients) || []));
    }
    case SET_SELECT_RECIPIENT_STATUS: {
      const recipientsAsArray = Utils.getFromState(state, 'recipients');
      for (let i = 0; i < recipientsAsArray.length; i += 1) {
        if (recipientsAsArray[i].reference === action.recipientReference) {
          recipientsAsArray[i].checked = action.checked;
        }
      }
      return state.set('recipients', fromJS((recipientsAsArray) || []));
    }
    case GET_RECIPIENTS_ERROR:
      return state;
    default:
      return state;
  }
}

export default searchRecipientReducer;
