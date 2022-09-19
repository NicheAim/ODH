/**
 *
 * ManageClient
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import teal from 'material-ui-next/colors/teal';
import { FormattedMessage } from 'react-intl';
import { DialogContent, DialogTitle } from 'material-ui-next/Dialog';
import { Cell, Grid } from 'styled-css-grid';
import find from 'lodash/find';

import StyledImage from 'components/StyledImage';
import StyledText from 'components/StyledText';
import HorizontalAlignment from 'components/HorizontalAlignment';
import AddNewItemButton from 'components/PanelToolbar/AddNewItemButton';
import StyledDialog from 'components/StyledDialog';
import StyledAddCircleIcon from 'components/StyledAddCircleIcon';
import StyledRaisedButton from 'components/StyledRaisedButton';
import ManageClientForm from './ManageClientForm';
import messages from './messages';
import { SMART_APP_LOGO_ALT_SUFFIX, SMART_APP_LOGO_SRC_PREFIX, DEFAULT_APP_ICON } from './constants';

class ManageClient extends React.Component { // eslint-disable-line react/prefer-stateless-function

  constructor(props) {
    super(props);
    this.state = {
      isClientDialogOpen: false,
      editingClient: null,
    };
    this.handleOpenDialog = this.handleOpenDialog.bind(this);
    this.handleCloseDialog = this.handleCloseDialog.bind(this);
    this.handleEditClient = this.handleEditClient.bind(this);
  }

  handleOpenDialog() {
    this.setState({ isClientDialogOpen: true });
  }

  handleCloseDialog() {
    this.setState({
      isClientDialogOpen: false,
      editingClient: null,
    });
  }

  handleEditClient(client) {
    this.setState((prevState) => ({
      isClientDialogOpen: !prevState.isFlagDialogOpen,
      editingClient: client,
    }));
  }

  render() {
    const {
      onSaveClient, smartApps, onDeleteClient,
    } = this.props;

    return (
      <div>
        <AddNewItemButton color="primary" fontWeight="bold" fontSize="15px" onClick={this.handleOpenDialog}>
          <StyledAddCircleIcon color='#3275c1' />
          <FormattedMessage {...messages.addClient} />
        </AddNewItemButton>
        <Grid columns={5} justifyContent="space-around" gap="16px">
          {smartApps && smartApps.map(({ clientId, name, appIcon }) => (
            <Cell key={clientId} middle>
              <HorizontalAlignment position="center">
                <Grid columns={1}>
                  <Cell>
                    <StyledImage
                      height="180px"
                      width="180px"
                      alt={`${name}${SMART_APP_LOGO_ALT_SUFFIX}`}
                      src={(appIcon && `${SMART_APP_LOGO_SRC_PREFIX}${appIcon}`) || `${SMART_APP_LOGO_SRC_PREFIX}${DEFAULT_APP_ICON}`}
                    />
                  </Cell>
                  <Cell center>
                    <StyledText fontSize="20px">{name}</StyledText>
                  </Cell>
                  <Cell center>
                    <Grid columns={2}>
                      <StyledRaisedButton onClick={() => this.handleEditClient(find(this.props.smartApps, { clientId }))}>
                        Edit
                      </StyledRaisedButton>
                      <StyledRaisedButton onClick={() => onDeleteClient && onDeleteClient(clientId)}>
                        Delete
                      </StyledRaisedButton>
                    </Grid>
                  </Cell>
                </Grid>
              </HorizontalAlignment>
            </Cell>
          ))}
        </Grid>
        <StyledDialog
          open={this.state.isClientDialogOpen}
          onClose={this.handleCloseDialog}
          fullWidth
          disableBackdropClick
        >
          <DialogTitle>
            <FormattedMessage {...messages.dialogHeader} />
          </DialogTitle>
          <DialogContent>
            <ManageClientForm
              initialValues={this.state.editingClient}
              handleCloseDialog={this.handleCloseDialog}
              onSaveClient={onSaveClient}
            />
          </DialogContent>
        </StyledDialog>
      </div>
    );
  }
}

ManageClient.propTypes = {
  onSaveClient: PropTypes.func,
  onDeleteClient: PropTypes.func,
  smartApps: PropTypes.arrayOf(PropTypes.shape({
    clientId: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    appIcon: PropTypes.string,
  })),
};

export default ManageClient;
