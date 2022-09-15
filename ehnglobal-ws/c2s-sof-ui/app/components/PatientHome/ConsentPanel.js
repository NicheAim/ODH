import React from 'react';
import { FormattedMessage } from 'react-intl';

import Consents from 'containers/Consents';
import ControlledAccordion from 'components/ControlledAccordion';
import FullWidthPanelDetails from 'components/ControlledAccordion/FullWidthPanelDetails';
import StyledText from 'components/StyledText';
import PanelSection from 'components/PanelSection';
import messages from './messages';


function ConsentPanel() {
  return (
    <PanelSection>
      <ControlledAccordion
        defaultExpanded
        accordionTitle={
          <StyledText fontSize="16px" whiteSpace>
            <FormattedMessage {...messages.consentPanelSummary} />
          </StyledText>
        }
      >
        <FullWidthPanelDetails>
          <Consents />
        </FullWidthPanelDetails>
      </ControlledAccordion>
    </PanelSection>
  );
}

ConsentPanel.propTypes = {};

export default ConsentPanel;
