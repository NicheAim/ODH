/**
 *
 * TableHeaderColumn
 *
 */


import PropTypes from 'prop-types';
import styled from 'styled-components';

const TableHeaderColumn = styled.div`
  color: #000;
  font-family: "Arial Bold", "Arial", sans-serif;
  font-style: normal;
  font-size: 12px;
  font-weight: 700;
  line-height: normal;
  text-align: left;
  margin: 0;
  word-break: break-all;
  padding: 2px;
`;

TableHeaderColumn.propTypes = {
  children: PropTypes.node,
};

export default TableHeaderColumn;
