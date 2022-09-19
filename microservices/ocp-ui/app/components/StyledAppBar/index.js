/**
 *
 * StyledAppBar
 *
 */

import { AppBar } from 'material-ui';
import styled from 'styled-components';

const StyledAppBar = styled(AppBar).attrs({
  style: {
    fontSize: '12px',
    fontWeight: 'bold',
    color: 'white',
    backgroundColor: '#006666',
    width: '50px',
  },
})('');

export default StyledAppBar;
