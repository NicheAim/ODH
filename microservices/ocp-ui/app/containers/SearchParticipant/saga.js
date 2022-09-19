import isEmpty from 'lodash/isEmpty';
import { call, put, takeLatest, all } from 'redux-saga/effects';
import { searchParticipant } from '../SearchParticipant/api';

import { SEARCH_PARTICIPANT } from './constants';
import { getSearchParticipantError, getSearchParticipantSuccess } from './actions';
import { showNotification } from '../Notification/actions';

export function* searchParticipantWorker(action) {
  try {
    if (!isEmpty(action.member)) {
      const participants = yield call(searchParticipant, action.name, action.member, action.patientId, action.organizationId);
      yield put(getSearchParticipantSuccess(participants));
    }
  } catch (error) {
    yield put(showNotification('No participant found'));
    yield put(getSearchParticipantError(error));
  }
}

export function* watchSearchParticipant() {
  yield takeLatest(SEARCH_PARTICIPANT, searchParticipantWorker);
}

export default function* rootSaga() {
  yield all([
    watchSearchParticipant(),
  ]);
}
