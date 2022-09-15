/**
 *
 * ErrorText
 *
 */

import PropTypes from 'prop-types';
import styled from 'styled-components';

const ErrorText = styled.span`
  color: rgb(244, 67, 54);
  margin-left: ${({ marginLeft }) => marginLeft};
  padding-left: ${({ paddingLeft }) => paddingLeft};
`;

ErrorText.propTypes = {
  marginLeft: PropTypes.string,
  paddingLeft: PropTypes.string,
};
ErrorText.defaultProps = {
  marginLeft: '1vw',
  paddingLeft: '0.5vw',
};

export default ErrorText;
