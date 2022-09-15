/**
 *
 * Padding
 *
 */
import PropType from 'prop-types';
import styled from 'styled-components';


const Padding = styled.div`
  padding-top: ${(props) => props.top ? props.top : 0}px;
  padding-right: ${(props) => props.right ? props.right : 0}px;
  padding-bottom: ${(props) => props.bottom ? props.bottom : 0}px;
  padding-left: ${(props) => props.left ? props.left : 0}px;
`;

Padding.propTypes = {
  top: PropType.number,
  right: PropType.number,
  bottom: PropType.number,
  left: PropType.number,
};

export default Padding;
