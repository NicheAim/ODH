/**
 *
 * PermissionsGroups
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { FieldArray } from 'formik';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import { DialogContent, DialogTitle } from 'material-ui-next/Dialog';

import AddNewItemButton from 'components/PanelToolbar/AddNewItemButton';
import teal from 'material-ui-next/colors/teal';
import StyledAddCircleIcon from 'components/StyledAddCircleIcon';
import AddPermissionGroupForm from 'components/AddPermissionGroupForm';
import StyledDialog from 'components/StyledDialog';

import PermissionGroupsTable from 'components/PermissionGroupsTable';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import { getGroups, getScopes, initializePermissionsGroup, saveGroup } from './actions';
import { makeSelectGroups, makeSelectScopes } from './selectors';


export class PermissionsGroups extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.state = {
      isDialogOpen: false,
      editingPermissionGroup: null,
    };
    this.handleOpenDialog = this.handleOpenDialog.bind(this);
    this.handleCloseDialog = this.handleCloseDialog.bind(this);
    this.handleEditPermissionGroup = this.handleEditPermissionGroup.bind(this);
    this.handleSaveGroup = this.handleSaveGroup.bind(this);
  }

  componentDidMount() {
    this.props.initializePermissionsGroup();
    this.props.getGroups();
    this.props.getScopes();
  }

  handleOpenDialog() {
    this.setState({ isDialogOpen: true });
  }

  handleCloseDialog() {
    this.setState({
      isDialogOpen: false,
      editingPermissionGroup: null,
    });
  }

  handleEditPermissionGroup(permissionGroup) {
    this.setState((prevState) => ({
      isDialogOpen: !prevState.isDialogOpen,
      editingPermissionGroup: permissionGroup,
    }));
  }


  handleSaveGroup(group, actions) {
    this.props.onSaveGroup(group, () => {
      actions.setSubmitting(false);
    });
  }

  render() {
    const { groups, scopes } = this.props;
    return (
      <div>
        <div>
          <AddNewItemButton color="primary" fontWeight="bold" fontSize="15px" onClick={this.handleOpenDialog}>
            <StyledAddCircleIcon color='#3275c1' />
            <FormattedMessage {...messages.newPermissionsGroup} />
          </AddNewItemButton>
        </div>
        <FieldArray
          name="permissionGroup"
          render={(arrayHelpers) => (
            <div>
              <StyledDialog
                maxWidth={'md'}
                open={this.state.isDialogOpen}
              >
                {!this.state.editingPermissionGroup && <DialogTitle>
                  <FormattedMessage {...messages.createPermissionGroup} />
                </DialogTitle>}
                {this.state.editingPermissionGroup && <DialogTitle>
                  <FormattedMessage {...messages.updatePermissionGroup} />
                </DialogTitle>}

                <DialogContent>
                  <AddPermissionGroupForm
                    initialValues={this.state.editingPermissionGroup}
                    handleCloseDialog={this.handleCloseDialog}
                    handleSaveGroup={this.handleSaveGroup}
                    scopes={scopes}
                  />
                </DialogContent>
              </StyledDialog>
              <PermissionGroupsTable
                arrayHelpers={arrayHelpers}
                groups={groups}
                handleEditPermissionGroup={this.handleEditPermissionGroup}
              />
            </div>
          )}
        />
      </div>
    );
  }
}

PermissionsGroups.propTypes = {
  getGroups: PropTypes.func.isRequired,
  initializePermissionsGroup: PropTypes.func.isRequired,
  onSaveGroup: PropTypes.func.isRequired,
  getScopes: PropTypes.func.isRequired,
  groups: PropTypes.array,
  scopes: PropTypes.array,
};

const mapStateToProps = createStructuredSelector({
  groups: makeSelectGroups(),
  scopes: makeSelectScopes(),
});

function mapDispatchToProps(dispatch) {
  return {
    initializePermissionsGroup: () => dispatch(initializePermissionsGroup()),
    getGroups: () => dispatch(getGroups()),
    getScopes: () => dispatch(getScopes()),
    onSaveGroup: (group, handleSubmitting) => {
      dispatch(saveGroup(group, handleSubmitting));
    },
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'permissionsGroups', reducer });
const withSaga = injectSaga({ key: 'permissionsGroups', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(PermissionsGroups);
