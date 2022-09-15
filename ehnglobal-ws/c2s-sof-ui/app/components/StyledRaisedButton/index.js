/**
 *
 * StyledRaisedButton
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Button from 'material-ui-next/Button';
import common from 'material-ui-next/colors/common';

const StyledRaisedButton = styled(({ marginRight, ...rest }) => (<Button variant="raised" {...rest} />))`
  && {
    background-color: #6c4e70;
    color: ${common.white};
    font-size: 13px;
    font-weight: bold;
    text-transform: capitalize;
    margin-right: ${({ marginRight }) => marginRight}px;
  }

  &&:hover {
    background-color: #855e89;
  }

  &&:disabled {
    background-color: rgba(0, 0, 0, 0.12);
    color: rgba(0, 0, 0, 0.26);
  }
`;

StyledRaisedButton.propTypes = {
  marginRight: PropTypes.number,
};

StyledRaisedButton.defaultProps = {
  marginRight: 0,
};

export default StyledRaisedButton;
