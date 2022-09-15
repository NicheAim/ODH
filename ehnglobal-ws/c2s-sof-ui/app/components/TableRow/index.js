/**
 *
 * TableRow
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import pickBy from 'lodash/pickBy';

import TableRowGrid from './TableRowGrid';

function TableRow({ children, columns, onClick, onKeyPress, role, tabIndex }) {
  const additionalProps = pickBy({ onClick, onKeyPress, role, tabIndex });
  return (
    <TableRowGrid
      gap="5px"
      columns={columns || `repeat(${React.Children.count(children)}, 1fr)`}
      {...additionalProps}
    >
      {children}
    </TableRowGrid>
  );
}

TableRow.propTypes = {
  children: PropTypes.node,
  columns: PropTypes.string,
  onClick: PropTypes.func,
  onKeyPress: PropTypes.func,
  role: PropTypes.string,
  tabIndex: PropTypes.string,
};

export default TableRow;
