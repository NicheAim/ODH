/**
 *
 * HomeButton
 *
 */
import styled from 'styled-components';
import Button from 'material-ui-next/Button/index';
import common from 'material-ui-next/colors/common';


const HomeButton = styled(Button)`
  && {
    color: #6c4e70;
    font-size: 20px;
    text-transform: capitalize;
    border-left: 2px solid #c9c9c9;
  }
 
  &&:hover {
    background-color: #6c4e70;
    color: ${common.white};
  }
`;

HomeButton.propTypes = {};

export default HomeButton;
