import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
import 'jest-styled-components';

import NavigationIconMenu from '../index';

configure({ adapter: new Adapter() });

describe('<NavigationIconMenu />', () => {
  describe('snapshot tests', () => {
    it('should match snapshot', () => {
      // Arrange
      const handleClick = jest.fn();
      const menuItems = [{
        primaryText: 'Menu Item',
        onClick: handleClick,
        disabled: false,
        linkTo: '/link',
      }];

      // Act
      const renderedComponent = shallow(<NavigationIconMenu menuItems={menuItems} />);

      // Assert
      expect(renderedComponent).toMatchSnapshot();
    });
  });
});
