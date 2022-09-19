/**
 *
 * StyledFlatButton
 *
 */
import React from 'react';
import styled from 'styled-components';
import Button from 'material-ui-next/Button/index';
import PropTypes from 'prop-types';


const StyledFlatButton = styled(({ marginRight, ...rest }) => (<Button {...rest} />))`
  && {
    color: #3275c1;
    text-transform: capitalize;
    margin-right: ${({ marginRight }) => marginRight}px;
  }

  && svg {
    fill: #d2d2c3;
    transition: all 450ms cubic-bezier(0.23, 1, 0.32, 1) 0ms;
  }

  &&:disabled {
    color: rgba(0, 0, 0, 0.3);
  }
`;

StyledFlatButton.propTypes = {
  marginRight: PropTypes.number,
};

StyledFlatButton.defaultProps = {
  marginRight: 0,
};

export default StyledFlatButton;
