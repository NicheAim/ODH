/**
 *
 * Authentication
 *
 */

import PrivateLayout from 'components/PrivateLayout';
import makeSelectAuth from 'containers/App/authSelectors';
import { LOGIN_URL } from 'containers/App/constants';
import {
  makeSelectOrganization,
  makeSelectUser,
} from 'containers/App/contextSelectors';
import { getLinkUrlByRole } from 'containers/App/helpers';
import { makeSelectRehydrated } from 'containers/App/selectors';
import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import injectSaga from 'utils/injectSaga';
import { isTokenExpired, removeToken, retrieveToken } from 'utils/tokenService';
import { env_vars } from '../../../env';
import RefreshTokenDialog from '../../components/RefreshTokenDialog';
import { contextActions } from '../../containers/App/contextActions';
import { makeSelectConfig } from '../../containers/App/selectors';
import { getSecondsLeftFromEpoch } from '../../utils/tokenService';
import saga from './saga';

class TokenTimmer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      time: {
        h: 0,
        m: 0,
        s: 0,
      },
      seconds: 0,
      displayDialog: false,
      currentEpoch: 0,
      secondsSinceLastActivity: 0,
    };
    this.maxInactivitySeconds = parseInt(
      env_vars.REACT_APP_MAX_INACTIVITY_SECONDS
    );
    this.activityEvents = [
      'mousedown',
      'mousemove',
      'keydown',
      'scroll',
      'touchstart',
    ];
    this.timer = null;
    this.activityTimer = null;
    this.startTimer = this.startTimer.bind(this);
    this.countActivity = this.countActivity.bind(this);
    this.onActivityHandler = this.onActivityHandler.bind(this);
    this.countDown = this.countDown.bind(this);
    this.handleDialogClose = this.handleDialogClose.bind(this);
    this.handleRefresh = this.handleRefresh.bind(this);
    this.setExpirationEpochAndStart =
      this.setExpirationEpochAndStart.bind(this);
  }

  secondsToTime(secs) {
    const hours = Math.floor(secs / (60 * 60));

    const divisor_for_minutes = secs % (60 * 60);
    const minutes = Math.floor(divisor_for_minutes / 60);

    const divisor_for_seconds = divisor_for_minutes % 60;
    const seconds = Math.ceil(divisor_for_seconds);

    return {
      h: hours,
      m: minutes,
      s: seconds,
    };
  }

  onActivityHandler() {
    this.setState(
      {
        secondsSinceLastActivity: 0,
      },
      () => {
        console.log('detected activity');
      }
    );
  }

  countActivity() {
    this.setState(
      (state) => ({
        secondsSinceLastActivity: ++state.secondsSinceLastActivity,
      }),
      () => {
        console.log(
          'Seconds since last activity: ',
          this.state.secondsSinceLastActivity
        );
      }
    );
  }

  startActivityTimer() {
    if (this.activityTimer === null) {
      this.activityTimer = setInterval(this.countActivity, 1000);
    }
  }

  clearActivityTimer() {
    if (this.activityTimer) clearInterval(this.activityTimer);
  }

  componentDidMount() {
    this.activityEvents.forEach((eventName) => {
      document.addEventListener(eventName, this.onActivityHandler, true);
    });

    this.startActivityTimer();
    this.setExpirationEpochAndStart(this.props.expiration_token_epoch);
  }

  componentDidUpdate() {
    if (this.state.currentEpoch !== this.props.expiration_token_epoch) {
      this.setExpirationEpochAndStart(this.props.expiration_token_epoch);
    }
  }

  componentWillUnmount() {
    this.activityEvents.forEach((eventName) => {
      document.removeEventListener(eventName, this.onActivityHandler, true);
    });
    if (this.timer) clearInterval(this.timer);

    this.clearActivityTimer();
  }

  setExpirationEpochAndStart(expirationEpoch) {
    const secondsLeft = getSecondsLeftFromEpoch(expirationEpoch);
    const timeLeftObj = this.secondsToTime(secondsLeft);

    if (this.timer) {
      clearInterval(this.timer);
      this.timer = null;
    }

    this.setState(
      {
        time: timeLeftObj,
        seconds: secondsLeft,
        currentEpoch: expirationEpoch,
      },
      () => this.startTimer()
    );
  }

  startTimer() {
    if (this.timer === null && this.state.seconds > 0) {
      this.timer = setInterval(this.countDown, 1000);
    }
  }

  countDown() {
    const seconds = this.state.seconds - 1;
    console.log('seconds left to expire auth token: ', seconds);
    const secondsSinceLastActivity = this.state.secondsSinceLastActivity;
    const maxInactivitySeconds = this.maxInactivitySeconds;

    if (seconds === 0) {
      this.setState(
        {
          time: {
            h: 0,
            m: 0,
            s: 0,
          },
          seconds: 0,
          displayDialog: false,
        },
        () => {
          clearInterval(this.timer);
          this.handleDialogClose();
        }
      );
    } else if (
      seconds < 60 &&
      secondsSinceLastActivity < maxInactivitySeconds
    ) {
      this.handleRefresh();
    } else if (seconds < 30) {
      this.setState({
        displayDialog: true,
        time: this.secondsToTime(seconds),
        seconds: seconds,
      });
    } else {
      this.setState({
        time: this.secondsToTime(seconds),
        seconds: seconds,
      });
    }
  }

  handleDialogClose() {
    this.setState({ displayDialog: false }, this.props.handleDialogClose());
  }

  handleRefresh() {
    this.setState({ displayDialog: false }, this.props.handleRefresh());
  }

  render() {
    return (
      <div>
        <RefreshTokenDialog
          open={this.state.displayDialog}
          handleDialogClose={this.handleDialogClose}
          time={this.state.time}
          handleRefresh={this.handleRefresh}
        />
      </div>
    );
  }
}

