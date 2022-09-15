/**
 *
 * Footer
 *
 */

import React from 'react';
import { FormattedMessage } from 'react-intl';
import messages from './messages';
import StyledFooter from './StyledFooter';

function Footer() {
  const year = new Date().getFullYear();
  return (
    <StyledFooter
      title={<FormattedMessage {...messages.header} values={{ year }} />}
      showMenuIconButton={false}
    />
  );
}

Footer.propTypes = {};

export default Footer;
