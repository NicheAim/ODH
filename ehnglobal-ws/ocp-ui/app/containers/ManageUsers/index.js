/**
 *
 * ManageUsers
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { FieldArray } from 'formik';
import { DialogContent, DialogTitle } from 'material-ui-next/Dialog';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import { makeSelectOrganization } from 'containers/App/contextSelectors';
import ResetPassword from 'containers/ResetPassword';
import StyledDialog from 'components/StyledDialog';
import AddAssignRolesForm from 'components/AddAssignRolesForm';
import ManageUsersTable from 'components/ManageUsersTable';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import { makeSelectGroups, makeSelectUsers } from './selectors';
import { assignUserRole, getGroups, getUsers, initializePermissionAssignment } from './actions';

export class ManageUsers extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.state = {
      isDialogOpen: false,
      resetPasswordModalOpen: false,
      selectedUser: null,
    };
    this.handleOpenDialog = this.handleOpenDialog.bind(this);
    this.handleCloseDialog = this.handleCloseDialog.bind(this);
    this.handleEditAssignRoles = this.handleEditAssignRoles.bind(this);
    this.handleOpenResetPasswordModal = this.handleOpenResetPasswordModal.bind(this);
    this.handleCloseResetPasswordModal = this.handleCloseResetPasswordModal.bind(this);
    this.handleAssignRole = this.handleAssignRole.bind(this);
  }

  componentWillMount() {
    this.props.initializePermissionAssignment();
  }

  componentDidMount() {
    this.props.getUsers();
    this.props.getGroups();
  }

  handleOpenDialog() {
    this.setState({ isDialogOpen: true });
  }

  handleCloseDialog() {
    this.setState({
      isDialogOpen: false,
      editingAssignRoles: null,
    });
  }

  handleEditAssignRoles(user) {
    this.setState((prevState) => ({
      isDialogOpen: !prevState.isDialogOpen,
      selectedUser: user,
    }));
  }

  handleOpenResetPasswordModal(selectedUser) {
    this.setState({
      selectedUser,
      resetPasswordModalOpen: true,
    });
  }

  handleCloseResetPasswordModal() {
    this.setState({ resetPasswordModalOpen: false });
  }

  handleAssignRole(values, actions) {
    const userId = this.state.selectedUser.id;
    const groupId = values.role;
    this.props.onAssignRole(userId, groupId, () => {
      actions.setSubmitting(false);
    });
  }

  render() {
    const { users, groups, organization } = this.props;
    const { selectedUser, resetPasswordModalOpen } = this.state;
    return (
      <div>
        <ManageUsersTable
          users={users}
          onEditAssignRoles={this.handleEditAssignRoles}
          onOpenResetPasswordModal={this.handleOpenResetPasswordModal}
        />
        {selectedUser &&
        <ResetPassword
          dialogOpen={resetPasswordModalOpen}
          onCloseDialog={this.handleCloseResetPasswordModal}
          user={selectedUser}
        />
        }
        <FieldArray
          name="assignRoles"
          render={() => (
            <div>
              <StyledDialog
                fullWidth
                open={this.state.isDialogOpen}
              >
                <DialogTitle>
                  <FormattedMessage {...messages.assignRole} />
                </DialogTitle>
                <DialogContent>
                  <AddAssignRolesForm
                    user={selectedUser}
                    handleCloseDialog={this.handleCloseDialog}
                    handleAssignRole={this.handleAssignRole}
                    organization={organization}
                    groups={groups}
                  />
                </DialogContent>
              </StyledDialog>
            </div>
          )}
        />
      </div>
    );
  }
}

ManageUsers.propTypes = {
  getUsers: PropTypes.func.isRequired,
  getGroups: PropTypes.func.isRequired,
  onAssignRole: PropTypes.func.isRequired,
  initializePermissionAssignment: PropTypes.func.isRequired,
  users: PropTypes.array,
  groups: PropTypes.array,
  organization: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  users: makeSelectUsers(),
  groups: makeSelectGroups(),
  organization: makeSelectOrganization(),
});

function mapDispatchToProps(dispatch) {
  return {
    getUsers: () => dispatch(getUsers()),
    getGroups: () => dispatch(getGroups()),
    onAssignRole: (userId, groupId, handleSubmitting) => dispatch(assignUserRole(userId, groupId, handleSubmitting)),
    initializePermissionAssignment: () => dispatch(initializePermissionAssignment()),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'manageUsers', reducer });
const withSaga = injectSaga({ key: 'manageUsers', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(ManageUsers);
