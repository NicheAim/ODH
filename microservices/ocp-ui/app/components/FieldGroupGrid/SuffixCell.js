import React from 'react';
import PropTypes from 'prop-types';
import { Cell } from 'styled-css-grid';

import { SUFFIX } from './constants';

function SuffixCell({ area, children, ...rest }) {
  return (
    <Cell area={area} {...rest}>
      {children}
    </Cell>);
}

SuffixCell.propTypes = {
  ...Cell.propTypes,
  children: PropTypes.node,
  area: PropTypes.string,
};

SuffixCell.defaultProps = {
  area: SUFFIX,
};

export default SuffixCell;
