import jwt from 'jsonwebtoken';
import isEmpty from 'lodash/isEmpty';
import Cookies from 'universal-cookie';

const CODE_TOKEN = 'auth_code';
const AUTH_TOKEN = 'auth_token';
const AUTH_STATUS = 'isAuthenticated';

const REFRESH_TOKEN_LEADER = 'refresh_leader';
const REFRESH_TOKEN_BODY = 'refresh_body';

const OUTLOOK_EMAIL = 'outlook_email';
const OUTLOOK_PASSWORD = 'outlook_password';
const cookies = new Cookies();

export function validateCookie() {
  // TODO: Validar si ya esta en session storage
  const cookiecode = cookies.get(CODE_TOKEN);
  const cookietoken = cookies.get(AUTH_TOKEN);
  const code = cookies.get('code');
  //console.log('Refresh: ', cookies.get('refresh_leader')); // refresh_leader + refresh_body ( Full refresh token )

  return {
    code: !isEmpty(code) ? code : '',
    cookieexists: !isEmpty(cookiecode),
    authcookie: !isEmpty(cookiecode) ? `${cookiecode}${cookietoken}` : '',
  };
}

export function getRefreshTokenCookie() {
  const refreshTokenLeaderCookie = cookies.get(REFRESH_TOKEN_LEADER);
  const refreshTokenBodyCookie = cookies.get(REFRESH_TOKEN_BODY);

  return !isEmpty(refreshTokenLeaderCookie) && !isEmpty(refreshTokenBodyCookie)
    ? refreshTokenLeaderCookie + refreshTokenBodyCookie
    : undefined;
}

export function storeToken(tokenObj) {
  sessionStorage.setItem(AUTH_TOKEN, JSON.stringify(tokenObj));
}

export function retrieveToken() {
  return JSON.parse(sessionStorage.getItem(AUTH_TOKEN));
}

export function storeAuthStatus(isAuthenticated) {
  sessionStorage.setItem(AUTH_STATUS, isAuthenticated);
}

export function retrieveAuthStatus() {
  return JSON.parse(sessionStorage.getItem(AUTH_STATUS));
}

export function removeToken() {
  sessionStorage.removeItem(AUTH_TOKEN);
  sessionStorage.removeItem(AUTH_STATUS);

  sessionStorage.removeItem(OUTLOOK_EMAIL);
  sessionStorage.removeItem(OUTLOOK_PASSWORD);
  cookies.remove(AUTH_TOKEN);
  cookies.remove(CODE_TOKEN);
  // Cookies.remove('access_token');
}

export function storeOutlookUsername(username) {
  sessionStorage.setItem(OUTLOOK_EMAIL, username);
}

export function storeOutlookPassword(password) {
  sessionStorage.setItem(OUTLOOK_PASSWORD, password);
}

export function retrieveOutlookUsername() {
  if (sessionStorage.getItem(OUTLOOK_EMAIL) !== null) {
    const userName = JSON.stringify(sessionStorage.getItem(OUTLOOK_EMAIL));
    return JSON.parse(userName);
  }
  return null;
}

export function retrieveOutlookPassword() {
  if (sessionStorage.getItem(OUTLOOK_PASSWORD) !== null) {
    const password = JSON.stringify(sessionStorage.getItem(OUTLOOK_PASSWORD));
    return JSON.parse(password);
  }
  return null;
}

export function isTokenExpired(token) {
  if (!isEmpty(token)) {
    const currentTime = new Date().getTime() / 1000;
    const decodedAccessToken = jwt.decode(token.access_token);
    return currentTime > decodedAccessToken.exp;
  }
  return true;
}

export function getTokenTimeDiff(authData) {
  const actualDateTime = new Date();

  const tokenExpiresInMilisecons =
    authData && authData.expires_in ? authData.expires_in * 1000 : undefined;

  if (tokenExpiresInMilisecons) {
    console.log('actualDateTime epoch: ', actualDateTime.getTime());
    console.log('tokenExpiresInMilisecons epoch: ', tokenExpiresInMilisecons);
    console.log('actualDateTime Date: ', actualDateTime);
    console.log(
      'tokenExpiresInMilisecons Date: ',
      new Date(tokenExpiresInMilisecons)
    );
  }

  const tokenTimeDiff = tokenExpiresInMilisecons
    ? actualDateTime.getTime() - tokenExpiresInMilisecons
    : 1;

  console.log('tokenTimeDiff ', tokenTimeDiff);

  return tokenTimeDiff;
}

export function getSecondsLeftFromEpoch(expiresIn) {
  const actualDateTime = new Date();
  const tokenExpiresInMilisecons = expiresIn ? expiresIn * 1000 : undefined;
  let secondsLeft = 0;
  const tokenTimeDiff = tokenExpiresInMilisecons
    ? tokenExpiresInMilisecons - actualDateTime.getTime()
    : 0;
  if (tokenTimeDiff > 0) secondsLeft = tokenTimeDiff / 1000;
  if (secondsLeft < 1) secondsLeft = 0;
  return Math.ceil(secondsLeft);
}
