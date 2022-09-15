/**
 *
 * PublicHeader
 *
 */

import React from 'react';
import { FormattedMessage } from 'react-intl';
import brandImg from 'images/omnibus-care-plan-logo.png';
import StyledDivider from 'components/StyledDivider';
import StyledImage from 'components/StyledImage';
import messages from './messages';


function PublicHeader() {
  return (
    <div>
      <StyledImage height="50px" width="125px" src={brandImg} alt={<FormattedMessage {...messages.brandImg} />} />
      <StyledDivider />
    </div>
  );
}

PublicHeader.propTypes = {};

export default PublicHeader;
