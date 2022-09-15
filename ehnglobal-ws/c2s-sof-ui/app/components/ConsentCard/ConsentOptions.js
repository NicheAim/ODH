/**
 *
 * ConsentCard
 *
 */

import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { DialogContent, DialogTitle } from 'material-ui-next/Dialog';
import Button from 'material-ui-next/Button';
import CloseIcon from '@material-ui/icons/Close';
import { Cell, Grid } from 'styled-css-grid';

import HorizontalAlignment from 'components/HorizontalAlignment';
import StyledRaisedButton from 'components/StyledRaisedButton';
import StyledDialog from 'components/StyledDialog';
import StyledTooltip from 'components/StyledTooltip';
import StyledIconButton from 'components/StyledIconButton';
import ConsentOptionsVisibility from './ConsentOptionsVisibility';
import PreviewConsent from './PreviewConsent';
import DeleteConsent from './DeleteConsent';
import { CONSENT_STATUS_ACTIVE, CONSENT_STATUS_DRAFT, CONSENT_STATUS_INACTIVE } from './constants';
import messages from './messages';


class ConsentOptions extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.state = {
      isManageConsentDialogOpen: false,
      isPreviewConsentDialogOpen: false,
      isDeleteConsentDialogOpen: false,
    };
    this.handleOpenDialog = this.handleOpenDialog.bind(this);
    this.handleCloseDialog = this.handleCloseDialog.bind(this);
    this.handlePreviewConsentOpen = this.handlePreviewConsentOpen.bind(this);
    this.handlePreviewConsentClose = this.handlePreviewConsentClose.bind(this);
    this.handleDeleteConsentOpen = this.handleDeleteConsentOpen.bind(this);
    this.handleDeleteConsentClose = this.handleDeleteConsentClose.bind(this);
    this.handleDeleteConsent = this.handleDeleteConsent.bind(this);
  }

  handleOpenDialog() {
    this.setState({ isManageConsentDialogOpen: true });
  }

  handleCloseDialog() {
    this.setState({ isManageConsentDialogOpen: false });
  }

  handlePreviewConsentClose() {
    this.setState({ isPreviewConsentDialogOpen: false });
  }

  handlePreviewConsentOpen() {
    this.setState({
      isManageConsentDialogOpen: false,
      isPreviewConsentDialogOpen: true,
    });
  }

  handleDeleteConsentOpen() {
    this.setState({
      isManageConsentDialogOpen: false,
      isDeleteConsentDialogOpen: true,
    });
  }

  handleDeleteConsentClose() {
    this.setState({ isDeleteConsentDialogOpen: false });
  }

  handleDeleteConsent() {
    const { consent, handleDeleteConsent } = this.props;
    handleDeleteConsent(consent);
    this.setState({
      isDeleteConsentDialogOpen: false,
      isManageConsentDialogOpen: false,
    });
  }

  render() {
    const { consent, user } = this.props;
    const { logicalId, status, sourceAttachment } = consent;
    return (
      <div>
        <StyledRaisedButton onClick={this.handleOpenDialog}>
          <FormattedMessage {...messages.manageConsentButton} />
        </StyledRaisedButton>
        <StyledDialog open={this.state.isManageConsentDialogOpen} onClose={this.handleCloseDialog} fullWidth>
          <DialogTitle>
            <HorizontalAlignment position={'end'}>
              <StyledTooltip title="Close">
                <StyledIconButton onClick={this.handleCloseDialog}>
                  <CloseIcon />
                </StyledIconButton>
              </StyledTooltip>
            </HorizontalAlignment>
            <FormattedMessage {...messages.consentDialog.title} />
          </DialogTitle>
          <DialogContent>
            <Grid columns={1}>
              <ConsentOptionsVisibility allowedStatuses={CONSENT_STATUS_DRAFT} consentStatus={status}>
                <Cell>
                  <Button
                    variant="raised"
                    fullWidth
                    component={Link}
                    to={`/c2s-sof-ui/manage-consent/${logicalId}`}
                  >
                    <FormattedMessage {...messages.consentDialog.editConsentOption} />
                  </Button>
                </Cell>
              </ConsentOptionsVisibility>
              {(user && user.isPatient) &&
              <ConsentOptionsVisibility allowedStatuses={CONSENT_STATUS_DRAFT} consentStatus={status}>
                <Cell>
                  <Button
                    variant="raised"
                    fullWidth
                    component={Link}
                    to={`/c2s-sof-ui/attest-consent/${logicalId}`}
                  >
                    <FormattedMessage {...messages.consentDialog.attestConsentOption} />
                  </Button>
                </Cell>
              </ConsentOptionsVisibility>
              }
              <ConsentOptionsVisibility
                allowedStatuses={[CONSENT_STATUS_DRAFT, CONSENT_STATUS_ACTIVE, CONSENT_STATUS_INACTIVE]}
                consentStatus={status}
              >
                <Cell>
                  <Button
                    variant="raised"
                    fullWidth
                    onClick={this.handlePreviewConsentOpen}
                  >
                    <FormattedMessage {...messages.consentDialog.previewConsentOption} />
                  </Button>
                </Cell>
              </ConsentOptionsVisibility>
              {(user && user.isPatient) &&
              <ConsentOptionsVisibility allowedStatuses={CONSENT_STATUS_ACTIVE} consentStatus={status}>
                <Cell>
                  <Button
                    variant="raised"
                    fullWidth
                    component={Link}
                    to={`/c2s-sof-ui/revoke-consent/${logicalId}`}
                  >
                    <FormattedMessage {...messages.consentDialog.revokeConsentOption} />
                  </Button>
                </Cell>
              </ConsentOptionsVisibility>
              }
              <ConsentOptionsVisibility allowedStatuses={CONSENT_STATUS_DRAFT} consentStatus={status}>
                <Cell>
                  <Button
                    variant="raised"
                    fullWidth
                    onClick={this.handleDeleteConsentOpen}
                  >
                    <FormattedMessage {...messages.consentDialog.deleteConsentOption} />
                  </Button>
                </Cell>
              </ConsentOptionsVisibility>
            </Grid>
          </DialogContent>
        </StyledDialog>
        {sourceAttachment &&
        <PreviewConsent
          previewConsentDialogOpen={this.state.isPreviewConsentDialogOpen}
          onPreviewConsentDialogClose={this.handlePreviewConsentClose}
          sourceAttachment={sourceAttachment}
        />
        }
        <DeleteConsent
          deleteConsentDialogOpen={this.state.isDeleteConsentDialogOpen}
          onDeleteConsentDialogClose={this.handleDeleteConsentClose}
          onDeleteConsent={this.handleDeleteConsent}
        />
      </div>
    );
  }
}

ConsentOptions.propTypes = {
  consent: PropTypes.shape({
    logicalId: PropTypes.string.isRequired,
    identifiers: PropTypes.arrayOf(PropTypes.shape({
      system: PropTypes.string,
      oid: PropTypes.string,
      value: PropTypes.string,
      priority: PropTypes.number,
      display: PropTypes.string,
    })),
    status: PropTypes.string,
    fromActor: PropTypes.array,
    toActor: PropTypes.array,
    period: PropTypes.shape({
      start: PropTypes.string,
      end: PropTypes.string,
    }),
    sourceAttachment: PropTypes.string,
  }).isRequired,
  handleDeleteConsent: PropTypes.func.isRequired,
  user: PropTypes.shape({
    isPatient: PropTypes.bool.isRequired,
    fhirResource: PropTypes.shape({
      logicalId: PropTypes.string,
      name: PropTypes.array,
      identifiers: PropTypes.arrayOf(PropTypes.shape({
        system: PropTypes.string,
        oid: PropTypes.string,
        value: PropTypes.string,
        priority: PropTypes.number,
        display: PropTypes.string,
      })),
    }),
  }),
};

export default ConsentOptions;
