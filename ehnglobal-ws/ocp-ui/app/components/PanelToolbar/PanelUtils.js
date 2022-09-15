

import styled from 'styled-components';
import teal from 'material-ui-next/colors/teal';

function defineTextColor(colorPros) {
  switch (colorPros) {
    case 'primary':
      return '#3275c1';
    case 'secondary':
      return '#000';
    default:
      return 'default';
  }
}


export function createPanelToolbarBaseStyleComponent(component) {
  let styleComponent = null;
  if (component) {
    styleComponent = styled(component)`
      && {
        color: ${({ color }) => defineTextColor(color)};
        font-size: ${({ fontSize }) => fontSize};
        font-weight: ${({ fontWeight }) => fontWeight};
        padding-left: 5px;
        max-height: 32px;
      }

      &&:hover {
        background-color: inherit;
      }
    `;
  } else {
    styleComponent = styled.div`
      && {
        color: ${({ color }) => defineTextColor(color)};
        font-size: ${({ fontSize }) => fontSize};
        font-weight: ${({ fontWeight }) => fontWeight};
        padding-left: 5px;
        max-height: 32px;
      }

      &&:hover {
        background-color: inherit;
      }
    `;
  }

  return styleComponent;
}
