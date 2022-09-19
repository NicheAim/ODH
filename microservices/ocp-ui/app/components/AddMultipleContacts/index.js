/**
 *
 * AddMultipleContacts
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { FieldArray } from 'formik';
import { DialogContent, DialogTitle } from 'material-ui-next/Dialog';
import teal from 'material-ui-next/colors/teal';

import FormSubtitle from 'components/FormSubtitle';
import AddNewItemButton from 'components/PanelToolbar/AddNewItemButton';
import StyledAddCircleIcon from 'components/StyledAddCircleIcon';
import StyledDialog from 'components/StyledDialog';
import AddMultipleContactsForm from './AddMultipleContactsForm';
import AddedContactsTable from './AddedContactsTable';
import messages from './messages';


class AddMultipleContacts extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.state = {
      dialogOpen: false,
      editingContact: null,
    };
    this.handleOpenDialog = this.handleOpenDialog.bind(this);
    this.handleCloseDialog = this.handleCloseDialog.bind(this);
    this.handleEditContact = this.handleEditContact.bind(this);
  }

  handleOpenDialog() {
    this.setState({ dialogOpen: true });
  }

  handleCloseDialog() {
    this.setState({
      dialogOpen: false,
      editingContact: null,
    });
  }

  handleEditContact(index, contact) {
    this.setState((prevState) => ({
      dialogOpen: !prevState.dialogOpen,
      editingContact: { index, contact },
    }));
  }

  render() {
    const { contactPurposes, uspsStates, contacts, errors } = this.props;
    return (
      <div>
        <FormSubtitle margin="1vh 0 0 0">
          <FormattedMessage {...messages.header} />
        </FormSubtitle>
        <AddNewItemButton color="primary" fontWeight="bold" fontSize="15px" onClick={this.handleOpenDialog}>
          <StyledAddCircleIcon color='#3275c1' />
          <FormattedMessage {...messages.addContactsButton} />
        </AddNewItemButton>
        <FieldArray
          name="contacts"
          render={(arrayHelpers) => (
            <div>
              <StyledDialog maxWidth="md" fullWidth open={this.state.dialogOpen}>
                <DialogTitle>
                  <FormattedMessage {...messages.title} />
                </DialogTitle>
                <DialogContent>
                  <AddMultipleContactsForm
                    initialValues={this.state.editingContact}
                    onAddContact={arrayHelpers.push}
                    onRemoveContact={arrayHelpers.remove}
                    onCloseDialog={this.handleCloseDialog}
                    contactPurposes={contactPurposes}
                    uspsStates={uspsStates}
                  />
                </DialogContent>
              </StyledDialog>
              <AddedContactsTable
                arrayHelpers={arrayHelpers}
                onEditContact={this.handleEditContact}
                contacts={contacts}
                errors={errors}
                contactPurposes={contactPurposes}
              />
            </div>
          )}
        />
      </div>
    );
  }
}

AddMultipleContacts.propTypes = {
  contactPurposes: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.string.isRequired,
    display: PropTypes.string.isRequired,
  })),
  uspsStates: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.string.isRequired,
    display: PropTypes.string.isRequired,
  })),
  contacts: PropTypes.arrayOf(PropTypes.shape({
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    purpose: PropTypes.string,
    email: PropTypes.string,
    phone: PropTypes.string,
    line1: PropTypes.string,
    line2: PropTypes.string,
    city: PropTypes.string,
    state: PropTypes.string,
    postalCode: PropTypes.string,
    countryCode: PropTypes.string,
  })),
  errors: PropTypes.object,
};

export default AddMultipleContacts;
