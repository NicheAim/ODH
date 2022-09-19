/**
 *
 * StyledListItem
 *
 */

import { ListItem } from 'material-ui/List';
import styled from 'styled-components';

const StyledListItem = styled(ListItem).attrs({
  style: {
    fontSize: '15px',
    height: '18px',
  },
  innerDivStyle: {
    padding: '0 5px',
  },
})('');

export default StyledListItem;
