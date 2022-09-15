/**
 *
 * OrganizationSlider
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import Cancel from '@material-ui/icons/Cancel';

import Padding from 'components/Padding';
import StyledDrawer from 'components/StyledDrawer';
import StyledIconButton from 'components/StyledIconButton';
import StyledTooltip from 'components/StyledTooltip';
import HorizontalAlignment from 'components/HorizontalAlignment';
import OrganizationSliderHeader from './OrganizationSliderHeader';
import OrganizationSliderServices from './OrganizationSliderServices';
import OrganizationSliderLocations from './OrganizationSliderLocations';
import OrganizationSliderActivityDefinitions from './OrganizationSliderActivityDefinitions';
import messages from './messages';

const anchors = ['left', 'top', 'right', 'bottom'];

function OrganizationSlider(props) {
  const { anchor, open, onClose, organization, flattenOrganizationData } = props;
  const flattenedOrganization = flattenOrganizationData(organization);
  return (
    <div>
      <StyledDrawer
        anchor={anchor}
        open={open}
        transitionDuration={{ enter: 500, exit: 20 }}
      >
        <HorizontalAlignment position="end">
          <StyledTooltip title={<FormattedMessage {...messages.closeButton} />} placement="left">
            <StyledIconButton size="small" disableIconHover onClick={onClose}>
              <Cancel color="#b2b2b2" />
            </StyledIconButton>
          </StyledTooltip>
        </HorizontalAlignment>
        <Padding left={10} right={10}>
          <OrganizationSliderHeader organization={flattenedOrganization} onClose={onClose} />
          <OrganizationSliderServices organization={flattenedOrganization} onClose={onClose} />
          <OrganizationSliderLocations organization={flattenedOrganization} onClose={onClose} />
          <OrganizationSliderActivityDefinitions organization={flattenedOrganization} onClose={onClose} />
        </Padding>
      </StyledDrawer>
    </div>
  );
}

OrganizationSlider.propTypes = {
  anchor: PropTypes.oneOf(anchors),
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  flattenOrganizationData: PropTypes.func.isRequired,
  organization: PropTypes.shape({
    logicalId: PropTypes.string.isRequired,
    identifiers: PropTypes.arrayOf(PropTypes.shape({
      system: PropTypes.string,
      oid: PropTypes.string,
      value: PropTypes.string,
      priority: PropTypes.number,
      display: PropTypes.string,
    })),
    active: PropTypes.bool,
    name: PropTypes.string.isRequired,
    addresses: PropTypes.arrayOf(PropTypes.shape({
      line1: PropTypes.string,
      line2: PropTypes.string,
      city: PropTypes.string,
      stateCode: PropTypes.string,
      postalCode: PropTypes.string,
      countryCode: PropTypes.string,
      use: PropTypes.string,
    })),
    telecoms: PropTypes.arrayOf(PropTypes.shape({
      system: PropTypes.string,
      value: PropTypes.string,
      use: PropTypes.string,
    })),
  }).isRequired,
};

OrganizationSlider.defaultProps = {
  anchor: 'right',
};

export default OrganizationSlider;
