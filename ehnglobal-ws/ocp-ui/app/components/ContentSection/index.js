/**
*
* ContentSection
*
*/

import styled from 'styled-components';
import PropTypes from 'prop-types';

const ContentSection = styled.div`
  font-size: ${({ fontSize }) => fontSize};
`;

ContentSection.propTypes = {
  fontSize: PropTypes.string,
};


ContentSection.defaultProps = {
  fontSize: '12px',
};

export default ContentSection;
