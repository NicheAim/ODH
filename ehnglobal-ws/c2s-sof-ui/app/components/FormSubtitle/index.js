/**
 *
 * FormSubtitle
 *
 */

import styled from 'styled-components';
import PropTypes from 'prop-types';

const FormSubtitle = styled.div`
  padding-left: 0.5vw;
  margin: ${({ margin }) => margin};
  font-size: 1.2rem;
  font-weight: bold;
  color: #444;
  background-color: #f2f2f2;
`;

FormSubtitle.propTypes = {
  margin: PropTypes.string,
};

FormSubtitle.defaultProps = {
  margin: '2vh 1vw 0 1vw',
};

export default FormSubtitle;
