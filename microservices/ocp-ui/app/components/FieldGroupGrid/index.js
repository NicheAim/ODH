/**
 *
 * IdentifierGroupGrid
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import StyledFieldGroupGrid from './StyledFieldGroupGrid';

function IdentifierGroupGrid({ children, gap, withSuffix, ...rest }) {
  return (
    <StyledFieldGroupGrid gap={gap} withSuffix={withSuffix} {...rest}>
      {children}
    </StyledFieldGroupGrid>
  );
}

IdentifierGroupGrid.propTypes = {
  ...StyledFieldGroupGrid.propTypes,
  children: PropTypes.node,
  gap: PropTypes.string,
  withSuffix: PropTypes.bool,
};

IdentifierGroupGrid.defaultProps = {
  gap: '0',
  withSuffix: false,
};

export default IdentifierGroupGrid;
