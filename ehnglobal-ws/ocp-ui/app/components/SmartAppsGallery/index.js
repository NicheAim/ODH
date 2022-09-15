/**
 *
 * SmartAppsGallery
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import Apps from '@material-ui/icons/Apps';
import Close from '@material-ui/icons/Close';
import Settings from '@material-ui/icons/Settings';
import { DialogContent, DialogTitle } from 'material-ui-next/Dialog';
import get from 'lodash/get';
import { Cell, Grid } from 'styled-css-grid';

import LaunchButton from 'components/SmartApps/LaunchButton';
import HorizontalAlignment from 'components/HorizontalAlignment';
import StyledDialog from 'components/StyledDialog';
import StyledText from 'components/StyledText';
import StickyDiv from 'components/StickyDiv';
import StyledFlatButton from 'components/StyledFlatButton';
import StyledTooltip from 'components/StyledTooltip';
import StyledIconButton from 'components/StyledIconButton';
import messages from './messages';

class SmartAppsGallery extends React.Component { // eslint-disable-line react/prefer-stateless-function
  static SMART_APP_LOGO_STYLE = { width: 50, height: 50 };
  static SMART_APP_LOGO_SRC_PREFIX = 'data:image/png;base64,';
  static SMART_APP_LOGO_ALT_SUFFIX = ' Logo';

  constructor(props) {
    super(props);
    this.state = {
      smartAppsDialogOpen: false,
    };
    this.handleSmartAppsDialogToggle = this.handleSmartAppsDialogToggle.bind(this);
    this.handleLaunch = this.handleLaunch.bind(this);
    this.handleSmartAppSettingsClick = this.handleSmartAppSettingsClick.bind(this);
  }

  handleSmartAppsDialogToggle() {
    this.setState(({ smartAppsDialogOpen }) => ({ smartAppsDialogOpen: !smartAppsDialogOpen }));
  }

  handleLaunch(clientId) {
    this.props.onCreateLaunch(clientId);
  }

  handleSmartAppSettingsClick() {
    const { config } = this.props;
    const authorizationServerEndpoint = get(config, 'oauth2.authorizationServerEndpoint');
    if (authorizationServerEndpoint) {
      window.open(`${authorizationServerEndpoint}/profile`);
    }
  }

  render() {
    const { smartApps } = this.props;
    return (
      <div>
        <LaunchButton onClick={this.handleSmartAppsDialogToggle}>
          <Apps />
          <StyledText fontWeight={600} whiteSpace><FormattedMessage {...messages.buttonLabel} /></StyledText>
        </LaunchButton>
        <StyledDialog open={this.state.smartAppsDialogOpen} onClose={this.handleSmartAppsDialogToggle}>
          <StickyDiv>
            <DialogTitle>
              <HorizontalAlignment position="center">
                <Grid columns="1.5fr 1fr 0px 1.5fr">
                  <Cell />
                  <Cell middle>
                    <FormattedMessage {...messages.buttonLabel} />
                  </Cell>
                  <Cell middle>
                    <StyledFlatButton onClick={this.handleSmartAppSettingsClick}>
                      <Settings />
                    </StyledFlatButton>
                  </Cell>
                  <Cell middle>
                    <HorizontalAlignment position="end">
                      <StyledTooltip title="Close">
                        <StyledIconButton onClick={this.handleSmartAppsDialogToggle}>
                          <Close />
                        </StyledIconButton>
                      </StyledTooltip>
                    </HorizontalAlignment>
                  </Cell>
                </Grid>
              </HorizontalAlignment>
            </DialogTitle>
          </StickyDiv>
          <DialogContent>
            <Grid columns={3} justifyContent="space-around" gap="16px">
              {smartApps.map(({ clientId, clientName, appIcon }) => (
                <Cell key={clientId} middle>
                  <HorizontalAlignment position="center">
                    <StyledFlatButton onClick={() => this.handleLaunch(clientId)}>
                      <Grid columns={1}>
                        <Cell>
                          {appIcon &&
                          <img
                            style={SmartAppsGallery.SMART_APP_LOGO_STYLE}
                            alt={`${clientName}${SmartAppsGallery.SMART_APP_LOGO_ALT_SUFFIX}`}
                            src={`${SmartAppsGallery.SMART_APP_LOGO_SRC_PREFIX}${appIcon}`}
                          />}
                        </Cell>
                        <Cell>
                          {clientName}
                        </Cell>
                      </Grid>
                    </StyledFlatButton>
                  </HorizontalAlignment>
                </Cell>
              ))}
            </Grid>
          </DialogContent>
        </StyledDialog>
      </div>
    );
  }
}

SmartAppsGallery.propTypes = {
  onCreateLaunch: PropTypes.func.isRequired,
  smartApps: PropTypes.arrayOf(PropTypes.shape({
    clientId: PropTypes.string.isRequired,
    clientName: PropTypes.string.isRequired,
    appIcon: PropTypes.string,
  })).isRequired,
  config: PropTypes.shape({
    oauth2: PropTypes.shape({
      authorizationServerEndpoint: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default SmartAppsGallery;
