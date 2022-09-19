import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { Cell, Grid } from 'styled-css-grid';
import InfoSection from 'components/InfoSection';
import TextLabelGroup from 'components/TextLabelGroup';
import messages from './messages';


function CoverageRowDetails({ coverage }) {
  const { endDate, startDate, subscriberId, beneficiary, groupingPlanDisplay, network } = coverage;
  const period = `${startDate} - ${endDate}`;
  return (
    <div>
      <InfoSection>
        <Grid columns={'1fr 1fr 1fr 1fr 1fr'} justifyContent="space-between">
          <Cell>
            <TextLabelGroup
              label={<FormattedMessage {...messages.beneficiary} />}
              text={beneficiary && beneficiary.display}
            />
          </Cell>
          <Cell>
            <TextLabelGroup
              label={<FormattedMessage {...messages.ID} />}
              text={subscriberId}
            />
          </Cell>
          <Cell>
            <TextLabelGroup
              label={<FormattedMessage {...messages.period} />}
              text={period}
            />
          </Cell>
          <Cell>
            <TextLabelGroup
              label={<FormattedMessage {...messages.copay} />}
              text={groupingPlanDisplay}
            />
          </Cell>
          <Cell>
            <TextLabelGroup
              label={<FormattedMessage {...messages.network} />}
              text={network}
            />
          </Cell>
        </Grid>
      </InfoSection>
    </div>
  );
}

CoverageRowDetails.propTypes = {
  coverage: PropTypes.object.isRequired,
};

export default CoverageRowDetails;
