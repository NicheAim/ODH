import React from 'react';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';
import { Form } from 'formik';
import { Cell, Grid } from 'styled-css-grid';
import uniq from 'lodash/uniq';
import Util from 'utils/Util';
import MenuItem from 'material-ui/MenuItem';


import TextField from 'components/TextField';
import SelectField from 'components/SelectField';
import StyledRaisedButton from 'components/StyledRaisedButton';
import GoBackButton from 'components/GoBackButton';
import ConfirmationDialog from 'components/ConfirmationDialog';
import FormSubtitle from 'components/FormSubtitle';
import ResetPassword from 'containers/ResetPassword';
import ManageUserFormGrid from './ManageUserFormGrid';
import messages from './messages';
import { PATIENT } from './constants';


class ManageUserForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      resetPasswordModalOpen: false,
      removeUserModalOpen: false,
    };
    this.handleOpenResetPasswordModal = this.handleOpenResetPasswordModal.bind(this);
    this.handleCloseResetPasswordModal = this.handleCloseResetPasswordModal.bind(this);
    this.handleOpenRemoveUserModal = this.handleOpenRemoveUserModal.bind(this);
    this.handleCloseRemoveUserModal = this.handleCloseRemoveUserModal.bind(this);
    this.handleRemoveUser = this.handleRemoveUser.bind(this);
  }

  handleOpenResetPasswordModal() {
    this.setState({
      resetPasswordModalOpen: true,
    });
  }

  handleCloseResetPasswordModal() {
    this.setState({ resetPasswordModalOpen: false });
  }

  handleOpenRemoveUserModal() {
    this.setState({
      removeUserModalOpen: true,
    });
  }

  handleCloseRemoveUserModal() {
    this.setState({ removeUserModalOpen: false });
  }

  handleRemoveUser() {
    this.setState({
      removeUserModalOpen: false,
    });
    this.props.handleRemoveUser(this.props.uaaUser[0].id);
  }

  render() {
    const {
      isSubmitting, dirty, isValid, values,
      user, groups, resourceType, isEditing, uaaUser,
    } = this.props;
    const assignedOrganizations = values.roles && values.roles.map((role) => role.organization);
    let duplicatedAssignedOrganization = false;
    if (assignedOrganizations) {
      duplicatedAssignedOrganization = uniq(assignedOrganizations).length !== assignedOrganizations.length;
    }
    return (
      <Form>
        <ManageUserFormGrid>
          {resourceType !== PATIENT && <Cell area="generalInformationSubtitle">
            <FormSubtitle margin="0">
              <FormattedMessage {...messages.title} />
            </FormSubtitle>
          </Cell>
          }
          {resourceType === PATIENT && <Cell area="generalInformationSubtitle">
            <FormSubtitle margin="0">
              <FormattedMessage {...messages.patientTitle} />
            </FormSubtitle>
          </Cell>
          }
          <Cell area="firstName">
            <TextField
              fullWidth
              name="firstName"
              hintText={<FormattedMessage {...messages.hintText.firstName} />}
              floatingLabelText={<FormattedMessage {...messages.floatingLabelText.firstName} />}
              disabled
            />
          </Cell>
          <Cell area="lastName">
            <TextField
              fullWidth
              name="lastName"
              hintText={<FormattedMessage {...messages.hintText.lastName} />}
              floatingLabelText={<FormattedMessage {...messages.floatingLabelText.lastName} />}
              disabled
            />
          </Cell>
          <Cell area="username">
            <TextField
              fullWidth
              name="username"
              hintText={<FormattedMessage {...messages.hintText.username} />}
              floatingLabelText={<FormattedMessage {...messages.floatingLabelText.username} />}
              disabled={isEditing}
            />
          </Cell>
          {!isEditing && <Cell area="password">
            <TextField
              fullWidth
              name="password"
              type="password"
              hintText={<FormattedMessage {...messages.hintText.password} />}
              floatingLabelText={<FormattedMessage {...messages.floatingLabelText.password} />}
            />
          </Cell>}
          {!isEditing && <Cell area="repeatPassword">
            <TextField
              fullWidth
              name="repeatPassword"
              type="password"
              hintText={<FormattedMessage {...messages.hintText.confirmPassword} />}
              floatingLabelText={<FormattedMessage {...messages.floatingLabelText.confirmPassword} />}
            />
          </Cell>}
          {isEditing &&
          <Cell area="resetPassword">
            <StyledRaisedButton onClick={() => this.handleOpenResetPasswordModal()}>
              Reset Password
            </StyledRaisedButton>
            <ResetPassword
              dialogOpen={this.state.resetPasswordModalOpen}
              onCloseDialog={this.handleCloseResetPasswordModal}
              user={uaaUser && uaaUser[0]}
            />
          </Cell>}
          {isEditing &&
          <Cell area="removeUser">
            <StyledRaisedButton onClick={() => this.handleOpenRemoveUserModal()}>
              Remove User Access
            </StyledRaisedButton>
            <ConfirmationDialog
              dialogOpen={this.state.removeUserModalOpen}
              handleCloseDialog={this.handleCloseRemoveUserModal}
              handleSubmit={this.handleRemoveUser}
              title={<FormattedMessage {...messages.confirmRemoveUserTitle} />}
              message={<FormattedMessage {...messages.confirmRemoveUserMessage} />}
            />
          </Cell>}
          <Cell area="assignPermissionGroupSubtitle">
            <FormSubtitle margin="0">
              <FormattedMessage {...messages.assignPermissionGroupSubtitle} />
            </FormSubtitle>
          </Cell>
          <Cell area="organization">
            <SelectField
              name="organization"
              hintText={<FormattedMessage {...messages.hintText.organization} />}
              floatingLabelText={<FormattedMessage {...messages.floatingLabelText.organization} />}
              fullWidth
              disabled
            >
              {resourceType === 'Patient' &&
              <MenuItem
                key={user.organization && user.organization.reference.split('/').pop()}
                value={user.organization && user.organization.reference.split('/').pop()}
                primaryText={user.organization && user.organization.display}
              />
              }
              {resourceType === 'Practitioner' && user && user.practitionerRoles && user.practitionerRoles.map((practitionerRole) =>
                <MenuItem key={practitionerRole.organization.reference} value={practitionerRole.organization.reference.split('/').pop()} primaryText={practitionerRole.organization.display} />,
              )}
            </SelectField>
          </Cell>
          <Cell area="group">
            <SelectField
              name="group"
              fullWidth
              hintText={<FormattedMessage {...messages.hintText.permissionGroup} />}
              floatingLabelText={
                <FormattedMessage {...messages.floatingLabelText.permissionGroup} />}
              disabled={resourceType === PATIENT}
            >
              {groups.map((group) => {
                const displayName = group.displayName.split('.').pop();
                return (
                  <MenuItem
                    key={group.id}
                    value={group.id}
                    primaryText={Util.deCamelize(displayName)}
                  />);
              })}
            </SelectField>
          </Cell>
          <Cell area="buttonGroup">
            <Grid columns={2}>
              <Cell>
                <StyledRaisedButton
                  fullWidth
                  type="submit"
                  disabled={!dirty || isSubmitting || !isValid || duplicatedAssignedOrganization}
                >
                  <FormattedMessage {...messages.saveButton} />
                </StyledRaisedButton>
              </Cell>
              <Cell>
                <GoBackButton disabled={isSubmitting} />
              </Cell>
            </Grid>
          </Cell>
        </ManageUserFormGrid>
      </Form>
    );
  }
}

ManageUserForm.propTypes = {
  isSubmitting: PropTypes.bool.isRequired,
  dirty: PropTypes.bool.isRequired,
  isValid: PropTypes.bool.isRequired,
  isEditing: PropTypes.bool.isRequired,
  values: PropTypes.object,
  user: PropTypes.object,
  uaaUser: PropTypes.array,
  groups: PropTypes.array,
  resourceType: PropTypes.string,
  handleRemoveUser: PropTypes.func,
};

export default ManageUserForm;
