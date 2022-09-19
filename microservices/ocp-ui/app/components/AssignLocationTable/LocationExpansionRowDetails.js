import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { Cell, Grid } from 'styled-css-grid';

import InfoSection from 'components/InfoSection';
import TextLabelGroup from 'components/TextLabelGroup';
import messages from './messages';

function LocationExpansionRowDetails({ location, physicalType }) {
  const { name, status, telecoms, address, identifiers } = location;
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
            label={<FormattedMessage {...messages.tableColumnHeaderAddress} />}
            text={address}
          />
        </Cell>
        <Cell>
          <TextLabelGroup
            label={<FormattedMessage {...messages.tableColumnHeaderStatus} />}
            text={status ?
              <FormattedMessage {...messages.labelActive} /> :
              <FormattedMessage {...messages.labelInactive} />
            }
          />

        </Cell>
        <Cell>
          <TextLabelGroup
            label={<FormattedMessage {...messages.tableColumnHeaderIdentifier} />}
            text={identifiers}
          />
        </Cell>
        <Cell>
          <TextLabelGroup
            label={<FormattedMessage {...messages.tableColumnHeaderContact} />}
            text={telecoms}
          />
        </Cell>
        <Cell>
          <TextLabelGroup
            label={<FormattedMessage {...messages.tableColumnHeaderLocationType} />}
            text={physicalType.display}
          />
        </Cell>
      </Grid>
    </InfoSection>
  );
}

LocationExpansionRowDetails.propTypes = {
  location: PropTypes.object,
  physicalType: PropTypes.object,
};

export default LocationExpansionRowDetails;
