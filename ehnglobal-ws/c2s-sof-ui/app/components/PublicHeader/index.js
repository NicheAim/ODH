/**
 *
 * PublicHeader
 *
 */

import React from 'react';
import { FormattedMessage } from 'react-intl';
import { ToolbarGroup } from 'material-ui/Toolbar';
import common from 'material-ui-next/colors/common';

import StyledImage from 'components/StyledImage';
import StyledToolbar from 'components/StyledToolbar';
import c2sBrandWordImg from 'images/c2s-word-logo.png';
import messages from './messages';


function PublicHeader() {
  return (
    <StyledToolbar color={common.white} height="60px">
      <ToolbarGroup>
        <StyledImage
          height="46px"
          width="175px"
          src={c2sBrandWordImg}
          alt={<FormattedMessage {...messages.brandImg} />}
        />
      </ToolbarGroup>
    </StyledToolbar>
  );
}

PublicHeader.propTypes = {};

export default PublicHeader;
