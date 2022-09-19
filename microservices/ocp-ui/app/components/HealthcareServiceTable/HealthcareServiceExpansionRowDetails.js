import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { Cell, Grid } from 'styled-css-grid';

import InfoSection from 'components/InfoSection';
import TextLabelGroup from 'components/TextLabelGroup';
import messages from './messages';

function HealthcareServiceExpansionRowDetails({ healthcareService }) {
  const { name, category, type, specialty, programName, referralMethod, telecom, active } = healthcareService;
  return (
    <InfoSection>
      <Grid columns={'repeat(2, 1fr)'}>
        <Cell>
          <TextLabelGroup
            label={<FormattedMessage {...messages.tableColumnHeaderName} />}
            text={name}
          />
        </Cell>
        <Cell>
          <TextLabelGroup
            label={<FormattedMessage {...messages.tableColumnHeaderType} />}
            text={type}
          />
        </Cell>
        <Cell>
          <TextLabelGroup
            label={<FormattedMessage {...messages.tableColumnHeaderCategory} />}
            text={category}
          />
        </Cell>
        <Cell>
          <TextLabelGroup
            label={<FormattedMessage {...messages.tableColumnHeaderSpecialty} />}
            text={specialty}
          />
        </Cell>
        <Cell>
          <TextLabelGroup
            label={<FormattedMessage {...messages.tableColumnHeaderProgramName} />}
            text={programName}
          />
        </Cell>
        <Cell>
          <TextLabelGroup
            label={<FormattedMessage {...messages.tableColumnHeaderReferralMethod} />}
            text={referralMethod}
          />
        </Cell>
        <Cell>
          <TextLabelGroup
            label={<FormattedMessage {...messages.tableColumnHeaderStatus} />}
            text={active ?
              <FormattedMessage {...messages.labelActive} /> :
              <FormattedMessage {...messages.labelInactive} />
            }
          />
        </Cell>
        <Cell>
          {telecom &&
          <TextLabelGroup
            label={<FormattedMessage {...messages.expansionRowDetailsTelecoms} />}
            text={telecom}
          />
          }
        </Cell>
      </Grid>
    </InfoSection>
  );
}

HealthcareServiceExpansionRowDetails.propTypes = {
  healthcareService: PropTypes.shape({
    logicalId: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    category: PropTypes.string,
    type: PropTypes.string,
    specialty: PropTypes.string,
    programName: PropTypes.string,
    referralMethod: PropTypes.string,
    telecom: PropTypes.string,
    active: PropTypes.bool,
  }).isRequired,
};

export default HealthcareServiceExpansionRowDetails;
