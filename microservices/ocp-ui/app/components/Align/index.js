/**
 *
 * Align
 *
 */
import PropType from 'prop-types';
import styled from 'styled-components';

const variants = ['left', 'right', 'center', 'justify', 'initial', 'inherit'];

const Align = styled.div`
  text-align: ${({ variant }) => (variants.find((value) => value === variant))};
`;

Align.propTypes = {
  variant: PropType.oneOf(variants).isRequired,
};

export default Align;
