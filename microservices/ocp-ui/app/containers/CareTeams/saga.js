import { all, call, put, select, takeLatest } from 'redux-saga/effects';

import { makeSelectOrganization, makeSelectPatient } from 'containers/App/contextSelectors';
import { DEFAULT_PAGE_SIZE } from 'containers/App/constants';
import { showNotification } from 'containers/Notification/actions';
import { GET_CARE_TEAMS } from './constants';
import { getCareTeamsError, getCareTeamsSuccess } from './actions';
import { getCareTeams } from './api';

function getErrorMessage(err) {
  let errorMessage = '';
  if (err && err.message === 'Failed to fetch') {
    errorMessage = 'Failed to retrieve patient\'s care teams. Server is offline.';
  } else if (err && err.response && err.response.status === 404) {
    errorMessage = 'The patient does not have any care teams.';
  } else if (err && err.response && err.response.status === 500) {
    errorMessage = 'Failed to retrieve patient\'s care teams. Unknown server error.';
  } else {
    errorMessage = 'Failed to retrieve patient\'s care teams. Unknown error.';
  }
  return errorMessage;
}

export function* getCareTeamsSaga({ pageNumber }) {
  try {
    const patient = yield select(makeSelectPatient());
    const organization = yield select(makeSelectOrganization());
    const organizationId = (organization) ? organization.logicalId : undefined;
    if (!patient || !patient.id) {
      yield put(showNotification('No patient is selected.'));
    } else {
      const { id } = patient;
      const careTeamsPage = yield call(getCareTeams, organizationId, id, pageNumber, DEFAULT_PAGE_SIZE);
      yield put(getCareTeamsSuccess(careTeamsPage));
    }
  } catch (err) {
    const errMsg = getErrorMessage(err);
    yield put(getCareTeamsError(err));
    yield put(showNotification(errMsg));
  }
}

export function* watchGetCareTeamsSaga() {
  yield takeLatest(GET_CARE_TEAMS, getCareTeamsSaga);
}

export default function* rootSaga() {
  yield all([
    watchGetCareTeamsSaga(),
  ]);
}
