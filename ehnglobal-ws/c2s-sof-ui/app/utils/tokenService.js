import jwt from 'jsonwebtoken';
import isEmpty from 'lodash/isEmpty';

const AUTH_TOKEN = 'auth_token';

export function storeToken(tokenObj) {
  sessionStorage.setItem(AUTH_TOKEN, JSON.stringify(tokenObj));
}

export function retrieveToken() {
  return JSON.parse(sessionStorage.getItem(AUTH_TOKEN));
}

export function removeToken() {
  sessionStorage.clear();
}

export function isTokenExpired(token) {
  if (!isEmpty(token)) {
    const currentTime = new Date().getTime() / 1000;
    const decodedAccessToken = jwt.decode(token.access_token);
    return currentTime > decodedAccessToken.exp;
  }
  return true;
}
