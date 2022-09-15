/**
 *
 * TableRowColumn
 *
 */

import PropTypes from 'prop-types';
import styled from 'styled-components';

const textDecorationLineValues = ['blink', 'inherit', 'initial', 'line-through', 'none', 'overline', 'underline', 'unset'];

const TableRowColumn = styled.div`
  color: #000;
  font-family: "Arial", sans-serif;
  font-style: normal;
  font-size: 12px;
  font-weight: 400;
  line-height: 200%;
  text-align: left;
  margin: 0;
  word-break: break-word;
  padding: 5px;
  text-decoration-line: ${({ textDecorationLine }) => textDecorationLine};
`;

TableRowColumn.propTypes = {
  children: PropTypes.node,
  textDecorationLine: PropTypes.oneOf(textDecorationLineValues),
};
TableRowColumn.defaultProps = {
  textDecorationLine: 'none',
};
export default TableRowColumn;
