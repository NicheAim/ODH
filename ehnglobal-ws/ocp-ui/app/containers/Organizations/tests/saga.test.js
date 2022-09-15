/**
 * Test  sagas
 */

/* eslint-disable redux-saga/yield-effects */
import { all, call, put, takeLatest } from 'redux-saga/effects';
import { fromJS } from 'immutable';
import rootSaga, { searchOrganizationsSaga, watchGetOrganizationsSaga, watchSearchOrganizationsSaga } from '../saga';
import { SEARCH_ORGANIZATIONS } from '../constants';
import { searchOrganizations } from '../api';
import { searchOrganizationsError, searchOrganizationsSuccess } from '../actions';

describe('Organizations.saga', () => {
  describe('rootSaga', () => {
    it('it should run all watcher sagas', () => {
      // Arrange
      const generator = rootSaga();

      // Act
      const effect = generator.next().value;

      // Assert
      expect(effect).toEqual(all([
        watchGetOrganizationsSaga(),
        watchSearchOrganizationsSaga(),
      ]));
    });
  });

  describe('watchSearchOrganizationsSaga', () => {
    it('it should takeLatest of SEARCH_ORGANIZATIONS and delegate to searchOrganizationsSaga ', () => {
      // Arrange
      const generator = watchSearchOrganizationsSaga();

      // Act
      const effect = generator.next().value;

      // Assert
      expect(effect).toEqual(takeLatest(SEARCH_ORGANIZATIONS, searchOrganizationsSaga));
    });
  });

  describe('searchOrganizationsSaga', () => {
    const searchValue = 'searchValue';
    const showInactive = true;
    const searchType = 'searchType';
    const currentPage = 10;
    const mockAction = fromJS({ searchValue, showInactive, searchType, currentPage });
    const mockOrganizations = fromJS(['a', 'b']);

    it('should handle successful api call when searchValue exists', () => {
      // Arrange
      const mockActionJS = mockAction.toJS();
      const generator = searchOrganizationsSaga(mockActionJS);

      // Act
      const { value: apiCallEffect, done: apiCallIsLast } = generator.next();
      const { value: putOrganizationsEffect, done: putOrganizationsIsLast } = generator.next(mockOrganizations);
      const { value: finalValue, done: finalDone } = generator.next();

      // Assert
      expect(apiCallEffect).toEqual(call(searchOrganizations, searchValue, showInactive, searchType, currentPage));
      expect(apiCallIsLast).toEqual(false);
      expect(putOrganizationsEffect).toEqual(put(searchOrganizationsSuccess(mockOrganizations)));
      expect(putOrganizationsIsLast).toEqual(false);
      expect(finalValue).toEqual(undefined);
      expect(finalDone).toEqual(true);
    });

    it('should do nothing when searchValue does not exist', () => {
      // Arrange
      const mockActionJS = mockAction
        .set('searchValue', '')
        .toJS();
      const generator = searchOrganizationsSaga(mockActionJS);

      // Act
      const { value: finalValue, done: finalDone } = generator.next();

      // Assert
      expect(finalValue).toEqual(undefined);
      expect(finalDone).toEqual(true);
    });

    it('should handle api call error and put error action', () => {
      // Arrange
      const mockActionJS = mockAction.toJS();
      const error = new Error('api call failed');
      const generator = searchOrganizationsSaga(mockActionJS);

      // Act
      const { value: apiCallEffect, done: apiCallIsLast } = generator.next();
      const { value: putErrorEffect, done: putErrorEffectIsLast } = generator.throw(error);
      const { value: finalValue, done: finalDone } = generator.next();

      // Assert
      expect(apiCallEffect).toEqual(call(searchOrganizations, searchValue, showInactive, searchType, currentPage));
      expect(apiCallIsLast).toEqual(false);
      expect(putErrorEffect).toEqual(put(searchOrganizationsError(error.message)));
      expect(putErrorEffectIsLast).toEqual(false);
      expect(finalValue).toEqual(undefined);
      expect(finalDone).toEqual(true);
    });
  });
});
