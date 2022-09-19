/**
 *
 * Section
 *
 */

import styled from 'styled-components';
import PropTypes from 'prop-types';

const Section = styled.div`
  border-radius: 2px;
  border: ${({ border }) => border};
  padding: ${({ padding }) => padding};
`;

Section.propTypes = {
  border: PropTypes.string,
  padding: PropTypes.string,
};

Section.defaultProps = {
  border: '1px solid rgb(224, 224, 224)',
  padding: '0 2px',
};

export default Section;
