import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { Cell, Grid } from 'styled-css-grid';

import InfoSection from 'components/InfoSection';
import TextLabelGroup from 'components/TextLabelGroup';
import { mapToOrganizationName } from './helpers';
import messages from './messages';

function PractitionerExpansionRowDetails({ practitioner }) {
  const { addresses, name, identifiers, telecoms, active, practitionerRoles } = practitioner;
  return (
    <InfoSection>
      <Grid columns={'60% 40%'} justifyContent="space-between">
        <Cell>
          <TextLabelGroup
            label={<FormattedMessage {...messages.expansionRowDetailsName} />}
            text={name}
          />
        </Cell>
        <Cell>
          <TextLabelGroup
            label={<FormattedMessage {...messages.tableHeaderColumnIdentifier} />}
            text={identifiers}
          />
        </Cell>
        <Cell>
          <TextLabelGroup
            label={<FormattedMessage {...messages.expansionRowDetailsAddresses} />}
            text={addresses}
          />
        </Cell>
        <Cell>
          <TextLabelGroup
            label={<FormattedMessage {...messages.expansionRowDetailsTelecoms} />}
            text={telecoms}
          />
        </Cell>
        <Cell>
          <TextLabelGroup
            label={<FormattedMessage {...messages.tableHeaderColumnStatus} />}
            text={active ?
              <FormattedMessage {...messages.active} /> :
              <FormattedMessage {...messages.inactive} />
            }
          />
        </Cell>
        <Cell>
          <TextLabelGroup
            label={<FormattedMessage {...messages.expansionRowDetailsOrg} />}
            text={mapToOrganizationName(practitionerRoles)}
          />
        </Cell>
      </Grid>
    </InfoSection>
  );
}

PractitionerExpansionRowDetails.propTypes = {
  practitioner: PropTypes.shape({
    logicalId: PropTypes.string.isRequired,
    identifiers: PropTypes.string,
    active: PropTypes.bool,
    name: PropTypes.string,
    addresses: PropTypes.string,
    telecoms: PropTypes.string,
    practitionerRoles: PropTypes.array,
  }).isRequired,
};

export default PractitionerExpansionRowDetails;
