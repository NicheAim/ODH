/**
 *
 * StyledImage
 *
 */

import styled from 'styled-components';
import PropTypes from 'prop-types';


const StyledImage = styled.img`
  border-width: ${({ borderWidth }) => borderWidth};
  width: ${({ width }) => width};
  height: ${({ height }) => height};
  margin: ${({ margin }) => margin};
`;

StyledImage.propTypes = {
  borderWidth: PropTypes.string,
  width: PropTypes.string,
  height: PropTypes.string,
  margin: PropTypes.string,
};

StyledImage.defaultProps = {
  borderWidth: '0px',
  width: '85px',
  height: '56px',
  margin: '10px',
};

export default StyledImage;
