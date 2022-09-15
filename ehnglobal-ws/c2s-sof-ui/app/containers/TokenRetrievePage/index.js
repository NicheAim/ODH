/**
 *
 * TokenRetrievePage
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
import Util from 'utils/Util';
import { makeSelectConfig } from 'containers/App/selectors';
import saga from './saga';
import messages from './messages';
import { getToken } from './actions';

const styles = (theme) => ({
  root: theme.mixins.gutters({
    padding: 16,
    margin: theme.spacing.unit * 3,
  }),
});

export class TokenRetrievePage extends React.Component {
  static CODE_PARAM_KEY = 'code';
  static STATE_PARAM_KEY = 'state';
  static REQUIRED_PARAMS = [TokenRetrievePage.CODE_PARAM_KEY, TokenRetrievePage.STATE_PARAM_KEY];

  constructor(props) {
    super(props);
    this.getAuthorizationParams = this.getAuthorizationParams.bind(this);
    this.getAuthorizationErrorParams = this.getAuthorizationErrorParams.bind(this);
    this.getMissingRequiredParamKeys = this.getMissingRequiredParamKeys.bind(this);
    this.getTokenIfConfigReady = this.getTokenIfConfigReady.bind(this);
  }

  shouldComponentUpdate(nextProps) {
    const { config } = this.props;
    const { code, state } = this.getAuthorizationParams();
    const { config: configNew } = nextProps;
    const { code: codeNew, state: stateNew } = this.getAuthorizationParams(nextProps);
    return !isEqual(code, codeNew) || !isEqual(state, stateNew) || !isEqual(config, configNew);
  }

  getTokenIfConfigReady() {
    const { config } = this.props;
    const { code, state } = this.getAuthorizationParams();
    if (code && state && config) {
      this.props.getToken(code, state, config);
    }
  }

  getAuthorizationParams(props = this.props) {
    const { location } = props;
    const { code, state } = queryString.parse(location.search);
    return Util.pickByNonNullAndNonEmptyString({ code, state });
  }

  getAuthorizationErrorParams(props = this.props) {
    const { location } = props;
    const { error, error_description } = queryString.parse(location.search);
    if (Util.hasText(error) && Util.hasText(error_description)) {
      return { error, error_description };
    }
    return null;
  }

  getMissingRequiredParamKeys() {
    const paramKeys = Object.keys(this.getAuthorizationParams());
    return TokenRetrievePage.REQUIRED_PARAMS.filter((p) => !paramKeys.includes(p));
  }

  renderRedirectToErrorPage(code, details) {
    return (
      <Redirect
        to={{
          pathname: '/c2s-sof-ui/error',
          search: `?code=${code}&details=${details}`,
        }}
      />);
  }

  renderDefault() {
    const { classes } = this.props;
    this.getTokenIfConfigReady();
    return (
      <div>
        <Helmet>
          <title>Authorization Token Retrieve</title>
          <meta name="description" content="Authorization Token Retrieve Page" />
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
    const authError = this.getAuthorizationErrorParams();
    if (authError) {
      return this.renderRedirectToErrorPage('authorizationError', authError.error_description);
    } else if (this.getMissingRequiredParamKeys().length > 0) {
      return this.renderRedirectToErrorPage('invalidTokenRetrieveParams', this.getMissingRequiredParamKeys().join(', '));
    }
    return this.renderDefault();
  }
}

TokenRetrievePage.propTypes = {
  getToken: PropTypes.func.isRequired,
  classes: PropTypes.object,
  config: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  config: makeSelectConfig(),
});

function mapDispatchToProps(dispatch) {
  return {
    getToken: (code, state, config) => dispatch(getToken(code, state, config)),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withSaga = injectSaga({ key: 'tokenRetrievePage', saga });

export default compose(
  withStyles(styles),
  withSaga,
  withConnect,
)(TokenRetrievePage);
