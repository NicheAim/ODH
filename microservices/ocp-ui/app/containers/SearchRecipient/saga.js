import { call, put, takeLatest, all } from 'redux-saga/effects';
import { getRecipientsError, getRecipientsSuccess } from 'containers/SearchRecipient/actions';
import { GET_RECIPIENTS } from 'containers/SearchRecipient/constants';
import { getRecipients } from 'containers/SearchRecipient/api';
import { showNotification } from 'containers/Notification/actions';

export function* getRecipientsSaga(action) {
  try {
    if (action.patientId) {
      const recipients = yield call(getRecipients, action.patientId, action.member, action.name, action.communicationId);
      yield put(getRecipientsSuccess(recipients));
    }
  } catch (error) {
    yield put(showNotification('No recipient found!!!'));
    yield put(getRecipientsError(error));
  }
}

export function* watchGetRecipientsSaga() {
  yield takeLatest(GET_RECIPIENTS, getRecipientsSaga);
}

export default function* rootSaga() {
  yield all([
    watchGetRecipientsSaga(),
  ]);
}
