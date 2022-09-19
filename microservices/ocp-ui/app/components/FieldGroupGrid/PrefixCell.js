import React from 'react';
import PropTypes from 'prop-types';
import { Cell } from 'styled-css-grid';

import { PREFIX } from './constants';

function PrefixCell({ area, children, ...rest }) {
  return (
    <Cell area={area} {...rest}>
      {children}
    </Cell>);
}

PrefixCell.propTypes = {
  ...Cell.propTypes,
  children: PropTypes.node,
  area: PropTypes.string,
};

PrefixCell.defaultProps = {
  area: PREFIX,
};

export default PrefixCell;
