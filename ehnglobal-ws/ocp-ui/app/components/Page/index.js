/**
 *
 * PageWrapper
 *
 */

import styled from 'styled-components';
import PropTypes from 'prop-types';
import common from 'material-ui-next/colors/common';


const colors = ['primary', 'secondary', 'default', 'workspaces'];

function defineColor(colorPros) {
  switch (colorPros) {
    case 'primary':
      return common.white;
    case 'secondary':
      return 'rgba(238, 238, 238, 1)';
    case 'workspaces':
      return '#F2F2F2';
    default:
      return 'default';
  }
}

const Page = styled.div`
  background-color: ${({ color }) => defineColor(color)};
  padding: ${({ padding }) => padding};
`;

Page.propTypes = {
  color: PropTypes.oneOf(colors),
  padding: PropTypes.string,
};

Page.defaultProps = {
  color: 'primary',
  padding: '20px',
};


export default Page;
