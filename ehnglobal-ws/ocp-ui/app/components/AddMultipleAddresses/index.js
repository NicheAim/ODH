/**
 *
 * AddMultipleAddresses
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { FieldArray } from 'formik';
import { DialogContent, DialogTitle } from 'material-ui-next/Dialog';
import teal from 'material-ui-next/colors/teal';

import AddNewItemButton from 'components/PanelToolbar/AddNewItemButton';
import FormSubtitle from 'components/FormSubtitle';
import StyledAddCircleIcon from 'components/StyledAddCircleIcon';
import StyledDialog from 'components/StyledDialog';
import AddMultipleAddressesForm from './AddMultipleAddressesForm';
import AddedAddressesTable from './AddedAddressesTable';
import messages from './messages';

class AddMultipleAddresses extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isAddressesDialogOpen: false,
      editingAddress: null,
    };
    this.handleOpenDialog = this.handleOpenDialog.bind(this);
    this.handleCloseDialog = this.handleCloseDialog.bind(this);
    this.handleEditAddress = this.handleEditAddress.bind(this);
  }

  handleOpenDialog() {
    this.setState({ isAddressesDialogOpen: true });
  }

  handleCloseDialog() {
    this.setState({
      isAddressesDialogOpen: false,
      editingAddress: null,
    });
  }

  handleEditAddress(index, address) {
    this.setState((prevState) => ({
      isAddressesDialogOpen: !prevState.isAddressesDialogOpen,
      editingAddress: { index, address },
    }));
  }

  render() {
    const { uspsStates, errors, addresses } = this.props;
    const addedAddressesTableProps = {
      errors,
      addresses,
    };
    return (
      <div>
        <div>
          <FormSubtitle margin="1vh 0 0 0">
            <FormattedMessage {...messages.header} />
          </FormSubtitle>
          <AddNewItemButton color="primary" fontWeight="bold" fontSize="15px" onClick={this.handleOpenDialog}>
            <StyledAddCircleIcon color='#3275c1' />
            <FormattedMessage {...messages.addAddressesButton} />
          </AddNewItemButton>
          <FieldArray
            name="addresses"
            render={(arrayHelpers) => (
              <div>
                <StyledDialog fullWidth open={this.state.isAddressesDialogOpen}>
                  <DialogTitle>Add Address</DialogTitle>
                  <DialogContent>
                    <AddMultipleAddressesForm
                      initialValues={this.state.editingAddress}
                      onAddAddress={arrayHelpers.push}
                      onRemoveAddress={arrayHelpers.remove}
                      uspsStates={uspsStates}
                      handleCloseDialog={this.handleCloseDialog}
                    />
                  </DialogContent>
                </StyledDialog>
                <AddedAddressesTable
                  handleEditAddress={this.handleEditAddress}
                  arrayHelpers={arrayHelpers}
                  {...addedAddressesTableProps}
                />
              </div>
            )}
          />
        </div>
      </div>
    );
  }
}

AddMultipleAddresses.propTypes = {
  uspsStates: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.string.isRequired,
    display: PropTypes.string.isRequired,
  })),
  errors: PropTypes.object,
  addresses: PropTypes.arrayOf(PropTypes.shape({
    line1: PropTypes.string,
    line2: PropTypes.string,
    city: PropTypes.string,
    postalCode: PropTypes.string,
    stateCode: PropTypes.string,
    countryCode: PropTypes.string,
  })),
};

export default AddMultipleAddresses;
