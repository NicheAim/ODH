import { all, call, put, takeLatest } from 'redux-saga/effects';

import queryString from 'utils/queryString';
import { getEndpoint, SMART_AUTHORIZE_URL } from 'utils/endpointService';
import { showNotification } from 'containers/Notification/actions';
import { POST_CONTEXT } from './constants';
import { postContext } from './api';
import { postContextError, postContextSuccess } from './actions';

export function* postContextSaga({ launchId, context, params }) {
  try {
    const response = yield call(postContext, launchId, context);
    yield put(postContextSuccess(response));
    const paramsQueryString = yield call(queryString, params);
    const authorizeUrl = getEndpoint(SMART_AUTHORIZE_URL);
    window.location = `${authorizeUrl}${paramsQueryString}`;
  } catch (error) {
    yield put(postContextError(error));
    yield put(showNotification('Unable to submit SMART context.'));
  }
}

export function* watchPostContextSaga() {
  yield takeLatest(POST_CONTEXT, postContextSaga);
}

export default function* rootSaga() {
  yield all([
    watchPostContextSaga(),
  ]);
}
