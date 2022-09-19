/**
*
* StyledFormikCheckbox
*
*/

import styled from 'styled-components';
import Checkbox from 'components/Checkbox';


const StyledFormikCheckbox = styled(Checkbox).attrs({
  labelStyle: {
    left: '-12px',
    top: '-3px',
    fontSize: '12px',
    wordBreak: 'none',
  },
  iconStyle: {
    height: '18px',
    width: '18px',
  },
})('');

StyledFormikCheckbox.propTypes = {

};

export default StyledFormikCheckbox;
