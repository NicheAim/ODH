import { all, call, put, takeLatest } from 'redux-saga/effects';
import {
  getAttachmentsError,
  getBinarySuccess,
  getDocumentReferencesSuccess,
  getDocumentReferenceSuccess,
} from './actions';
import getDocumentReferencesApi, {
  getBinaryResource as getBinaryResourceApi,
  getDocumentReference as getDocumentReferenceApi,
} from './api';
import {
  GET_BINARY,
  GET_DOCUMENT_REFERENCE,
  GET_DOCUMENT_REFERENCES,
} from './constants';

function getErrorMessage(err) {
  let errorMessage = '';
  if (err && err.message === 'Failed to fetch') {
    errorMessage =
      "Failed to retrieve patient's attachments. Server is offline.";
  } else if (err && err.response && err.response.status === 404) {
    errorMessage = 'The patient does not have any attachments.';
  } else if (err && err.response && err.response.status === 500) {
    errorMessage =
      "Failed to retrieve patient's attachments. Unknown server error.";
  } else {
    errorMessage = "Failed to retrieve patient's attachments. Unknown error.";
  }
  return errorMessage;
}

export function* getDocumentReferencesSaga({ patientId }) {
  try {
    const responseData = yield call(getDocumentReferencesApi, patientId);
    yield put(getDocumentReferencesSuccess(responseData));
  } catch (err) {
    const errMsg = getErrorMessage(err);
    yield put(getAttachmentsError(errMsg));
  }
}

export function* getDocumentReferenceSaga({ documentReferenceId }) {
  try {
    const responseData = yield call(
      getDocumentReferenceApi,
      documentReferenceId
    );
    yield put(getDocumentReferenceSuccess(responseData));
  } catch (err) {
    const errMsg = getErrorMessage(err);
    yield put(getAttachmentsError(errMsg));
  }
}

export function* getBinarySaga({ binaryId }) {
  try {
    const responseData = yield call(getBinaryResourceApi, binaryId);
    yield put(getBinarySuccess(responseData));
  } catch (err) {
    const errMsg = getErrorMessage(err);
    yield put(getAttachmentsError(errMsg));
  }
}

export function* watchGetDocumentReferencesSaga() {
  yield takeLatest(GET_DOCUMENT_REFERENCES, getDocumentReferencesSaga);
}

export function* watchGetDocumentReferenceSaga() {
  yield takeLatest(GET_DOCUMENT_REFERENCE, getDocumentReferenceSaga);
}

export function* watchGetBinarySaga() {
  yield takeLatest(GET_BINARY, getBinarySaga);
}

export default function* rootSaga() {
  yield all([
    watchGetDocumentReferencesSaga(),
    watchGetDocumentReferenceSaga(),
    watchGetBinarySaga(),
  ]);
}
