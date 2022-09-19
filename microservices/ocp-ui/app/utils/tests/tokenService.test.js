import 'mock-local-storage';
import jwt from 'jsonwebtoken';

import {
  isTokenExpired,
  removeToken,
  retrieveAuthStatus,
  retrieveToken,
  storeAuthStatus,
  storeToken,
} from '../tokenService';

describe('tokenService.js', () => {
  afterEach(() => {
    sessionStorage.clear();
    // remove callback
    sessionStorage.itemInsertionCallback = null;
  });
  it('should return with correct stored token', () => {
    // Arrange
    const testToken = {
      access_token: 'access_token',
      token_type: 'token_type',
      expires_in: 'expires_in',
      scope: 'scope',
      jti: 'jti',
    };
    storeToken(testToken);

    // Act
    const storedToken = retrieveToken();

    // Assert
    expect(storedToken).toEqual(testToken);
  });

  it('should return with correct stored auth status', () => {
    // Arrange
    const testAuthStatus = false;
    storeAuthStatus(testAuthStatus);

    // Act
    const storedAuthStatus = retrieveAuthStatus();

    // Assert
    expect(storedAuthStatus).toEqual(testAuthStatus);
  });

  it('should clean secured data in session storage when call removeToken', () => {
    // Arrange
    const testAuthStatus = false;
    const testToken = {
      access_token: 'access_token',
      token_type: 'token_type',
      expires_in: 'expires_in',
      scope: 'scope',
      jti: 'jti',
    };
    storeAuthStatus(testAuthStatus);
    storeToken(testToken);

    // Act
    removeToken();

    // Assert
    expect(retrieveToken()).toBeNull();
    expect(retrieveAuthStatus()).toBeNull();
  });

  it('should return with correct token expired status', () => {
    // Arrange
    const expiredTime = (Date.now() / 1000) - (60 * 60);
    const testAccessToken = jwt.sign({
      exp: expiredTime,
    }, 'secret');

    const testExpiredToken = {
      access_token: testAccessToken,
    };

    storeToken(testExpiredToken);
    const expiredToken = retrieveToken();

    // Act
    const isExpired = isTokenExpired(expiredToken);

    // Assert
    expect(isExpired).toBeTruthy();
  });

  it('should return expired status when there is an empty token', () => {
    // Arrange
    storeToken(null);
    const expiredToken = retrieveToken();

    // Act
    const isExpired = isTokenExpired(expiredToken);

    // Assert
    expect(isExpired).toBeTruthy();
  });
});
