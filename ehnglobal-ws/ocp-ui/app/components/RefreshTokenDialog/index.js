import PropTypes from 'prop-types';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Cell, Grid } from 'styled-css-grid';
import StyledDialog from '../StyledDialog';
import StyledFlatButton from '../StyledFlatButton';
import messages from './messages';

import { DialogContent, DialogTitle } from 'material-ui-next/Dialog';

class RefreshTokenDialog extends React.Component {
  // eslint-disable-line react/prefer-stateless-function

  render() {
    const { open, handleDialogClose, time, handleRefresh } = this.props;

    return (
      <div>
        <StyledDialog
          maxWidth="xs"
          fullWidth
          open={open}
          onClose={handleDialogClose}
        >
          <DialogTitle>
            {<FormattedMessage {...messages.dialogTitle} />}
          </DialogTitle>

          <DialogContent>
            <div>{`Session is going to expire, time left: s: ${time.s}`}</div>

            <StyledFlatButton type="reset" onClick={handleDialogClose}>
              <FormattedMessage {...messages.cancelButton} />
            </StyledFlatButton>

            <StyledFlatButton type="reset" onClick={handleRefresh}>
              <FormattedMessage {...messages.refreshButton} />
            </StyledFlatButton>
          </DialogContent>
        </StyledDialog>
      </div>
    );
  }
}

RefreshTokenDialog.propTypes = {
  open: PropTypes.bool,
  handleDialogClose: PropTypes.func,
  iframeUrl: PropTypes.string,
};

export default RefreshTokenDialog;