// export function Authentication(props) {
class Authentication extends React.Component {
  constructor(props) {
    super(props);
    this.state = { redirectToLogin: false };
    this.handleDialogClose = this.handleDialogClose.bind(this);
    this.handleRefresh = this.handleRefresh.bind(this);
  }

  handleDialogClose() {
    this.props.onLogout(this.props.config);
  }

  handleRefresh() {
    this.props.refreshToken(this.props.user.refresh_token_data);
  }

  render() {
    console.log('Authentication(props) {', this.props);
    let isAuthenticated = this.props.auth.isAuthenticated;

    if (isTokenExpired(retrieveToken())) {
      console.log('if (isTokenExpired(retrieveToken())) {');
      isAuthenticated = false;
      removeToken();
    }

    const { user, organization, rehydrated, location } = this.props;

    if (!rehydrated) {
      console.log('if (!rehydrated) {');

      // do not render until rehydration is complete
      return null;
    }

    return isAuthenticated && user ? (
      // child component will be rendered here
      <PrivateLayout
        user={user}
        organization={organization}
        getLinkUrlByRole={getLinkUrlByRole}
        tokenTimmer={
          <TokenTimmer
            expiration_token_epoch={this.props.user.expiration_token_epoch}
            expiration_token={this.props.user.expiration_token}
            handleDialogClose={this.handleDialogClose}
            handleRefresh={this.handleRefresh}
          />
        }
      >
        {this.props.children}
      </PrivateLayout>
    ) : (
      <div>
        {removeToken()}
        <Redirect
          to={{
            pathname: LOGIN_URL,
            state: { from: location },
          }}
        />
      </div>
    );
  }
}

Authentication.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
  auth: PropTypes.shape({
    isAuthenticated: PropTypes.bool.isRequired,
  }),
  user: PropTypes.object,
  organization: PropTypes.object,
  rehydrated: PropTypes.bool,
  location: PropTypes.object,
  onLogout: PropTypes.func.isRequired,
  config: PropTypes.object,
  refreshToken: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  auth: makeSelectAuth(),
  user: makeSelectUser(),
  organization: makeSelectOrganization(),
  rehydrated: makeSelectRehydrated(),
  config: makeSelectConfig(),
});

function mapDispatchToProps(dispatch) {
  return {
    onLogout: (config) => {
      dispatch(contextActions.logout(config));
      dispatch(contextActions.clearAll());
    },
    refreshToken: (refreshTokenData) => {
      dispatch(contextActions.refreshToken(refreshTokenData));
    },
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withSaga = injectSaga({ key: 'authentication', saga });

export default compose(withSaga, withConnect)(Authentication);
