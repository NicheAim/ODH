import jwt from 'jsonwebtoken';
import includes from 'lodash/includes';
import isEmpty from 'lodash/isEmpty';
import {
  getRefreshTokenCookie,
  isTokenExpired,
  retrieveAuthStatus,
  retrieveToken,
  validateCookie,
} from './tokenService';

const ACCESS_SCOPE = 'ocpUi.access';

export function hasAccessScopeInToken(token) {
  let hasAccessScope = false;
  if (!isEmpty(token)) {
    const decodedAccessToken = jwt.decode(token.access_token);
    hasAccessScope = includes(decodedAccessToken.scope, ACCESS_SCOPE);
  }
  return hasAccessScope;
}

export function getAuthData(authCookie) {
  const tokendata = jwt.decode(authCookie);
  const { exp, jti, scope, ext_attr } = tokendata;

  return {
    token_type: 'bearer',
    expires_in: exp,
    scope: scope.join(' '),
    access_token: authCookie,
    ext_attr,
    jti,
  };
}

export function checkCookies() {
  const { cookieexists, authcookie, code } = validateCookie();

  let res = {
    cookieexists: false,
    authData: null,
  };

  if (cookieexists) {
    const authData = getAuthData(authcookie);

    res = {
      cookieexists,
      authData: {
        ...authData,
        code,
      },
    };
  }

  const refreshTokenCookie = getRefreshTokenCookie();

  if (refreshTokenCookie !== undefined) {
    res = {
      ...res,
      refreshTokenData: refreshTokenCookie,
    };
  }

  return res;
}

export function checkAuthenticated() {
  let isAuthenticated = false;
  const authStatus = retrieveAuthStatus();
  const token = retrieveToken();
  if (authStatus && hasAccessScopeInToken(token) && !isTokenExpired(token)) {
    isAuthenticated = authStatus;
  }
  return isAuthenticated;
}
