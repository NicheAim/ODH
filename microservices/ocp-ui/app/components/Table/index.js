/**
 *
 * Table
 *
 */

import PropTypes from 'prop-types';
import styled from 'styled-components';

const Table = styled.div`
  margin: ${({ margin }) => margin};
  background-color: white;
`;


Table.propTypes = {
  margin: PropTypes.string,
  children: PropTypes.node,
};

Table.defaultProps = {
  margin: '10px',
};

export default Table;
