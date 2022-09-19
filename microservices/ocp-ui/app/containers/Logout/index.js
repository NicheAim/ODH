/**
 *
 * Logout
 *
 */

import { makeSelectConfig } from 'containers/App/selectors';
import { MenuItem } from 'material-ui-next/Menu';
import PropTypes from 'prop-types';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { contextActions } from '../App/contextActions';
import messages from './messages';

export class Logout extends React.Component {
  constructor(props) {
    super(props);
    this.handleLogout = this.handleLogout.bind(this);
  }

  handleLogout() {
    this.props.onLogout(this.props.config);
  }

  render() {
    return (
      <MenuItem onClick={this.handleLogout}>
        <FormattedMessage {...messages.logoutButton} />
      </MenuItem>
    );
  }
}

Logout.propTypes = {
  onLogout: PropTypes.func.isRequired,
  config: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  config: makeSelectConfig(),
});

function mapDispatchToProps(dispatch) {
  return {
    onLogout: (config) => {
      dispatch(contextActions.logout(config));
      dispatch(contextActions.clearAll());
    },
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(Logout);
