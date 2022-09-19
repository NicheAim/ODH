/**
 *
 * StyledFlatButton
 *
 */
import React from 'react';
import styled from 'styled-components';
import Button from 'material-ui-next/Button';


const LaunchButton = styled(({ width, ...rest }) => (<Button {...rest} />))`
  && {
    text-transform: capitalize;
    border: 2px solid rgba(242, 242, 242, 1);
    width: ${({ width }) => width || 150}px;
  }

  &&:hover {
    border-color: rgba(0, 153, 153, 1);
    background-color: #fff;
    color: rgba(0, 153, 153, 1);
  }
 
  &&:disabled {
    color: rgba(0, 0, 0, 0.3);
  }
`;

LaunchButton.propTypes = {};

export default LaunchButton;
