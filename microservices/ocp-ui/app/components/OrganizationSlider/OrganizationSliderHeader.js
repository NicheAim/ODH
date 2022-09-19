import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import teal from 'material-ui-next/colors/teal';
import ModeEdit from '@material-ui/icons/ModeEdit';
import { Cell, Grid } from 'styled-css-grid';

import InfoSection from 'components/InfoSection';
import StyledText from 'components/StyledText';
import StyledFlatButton from 'components/StyledFlatButton';
import StyledImage from 'components/StyledImage';
import imgPlaceholder from 'images/image-placeholder.png';
import SliderHeaderSection from './SliderHeaderSection';
import messages from './messages';

function OrganizationSliderHeader(props) {
  const { organization: { logicalId, name, identifiers, active, addresses } } = props;
  return (
    <SliderHeaderSection>
      <Grid columns={'20% 1fr 10%'}>
        <Cell>
          <StyledImage
            height="130px"
            width="110px"
            src={imgPlaceholder}
            alt={<FormattedMessage {...messages.orgImg} />}
          />
        </Cell>
        <Cell>
          <InfoSection margin="0 0 20px 0">
            <StyledText fontSize="20px" fontWeight="700" color="primary">
              {name}
            </StyledText>
          </InfoSection>
          <Grid columns={'60% 40%'} justifyContent="space-between">
            <Cell>
              <StyledText fontWeight="700">
                {identifiers}
              </StyledText>
            </Cell>
            <Cell>
              <StyledText>Status</StyledText>
              <StyledText whiteSpace fontWeight="700">
                {active ?
                  <FormattedMessage {...messages.active} /> :
                  <FormattedMessage {...messages.inactive} />
                }
              </StyledText>
            </Cell>
          </Grid>
          <InfoSection margin="20px 0 0 0">
            <StyledText>Address</StyledText>
            <StyledText whiteSpace fontWeight="700">
              {addresses}
            </StyledText>
          </InfoSection>
        </Cell>
        <Cell>
          <StyledFlatButton
            onClick={props.onClose}
            component={Link}
            to={`/ocp-ui/manage-organization/${logicalId}`}
          >
            <ModeEdit color='#3275c1' />
            <FormattedMessage {...messages.edit} />
          </StyledFlatButton>
        </Cell>
      </Grid>
    </SliderHeaderSection>
  );
}

OrganizationSliderHeader.propTypes = {
  organization: PropTypes.shape({
    logicalId: PropTypes.string.isRequired,
    identifiers: PropTypes.string,
    active: PropTypes.bool,
    name: PropTypes.string.isRequired,
    addresses: PropTypes.string,
    telecoms: PropTypes.string,
  }).isRequired,
  onClose: PropTypes.func,
};

export default OrganizationSliderHeader;
