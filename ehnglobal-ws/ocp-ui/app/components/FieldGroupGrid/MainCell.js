import React from 'react';
import PropTypes from 'prop-types';
import { Cell } from 'styled-css-grid';

import { MAIN } from './constants';

function MainCell({ area, children, ...rest }) {
  return (
    <Cell area={area} {...rest}>
      {children}
    </Cell>);
}

MainCell.propTypes = {
  ...Cell.propTypes,
  children: PropTypes.node,
  area: PropTypes.string,
};

MainCell.defaultProps = {
  area: MAIN,
};

export default MainCell;
