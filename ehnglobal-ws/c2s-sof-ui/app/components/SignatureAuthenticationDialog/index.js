/**
 *
 * SignatureAuthenticationDialog
 *
 */

import React from 'react';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';
import Close from '@material-ui/icons/Close';
import { DialogContent, DialogTitle } from 'material-ui-next/Dialog';

import HorizontalAlignment from 'components/HorizontalAlignment';
import SignaturePad from 'components/SignaturePad';
import StyledDialog from 'components/StyledDialog';
import StyledIconButton from 'components/StyledIconButton';
import StyledTooltip from 'components/StyledTooltip';
import messages from './messages';


class SignatureAuthenticationDialog extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.handleSaveSignature = this.handleSaveSignature.bind(this);
  }

  handleSaveSignature(signatureDataURL) {
    this.props.onSignatureDialogClose();
    this.props.onSaveSignature(signatureDataURL);
  }

  render() {
    const { signatureDialogOpen, onSignatureDialogClose } = this.props;
    return (
      <StyledDialog open={signatureDialogOpen} fullWidth>
        <DialogTitle>
          <HorizontalAlignment position="end">
            <StyledTooltip title="Close">
              <StyledIconButton onClick={onSignatureDialogClose}>
                <Close />
              </StyledIconButton>
            </StyledTooltip>
          </HorizontalAlignment>
          <FormattedMessage {...messages.header} />
        </DialogTitle>
        <DialogContent>
          <FormattedMessage {...messages.title} />
          <SignaturePad onSaveSignature={this.handleSaveSignature} />
        </DialogContent>
      </StyledDialog>
    );
  }
}

SignatureAuthenticationDialog.propTypes = {
  signatureDialogOpen: PropTypes.bool.isRequired,
  onSignatureDialogClose: PropTypes.func.isRequired,
  onSaveSignature: PropTypes.func.isRequired,
};

export default SignatureAuthenticationDialog;
