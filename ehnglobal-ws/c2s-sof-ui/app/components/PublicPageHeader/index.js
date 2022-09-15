/**
 *
 * PublicPageHeader
 *
 */

import React from 'react';
import { FormattedMessage } from 'react-intl';
import { ToolbarGroup } from 'material-ui/Toolbar';
import common from 'material-ui-next/colors/common';

import StyledImage from 'components/StyledImage';
import StyledToolbar from 'components/StyledToolbar';
import c2sBrandImg from 'images/c2s-logo.png';
import messages from './messages';


function PublicPageHeader() {
  return (
    <StyledToolbar color={common.white} height="60px">
      <ToolbarGroup>
        <StyledImage
          height="35px"
          width="40px"
          src={c2sBrandImg}
          alt={<FormattedMessage {...messages.brandImg} />}
        />
      </ToolbarGroup>
    </StyledToolbar>
  );
}

PublicPageHeader.propTypes = {};

export default PublicPageHeader;
