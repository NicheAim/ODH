const STATE_KEY = 'c2s.state';
const makeAuthorizeKey = (state) => `${STATE_KEY}.${state}.authorize`;
const makeTokenKey = (state) => `${STATE_KEY}.${state}.token`;
const makeIssKey = (state) => `${STATE_KEY}.${state}.iss`;

export default class LaunchService {
  static clear() {
    sessionStorage.clear();
  }

  static saveLaunchState(state, authorize, token, iss) {
    sessionStorage.setItem(STATE_KEY, state);
    sessionStorage.setItem(makeAuthorizeKey(state), authorize);
    sessionStorage.setItem(makeTokenKey(state), token);
    sessionStorage.setItem(makeIssKey(state), iss);
  }

  static verifyLaunchState(state) {
    return sessionStorage.getItem(STATE_KEY) === state;
  }

  static getLaunchState(state) {
    if (this.verifyLaunchState(state)) {
      const authorize = sessionStorage.getItem(makeAuthorizeKey(state));
      const token = sessionStorage.getItem(makeTokenKey(state));
      const iss = sessionStorage.getItem(makeIssKey(state));
      return {
        state,
        authorize,
        token,
        iss,
      };
    }
    return null;
  }

  static getLaunchStateIss() {
    const state = sessionStorage.getItem(STATE_KEY);
    if (state) {
      return sessionStorage.getItem(makeIssKey(state));
    }
    return null;
  }
}
