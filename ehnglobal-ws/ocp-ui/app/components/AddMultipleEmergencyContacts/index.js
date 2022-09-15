/**
 *
 * AddMultipleTelecoms
 *
 */

import FormSubtitle from 'components/FormSubtitle';
import AddNewItemButton from 'components/PanelToolbar/AddNewItemButton';
import StyledAddCircleIcon from 'components/StyledAddCircleIcon';
import StyledDialog from 'components/StyledDialog';
import { FieldArray } from 'formik';
import uniqueId from 'lodash/uniqueId';
import { DialogContent, DialogTitle } from 'material-ui-next/Dialog';
import PropTypes from 'prop-types';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import AddedEmergencyContactsTable from './AddedEmergencyContactsTable';
import AddEmergencyContactsForm from './AddMultipleEmergencyContactsForm';
import messages from './messages';

class AddMultipleEmergencyContacts extends React.Component {
  // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.state = {
      isTelecomsDialogOpen: false,
      editingItem: null,
    };
    this.handleOpenDialog = this.handleOpenDialog.bind(this);
    this.handleCloseDialog = this.handleCloseDialog.bind(this);
    this.handleEditTelecom = this.handleEditTelecom.bind(this);
  }

  handleOpenDialog() {
    this.setState({ isTelecomsDialogOpen: true });
  }

  handleCloseDialog() {
    this.setState({
      isTelecomsDialogOpen: false,
      editingItem: null,
    });
  }

  handleEditTelecom(index, currentItem) {
    this.setState((prevState) => ({
      isTelecomsDialogOpen: !prevState.isTelecomsDialogOpen,
      editingItem: { index, currentItem },
    }));
  }

  render() {
    const {
      emergencyContacts,
      relationshipTypes,
      administrativeGenders,
      patientIdentifierSystems,
      telecomSystems,
      telecomUses,
    } = this.props;

    const addedFormProps = {
      relationshipTypes,
      administrativeGenders,
      patientIdentifierSystems,
      telecomSystems,
      telecomUses,
    };
    const addedTableProps = { emergencyContacts };
    return (
      <div key={uniqueId()}>
        <div>
          <FormSubtitle margin="1vh 0 0 0">
            <FormattedMessage {...messages.header} />
          </FormSubtitle>
          <AddNewItemButton
            color="primary"
            fontWeight="bold"
            fontSize="15px"
            onClick={this.handleOpenDialog}
          >
            <StyledAddCircleIcon color="#3275c1" />
            <FormattedMessage {...messages.addTelecomsButton} />
          </AddNewItemButton>
          <FieldArray
            name="emergencyContacts"
            render={(arrayHelpers) => (
              <div>
                <StyledDialog fullWidth open={this.state.isTelecomsDialogOpen}>
                  <DialogTitle>Add Emergency Contact Detail</DialogTitle>
                  <DialogContent>
                    <AddEmergencyContactsForm
                      initialValues={this.state.editingItem}
                      onAddItem={arrayHelpers.push}
                      onRemoveItem={arrayHelpers.remove}
                      handleCloseDialog={this.handleCloseDialog}
                      {...addedFormProps}
                    />
                  </DialogContent>
                </StyledDialog>
                <AddedEmergencyContactsTable
                  handleEdit={this.handleEditTelecom}
                  {...addedTableProps}
                />
              </div>
            )}
          />
        </div>
      </div>
    );
  }
}

AddMultipleEmergencyContacts.propTypes = {
  telecomSystems: PropTypes.arrayOf(
    PropTypes.shape({
      code: PropTypes.string.isRequired,
      system: PropTypes.string.isRequired,
      display: PropTypes.string.isRequired,
    })
  ).isRequired,
  telecomUses: PropTypes.arrayOf(
    PropTypes.shape({
      code: PropTypes.string.isRequired,
      system: PropTypes.string,
      display: PropTypes.string,
      definition: PropTypes.string,
    })
  ).isRequired,
  telecoms: PropTypes.arrayOf(
    PropTypes.shape({
      system: PropTypes.string,
      value: PropTypes.string,
      use: PropTypes.string,
    })
  ),
  errors: PropTypes.object,
};

export default AddMultipleEmergencyContacts;
