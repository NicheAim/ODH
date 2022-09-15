/**
 *
 * Table
 *
 */

import PropTypes from 'prop-types';
import styled from 'styled-components';

const Table = styled.div`
  margin: 0 10px;
  background-color: white;
`;


Table.propTypes = {
  children: PropTypes.node,
};

export default Table;
