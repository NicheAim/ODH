import { all, put, select, takeLatest } from 'redux-saga/effects';
import queryString from 'utils/queryString';
import { makeSelectConfig } from 'containers/App/selectors';
import { AUTOLOGIN } from './constants';
import { autologinError } from './actions';

function* autologinSaga({ code }) {
  try {
    const currentLocation = window.location;
    /* eslint-disable camelcase */
    if (code) {
      let config = yield select(makeSelectConfig());
      while (config === undefined) {
        config = yield select(makeSelectConfig());
      }
      const authorizationServerEndpoint = config && config.oauth2 && config.oauth2.authorizationServerEndpoint;
      const endpoint = `${authorizationServerEndpoint}/autologin`;
      const client_id = config && config.oauth2 && config.oauth2.oauth2Client && config.oauth2.oauth2Client.clientId;
      const q = { code, client_id, autologin_redirect_uri: currentLocation };
      window.location = `${endpoint}${queryString(q)}`;
    }
  } catch (error) {
    yield put(autologinError(error.message));
  }
}

function* watchAutologinSaga() {
  yield takeLatest(AUTOLOGIN, autologinSaga);
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* rootSaga() {
  yield all([
    watchAutologinSaga(),
  ]);
}
