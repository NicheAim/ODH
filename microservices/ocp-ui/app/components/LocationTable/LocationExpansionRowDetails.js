import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { Cell, Grid } from 'styled-css-grid';
import upperFirst from 'lodash/upperFirst';

import InfoSection from 'components/InfoSection';
import TextLabelGroup from 'components/TextLabelGroup';
import messages from './messages';

function LocationExpansionRowDetails({ location }) {
  const { address, name, identifiers, telecoms, status, physicalType } = location;
  return (
    <InfoSection>
      <Grid columns={'60% 40%'} justifyContent="space-between">
        <Cell>
          <TextLabelGroup
            label={<FormattedMessage {...messages.tableHeaderColumnName} />}
            text={name}
          />
        </Cell>
        <Cell>
          <TextLabelGroup
            label={<FormattedMessage {...messages.expansionRowDetailsIdentifiers} />}
            text={identifiers}
          />
        </Cell>
        <Cell>
          <TextLabelGroup
            label={<FormattedMessage {...messages.tableHeaderColumnAddress} />}
            text={address}
          />
        </Cell>
        <Cell>
          <TextLabelGroup
            label={<FormattedMessage {...messages.tableHeaderColumnTelecoms} />}
            text={telecoms}
          />
        </Cell>
        <Cell>
          <TextLabelGroup
            label={<FormattedMessage {...messages.tableHeaderColumnStatus} />}
            text={upperFirst(status)}
          />
        </Cell>
        <Cell>
          <TextLabelGroup
            label={<FormattedMessage {...messages.expansionRowDetailsLocationType} />}
            text={physicalType.display}
          />
        </Cell>
      </Grid>
    </InfoSection>
  );
}

LocationExpansionRowDetails.propTypes = {
  location: PropTypes.shape({
    logicalId: PropTypes.string.isRequired,
    identifiers: PropTypes.string,
    status: PropTypes.string,
    name: PropTypes.string.isRequired,
    address: PropTypes.string,
    telecoms: PropTypes.string,
  }).isRequired,
};

export default LocationExpansionRowDetails;
