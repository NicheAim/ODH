/**
*
* ErrorMessage
*
*/

import styled from 'styled-components';


const ErrorMessage = styled.div`
  position: relative;
  bottom: -1px;
  padding-top: 5px;
  font-size: 12px;
  line-height: 12px;
  border-top: 1.5px solid rgb(244, 67, 54);
  color: rgb(244, 67, 54);
  transition: all 450ms cubic-bezier(0.23, 1, 0.32, 1) 0ms;
`;

ErrorMessage.propTypes = {

};

export default ErrorMessage;
