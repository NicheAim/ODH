/**
 *
 * SmartApps
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import Avatar from 'material-ui/Avatar';
import { Cell, Grid } from 'styled-css-grid';
import Util from 'utils/Util';
import Padding from 'components/Padding';
import PanelSection from 'components/PanelSection';
import StyledText from 'components/StyledText';
import SmartAppsGallery from 'components/SmartAppsGallery';
import { CARE_COORDINATOR_ROLE_CODE, CARE_MANAGER_ROLE_CODE, PATIENT_ROLE_CODE, PCP_ROLE_CODE } from 'containers/App/constants';
import ShowHideWrapper from 'containers/ShowHideWrapper';
import LaunchButton from './LaunchButton';


class SmartApps extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.handleLaunch = this.handleLaunch.bind(this);
  }

  handleLaunch(clientId) {
    this.props.onCreateLaunch(clientId);
  }

  render() {
    const { onCreateLaunch, smartApps, config, appShortcuts, userRole } = this.props;
    const registeredAppShortcuts = (userRole === PATIENT_ROLE_CODE) ?
      smartApps.filter((app) => appShortcuts.patientClientIds.includes(app.clientId)) :
      smartApps.filter((app) => appShortcuts.clientIds.includes(app.clientId));
    return (
      <PanelSection>
        <Padding left={5} right={5} top={5} bottom={5}>
          <Grid gap="10px" columns="repeat(auto-fit, minmax(100px,150px))">
            {registeredAppShortcuts && registeredAppShortcuts.map(({ clientId, clientName, appIcon }) => (
              <Cell key={clientId}>
                <LaunchButton onClick={() => this.handleLaunch(clientId)}>
                  {Util.hasText(appIcon) && (<Avatar size={25} src={`data:image/png;base64,${appIcon}`} />)}
                  <StyledText fontWeight={600} whiteSpace>
                    {clientName}
                  </StyledText>
                </LaunchButton>
              </Cell>
            ))}
            <ShowHideWrapper allowedRoles={[CARE_COORDINATOR_ROLE_CODE, CARE_MANAGER_ROLE_CODE, PCP_ROLE_CODE, PATIENT_ROLE_CODE]}>
              <Cell>
                <SmartAppsGallery
                  smartApps={smartApps}
                  onCreateLaunch={onCreateLaunch}
                  config={config}
                />
              </Cell>
            </ShowHideWrapper>
          </Grid>
        </Padding>
      </PanelSection>
    );
  }
}

SmartApps.propTypes = {
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
  appShortcuts: PropTypes.shape({
    clientIds: PropTypes.array,
    patientClientIds: PropTypes.array,
  }),
  userRole: PropTypes.string.isRequired,
};

export default SmartApps;
