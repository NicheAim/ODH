/**
 *
 * DeleteConsent
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { DialogContent, DialogTitle } from 'material-ui-next/Dialog';
import { Cell, Grid } from 'styled-css-grid';

import HorizontalAlignment from 'components/HorizontalAlignment';
import StyledRaisedButton from 'components/StyledRaisedButton';
import StyledDialog from 'components/StyledDialog';
import messages from './messages';


function DeleteConsent(props) {
  const { deleteConsentDialogOpen, onDeleteConsentDialogClose, onDeleteConsent } = props;
  return (
    <StyledDialog open={deleteConsentDialogOpen} onClose={onDeleteConsentDialogClose} fullWidth>
      <DialogTitle>
        <FormattedMessage {...messages.consentDialog.deleteConsentTitle} />
      </DialogTitle>
      <DialogContent>
        <FormattedMessage {...messages.consentDialog.deleteConsentMessage} />
        <HorizontalAlignment position={'end'}>
          <Grid columns={2} alignContent="space-between">
            <Cell>
              <StyledRaisedButton fullWidth onClick={onDeleteConsent}>
                <FormattedMessage {...messages.consentDialog.okButton} />
              </StyledRaisedButton>
            </Cell>
            <Cell>
              <StyledRaisedButton fullWidth onClick={onDeleteConsentDialogClose}>
                <FormattedMessage {...messages.consentDialog.cancelButton} />
              </StyledRaisedButton>
            </Cell>
          </Grid>
        </HorizontalAlignment>
      </DialogContent>
    </StyledDialog>
  );
}

DeleteConsent.propTypes = {
  deleteConsentDialogOpen: PropTypes.bool.isRequired,
  onDeleteConsentDialogClose: PropTypes.func.isRequired,
  onDeleteConsent: PropTypes.func.isRequired,
};

export default DeleteConsent;
