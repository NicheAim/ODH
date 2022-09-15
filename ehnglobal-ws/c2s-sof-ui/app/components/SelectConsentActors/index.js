/**
 *
 * SelectConsentActors
 *
 */

import React from 'react';
import InfoSection from 'components/InfoSection';
import { Cell, Grid } from 'styled-css-grid';
import union from 'lodash/union';

import ConsentFromActors from 'components/ConsentFromActors';
import ConsentToActors from 'components/ConsentToActors';
import PropTypes from 'prop-types';


function SelectConsentActors(props) {
  const { isCareCoordinator, consentFromActors, consentToActors, errors } = props;
  const addedActors = union(consentFromActors, consentToActors);
  return (
    <InfoSection margin="10px 0 0 0">
      <Grid columns={2} gap={'20px'}>
        <Cell>
          <ConsentFromActors
            consentFromActors={consentFromActors}
            addedActors={addedActors}
            isCareCoordinator={isCareCoordinator}
            errors={errors}
          />
        </Cell>
        <Cell>
          <ConsentToActors errors={errors} consentToActors={consentToActors} addedActors={addedActors} />
        </Cell>
      </Grid>
    </InfoSection>
  );
}

SelectConsentActors.propTypes = {
  isCareCoordinator: PropTypes.bool.isRequired,
  consentFromActors: PropTypes.arrayOf(PropTypes.shape({
    display: PropTypes.string.isRequired,
    reference: PropTypes.shape({
      logicalId: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired,
    }),
  })),
  consentToActors: PropTypes.arrayOf(PropTypes.shape({
    display: PropTypes.string.isRequired,
    reference: PropTypes.shape({
      logicalId: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired,
    }),
  })),
  errors: PropTypes.shape({
    consentFromActors: PropTypes.any,
    consentToActors: PropTypes.any,
  }),
};

export default SelectConsentActors;
