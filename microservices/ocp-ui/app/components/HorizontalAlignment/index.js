/**
*
* HorizontalAlignment
*
*/

import styled from 'styled-components';
import PropType from 'prop-types';

const positions = ['start', 'end', 'center'];
const HorizontalAlignment = styled.div`
  display: grid;
  justify-content: ${({ position }) => (positions.find((value) => value === position))};
`;

HorizontalAlignment.propTypes = {
  position: PropType.oneOf(positions).isRequired,
};

export default HorizontalAlignment;
