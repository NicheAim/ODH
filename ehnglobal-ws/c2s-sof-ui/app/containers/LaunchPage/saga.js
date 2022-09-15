import { all, call, put, takeLatest } from 'redux-saga/effects';
import { push } from 'react-router-redux';
import jp from 'jsonpath';

import request from 'utils/request';
import Util from 'utils/Util';
import LaunchService from 'utils/LaunchService';
import { GET_METADATA } from './constants';

export function* getMetadataSaga({ iss, launch, config }) {
  LaunchService.clear();
  const state = yield call(Util.randomString, 10);
  const metadata = yield call(request, `${iss}/metadata`);
  const extensions = jp.query(metadata, '$.rest[?(@.mode=="server")].security.extension[?(@.url=="http://fhir-registry.smarthealthit.org/StructureDefinition/oauth-uris")].extension');
  const authorize = jp.query(extensions, '$..[?(@.url=="authorize")].valueUri').pop();
  const token = jp.query(extensions, '$..[?(@.url=="token")].valueUri').pop();

  LaunchService.saveLaunchState(state, authorize, token, iss);

  const { clientId, scope, redirectUri } = config;
  if (Util.hasText(clientId) && Util.hasText(scope) && Util.hasText(redirectUri)) {
    const url = `${authorize}?client_id=${clientId}&response_type=code&scope=${scope}&redirect_uri=${redirectUri}&state=${state}&aud=${iss}&launch=${launch}`;
    window.location.assign(encodeURI(url.replace(/'/g, '')));
    // window.location.href = url;
    // window.location = encodeURI(url);
  } else {
    const missingConfig = [];
    if (!Util.hasText(clientId)) {
      missingConfig.push('client_id');
    }
    if (!Util.hasText(scope)) {
      missingConfig.push('scope');
    }
    if (!Util.hasText(redirectUri)) {
      missingConfig.push('redirect_uri');
    }
    yield put(push(`/c2s-sof-ui/error?code=missingConfig&details=${missingConfig.join(', ')}`));
  }
}

export function* watchGetMetadataSaga() {
  yield takeLatest(GET_METADATA, getMetadataSaga);
}

export default function* rootSaga() {
  yield all([
    watchGetMetadataSaga(),
  ]);
}
