import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import teal from 'material-ui-next/colors/teal';
import AddCircleIcon from '@material-ui/icons/AddCircle';

import ActivityDefinitions from 'containers/ActivityDefinitions';
import ControlledAccordion from 'components/ControlledAccordion';
import FullWidthPanelDetails from 'components/ControlledAccordion/FullWidthPanelDetails';
import StyledIconButton from 'components/StyledIconButton';
import StyledTooltip from 'components/StyledTooltip';
import StyledText from 'components/StyledText';
import PanelSection from 'components/PanelSection';
import messages from './messages';


function OrganizationSliderActivityDefinitions(props) {
  return (
    <PanelSection>
      <ControlledAccordion
        accordionTitle={
          <StyledText whiteSpace>
            <FormattedMessage {...messages.activityDefinitionsPanel.panelSummary} />
          </StyledText>
        }
        expandIcon={
          <StyledTooltip title={<FormattedMessage {...messages.addNew} />}>
            <StyledIconButton onClick={props.onClose} component={Link} to={'/ocp-ui/manage-activity-definition'} disableIconHover>
              <AddCircleIcon color='#3275c1' />
            </StyledIconButton>
          </StyledTooltip>
        }
      >
        <FullWidthPanelDetails>
          <ActivityDefinitions />
        </FullWidthPanelDetails>
      </ControlledAccordion>
    </PanelSection>
  );
}

OrganizationSliderActivityDefinitions.propTypes = {
  onClose: PropTypes.func,
};

export default OrganizationSliderActivityDefinitions;
