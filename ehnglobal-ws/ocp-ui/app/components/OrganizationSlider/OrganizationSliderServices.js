import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import teal from 'material-ui-next/colors/teal';
import AddCircleIcon from '@material-ui/icons/AddCircle';

import HealthcareServices from 'containers/HealthcareServices';
import ControlledAccordion from 'components/ControlledAccordion';
import FullWidthPanelDetails from 'components/ControlledAccordion/FullWidthPanelDetails';
import StyledIconButton from 'components/StyledIconButton';
import StyledTooltip from 'components/StyledTooltip';
import StyledText from 'components/StyledText';
import PanelSection from 'components/PanelSection';
import messages from './messages';


function OrganizationSliderServices(props) {
  return (
    <PanelSection>
      <ControlledAccordion
        accordionTitle={
          <StyledText whiteSpace>
            <FormattedMessage {...messages.servicesPanel.panelSummary} />
          </StyledText>
        }
        expandIcon={
          <StyledTooltip title={<FormattedMessage {...messages.addNew} />}>
            <StyledIconButton onClick={props.onClose} component={Link} to={'/ocp-ui/manage-healthcare-service'} disableIconHover>
              <AddCircleIcon color='#3275c1'/>
            </StyledIconButton>
          </StyledTooltip>
        }
      >
        <FullWidthPanelDetails>
          <HealthcareServices showActionSection={false} />
        </FullWidthPanelDetails>
      </ControlledAccordion>
    </PanelSection>
  );
}

OrganizationSliderServices.propTypes = {
  onClose: PropTypes.func,
};

export default OrganizationSliderServices;
