/**
 *
 * LaunchPage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { Redirect } from 'react-router-dom';
import queryString from 'query-string';
import { withStyles } from 'material-ui-next/styles';
import Paper from 'material-ui-next/Paper';
import Typography from 'material-ui-next/Typography';
import { LinearProgress } from 'material-ui-next/Progress';
import isEqual from 'lodash/isEqual';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import Util from 'utils/Util';
import { makeSelectConfig } from 'containers/App/selectors';
import { getMetadata } from './actions';
import makeSelectLaunchPage from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';

const styles = (theme) => ({
  root: theme.mixins.gutters({
    padding: 16,
    margin: theme.spacing.unit * 3,
  }),
});

export class LaunchPage extends React.Component {
  static ISS_PARAM_KEY = 'iss';
  static LAUNCH_PARAM_KEY = 'launch';
  static REQUIRED_PARAMS = [LaunchPage.ISS_PARAM_KEY, LaunchPage.LAUNCH_PARAM_KEY];

  constructor(props) {
    super(props);
    this.getLaunchParams = this.getLaunchParams.bind(this);
    this.getMissingRequiredParamKeys = this.getMissingRequiredParamKeys.bind(this);
    this.getMetadataIfConfigReady = this.getMetadataIfConfigReady.bind(this);
  }

  shouldComponentUpdate(nextProps) {
    const { config } = this.props;
    const { iss, launch } = this.getLaunchParams();
    const { config: configNew } = nextProps;
    const { iss: issNew, launch: launchNew } = this.getLaunchParams(nextProps);
    return !isEqual(iss, issNew) || !isEqual(launch, launchNew) || !isEqual(config, configNew);
  }

  getMetadataIfConfigReady() {
    const { config } = this.props;
    const { iss, launch } = this.getLaunchParams();
    if (iss && launch && config) {
      this.props.getMetadata(iss, launch, config);
    }
  }

  getLaunchParams(props = this.props) {
    const { location } = props;
    const { iss, launch } = queryString.parse(location.search);
    return Util.pickByNonNullAndNonEmptyString({ iss, launch });
  }

  getMissingRequiredParamKeys() {
    const paramKeys = Object.keys(this.getLaunchParams());
    return LaunchPage.REQUIRED_PARAMS.filter((p) => !paramKeys.includes(p));
  }

  renderRedirectToErrorPage() {
    return (
      <Redirect
        to={{
          pathname: '/c2s-sof-ui/error',
          search: `?code=invalidLaunchParams&details=${this.getMissingRequiredParamKeys().join(', ')}`,
        }}
      />);
  }

  renderDefault() {
    const { classes } = this.props;
    this.getMetadataIfConfigReady();
    return (
      <div>
        <Helmet>
          <title>Launch</title>
          <meta name="description" content="SMART on FHIR Launch Page" />
        </Helmet>
        <Paper className={classes.root} elevation={4}>
          <Typography variant="headline" component="h3">
            <FormattedMessage {...messages.header} />
          </Typography>
          <Typography variant="display1">
            <LinearProgress />
          </Typography>
        </Paper>
      </div>
    );
  }

  render() {
    if (this.getMissingRequiredParamKeys().length > 0) {
      return this.renderRedirectToErrorPage();
    }
    return this.renderDefault();
  }
}

LaunchPage.propTypes = {
  getMetadata: PropTypes.func.isRequired,
  classes: PropTypes.object,
  config: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  launchpage: makeSelectLaunchPage(),
  config: makeSelectConfig(),
});

function mapDispatchToProps(dispatch) {
  return {
    getMetadata: (iss, launch, config) => dispatch(getMetadata(iss, launch, config)),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'launchPage', reducer });
const withSaga = injectSaga({ key: 'launchPage', saga });

export default compose(
  withStyles(styles),
  withReducer,
  withSaga,
  withConnect,
)(LaunchPage);
