/**
 *
 * StickyDiv
 *
 */

import styled from 'styled-components';
import PropTypes from 'prop-types';


const StickyDiv = styled.div`
  position: sticky;
  top: ${({ top }) => top};
  z-index: 9;
  background-color: ${({ backgroundColor }) => backgroundColor};
  font-size: ${({ fontSize }) => fontSize};
`;

StickyDiv.propTypes = {
  top: PropTypes.string,
  backgroundColor: PropTypes.string,
  fontSize: PropTypes.string,
};

StickyDiv.defaultProps = {
  top: '0',
  backgroundColor: '#fff',
  fontSize: '12px',
};

export default StickyDiv;
