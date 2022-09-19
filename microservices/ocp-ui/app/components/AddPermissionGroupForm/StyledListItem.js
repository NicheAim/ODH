/**
 *
 * StyledListItem
 *
 */

import { ListItem } from 'material-ui/List';
import styled from 'styled-components';

const StyledListItem = styled(ListItem).attrs({
  style: {
    fontSize: '13px',
    marginBottom: '5px',
  },
  innerDivStyle: {
    padding: '0 5px',
  },
  hoverColor: '#d3f1ff',
})('');

export default StyledListItem;
