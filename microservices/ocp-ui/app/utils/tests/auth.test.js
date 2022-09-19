import 'mock-local-storage';
import jwt from 'jsonwebtoken';

import { checkAuthenticated, hasAccessScopeInToken } from '../auth';
import { storeAuthStatus, storeToken } from '../tokenService';

describe('auth.js', () => {
  afterEach(() => {
    sessionStorage.clear();
    // remove callback
    sessionStorage.itemInsertionCallback = null;
  });

  it('should return true if there is required access scope in token', () => {
    // Arrange
    const testScope = ['ocpUi.access'];
    const testAccessToken = jwt.sign({
      scope: testScope,
    }, 'secret');

    const testTokenWithRequiredScope = {
      access_token: testAccessToken,
    };

    // Act
    const hasAccessScopeInTestToken = hasAccessScopeInToken(testTokenWithRequiredScope);

    // Assert
    expect(hasAccessScopeInTestToken).toBeTruthy();
  });

  it('should return false if there is no required access scope in token', () => {
    // Act
    const hasAccessScopeInTestToken = hasAccessScopeInToken(null);

    // Assert
    expect(hasAccessScopeInTestToken).toBeFalsy();
  });

  it('should return true when is authenticated and token with required access scope and is not expired', () => {
    // Arrange
    const testAuthStatus = true;

    const testScope = ['ocpUi.access'];
    const unExpiredTime = (Date.now() / 1000) + (60 * 60);
    const testAccessToken = jwt.sign({
      scope: testScope,
      exp: unExpiredTime,
    }, 'secret');

    const testValidToken = {
      access_token: testAccessToken,
    };

    // Act
    storeToken(testValidToken);
    storeAuthStatus(testAuthStatus);
    const isAuthenticated = checkAuthenticated();

    // Assert
    expect(isAuthenticated).toBeTruthy();
  });

  it('should return false when is authenticated and token with required access scope but token is expired', () => {
    // Arrange
    const testAuthStatus = true;
    const testScope = ['ocpUi.access'];
    const expiredTime = (Date.now() / 1000) - (60 * 60);
    const testAccessToken = jwt.sign({
      scope: testScope,
      exp: expiredTime,
    }, 'secret');

    const testExpiredToken = {
      access_token: testAccessToken,
    };

    // Act
    storeToken(testExpiredToken);
    storeAuthStatus(testAuthStatus);
    const isAuthenticated = checkAuthenticated();

    // Assert
    expect(isAuthenticated).toBeFalsy();
  });
});
