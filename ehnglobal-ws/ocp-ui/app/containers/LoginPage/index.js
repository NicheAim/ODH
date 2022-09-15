/**
 *
 * LoginPage
 *
 */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import injectSaga from 'utils/injectSaga';
import { makeSelectConfig } from 'containers/App/selectors';
import saga from './saga';
import { login, loginkeycloak } from './actions';

export class LoginPage extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.handleLogin = this.handleLogin.bind(this);
    this.handlekeycloakLogin = this.handlekeycloakLogin.bind(this);
  }


  componentDidMount() {
    this.props.onRequestKeycloak();
  }

  handleLogin(loginFormData, actions) {
    this.props.onRequestLogin(loginFormData, () => actions.setSubmitting(false));
  }

  handlekeycloakLogin() {
    this.props.onRequestKeycloak();
  }

  render() {
    return (
      <div>
        <Helmet>
          <title>Login</title>
          <meta name="description" content="Login page of Omnibus Care Plan application" />
        </Helmet>
        {/* {this.props.config &&*/}
        {/*  <Button onClick={this.handlekeycloakLogin}>Login</Button>*/}
        {/* }*/}
      </div>
    );
  }
}

LoginPage.propTypes = {
  onRequestLogin: PropTypes.func.isRequired,
  onRequestKeycloak: PropTypes.func.isRequired,
  // eslint-disable-next-line react/no-unused-prop-types
  config: PropTypes.shape({
    isShowSampleUserLoginDetails: PropTypes.bool,
  }),
};

const mapStateToProps = createStructuredSelector({
  config: makeSelectConfig(),
});

function mapDispatchToProps(dispatch) {
  return {
    onRequestLogin: (loginFormData, handleSubmitting) => dispatch(login(loginFormData, handleSubmitting)),
    onRequestKeycloak: () => dispatch(loginkeycloak()),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withSaga = injectSaga({ key: 'loginPage', saga });

export default compose(
  withSaga,
  withConnect,
)(LoginPage);
