/**
 *
 * GoBackButton
 *
 */

import React from 'react';
import createHistory from 'history/createBrowserHistory';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import StyledFlatButton from 'components/StyledFlatButton';
import messages from './messages';

export function GoBackButton(props) {
  const history = createHistory();
  const { label, disabled } = props;
  return (
    <div>
      <StyledFlatButton
        fullWidth
        disabled={disabled}
        onClick={() => history.goBack()}
      >
        {label}
      </StyledFlatButton>
    </div>
  );
}

GoBackButton.propTypes = {
  label: PropTypes.node.isRequired,
  disabled: PropTypes.bool.isRequired,
};

GoBackButton.defaultProps = {
  label: <FormattedMessage {...messages.label} />,
  disabled: false,
};

export default GoBackButton;

