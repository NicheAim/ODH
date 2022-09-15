/**
 * StatusCheckbox
 */

import React from 'react';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';
import StyledCheckbox from 'components/StyledCheckbox';

function StatusCheckbox(props) {
  return (
    <span>
      <FormattedMessage {...props.messages} >
        {(msg) => (
          <StyledCheckbox
            label={msg}
            labelPosition="right"
            id={props.elementId}
            onCheck={props.handleCheck}
            checked={props.checked}
          />
        )}
      </FormattedMessage>
    </span>
  );
}

StatusCheckbox.propTypes = {
  messages: PropTypes.object,
  handleCheck: PropTypes.func,
  elementId: PropTypes.string,
  checked: PropTypes.bool,
};

export default StatusCheckbox;
