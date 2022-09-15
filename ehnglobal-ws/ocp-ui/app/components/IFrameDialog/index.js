import PropTypes from 'prop-types';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Cell, Grid } from 'styled-css-grid';
import DialogHeader from '../DialogHeader';
import StyledDialog from '../StyledDialog';
import StyledFlatButton from '../StyledFlatButton';
import messages from './messages';

class IFrameDialog extends React.Component {
  // eslint-disable-line react/prefer-stateless-function

  render() {
    const { open, handleDialogClose, iframeUrl } = this.props;

    return (
      <div>
        <StyledDialog
          maxWidth="xl"
          fullWidth
          modal
          open={open}
          autoScrollBodyContent
          className="iframe-dialog"
        >
          <DialogHeader>
            {<FormattedMessage {...messages.dialogTitle} />}
          </DialogHeader>

          <div height="100%">
            <iframe width="100%" height="100%" src={iframeUrl}>
              <p>Your browser does not support iframes.</p>
            </iframe>
          </div>

          <Grid columns="repeat(2, 1fr)">
            <Cell>
              <StyledFlatButton type="reset" onClick={handleDialogClose}>
                <FormattedMessage {...messages.cancelButton} />
              </StyledFlatButton>
            </Cell>
          </Grid>
        </StyledDialog>
      </div>
    );
  }
}

IFrameDialog.propTypes = {
  open: PropTypes.bool,
  handleDialogClose: PropTypes.func,
  iframeUrl: PropTypes.string,
};

export default IFrameDialog;
