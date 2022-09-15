/**
 *
 * ResetPassword
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { compose } from 'redux';
import { DialogContent, DialogTitle } from 'material-ui-next/Dialog';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import StyledDialog from 'components/StyledDialog';
import ResetPasswordForm from 'components/ResetPasswordForm';
import { resetPassword } from './actions';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';


export class ResetPassword extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.handleResetPassword = this.handleResetPassword.bind(this);
  }

  handleResetPassword(resetPasswordFormData, actions) {
    const userId = this.props.user.id;
    const newPassword = resetPasswordFormData.password;
    this.props.resetPassword(userId, newPassword, () => actions.setSubmitting(false), () => this.props.onCloseDialog());
  }

  render() {
    const { dialogOpen, onCloseDialog, user } = this.props;
    return (
      <StyledDialog fullWidth open={dialogOpen}>
        <DialogTitle>
          <FormattedMessage {...messages.title} />
        </DialogTitle>
        <DialogContent>
          <ResetPasswordForm user={user} onCloseDialog={onCloseDialog} onResetPassword={this.handleResetPassword} />
        </DialogContent>
      </StyledDialog>
    );
  }
}

ResetPassword.propTypes = {
  dialogOpen: PropTypes.bool.isRequired,
  onCloseDialog: PropTypes.func.isRequired,
  resetPassword: PropTypes.func.isRequired,
  user: PropTypes.shape({
    id: PropTypes.string.isRequired,
  }).isRequired,
};

function mapDispatchToProps(dispatch) {
  return {
    resetPassword: (userId, newPassword, handleSubmitting, handleCloseDialog) => dispatch(resetPassword(userId, newPassword, handleSubmitting, handleCloseDialog)),
  };
}

const withConnect = connect(null, mapDispatchToProps);

const withReducer = injectReducer({ key: 'resetPassword', reducer });
const withSaga = injectSaga({ key: 'resetPassword', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(ResetPassword);
