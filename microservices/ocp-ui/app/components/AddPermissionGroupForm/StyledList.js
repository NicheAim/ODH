/**
 *
 * StyledList
 *
 */

import { List } from 'material-ui/List';
import styled from 'styled-components';

const StyledList = styled(List).attrs({
  style: {
    height: '330px',
    border: '1px solid #a9a9a9',
    overflow: 'auto',
  },
})('');

export default StyledList;
