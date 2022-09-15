/**
 *
 * ChangePassword
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { DialogContent, DialogContentText, DialogTitle } from 'material-ui-next/Dialog';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import { makeSelectUser } from 'containers/App/contextSelectors';
import StyledDrawer from 'components/StyledDrawer';
import StyledText from 'components/StyledText';
import ChangePasswordForm from 'components/ChangePasswordForm';
import { changePassword } from './actions';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';


export class ChangePassword extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.handleChangePassword = this.handleChangePassword.bind(this);
  }

  handleChangePassword(changePasswordFormData, actions) {
    const oldPassword = changePasswordFormData.oldPassword;
    const newPassword = changePasswordFormData.password;
    this.props.changePassword(oldPassword, newPassword, () => actions.setSubmitting(false), () => this.props.onCloseDrawer());
  }

  render() {
    const { drawerOpen, onCloseDrawer, user } = this.props;
    return (
      <StyledDrawer
        anchor="right"
        open={drawerOpen}
        transitionDuration={{ enter: 500, exit: 20 }}
        width="550px"
      >
        <DialogTitle>
          <FormattedMessage {...messages.title} />
        </DialogTitle>
        <DialogContent>
          <ChangePasswordForm user={user} onCloseDrawer={onCloseDrawer} onChangePassword={this.handleChangePassword} />
          <DialogContentText>
            <StyledText fontWeight={700}><FormattedMessage {...messages.notes} /></StyledText>
          </DialogContentText>
        </DialogContent>
      </StyledDrawer>
    )
      ;
  }
}

ChangePassword.propTypes = {
  drawerOpen: PropTypes.bool.isRequired,
  changePassword: PropTypes.func.isRequired,
  onCloseDrawer: PropTypes.func.isRequired,
  user: PropTypes.shape({
    user_name: PropTypes.string.isRequired,
  }),
};

const mapStateToProps = createStructuredSelector({
  user: makeSelectUser(),
});

function mapDispatchToProps(dispatch) {
  return {
    changePassword: (oldPassword, newPassword, handleSubmitting, handleCloseDrawer) => dispatch(changePassword(oldPassword, newPassword, handleSubmitting, handleCloseDrawer)),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'changePassword', reducer });
const withSaga = injectSaga({ key: 'changePassword', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(ChangePassword);
