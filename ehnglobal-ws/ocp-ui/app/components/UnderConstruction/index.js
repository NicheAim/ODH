/**
 *
 * UnderConstruction
 *
 */

import React from 'react';
import Card from 'components/Card';
import NoResultsFoundText from 'components/NoResultsFoundText';
import PanelToolbar from 'components/PanelToolbar';

function UnderConstruction() {
  return (
    <Card>
      <PanelToolbar showUploadIcon={false} />
      <NoResultsFoundText>Under Construction</NoResultsFoundText>
    </Card>
  );
}

UnderConstruction.propTypes = {};

export default UnderConstruction;
