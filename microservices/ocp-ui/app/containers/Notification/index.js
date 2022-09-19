/**
 *
 * Notification
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { Snackbar } from 'material-ui';

import injectReducer from 'utils/injectReducer';
import makeSelectNotification from './selectors';
import reducer from './reducer';
import { resetNotification } from './actions';

export class Notification extends React.Component { // eslint-disable-line react/prefer-stateless-function

  render() {
    const { notification: { open, message } } = this.props;
    return (
      <Snackbar
        open={open}
        message={message}
        autoHideDuration={3000}
        onRequestClose={this.props.resetNotification}
      />
    );
  }
}

Notification.propTypes = {
  resetNotification: PropTypes.func.isRequired,
  notification: PropTypes.shape({
    open: PropTypes.bool.isRequired,
    message: PropTypes.string,
  }).isRequired,
};

const mapStateToProps = createStructuredSelector({
  notification: makeSelectNotification(),
});

function mapDispatchToProps(dispatch) {
  return {
    resetNotification: () => dispatch(resetNotification()),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'notification', reducer });

export default compose(
  withReducer,
  withConnect,
)(Notification);
