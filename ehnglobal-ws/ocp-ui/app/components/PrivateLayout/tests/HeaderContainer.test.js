import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
import 'jest-styled-components';

import HeaderContainer from '../HeaderContainer';

configure({ adapter: new Adapter() });

describe('<HeaderContainer />', () => {
  describe('snapshot tests', () => {
    it('should match snapshot', () => {
      // Arrange
      const children = <div>test</div>;

      // Act
      const renderedComponent = shallow(<HeaderContainer>{children}</HeaderContainer>);

      // Assert
      expect(renderedComponent).toMatchSnapshot();
    });
  });

  describe('structural tests', () => {
    it('should have children', () => {
      // Arrange
      const children = <div>test</div>;

      // Act
      const renderedComponent = shallow(<HeaderContainer>{children}</HeaderContainer>);

      // Assert
      expect(renderedComponent.contains(children)).toEqual(true);
    });
  });

  describe('style tests', () => {
    it('should have styles', () => {
      // Arrange
      const children = <div>test</div>;

      // Act
      const renderedComponent = shallow(<HeaderContainer>{children}</HeaderContainer>);

      // Assert
      expect(renderedComponent).toHaveStyleRule('position', 'fixed');
      expect(renderedComponent).toHaveStyleRule('width', '100%');
      expect(renderedComponent).toHaveStyleRule('z-index', '99');
      expect(renderedComponent).toHaveStyleRule('top', '0');
    });
  });
});
