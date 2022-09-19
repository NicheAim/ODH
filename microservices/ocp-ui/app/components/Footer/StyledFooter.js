import styled from 'styled-components';
import AppBar from 'material-ui/AppBar';

const StyledFooter = styled(AppBar)`
  background-color: #fff;
`;

StyledFooter.propTypes = {
  ...(AppBar.propTypes || {}),
};

export default StyledFooter;
