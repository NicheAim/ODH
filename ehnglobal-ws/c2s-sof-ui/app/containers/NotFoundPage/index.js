/**
 * NotFoundPage
 *
 * This is the page we show when the user visits a url that doesn't have a route
 *
 * NOTE: while this component should technically be a stateless functional
 * component (SFC), hot reloading does not currently support SFCs. If hot
 * reloading is not a necessity for you then you can refactor it and remove
 * the linting exception.
 */

import React from 'react';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import BackIcon from '@material-ui/icons/ArrowBack';

import HorizontalAlignment from 'components/HorizontalAlignment';
import StyledText from 'components/StyledText';
import GoBackButton from 'components/GoBackButton';
import messages from './messages';

export default class NotFound extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div>
        <Helmet>
          <title>Page Not Found</title>
          <meta name="description" content="Page Not Found page of Consent2Share Smart On Fhir" />
        </Helmet>
        <HorizontalAlignment position="center">
          <StyledText fontWeight={700} fontSize="30px"><FormattedMessage {...messages.header} /></StyledText>
          <GoBackButton
            label={
              <div>
                <BackIcon />
                <FormattedMessage {...messages.goBackButton} />
              </div>
            }
          />
        </HorizontalAlignment>
      </div>
    );
  }
}
