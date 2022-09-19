/**
 *
 * StyledUltimatePagination
 *
 */
import React from 'react';
import PropTypes from 'prop-types';
import UltimatePagination from 'react-ultimate-pagination-material-ui';
import CenterAlign from '../Align/CenterAlign';

function CenterAlignedUltimatePagination(props) {
  return (<CenterAlign><UltimatePagination {...props} /></CenterAlign>);
}

CenterAlignedUltimatePagination.propTypes = {
  currentPage: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
  boundaryPagesRange: PropTypes.number,
  siblingPagesRange: PropTypes.number,
  hidePreviousAndNextPageLinks: PropTypes.bool,
  hideFirstAndLastPageLinks: PropTypes.bool,
  hideEllipsis: PropTypes.bool,
};

CenterAlignedUltimatePagination.defaultProps = {
  boundaryPagesRange: 1,
  siblingPagesRange: 1,
  hidePreviousAndNextPageLinks: false,
  hideFirstAndLastPageLinks: false,
  hideEllipsis: false,
};

export default CenterAlignedUltimatePagination;
