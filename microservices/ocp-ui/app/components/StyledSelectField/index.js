/**
*
* StyledSelectField
*
*/

import styled from 'styled-components';
import SelectField from 'components/SelectField';

const StyledSelectField = styled(SelectField).attrs({
  // we can define static props
  labelStyle: {
    fontSize: '12px',
    lineHeight: '30px',
    height: '30px',
  },
  menuItemStyle: {
    height: '12px',
    fontSize: '12px',
  },
  iconStyle: {
    top: '-12px',
  },
  hintStyle: {
    fontSize: '14px',
    top: '1px',
  },
  style: {
    height: '30px',
  },
})('');

StyledSelectField.propTypes = {};

export default StyledSelectField;
