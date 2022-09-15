/**
 *
 * ConsentCartHeader
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { Cell, Grid } from 'styled-css-grid';

import StyledFlatButton from 'components/StyledFlatButton';
import Padding from 'components/Padding';
import TextLabelGroup from 'components/TextLabelGroup';
import StyledConsentHeaderDetails from './StyledConsentHeaderDetails';
import ConsentHeaderDetails from './ConsentHeaderDetails';
import { flattenConsentData } from './helpers';
import messages from './messages';


class ConsentCartHeader extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.state = {
      expansionPanelOpen: false,
    };
    this.handlePanelOpen = this.handlePanelOpen.bind(this);
  }

  handlePanelOpen() {
    this.setState({ expansionPanelOpen: !this.state.expansionPanelOpen });
  }

  render() {
    const { consent } = this.props;
    const flattenedConsent = flattenConsentData(consent);
    const { fromActor, toActor, period } = flattenedConsent;
    return (
      <div>
        <Padding left={10} right={10}>
          <Grid columns="repeat(2, 1fr) 0.4fr 0.3fr">
            <Cell>
              <TextLabelGroup
                label={<FormattedMessage {...messages.consentCardHeader.authorizedLabel} />}
                text={fromActor}
              />
            </Cell>
            <Cell>
              <TextLabelGroup
                label={<FormattedMessage {...messages.consentCardHeader.sharingLabel} />}
                text={toActor}
              />
            </Cell>
            <Cell>
              <TextLabelGroup
                label={<FormattedMessage {...messages.consentCardHeader.effectiveDatesLabel} />}
                text={period}
              />
            </Cell>
            <Cell center>
              <StyledFlatButton onClick={this.handlePanelOpen}>
                {this.state.expansionPanelOpen ? 'Less Details' : 'More Details'}
              </StyledFlatButton>
            </Cell>
          </Grid>
        </Padding>
        <StyledConsentHeaderDetails expanded={this.state.expansionPanelOpen}>
          <ConsentHeaderDetails purpose={consent.purpose} medicalInformation={consent.medicalInformation} />
        </StyledConsentHeaderDetails>
      </div>
    );
  }
}

ConsentCartHeader.propTypes = {
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
      start: PropTypes.date,
      end: PropTypes.date,
    }),
  }).isRequired,
};

export default ConsentCartHeader;
