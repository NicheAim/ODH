import styled from 'styled-components';
import TextField from 'components/TextField';

const StyledTextField = styled(TextField).attrs({
  // we can define static props
  hintStyle: {
    fontSize: '12px',
    bottom: '7px',
  },
  inputStyle: {
    fontSize: '12px',
    bottom: '4px',
  },
  style: {
    height: '30px',
  },
})('');

StyledTextField.propTypes = {};

export default StyledTextField;
