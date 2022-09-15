/**
 *
 * ContainerCard
 *
 */
 import styled from 'styled-components';
 import PropTypes from 'prop-types';
 
 const ContainerCard = styled.div`
   padding: 15px 8px 4px 8px;
   background-color: white;
   min-width: ${({ minWidth }) => minWidth};
   min-height: 50px;
   height: 100%;
   border-radius: 2px;
   position: relative;
   box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
   transition: all 0.5s cubic-bezier(0.25, 0.8, 0.25, 1);
   align-items: center;
   justify-content: center;
 
   &:hover {
     box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
   }
 `;
 
 ContainerCard.propTypes = {
   minWidth: PropTypes.string,
 };
 
 ContainerCard.defaultProps = {
   minWidth: 'auto',
 };
 
 export default ContainerCard;
 