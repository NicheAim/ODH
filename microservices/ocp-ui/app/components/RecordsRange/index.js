/**
 *
 * RecordsRange
 *
 */

import React from 'react';
import CenterAlign from 'components/Align/CenterAlign';
import PropTypes from 'prop-types';

function recordStart(currentPage, currentPageSize) {
  return (((currentPage - 1) * currentPageSize) + 1);
}

function recordEnd(currentPage, currentPageSize) {
  return (((currentPage - 1) * currentPageSize) + currentPageSize);
}

function RecordsRange(props) {
  const lastPage = (props.currentPage === props.totalPages);
  return (
    <div>
      <CenterAlign>
        {lastPage ? (
          <div>
            Records :
            &lt;&nbsp;{(props.totalElements - props.currentPageSize) + 1}&nbsp;
            -&nbsp;{props.totalElements}&nbsp;&gt;&nbsp;
            &nbsp;/&nbsp;{props.totalElements}
          </div>
        ) : (
          <div>
           Records :
            &lt;&nbsp;{recordStart(props.currentPage, props.currentPageSize)}&nbsp;
            -&nbsp;{recordEnd(props.currentPage, props.currentPageSize)}&nbsp;&gt;&nbsp;
            &nbsp;/&nbsp;{props.totalElements}
          </div>
        )}
      </CenterAlign>
    </div>
  );
}

RecordsRange.propTypes = {
  currentPage: PropTypes.number,
  totalPages: PropTypes.number,
  totalElements: PropTypes.number,
  currentPageSize: PropTypes.number,
};

export default RecordsRange;
