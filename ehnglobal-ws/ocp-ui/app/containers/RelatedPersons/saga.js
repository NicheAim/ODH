import { makeSelectPatient } from 'containers/App/contextSelectors';
import { showNotification } from 'containers/Notification/actions';
import { all, call, put, select, takeLatest } from 'redux-saga/effects';
import { actions, actionTypes } from './actions';
import { API } from './api';
import { actions as patientPageActions } from '../../containers/PatientPage/actions';

export function* getRelatedPersonSaga(action) {
  try {
    const patient = yield select(makeSelectPatient());
    if (!patient || !patient.id) {
      yield put(showNotification('No patient is selected.'));
    } else {
      const relatedPersons = yield call(
        API.getRelatedPersons,
        patient.id,
        action.showInActive,
        action.pageNumber
      );
      yield put(actions.getRelatedPersonsSuccess(relatedPersons));

      const emergencyContact = relatedPersons.elements.find(
        (item) => item.relationshipCode === 'C'
      );
      
      yield put(patientPageActions.setEmergencyContactRelatedPerson(emergencyContact));
    }
  } catch (error) {
    yield put(showNotification('Error in getting related persons.'));
    yield put(actions.saveRelatedPersonsError(error));
  }
}

export function* watchGetRelatedPersonsSaga() {
  yield takeLatest(actionTypes.GET_RELATED_PERSONS, getRelatedPersonSaga);
}

export default function* rootSaga() {
  yield all([watchGetRelatedPersonsSaga()]);
}
