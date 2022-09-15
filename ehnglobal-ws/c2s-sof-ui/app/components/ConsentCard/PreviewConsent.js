/**
 *
 * PreviewConsent
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import Dialog, { DialogContent } from 'material-ui-next/Dialog';
import Button from 'material-ui-next/Button';
import CloseIcon from '@material-ui/icons/Close';
import { Document, Page } from 'react-pdf/dist/entry.webpack';
import uniqueId from 'lodash/uniqueId';
import messages from './messages';


class PreviewConsent extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.state = {
      numPages: null,
    };
    this.onDocumentLoadSuccess = this.onDocumentLoadSuccess.bind(this);
  }

  onDocumentLoadSuccess({ numPages }) {
    this.setState({ numPages });
  }

  render() {
    const { previewConsentDialogOpen, onPreviewConsentDialogClose, sourceAttachment } = this.props;
    return (
      <div>
        <Dialog open={previewConsentDialogOpen} fullScreen>
          <Button onClick={onPreviewConsentDialogClose}>
            <CloseIcon />
            <FormattedMessage {...messages.consentDialog.closeButton} />
          </Button>
          <DialogContent>
            <Document
              file={`data:application/pdf;base64,${sourceAttachment}`}
              onLoadSuccess={this.onDocumentLoadSuccess}
            >
              {
                Array.from(
                  new Array(this.state.numPages),
                  (el, index) => (
                    <Page key={uniqueId()} pageNumber={index + 1} scale={2} />
                  ))
              }
            </Document>
          </DialogContent>
        </Dialog>
      </div>
    );
  }
}

PreviewConsent.propTypes = {
  previewConsentDialogOpen: PropTypes.bool.isRequired,
  onPreviewConsentDialogClose: PropTypes.func.isRequired,
  sourceAttachment: PropTypes.string.isRequired,
};

export default PreviewConsent;
