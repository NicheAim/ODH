/**
 *
 * TableHeader
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import StickyDiv from 'components/StickyDiv';
import TableHeaderGrid from './TableHeaderGrid';

function TableHeader(props) {
  const { sticky, children, columns, relativeTop } = props;

  function renderTableHeader() {
    return (
      <TableHeaderGrid gap="5px" columns={columns || `repeat(${React.Children.count(children)}, 1fr)`}>
        {children}
      </TableHeaderGrid>
    );
  }

  let renderContent = renderTableHeader();
  if (sticky) {
    renderContent = (
      <StickyDiv top={`${relativeTop}px`}>
        {renderTableHeader()}
      </StickyDiv>
    );
  }

  return renderContent;
}

TableHeader.propTypes = {
  sticky: PropTypes.bool,
  relativeTop: PropTypes.number.isRequired,
  children: PropTypes.node,
  columns: PropTypes.string,
};

TableHeader.defaultProps = {
  sticky: true,
  relativeTop: 0,
};

export default TableHeader;
