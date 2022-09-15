/**
 *
 * StyledIconButton
 *
 */
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import IconButton from 'material-ui-next/IconButton';


const sizes = ['x-small', 'small', 'medium', 'large'];

function defineSvgIconSize(svgIconSizeProp) {
  switch (svgIconSizeProp) {
    case 'small':
      return '18px';
    case 'medium':
      return '20px';
    case 'large':
      return '24px';
    default:
      return 'default';
  }
}

function defineIconButtonSize(iconButtonSize) {
  switch (iconButtonSize) {
    case 'x-small':
      return '24px';
    case 'small':
      return '36px';
    case 'medium':
      return '48px';
    case 'large':
      return '60px';
    default:
      return 'default';
  }
}

const StyledIconButton = styled(({ size, svgIconSize, disableIconHover, ...other }) => (
  <IconButton {...other} />
))`
  && {
    width: ${({ size }) => size && defineIconButtonSize(size)};
    height: ${({ size }) => size && defineIconButtonSize(size)};
  }

  && svg {
    max-height: ${({ svgIconSize }) => svgIconSize && defineSvgIconSize(svgIconSize)};
  }

  &&:hover {
    background-color: inherit;
  }

  &&:hover svg {
    background-color: ${({ disableIconHover }) => disableIconHover ? 'default' : 'transparent'};
    border-radius: 5px;
    fill: #3275c1 !important;
  }

  &&:disabled svg {
    fill: rgba(0, 0, 0, 0.3) !important;
  }
`;

StyledIconButton.propTypes = {
  svgIconSize: PropTypes.oneOf(sizes),
  size: PropTypes.oneOf(sizes),
  disableIconHover: PropTypes.bool,
};

StyledIconButton.defaultProps = {
  disableIconHover: false,
};

export default StyledIconButton;
